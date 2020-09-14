<!-- 动态表单 -->
<script>
import { tagMap } from "./config";
export default {
  name: "EleForm",
  props: {
    // 绑定值
    value: {
      type: Object,
      default: () => ({})
    },
    // 表单验证规则
    rules: {
      type: Object,
      default: () => ({})
    },
    // 表单描述
    formDesc: {
      type: Object,
      default: () => ({})
    },
    // 间距
    gutter: {
      type: Number,
      default: 20
    },
    // 每次formDesc改变时强制更新异步数据
    forceUpdate: Boolean,
    // 是否显示操作区域
    showOperate: {
      type: Boolean,
      default: true
    },
    // 是否显示重置操作
    showReset: {
      type: Boolean,
      default: true
    },
    resetText: {
      type: String,
      default: "重置"
    },
    submitTetx: {
      type: String,
      default: "提交"
    },
    // 自定义操作按钮
    buttons: {
      type: Array,
      default: () => []
    },
    // 按钮对齐方式
    buttonsJustify: {
      type: String,
      default: "center",
      validator: (val) => {
        return ["start", "center", "end"].includes(val);
      }
    },
    // 自定义组件标签映射
    tagMap: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      loading: false,
      computedFormDesc: [],
      recordMap: new Map()
    };
  },
  computed: {
    // 组件映射
    computedTagMap() {
      return { ...tagMap, ...this.tagMap };
    }
  },
  watch: {
    formDesc: {
      handler: "_getFormatFormDesc",
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 批量更新options数据
    async setOptions(propArray = [], fetchArray = []) {
      try {
        this.loading = true;
        const res = await Promise.all(fetchArray);
        res.map((item, index) => {
          const key = propArray[index];
          for (
            let ind = 0, len = this.computedFormDesc.length;
            ind < len;
            ind++
          ) {
            const element = this.computedFormDesc[ind];
            if (element.prop === key) {
              element["options"] = [...item];
              this.computedFormDesc.splice(ind, 1, element);
              if (!this.forceUpdate) {
                this.recordMap.set(key, [...item]);
              }
              break;
            }
          }
        });
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    // 单独设置某一项的options
    setItemOptions(prop, options = []) {
      for (let ind = 0, len = this.computedFormDesc.length; ind < len; ind++) {
        const element = this.computedFormDesc[ind];
        if (element.prop === prop) {
          element["options"] = [...options];
          this.computedFormDesc.splice(ind, 1, element);
          if (!this.forceUpdate) {
            this.recordMap.set(prop, [...options]);
          }
          break;
        }
      }
    },
    // 校验表单合法性
    validate(cb) {
      this.$refs.form.validate((valid) => {
        cb(valid, this.value);
      });
    },
    // 对部分表单字段进行校验
    validateField() {
      this.$refs.form.validateField(...arguments);
    },
    // 对整个表单进行重置
    resetFields() {
      this.$refs.form.resetFields();
    },
    // 移除表单项的校验结果
    clearValidate() {
      this.$refs.form.clearValidate(...arguments);
    },
    // 处理表单描述数据
    async _getFormatFormDesc(formDesc) {
      let _formDesc = [];
      let pendingMap = [];
      for (let [k, v] of Object.entries(formDesc)) {
        let { options = [] } = v;
        // 判断是否需要更新异步数据
        const forceUpdate =
          this.recordMap.size === 0 ||
          (this.recordMap.size > 0 && !this.recordMap.has(k));
        if (typeof options === "function") {
          if (forceUpdate) {
            pendingMap.push({
              key: k,
              fetch: v.options()
            });
          } else {
            options = this.recordMap.get(k);
          }
        }
        _formDesc.push({
          prop: k,
          ...v,
          options: []
        });
      }
      this.computedFormDesc = [..._formDesc];
      const pendingProp = pendingMap.map((item) => item.key);
      const pending = pendingMap.map((item) => item.fetch);
      this.setOptions(pendingProp, pending);
    },
    // 获取组件标签名称
    _getTagName(type) {
      const map = this.computedTagMap[type] || {};
      return map["tag"] || "el-input";
    },
    // 获取触发验证时机
    _getTrigger(type) {
      const map = this.computedTagMap[type] || {};
      return map["trigger"] || "blur";
    },
    // 获取占位符文字
    _getPleceholder(attrs = {}, type, label) {
      let { placeholder = "" } = attrs;
      if (placeholder) {
        return placeholder;
      }
      if (["input", "textarea", "input-number"].includes(type)) {
        return `请输入${label}`;
      }
      return `请选择${label}`;
    },
    // 重置
    _handleReset() {
      this.resetFields();
      this.$emit("reset");
    },
    // 提交
    _handleSubmit() {
      this.validate((valid, data) => {
        if (valid) {
          this.$emit("submit", data);
        }
      });
    },
    // 渲染表单项
    _renderItem(h) {
      return this.computedFormDesc.map((item) => {
        let {
          on = {},
          attrs = {},
          prop,
          alias,
          label = "",
          required,
          trigger,
          layout = 24,
          type = "input",
          vif,
          options = [],
          rules = [],
          render,
          ...params
        } = item;
        // 组件索引
        const proprety = alias || prop;
        const itemValue = this.value[proprety];
        // 组件名称
        const tagName = this._getTagName(type);
        // 占位符
        const placeholder = this._getPleceholder(attrs, type, label);
        // 校验规则
        const globalRules = this.rules[proprety] || [];
        rules = required
          ? [
              {
                required: true,
                message: placeholder,
                trigger: trigger || this._getTrigger(type)
              },
              ...rules,
              ...globalRules
            ]
          : [...rules, ...globalRules];
        // 是否隐藏
        const display = typeof vif === "function" ? vif(this.value) : true;
        const component = this.$scopedSlots[prop]
          ? this.$scopedSlots[prop]({ data: this.value, item, itemValue })
          : typeof render === "function"
          ? render(h, { data: this.value, item, itemValue })
          : h(tagName, {
              ref: prop,
              attrs: {
                clearable: true,
                ...attrs,
                value: itemValue,
                placeholder,
                options,
                type,
                // 下拉框远程模糊匹配时
                "remote-method": async (query) => {
                  const remoteMethod = attrs["remote-method"];
                  if (typeof remoteMethod === "function") {
                    const res = await remoteMethod(query);
                    this.setItemOptions(prop, res);
                  }
                }
              },
              on: {
                ...on,
                input: (e) => {
                  this.$emit("input", {
                    ...this.value,
                    [proprety]: e
                  });
                }
              }
            });
        return display
          ? h(
              "el-col",
              {
                key: prop,
                attrs: {
                  span: layout * 1
                }
              },
              [
                h(
                  "el-form-item",
                  {
                    attrs: {
                      label,
                      prop: proprety,
                      rules
                    }
                  },
                  [component]
                )
              ]
            )
          : null;
      });
    },
    // 渲染操作区域
    _renderButtons(h) {
      let buttons = [
        this.showReset
          ? h(
              "el-button",
              {
                class: "ele-form__button is-reset",
                on: {
                  click: this._handleReset
                }
              },
              this.resetText
            )
          : null,
        h(
          "el-button",
          {
            class: "ele-form__button is-submit",
            attrs: { type: "primary" },
            on: {
              click: this._handleSubmit
            }
          },
          this.submitTetx
        )
      ];
      if (this.buttons.length) {
        // 渲染自定义按钮
        buttons = this.buttons.map((item) => {
          let {
            text,
            type = "primary",
            plain,
            click,
            role = "",
            style = {}
          } = item;
          return h(
            "el-button",
            {
              ref: text,
              style: {
                ...style
              },
              attrs: { type: type, plain: !!plain },
              on: {
                click: (e) => {
                  switch (role) {
                    case "submit":
                      this._handleSubmit();
                      break;

                    case "reset":
                      this._handleReset();
                      break;

                    default:
                      if (typeof click === "function") {
                        click();
                      }
                      break;
                  }
                }
              }
            },
            text
          );
        });
      }
      return buttons;
    }
  },
  render(h) {
    return h(
      "div",
      {
        class: "ele-form",
        directives: [{ name: "loading", value: this.loading }]
      },
      [
        h(
          "el-form",
          {
            ref: "form",
            attrs: {
              "label-position": "top",
              ...this.$attrs,
              model: this.value
            },
            on: {
              ...this.$listeners
            }
          },
          [
            h(
              "el-row",
              {
                attrs: {
                  gutter: this.gutter
                }
              },
              [
                ...this._renderItem(h),
                this.showOperate
                  ? h(
                      "el-col",
                      {
                        class: `ele-form__operate flex flex--justify-${this.buttonsJustify}`,
                        attrs: {
                          span: 24
                        }
                      },
                      [...this._renderButtons(h)]
                    )
                  : null
              ]
            )
          ]
        )
      ]
    );
  }
};
</script>
<style lang='scss'>
@include b(ele-form) {
  .el-form {
    overflow-x: hidden;
  }
  .el-rate {
    display: inline-block;
  }
  .el-date-editor,
  .el-input-number {
    width: 100%;
  }
  .el-input-number.is-controls-right .el-input__inner {
    text-align: left;
  }
}
</style>
