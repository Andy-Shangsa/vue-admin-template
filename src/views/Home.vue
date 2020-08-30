<template>
  <div class="home">
    {{check}}
    {{model}}
    <ele-checkbox
      v-model="check"
      :options="options"
    ></ele-checkbox>

    <ele-radio
      v-model="model"
      :options="options"
    ></ele-radio>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      check: [],
      model: "",
      options: Object.freeze([
        {
          value: "Shanghai",
          label: "上海"
        },
        {
          value: "Chengdu",
          label: "成都"
        }
      ])
    };
  }
};
</script>
<style lang="scss">
.home {
  padding: 20px;
}
</style>
