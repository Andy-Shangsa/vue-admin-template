<template>
  <div class="home">
    <ele-form
      ref="form"
      v-model="form"
      :gutter="50"
      :form-desc="formDesc"
    >
    </ele-form>
    <!-- <el-button @click="test">测试</el-button> -->
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      form: {
        name: "444",
        sex: ""
      },
      formDesc: Object.freeze({
        name: {
          label: "名称"
        },
        age: {
          type: "input-number",
          label: "年龄",
          required: true,
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
  padding: 20px;
}
</style>
