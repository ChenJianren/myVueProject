<template>
  <div class="header">
    <div class="left"></div>
    <div class="right">
      <span>你好,{{uname}}</span>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <i class="el-icon-caret-bottom"></i>功能
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>修改密码</el-dropdown-item>
            <!-- 默认情况下, 监听组件的事件都是监听组件自己emit发射的事件 -->
            <!-- 如果要监听浏览器原生事件, 添加一个native修饰符即可 -->
            <el-dropdown-item @click.native="loginOut()">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uname: "admin"
    };
  },
  methods: {
    loginOut() {
      this.$http
        .get(this.$api.logout)
        .then(res => {
          if (res.data.status == 0) {
            this.$router.push("/login");
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped lang="less">
.header {
  height: 50px;
  line-height: 50px;
  .right {
    float: right;
    span {
      font-size: 16px;
      color: #999;
    }
  }
}
</style>