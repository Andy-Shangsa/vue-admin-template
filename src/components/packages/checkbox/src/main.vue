<!-- 复选框二封 -->
<script>
export default {
  name: "EleCheckbox",
  props: {
    value: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    },
    // 映射关系
    props: {
      type: Object,
      default: () => ({})
    },
    // 是否按钮类型
    button: Boolean
  },
  computed: {
    computedProps() {
      return Object.freeze({
        value: "value",
        label: "label",
        disabled: "disabled",
        ...this.props
      });
    }
  },
  methods: {
    // 渲染checkbox数据
    renderOptions(h) {
      return this.options.map((item) => {
        const labelKey = this.computedProps["label"];
        const valueKey = this.computedProps["value"];
        const disabledKey = this.computedProps["disabled"];
        let {
          [labelKey]: label,
          [valueKey]: value,
          [disabledKey]: disabled,
          ...attrs
        } = item;
        const tag = this.button ? "el-checkbox-button" : "el-checkbox";
        return h(
          tag,
          {
            attrs: {
              ...attrs,
              label: value,
              disabled: !!disabled
            }
          },
          label
        );
      });
    }
  },
  render(h) {
    return h(
      "el-checkbox-group",
      {
        class: "ele-checkbox",
        attrs: {
          value: this.value,
          ...this.$attrs
        },
        on: {
          ...this.$listeners,
          input: (e) => {
            this.$emit("input", e);
          }
        }
      },
      [...this.renderOptions(h)]
    );
  }
};
</script>
<style lang='scss'>
@include b(ele-checkbox) {
  /* 修正样式偏移 */
  .el-checkbox.is-bordered {
    &.el-checkbox--medium {
      padding: 8px 20px 8px 10px;
    }
    &.el-checkbox--small {
      padding: 7px 15px 7px 10px;
    }
  }
}
</style>
