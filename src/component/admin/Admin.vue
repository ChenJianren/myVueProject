<template>
  <el-container class="admin">
    <el-aside width="200px"><Aside></Aside></el-aside>
    <el-container>
      <el-header><Header></Header></el-header>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from "./common/Aside.vue";
import Header from "./common/Header.vue";
export default {
  components: {
    Aside,
    Header
  }
};
</script>

<style scoped lang="less">
.el-aside {
  background-color: #d3dce6;
  color: #333;
}

.el-header {
  background-color: #fafafa;
  border-bottom: 1px solid #eee;
}

.el-main {
  background-color: #fff;
  color: #333;
  padding: 10px;
}

.admin {
  height: 100%;
}
</style>