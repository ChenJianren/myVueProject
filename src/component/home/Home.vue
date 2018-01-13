<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="(item,index) in list" :key="index">
      <img :src="item.img" alt="">
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export default {
  data() {
    return {
      list: [
        { img: "src/image/1.jpg" },
        { img: "src/image/2.jpg" },
        { img: "src/image/3.jpg" }
      ]
    };
  }
};
</script>

<style>
.el-carousel__item img {
  width: 100%;
  display: block;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>