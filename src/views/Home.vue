<template>
  <div class="home">
    <ele-form
      ref="form"
      v-model="form"
      :gutter="50"
      :form-desc="formDesc"
      @submit="onSubmit"
    >
    </ele-form>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    const generateData = (_) => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0
        });
      }
      return data;
    };
    return {
      form: {
        name: "444",
        sex: "",
        cascader: ["zhinan", "shejiyuanze", "yizhi"]
      },
      formDesc: Object.freeze({
        name: {
          label: "名称"
        },
        cascader: {
          type: "cascader",
          options: () => {
            return [
              {
                value: "zhinan",
                label: "指南",
                children: [
                  {
                    value: "shejiyuanze",
                    label: "设计原则",
                    children: [
                      {
                        value: "yizhi",
                        label: "一致"
                      },
                      {
                        value: "fankui",
                        label: "反馈"
                      },
                      {
                        value: "xiaolv",
                        label: "效率"
                      },
                      {
                        value: "kekong",
                        label: "可控"
                      }
                    ]
                  },
                  {
                    value: "daohang",
                    label: "导航",
                    children: [
                      {
                        value: "cexiangdaohang",
                        label: "侧向导航"
                      },
                      {
                        value: "dingbudaohang",
                        label: "顶部导航"
                      }
                    ]
                  }
                ]
              },
              {
                value: "zujian",
                label: "组件",
                children: [
                  {
                    value: "basic",
                    label: "Basic",
                    children: [
                      {
                        value: "layout",
                        label: "Layout 布局"
                      },
                      {
                        value: "color",
                        label: "Color 色彩"
                      },
                      {
                        value: "typography",
                        label: "Typography 字体"
                      },
                      {
                        value: "icon",
                        label: "Icon 图标"
                      },
                      {
                        value: "button",
                        label: "Button 按钮"
                      }
                    ]
                  },
                  {
                    value: "form",
                    label: "Form",
                    children: [
                      {
                        value: "radio",
                        label: "Radio 单选框"
                      },
                      {
                        value: "checkbox",
                        label: "Checkbox 多选框"
                      },
                      {
                        value: "input",
                        label: "Input 输入框"
                      },
                      {
                        value: "input-number",
                        label: "InputNumber 计数器"
                      },
                      {
                        value: "select",
                        label: "Select 选择器"
                      },
                      {
                        value: "cascader",
                        label: "Cascader 级联选择器"
                      },
                      {
                        value: "switch",
                        label: "Switch 开关"
                      },
                      {
                        value: "slider",
                        label: "Slider 滑块"
                      },
                      {
                        value: "time-picker",
                        label: "TimePicker 时间选择器"
                      },
                      {
                        value: "date-picker",
                        label: "DatePicker 日期选择器"
                      },
                      {
                        value: "datetime-picker",
                        label: "DateTimePicker 日期时间选择器"
                      },
                      {
                        value: "upload",
                        label: "Upload 上传"
                      },
                      {
                        value: "rate",
                        label: "Rate 评分"
                      },
                      {
                        value: "form",
                        label: "Form 表单"
                      }
                    ]
                  },
                  {
                    value: "data",
                    label: "Data",
                    children: [
                      {
                        value: "table",
                        label: "Table 表格"
                      },
                      {
                        value: "tag",
                        label: "Tag 标签"
                      },
                      {
                        value: "progress",
                        label: "Progress 进度条"
                      },
                      {
                        value: "tree",
                        label: "Tree 树形控件"
                      },
                      {
                        value: "pagination",
                        label: "Pagination 分页"
                      },
                      {
                        value: "badge",
                        label: "Badge 标记"
                      }
                    ]
                  },
                  {
                    value: "notice",
                    label: "Notice",
                    children: [
                      {
                        value: "alert",
                        label: "Alert 警告"
                      },
                      {
                        value: "loading",
                        label: "Loading 加载"
                      },
                      {
                        value: "message",
                        label: "Message 消息提示"
                      },
                      {
                        value: "message-box",
                        label: "MessageBox 弹框"
                      },
                      {
                        value: "notification",
                        label: "Notification 通知"
                      }
                    ]
                  },
                  {
                    value: "navigation",
                    label: "Navigation",
                    children: [
                      {
                        value: "menu",
                        label: "NavMenu 导航菜单"
                      },
                      {
                        value: "tabs",
                        label: "Tabs 标签页"
                      },
                      {
                        value: "breadcrumb",
                        label: "Breadcrumb 面包屑"
                      },
                      {
                        value: "dropdown",
                        label: "Dropdown 下拉菜单"
                      },
                      {
                        value: "steps",
                        label: "Steps 步骤条"
                      }
                    ]
                  },
                  {
                    value: "others",
                    label: "Others",
                    children: [
                      {
                        value: "dialog",
                        label: "Dialog 对话框"
                      },
                      {
                        value: "tooltip",
                        label: "Tooltip 文字提示"
                      },
                      {
                        value: "popover",
                        label: "Popover 弹出框"
                      },
                      {
                        value: "card",
                        label: "Card 卡片"
                      },
                      {
                        value: "carousel",
                        label: "Carousel 走马灯"
                      },
                      {
                        value: "collapse",
                        label: "Collapse 折叠面板"
                      }
                    ]
                  }
                ]
              },
              {
                value: "ziyuan",
                label: "资源",
                children: [
                  {
                    value: "axure",
                    label: "Axure Components"
                  },
                  {
                    value: "sketch",
                    label: "Sketch Templates"
                  },
                  {
                    value: "jiaohu",
                    label: "组件交互文档"
                  }
                ]
              }
            ];
          }
        },
        color: {
          type: "color-picker"
        },
        transfer: {
          type: "transfer",
          attrs: {
            data: generateData()
          }
        },
        age: {
          type: "input-number",
          label: "年龄",
          layout: 12
        },
        sex: {
          type: "radio",
          label: "性别",
          layout: 12,
          options: () => {
            return [
              { label: "男", value: "1" },
              { label: "女", value: "2" }
            ];
          }
        },
        favorite: {
          type: "checkbox",
          label: "爱好",
          options: () => {
            return [
              { label: "跑步", value: "1" },
              { label: "游泳", value: "2" }
            ];
          }
        },
        job: {
          type: "select",
          label: "职业",
          attrs: {
            filterable: true,
            remote: true,
            "remote-method": this.remoteMethod
          }
          // options: async () => {
          //   const res = await this.getData();
          //   return res;
          // }
        },
        grade: {
          type: "select",
          label: "等级"
        }
      })
    };
  },
  mounted() {},
  methods: {
    onSubmit() {
      console.log("submit");
      this.$router.replace("/table")
    },
    test() {
      this.$refs.form.setItemOptions("grade", [
        { label: "技术专家", value: "1" },
        { label: "资深工程师", value: "2" },
        { label: "高级工程师", value: "3" }
      ]);
    },
    async remoteMethod(query) {
      const res = await this.getData();
      this.$refs.form.setItemOptions("job", res);
    },
    getData() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([
            { label: "web前端", value: "1" },
            { label: "java", value: "2" },
            { label: "php", value: "3" }
          ]);
        }, 2500);
      });
    }
  }
};
</script>
<style lang="scss">
.home {
  // padding: 20px;
}
</style>
