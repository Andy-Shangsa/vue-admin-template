module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/standard"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    // 对象字面量中冒号的前后空格
    "key-spacing": [0, { beforeColon: false, afterColon: true }],
    "indent": "off",
    quotes: ["off", "double"], // 强制使用一致的反勾号、双引号或单引号
    semi: "off", // 要求或禁止使用分号代替 ASI
    eqeqeq: "off", // 要求使用 === 和 !==
    "space-before-function-paren": ["off", "never"], // 强制在 function的左括号之前使用一致的空格
    "no-empty": "off", // 禁止出现空语句块
    "comma-dangle": ["off", "never"], // 要求或禁止末尾逗号
    "no-unused-vars": "off", // 禁止出现未使用过的变量
    "no-extend-native": "off", // 	禁止扩展原生类型
    camelcase: "off", // 强制使用骆驼拼写法命名约定
    "dot-notation": "off", // 强制尽可能地使用点号
    curly: "off", // 强制所有控制语句使用一致的括号风格
    "no-throw-literal": "off", // 禁止抛出异常字面量
    "no-case-declarations": "off", // 不允许在 case 子句中使用词法声明
    "handle-callback-err": "off", // 要求回调函数中有容错处理
    "prefer-const": "off", // 要求使用 const 声明那些声明后不再被修改的变量
    "prefer-promise-reject-errors": "off", // 要求使用 Error 对象作为 Promise 拒绝的原因
    "key-spacing": [0, { beforeColon: false, afterColon: true }] //对象字面量中冒号的前后空格
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      env: {
        jest: true
      }
    }
  ]
};
