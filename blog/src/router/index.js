import Vue from "vue";
import Router from "vue-router";
// import home from "@/view/home";
// import filing from "@/view/filing";
// import about from "@/view/about";
// import articleDetail from "@/view/articleDetail";
// import articleEdit from "@/view/articleEdit";
// import articleWrite from "@/view/articleWrite";
// import column from "@/view/column";
// import statistics from "@/view/statistics";

Vue.use(Router);

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
const originalReplace = Router.prototype.replace;
Router.prototype.replace = function push(location) {
  return originalReplace.call(this, location).catch(err => err);
};

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      component: resolve => require(["@/view/home"], resolve)
    },
    {
      path: "/filing",
      name: "filing",
      component: resolve => require(["@/view/filing"], resolve)
    },
    {
      path: "/about",
      name: "about",
      component: resolve => require(["@/view/about"], resolve)
    },
    {
      path: "/column",
      name: "column",
      component: resolve => require(["@/view/column"], resolve)
    },
    {
      path: "/articleDetail",
      name: "articleDetail",
      component: resolve => require(["@/view/articleDetail"], resolve)
    },
    {
      path: "/articleEdit",
      name: "articleEdit",
      component: resolve => require(["@/view/articleEdit"], resolve)
    },
    {
      path: "/articleWrite",
      name: "articleWrite",
      component: resolve => require(["@/view/articleWrite"], resolve)
    },
    {
      path: "/statistics",
      name: "statistics",
      component: resolve => require(["@/view/statistics"], resolve)
    },
    {
      path: "/audit",
      name: "audit",
      component: resolve => require(["@/view/audit"], resolve)
    }
  ]
});
