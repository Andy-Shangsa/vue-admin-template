<template>
  <div class="home">
    <ele-layout :columns="columns">
      <div
        slot="header"
        class="flex flex--justify-between"
      >
        <el-input
          style="width: 240px;"
          placeholder="请输入搜索条件"
        ></el-input>
        <el-button type="primary">查询</el-button>
      </div>
      <div
        slot="aside"
        style="width: 300px"
      ></div>
      <p
        slot="id"
        slot-scope="scope"
      >{{scope.cellValue}}</p>
    </ele-layout>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      columns: Object.freeze([
        {
          prop: "id",
          label: "商品 ID"
        },
        {
          prop: "name",
          label: "商品名称",
          render: (h) => {
            return h("span", { class: "test" }, "123456");
          }
        },
        {
          prop: "desc",
          label: "描述"
        }
      ])
    };
  }
};
</script>
<style lang="scss">
#app,
.home,
.container {
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
}

.el-aside {
  background-color: #d3dce6;
}

.el-main {
  background-color: #e9eef3;
}
</style>
