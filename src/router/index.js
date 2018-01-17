// 导入组件
import Login from "../component/login/Login.vue"
import Home from "../component/home/Home.vue"
import Admin from "../component/admin/Admin.vue"
import GoodsCtList from "../component/admin/goods/goods-content/goodsCtList.vue"
import GoodsCtEdit from "../component/admin/goods/goods-content/goodsCtEdit.vue"
import GoodsCgList from "../component/admin/goods/goods-category/goodsCgList.vue"
import GoodsCgEdit from "../component/admin/goods/goods-category/goodsCgEdit.vue"

let goodsChilden = [
  { name: "goodsCtList", path: "goods/content/goodsCtList", component: GoodsCtList },
  { name: "goodsCtEdit", path: "goods/content/goodsCtEdit/:id", component: GoodsCtEdit },
  { name: "goodsCgList", path: "goods/category/goodsCgList", component: GoodsCgList },
  { name: "goodsCgEdit", path: "goods/category/goodsCgEdit/:id", component: GoodsCgEdit },
];
// 该文件对外导出路由配置
export default {
  routes: [
    { name: "login", path: "/login", component: Login },
    { name: "admin", path: "/admin", component: Admin, children: goodsChilden },
    { name: "home", path: "/home", component: Home },
    { path: "/", redirect: '/login' }
  ]
}