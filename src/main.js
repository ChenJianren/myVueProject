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
// 我们是跨域请求的接口, 默认不会携带cookie等信息, 后端需要这些信息来判断登陆状态, 所以要设为true
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://111.230.36.92:8888";
Vue.prototype.$http = axios;
import api from "./js/api-config.js"
Vue.prototype.$api = api;
var router = new VueRouter(routerConfig);
import beforeEach from "./router/beforeEach.js";
router.beforeEach(beforeEach);
new Vue({
  el: "#app",
  render(createElement) {
    return createElement(App);
  },
  router
});