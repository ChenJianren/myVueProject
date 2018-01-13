import Vue from "vue"
import VueRouter from "vue-router"
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css'
import './less/index.less';
// 启动vue插件
Vue.use(VueRouter);
Vue.use(ElementUI);

import App from "../src/component/App.vue"

// 导入路由配置
import routerConfig from "./router/index.js"

// 因为它不是Vue插件，所以手动加入到Vue原型上
import axios from "axios"
axios.defaults.baseURL = "http://157.122.54.189:9095";
Vue.prototype.$http = axios;
import api from "./js/api-config.js"
Vue.prototype.$api = api;

new Vue({
  el: "#app",
  render(createElement) {
    return createElement(App);
  },
  router: new VueRouter(routerConfig)
})

