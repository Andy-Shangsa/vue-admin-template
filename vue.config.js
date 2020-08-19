/**
 * @author Mr.Shang
 * @description 基于 Vue cli 4.x 搭建的管理平台基础模板
 */
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");
const resolve = dir => path.join(__dirname, dir);
// 是否生产环境
const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  publicPath: "./",
  outputDir: process.env.VUE_APP_DIST || "dist",
  assetsDir: "static",
  filenameHashing: true,
  lintOnSave: true,
  productionSourceMap: false,
  configureWebpack: config => {
    // 将每个依赖包打包成单独的js文件
    let optimization = {
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 20000, // 依赖包超过20000bit将被单独打包
        cacheGroups: {
          common: {
            name: "chunk-common",
            minChunks: 2,
            minSize: 0,
            priority: 1,
            reuseExistingChunk: true,
            enforce: true
          },
          vendors: {
            name: "chunk-vendors",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
            chunks: "initial" // only package third parties that are initially dependent
          },
          melody: {
            name: "chunk-melody", // split elementUI into a single package
            chunks: "all",
            reuseExistingChunk: true,
            enforce: true,
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?melody-ui(.*)/ // in order to adapt to cnpm
          }
        }
      },
      minimizer: [
        // 删除console插件
        new TerserPlugin({
          terserOptions: {
            warnings: false,
            compress: {
              // 删除无用的代码
              unused: true,
              // 删掉 debugger
              drop_debugger: true, // eslint-disable-line
              // 移除 console
              drop_console: true, // eslint-disable-line
              // 移除无用的代码
              dead_code: true, // eslint-disable-line
              pure_funcs: ["console.log"]
            }
          }
        })
      ]
    };
    // 解除包体积限制
    let performance = {
      hints: false,
      // 入口起点的最大体积
      maxEntrypointSize: 1048576, // 设置为1MB
      // 生成文件的最大体积
      maxAssetSize: 5242880, // 5MB
      // 只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith(".js");
      }
    };

    if (isProduction) {
      Object.assign(config, {
        optimization,
        performance
      });
    }
  },
  // 允许对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: config => {
    // 压缩图片
    config.module
      .rule("images")
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({
        mozjpeg: { progressive: true, quality: 65 },
        optipng: { enabled: false },
        pngquant: { quality: [0.65, 0.9], speed: 4 },
        gifsicle: { interlaced: false }
      })
      .end();

    // 修复HMR
    config.resolve.symlinks(true);

    // 设置标题
    config.plugin("html").tap(args => {
      args[0].title = process.env.VUE_APP_TITLE;
      return args;
    });

    // 删除换行配置
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();

    // 设置别名
    config.resolve.alias.set("@c", resolve("src/components"));

    // 移除 prefetch、preload 插件
    config.plugins.delete("prefetch-index").delete("preload-index");
  },
  // CSS相关设置
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {
      // sass: {
      //   prependData:
      //     `@import "~@/assets/styles/mixins/mixins.scss";` +
      //     `@import "~@/assets/styles/public/const.scss";` +
      //     `@import "~@/assets/styles/public/flex.scss";`
      // }
    }
  },

  // 如果机器拥有多个核心，则默认启用
  parallel: require("os").cpus().length > 1,

  // 它支持webPack-dev-server的所有选项
  devServer: {
    port: 3000,
    https: false,
    hotOnly: false,
    open: false,
    proxy: {
      "/base_url": {
        target: "http://api.wisder.cn:8066/router/Execute",
        changeOrigin: true, // 改变源
        pathRewrite: {
          "^/base_url": ""
        }
      }
    },
    before: app => {}
  }
};
