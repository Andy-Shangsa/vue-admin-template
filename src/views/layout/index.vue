<!-- 管理后台框架 -->
<script>
import { mapGetters } from "vuex";
import {
  headerHeight,
  menuToggle,
  menuCollapse
} from "@/assets/styles/public/const.scss";
export default {
  name: "Layout",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["projectLayoutHeader", "projectLayoutMenu", "menuToggle"]),
    // header导航栏高度
    headerHeight() {
      return headerHeight;
    },
    // 菜单宽度
    menuWidth() {
      return this.menuToggle ? menuToggle : menuCollapse;
    },
    // 悬浮型菜单
    isMenuFixed() {
      return this.projectLayoutMenu === "fixed";
    },
    // 悬浮型导航栏
    isHeaderFixed() {
      return this.projectLayoutHeader === "fixed";
    }
  },
  methods: {
    // 渲染头部导航栏容器
    renderHeader(h) {
      return h(
        "el-header",
        {
          class: "layout__header",
          props: {
            height: this.headerHeight
          }
        },
        [
          h(
            "el-button",
            {
              on: {
                click: () => {
                  this.$store.dispatch("changeMenuToggle");
                }
              }
            },
            "toggle"
          )
        ]
      );
    },
    // 渲染菜单容器
    renderAside(h) {
      return h(
        "el-aside",
        {
          class: "layout__aside",
          props: {
            width: this.menuWidth
          }
        },
        this.menuWidth
      );
    },
    // 渲染路由容器
    renderMain(h) {
      return h("el-main", { class: "layout__main" }, [h("router-view")]);
    }
  },
  render(h) {
    return this.isMenuFixed
      ? h("el-container", { class: "layout__container" }, [
          this.renderAside(h),
          this.isHeaderFixed
            ? h("el-container", [this.renderHeader(h), this.renderMain(h)])
            : h(
                "section",
                {
                  class: "layout__section"
                },
                [this.renderHeader(h), this.renderMain(h)]
              )
        ])
      : h(
          "el-container",
          {
            class: [{ "layout__container flex is-column": this.isHeaderFixed }]
          },
          [
            this.renderHeader(h),
            h(
              "el-container",
              {
                class: [{ "flex__1 overflow-hidden": this.isHeaderFixed }]
              },
              [this.renderAside(h), this.renderMain(h)]
            )
          ]
        );
  }
};
</script>
<style lang='scss' scoped>
@include b(layout) {
  @include e(container) {
    height: 100%;
  }
  @include e(aside) {
    transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  @include e(section) {
    flex: 1;
    flex-basis: auto;
    height: 100%;
    overflow-y: auto;
  }
}
</style>
