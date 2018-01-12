import Vue from "Vue"
import App from "../src/component/App.vue"

new Vue({
  el: "#app",
  render(createElement) {
    return createElement(App);
  }
})

