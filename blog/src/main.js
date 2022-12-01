import Vue from "vue";
import App from "./App";
import router from "./router";
import {VueJsonp} from 'vue-jsonp';
Vue.use(VueJsonp)
//引入组件库
import jvuewheel from "@jyeontu/jvuewheel";
import "@/assets/icon/iconfont.css";

//引入样式
import "@jyeontu/jvuewheel/lib/jvuewhell.css";
Vue.use(jvuewheel);
import "highlight.js/styles/dark.css";
import store from "./store/index";
// 引入Echarts
import echarts from "echarts";
//引入element
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
import less from "less";
Vue.use(less);
import AES from "./util/AES";
Vue.prototype.$aes = AES;

Vue.prototype.$echarts = echarts;

Vue.config.devtools = true;

Vue.config.productionTip = false;

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});

router.beforeEach(async (to, from, next) => {
  next();
});

const vueThis = new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
}).$mount("#app");


