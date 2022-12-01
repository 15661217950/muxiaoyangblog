<template>
  <div id="app">
    <!-- 全局音乐 -->
    <meting-js
      server="netease"
      type="playlist"
      id="7718381543"
      list-max-height="500px"
      fixed="true"
      autoplay="false"
      loop="all"
      preload="auto"
      order="list"
      theme="#fc5531"
      list-folded="ture"
      mini="true"
    >
    </meting-js>
    <!-- 全局音乐 -->
    <login-panel></login-panel>
    <top class="top-menu"></top>
    <router-view class="router-view" />
  </div>
</template>
<script>
import top from "@/components/menu/top.vue";
import { getToday } from "./util/dateTool";
import loginPanel from "@/components/loginPanel.vue";
import { visit } from "./config/api";
import { myHttp } from "./config/http";
import { setBgImg } from "./assets/js/init";
import Vue from "vue";
export default {
  name: "App",
  components: {
    top,
    loginPanel,
    // HeadNav
  },
  data() {
    return {};
  },
  mounted() {
    this.initData();
  },
  created() {
    this.initPage();
  },
  beforeDestroy() {
    localStorage.removeItem("JPage");
  },
  methods: {
    initPage() {
      this.initHttp();
      this.getIp();
      setBgImg();
    },
    initHttp() {
      let http = new myHttp(this);
      Vue.prototype.myHttp = http;
      Vue.prototype.httpGet = http.httpGet;
      Vue.prototype.httpPost = http.httpPost;
    },
    getIp() {
      let postData = {
        cid: returnCitySN["cid"],
        cname: returnCitySN["cname"],
        ip: returnCitySN["cip"],
        time: getToday("yyyy-mm-dd hh:MM:ss"),
      };
      const lastDateTime = parseInt(localStorage.getItem("jLastDateTime"));
      if (lastDateTime != undefined) {
        const nowDateTime = new Date().getTime();
        if ((nowDateTime - lastDateTime) / 1000 < 600) return;
      }
      localStorage.setItem("jLastDateTime", new Date().getTime());
      this.httpPost(visit, postData);
    },
    initData() {
      localStorage.setItem("JPage", 1);
    },
  },
};
</script>

<style lang="less">
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow-x: hidden;
}
#app {
  font-family: god;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // min-height: 100vh;
  padding-top: 60px;
  z-index: 1;
  width: 100vw;
  background: #f8f9fa;
}
.top-menu {
  display: flex;
  position: fixed;
  justify-content: space-between;
  top: 0;
  width: 100%;
  height: 60px;
  z-index: 1;
}
.router-view {
  z-index: 1;
  min-height: calc(100vh - 60px);
}
.login-panel {
  line-height: 2rem;
  padding: 1rem;
  .login-panel-item {
    margin-top: 1rem;
    input {
      outline: none;
      height: 2rem;
    }
  }
}
</style>
