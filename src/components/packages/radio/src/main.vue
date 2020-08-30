<!-- 复选框二封 -->
<script>
export default {
  name: "EleRadio",
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
    }
  },
  computed: {
    computedProps() {
      return {
        value: "value",
        label: "label",
        disabled: "disabled",
        ...this.props
      };
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
        const tag = this.button ? "el-radio-button" : "el-radio";
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
      "el-radio-group",
      {
        class: "ele-radio",
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
<style lang='scss' scoped>
</style>
