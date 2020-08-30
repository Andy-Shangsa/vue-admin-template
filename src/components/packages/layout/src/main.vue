<!-- 布局 -->
<script>
import VTable from "@/components/packages/table";
export default {
  name: "EleLayout",
  provide() {
    return {
      layout: this
    };
  },
  components: { VTable },
  props: {
    // 请求地址
    fetchUrl: String,
    // 触发查询生命周期
    fetchCycle: {
      type: String,
      default: "created",
      validator: (val) => {
        return ["created", "mounted", "none"].includes(val);
      }
    },
    // 布局方式，auto 自动撑开；fixed 在一屏内滚动
    layout: {
      type: String,
      default: "fixed",
      validator: (val) => {
        return ["auto", "fixed"].includes(val);
      }
    },
    // 是否需要分页
    pagination: {
      type: Boolean,
      default: true
    },
    // 配置动态列数据
    columns: { type: Array, default: () => [] },
    // 请求响应拦截器
    interceptors: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      current: 1,
      pageSize: 10,
      total: 0,
      tableData: [
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987123",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987125",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987126",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        }
      ]
    };
  },
  render(h) {
    let { header, aside, ...scopedSlots } = this.$scopedSlots;
    return h(
      "section",
      { class: ["ele-layout", `is-${this.layout || "fixed"}`] },
      [
        this.renderHeader(h, header),
        h("section", { class: "ele-layout__container flex" }, [
          this.renderAside(h, aside),
          h("section", { class: "ele-layout__wrapper flex__1" }, [
            this.renderTable(h, scopedSlots),
            this.renderFooter(h)
          ])
        ])
      ]
    );
  },
  methods: {
    // 渲染头部
    renderHeader(h, header) {
      return typeof header === "function"
        ? h("header", { class: "ele-layout__header" }, header())
        : null;
    },
    // 渲染侧边栏
    renderAside(h, aside) {
      return typeof aside === "function"
        ? h("aside", { class: "ele-layout__aside" }, aside())
        : null;
    },
    // 渲染分页区域
    renderFooter(h) {
      return this.pagination
        ? h("footer", { class: "ele-layout__footer flex flex--justify-end" }, [
            h("el-pagination", {
              attrs: {
                total: 100,
                background: true,
                layout: "total, sizes, prev, pager, next, jumper"
              }
            })
          ])
        : null;
    },
    // 渲染表格
    renderTable(h, scopedSlots) {
      let attrs = {};
      switch (this.layout) {
        case "auto":
          attrs["height"] = "auto";
          break;
        case "fixed":
          attrs["height"] = "100%";
          break;
        default:
          break;
      }
      return h("main", { class: "ele-layout__main" }, [
        h("v-table", {
          props: {
            columns: this.columns,
            data: this.tableData
          },
          attrs: {
            ...attrs
          },
          scopedSlots: {
            ...scopedSlots
          }
        })
      ]);
    },
    // 每页条数改变
    handleSizeChange(size) {
      this.pageSize = size;
      // this.setTableData();
    },
    // 当前页改变
    handleCurrentChange(current) {
      this.current = current;
      // this.setTableData();
    }
  }
};
</script>
<style lang='scss' scoped>
@include b(ele-layout) {
  position: relative;
  @include e(main) {
    padding: 8px 10px;
  }
  @include e(header) {
    padding: 8px 10px;
  }
  @include e(container) {
    overflow: hidden;
  }
  @include e(footer) {
    padding: 8px 10px;
  }
  @include when(fixed) {
    height: 100%;
    overflow: hidden;
    @extend .flex;
    @extend .is-column;
    .ele-layout__container {
      @extend .flex__1;

      .ele-layout__wrapper {
        @extend .flex;
        @extend .is-column;
        overflow: hidden;
      }
      .ele-layout__main {
        @extend .flex__1;
        overflow: hidden;
      }
    }
  }
}
</style>
