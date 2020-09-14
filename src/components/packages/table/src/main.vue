<!-- 表格二封 -->
<script>
export default {
  name: "VTable",
  props: {
    // 表格数据
    data: { type: Array, default: () => [] },
    // 配置动态列数据
    columns: { type: Array, default: () => [] }
  },
  watch: {
    columns: {
      handler: "watchTableChange",
      deep: true
    }
  },
  methods: {
    // 更新列数据后重新对表格布局调整
    watchTableChange() {
      this.$nextTick(() => {
        this.doLayout();
      });
    },
    // 格式化单元格文本
    formatText(col, { row, column, cellValue, $index }) {
      // 如果传入格式化方法（此处重写格式化方法，弃用element自带）
      if (typeof col.formatter == "function") {
        return col.formatter({ row, column, cellValue, $index });
      }
      return cellValue;
    },
    // 格式化头部文本
    formatHeader(col = {}, { row, column, cellValue, $index }) {
      const { label = "" } = col;
      // 如果传入格式化方法（此处重写格式化方法，弃用element自带）
      if (typeof col["headerFormatter"] == "function") {
        return col.headerFormatter(label, { row, column, cellValue, $index });
      }
      return label;
    },
    /**
     * 复写表格自带 methods
     */
    tableMethods(method, ...params) {
      this.$refs.table[method](...params);
    },
    doLayout() {
      this.tableMethods("doLayout");
    },
    clearSelection() {
      this.tableMethods("clearSelection", ...arguments);
    },
    toggleRowSelection() {
      this.tableMethods("toggleRowSelection", ...arguments);
    },
    toggleAllSelection() {
      this.tableMethods("toggleAllSelection", ...arguments);
    },
    toggleRowExpansion() {
      this.tableMethods("toggleRowExpansion", ...arguments);
    },
    setCurrentRow() {
      this.tableMethods("setCurrentRow", ...arguments);
    },
    clearSort() {
      this.tableMethods("clearSort", ...arguments);
    },
    clearFilter() {
      this.tableMethods("clearFilter", ...arguments);
    },
    sort() {
      this.tableMethods("sort", ...arguments);
    }
  },
  render: function (h) {
    // 渲染动态列数据
    const renderColumns = (initColumns = []) => {
      return initColumns.map((col, index) => {
        let { columns = [], render, renderHeader, ...params } = col;
        let { type, label = "", prop = "" } = params;
        const key = prop || label;
        let children = [];
        if (columns.length) {
          children = [...renderColumns(columns)];
        }
        switch (type) {
          // 展开列
          case "expand":
            console.log("expand");
            return h("el-table-column", {
              key: key || "expand",
              attrs: {
                type: "expand",
                ...params
              },
              scopedSlots: {
                default: (scope) => {
                  return this.$scopedSlots.expand
                    ? this.$scopedSlots.expand(scope)
                    : null;
                }
              }
            });

          // 索引列
          case "index":
            return h("el-table-column", {
              ref: key || "index",
              props: { type: "index", ...params }
            });

          // 复选框（正常情况下几乎用不到）
          case "selection":
            return h("el-table-column", {
              ref: key || "index",
              attrs: {
                type: "selection",
                ...params
              }
            });
          // 常规列
          default:
            return h(
              "el-table-column",
              {
                key,
                attrs: {
                  ...params
                },
                scopedSlots: {
                  default: (scope) => {
                    let {
                      row = {},
                      column: { property }
                    } = scope;
                    scope["cellValue"] = row[property];
                    return this.$scopedSlots[prop]
                      ? this.$scopedSlots[prop](scope)
                      : typeof render === "function"
                      ? render(h, scope)
                      : h("span", {
                          class: col.class,
                          style: col.style,
                          domProps: {
                            innerHTML: this.formatText(col, scope)
                          },
                          on: {
                            click: () => {
                              if (typeof col.click === "function") {
                                col.click(scope, col);
                              }
                            }
                          }
                        });
                  },
                  header: (scope) => {
                    // 渲染header插槽
                    let headerSlotKey = `${prop}-header`;
                    return this.$scopedSlots[headerSlotKey]
                      ? this.$scopedSlots[headerSlotKey](scope)
                      : typeof renderHeader === "function"
                      ? renderHeader(h, scope)
                      : h("span", {
                          class: col["header-class"],
                          style: col["header-style"],
                          on: {
                            click: () => {
                              if (typeof col["headerClick"] === "function") {
                                col.headerClick(scope);
                              }
                            }
                          },
                          domProps: {
                            innerHTML: this.formatHeader(col, scope)
                          }
                        });
                  }
                }
              },
              children
            );
        }
      });
    };

    return h(
      "el-table",
      {
        ref: "table",
        class: "v-table",
        attrs: {
          stripe: true,
          border: false,
          data: this.data,
          ...this.$attrs
        },
        on: {
          ...this.$listeners,
          "header-dragend": (newWidth, oldWidth, column, event) => {
            // 设置列最小宽度不低于65
            if (newWidth < 65) {
              column.width = 65;
              newWidth = 65;
            }
            // 抛出事件
            this.$emit("header-dragend", ...arguments);
          }
        }
      },
      [...renderColumns(this.columns)]
    );
  }
};
</script>
<style lang='scss'>
@include b(v-table) {
  &.el-table {
    th {
      background-color: #e4e9f0 !important;
      .cell {
        color: #607d8b !important;
      }
    }
  }
  .el-table-column--selection .cell {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
