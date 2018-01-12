<template>
  <div>
    登录页面
  </div>
</template>

<script>
  export default {
    created () {
      this.$http.get(this.$api.islogin).then(res=>{
        console.log(res.data);
      })
    }
  }
</script>

<style scoped>

</style>