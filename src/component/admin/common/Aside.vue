<template>
  <div class="aside">
    <!-- logo -->
    <div class="logo">
      <img src="../../../../image/logo.png" alt="">
    </div>
    <el-menu>
      <el-submenu :index="item.title" v-for="item in menu" :key="item.title">
        <template slot="title">
          <i class="el-icon-loading"></i>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item :index="arr.title" v-for="arr in item.children" :key="arr.title">{{arr.title}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          title: "学员问题汇总",
          children: [{ title: "内容管理" }, { title: "类别管理" }, { title: "评论管理" }]
        },
        {
          title: "前端常用功能",
          children: [{ title: "内容管理" }, { title: "类别管理" }, { title: "评论管理" }]
        },
        {
          title: "重难点专区",
          children: [{ title: "内容管理" }, { title: "类别管理" }, { title: "评论管理" }]
        },
        {
          title: "资源下载",
          children: [{ title: "内容管理" }, { title: "类别管理" }, { title: "评论管理" }]
        },
        {
          title: "购物商场",
          children: [{ title: "内容管理" }, { title: "类别管理" }, { title: "评论管理" }]
        },
        {
          title: "订单管理",
          children: [{ title: "内容管理" }, { title: "类别管理" }, { title: "评论管理" }]
        }
      ]
    };
  }
};
</script>

<style scoped lang="less">
.aside {
  .logo {
    img {
      width: 100%;
      display: block;
    }
  }
}
</style>