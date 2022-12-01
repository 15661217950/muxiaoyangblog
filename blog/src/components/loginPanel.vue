<template>
  <div>
    <j-dialog
      :title="title"
      ref="JDialog"
      :closable="true"
      @loginConfirm="loginConfirm"
      :btnList="btnList"
    >
      <template v-slot:j-dialog-main-content>
        <div class="login-panel">
          <div class="login-panel-item">
            <span>账号：</span>
            <input placeholder="请输入账号" v-model="account" />
          </div>
          <div class="login-panel-item">
            <span>密码：</span>
            <input type="password" placeholder="请输入密码" v-model="password" />
          </div>
        </div>
      </template>
    </j-dialog>
  </div>
</template>

<script>
import { config } from "../config/config";
import { removeLogin } from "../assets/js/init";
import { hex_md5 } from "../util/md5";
import { login } from "../config/api";
import { mapMutations } from "vuex";
export default {
  name: "loginPanel",
  data() {
    return {
      account: "",
      password: "",
      title: "登录",
      btnList: [
        {
          text: "取消",
          click: "close",
        },
        {
          text: "确认",
          click: "loginConfirm",
        },
      ],
    };
  },
  async mounted() {
    this.keyBroadListener();
    this.loginCheck();
    this.checkLogin();
  },
  methods: {
    ...mapMutations(["setJBlogLogin"]),
    async checkLogin() {
      if (config.adminRoute.includes(this.$route.name)) {
        const flag = await this.loginCheck();
        if (!flag) {
          alert("请先登录");
          this.$router.replace("home");
        }
      }
      this.$router.beforeEach(async (to, from, next) => {
        if (config.adminRoute.includes(to.name)) {
          const flag = await this.loginCheck();
          if (flag) {
            next();
          } else {
            alert("请先登录");
            this.$router.replace(from.name);
          }
        } else {
          next();
        }
      });
    },
    async loginCheck() {
      let JBlogLogin = localStorage.getItem("JBlogLogin");
      let JUsername = localStorage.getItem("JUsername");
      let JPassword = localStorage.getItem("JPassword");
      if (JBlogLogin) {
        let res = await this.httpGet(login, {
          username: JUsername,
          password: JPassword,
        });
        if (res.code == 1 && res.data == "登录成功") {
          this.setJBlogLogin(true);
          return true;
        } else {
          removeLogin();
          this.setJBlogLogin(false);
          return false;
        }
      }
      this.setJBlogLogin(false);
      return false;
    },
    async loginConfirm() {
      const res = await this.httpGet(login, {
        username: this.account,
        password: hex_md5(this.password),
      });
      if (res.code == 1 && res.data == "登录成功") {
        this.$refs["JDialog"].closeDialog();
        alert("登录成功");
        localStorage.setItem("JBlogLogin", true);
        localStorage.setItem("JUsername", this.account);
        localStorage.setItem("JPassword", hex_md5(this.password));
        this.setJBlogLogin(false);
        this.$router.go(0);
      } else {
        alert(res.data);
      }
    },
    keyBroadListener() {
      document.onkeydown = (e) => {
        if (77 == e.keyCode && e.ctrlKey) {
          if (!this.$refs["JDialog"].JDialogIsShow) this.$refs["JDialog"].showDialog();
          else this.$refs.JDialog.closeDialog();
        }
      };
    },
  },
};
</script>

<style lang="less" scoped></style>
