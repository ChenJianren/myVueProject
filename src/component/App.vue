<template>
  <div>
      <h1>{{title}}</h1>
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello World"
    };
  }
};
</script>

<style>
h1 {
  font-size: 30px;
  color: red;
}
</style>