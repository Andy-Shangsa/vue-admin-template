<!-- 下拉框 -->
<script>
export default {
  name: "EleSelect",
  props: {
    // 绑定值
    value: [String, Number, Array],
    // 下拉框数据
    options: {
      type: Array,
      default: () => []
    },
    // 映射关系
    props: {
      type: Object,
      default: () => ({})
    },
    width: {
      type: String,
      default: "100%"
    }
  },
  inject: {
    elFormItem: {
      default: ""
    }
  },
  computed: {
    computedProps() {
      return Object.freeze({
        value: "value",
        label: "label",
        disabled: "disabled",
        group: "group",
        ...this.props
      });
    },
    mixinPlaceholder() {
      const _elFormItemLabel = this.elFormItem["label"] || "";
      return `请选择${_elFormItemLabel}`;
    }
  },
  methods: {
    // 映射值
    setKey(item = {}, key) {
      const property = this.computedProps[key];
      return item[property];
    },
    // 渲染options数据
    renderOptions(h, options) {
      return options.map((item) => {
        const group = this.setKey(item, "group") || [];
        // 如果是分组
        if (group.length) {
          return h(
            "el-option-group",
            {
              key: this.setKey(item, "value"),
              attrs: {
                label: this.setKey(item, "label"),
                disabled: this.setKey(item, "disabled")
              }
            },
            this.renderOptions(h, group)
          );
        }
        // 渲染options
        return h(
          "el-option",
          {
            key: this.setKey(item, "value"),
            attrs: {
              label: this.setKey(item, "label"),
              value: this.setKey(item, "value"),
              disabled: !!this.setKey(item, "disabled")
            }
          },
          [this.$scopedSlots.default ? this.$scopedSlots.default(item) : null]
        );
      });
    }
  },
  render(h) {
    return h(
      "el-select",
      {
        class: "ele-select",
        style: {
          width: this.width
        },
        attrs: {
          clearable: true,
          placeholder: this.mixinPlaceholder,
          ...this.$attrs,
          value: this.value
        },
        on: {
          ...this.$listeners,
          input: (e) => {
            this.$emit("input", e);
          }
        }
      },
      [
        ...this.renderOptions(h, this.options),
        this.$slots.prefix
          ? h("template", { slot: "prefix" }, [this.$slots.prefix])
          : null,
        h("div", { slot: "empty", class: "ele-select__empty" }, [
          this.$slots.empty ? this.$slots.empty : "暂无数据"
        ])
      ]
    );
  }
};
</script>
<style lang="scss">
@include b(ele-select) {
  @include e(empty) {
    margin: 6px 0;
    font-size: 14px;
    padding: 0 20px;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #c0c4cc;
    height: 34px;
    line-height: 34px;
    cursor: not-allowed;
  }
}
</style>
