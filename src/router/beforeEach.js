import axios from "axios";
import api from "../js/api-config.js";

export default function (to, from, next) {
  var toName = to.name;
  console.log(toName);
  axios.get(api.islogin).then(res => {
    console.log(res);
    let isLogin = false;
    // 判断用户是否已登录
    if (res.data.code == "logined") {
      isLogin = true;
    }
    // 用户如果已经登录了，直接调到admin页面
    if (toName == "login" && isLogin) {
      next({ name: 'admin' });
    }
    // 如果用户没有登录，则跳转到登录页面
    else if (toName != "login" && !isLogin) {
      next({ name: 'login', query: { nextPath: to.fullPath } });
    } else {
      next();
    }
  });
  next();
}