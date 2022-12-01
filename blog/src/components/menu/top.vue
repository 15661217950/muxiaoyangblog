<style lang="less" scoped>
/deep/ .el-dialog__header {
  text-align: left;
}
.all-comments {
  text-align: left;
  padding-left: 1em;
  .comment-avatar {
    width: 2.6667vw;
    height: 2.6667vw;
    background-size: cover;
    border-radius: 50%;
  }
  .to-blog {
    color: skyblue;
    text-decoration: none;
    cursor: pointer;
  }
}

.blog-menu-top {
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #ccc;
  box-shadow: rgba(18, 38, 63, 5%) 0px 0.5rem 1rem;
  background: #fff;
  box-sizing: border-box;
  .blog-menu-top-name {
    display: flex;
    font-size: 1.125rem;
    margin-left: 1rem;
    font-weight: bold;
    font-family: god;
    cursor: pointer;
    .iconfont {
      position: relative;
      .need-read {
        color: red;
        font-size: xx-small;
        display: inline-block;
        padding: 0.1333vw;
        position: relative;
      }
    }

    .inf-head {
      margin: 0.6667vw auto;
      border-radius: 50%;
      height: 2.5rem;
      width: 2.5rem;
      line-height: 2.5rem;
      vertical-align: middle;
    }
  }
  .menu {
    font-size: 1.125rem;
    font-family: god;
    font-weight: bold;
    // float: right;
    margin-right: 2rem;
    box-sizing: border-box;
    span {
      margin-left: 1rem;
      cursor: pointer;
    }
  }
  .active {
    text-decoration: none;
    color: orange;
  }
}
@media screen and (max-width: 980px) {
  .blog-menu-top {
    .blog-menu-top-name {
      font-size: 1.125rem;
      .inf-head {
        margin: 0.6667vw auto;
        border-radius: 50%;
        height: 2.1rem;
        width: 2.1rem;
        line-height: 1.5rem;
        vertical-align: middle;
      }
    }
    .menu {
      font-size: 1.125rem;
      transition: all 0.5ms ease-in-out;
    }
  }
}
@media screen and (max-width: 720px) {
  .blog-menu-top {
    .blog-menu-top-name {
      font-size: 1.8667vw;
    }
    .menu {
      font-size: 1.8667vw;
      transition: all 0.5ms;
    }
  }
}
@media screen and (max-width: 320px) {
  .blog-menu-top {
    transition: all 0.5ms;
    .blog-menu-top-name {
      font-size: 0.5vw;
    }
    .menu {
      font-size: 0.5vw;
    }
  }
}
</style>

<template>
  <div class="blog-menu-top">
    <span class="blog-menu-top-name" @click="goRouter('home')">
      <span>
        <img class="inf-head" src="../../assets/img/head.png" />
        沐小阳
      </span>
      <i
        v-if="getJBlogLogin"
        class="iconfont icon-xiaoxi"
        :title="'未读消息：' + comments.length"
        @click.stop="dialogVisible = true"
      >
        <span class="need-read">{{ comments.length }}</span>
      </i>
    </span>
    <div class="menu">
      <span
        v-for="(menu, index) in menuList"
        :key="index"
        :class="getMenuClass(menu.route)"
        @click="goRouter(menu.route)"
      >
        {{ menu.label }}
      </span>
    </div>
    <el-dialog title="未读消息" :visible.sync="dialogVisible" width="60%" :modal="false">
      <div class="all-comments">
        <div v-for="(item, index) in comments" :key="'comment-' + index">
          <img :src="item.avatar" class="comment-avatar" />
          <span>用户{{ item.nickname }}</span>
          <!-- <span>于{{ item.create_time }}</span> -->
          <span>在博客</span>
          <span>《{{ item.blog_name }}》</span>
          <span>中评论“{{ item.content }}”</span>
          <span class="to-blog" @click="toDetail(item.id, item.blog_id, index)"
            >去看看</span
          >
          <el-divider>{{ item.create_time }}</el-divider>
        </div>
        <div v-if="comments.length == 0">暂无消息</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" style="color: black !important"
          >取 消</el-button
        >
        <el-button type="primary" @click="doReadAllComment">标记已读</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { getNeedReadComment, readComment, readAllComment } from "../../config/api";
import { dateFormat } from "../../util/dateTool";
export default {
  name: "topMenu",
  data() {
    return {
      dialogVisible: false,
      comments: [],
      menuList: [
        { label: "首页", route: "home" },
        { label: "栏目", route: "column" },
        { label: "归档", route: "filing" },
        { label: "关于", route: "about" },
      ],
    };
  },
  computed: {
    ...mapGetters(["getJBlogLogin"]),
  },
  watch: {
    getJBlogLogin(newVal) {
      this.menuList = [
        { label: "首页", route: "home" },
        { label: "栏目", route: "column" },
        { label: "归档", route: "filing" },
        { label: "关于", route: "about" },
      ];

      if (newVal) {
        this.menuList.unshift({ label: "写博客", route: "articleWrite" });
        this.menuList.push({ label: "审核", route: "audit" });
        this.menuList.push({ label: "统计", route: "statistics" });
        this.menuList.push({ label: "退出登录", route: "loginOut" });
        this.doGetNeedReadComment();
      }
    },
  },
  mounted() {
    if (this.getJBlogLogin) {
      this.menuList.unshift({ label: "写博客", route: "articleWrite" });
      this.menuList.push({ label: "审核", route: "audit" });
      this.menuList.push({ label: "统计", route: "statistics" });
      this.menuList.push({ label: "退出登录", route: "loginOut" });
      this.doGetNeedReadComment();
    }
  },
  methods: {
    ...mapMutations(["setJBlogLogin"]),
    toDetail(id, blog_id, index) {
      this.$router.push({ name: "articleDetail", query: { id: blog_id } });
      this.httpPost(readComment, { id }).then((res) => {
        if (res.code == 1) {
          this.comments.splice(index, 1);
        }
      });
      this.dialogVisible = false;
    },
    async doReadAllComment() {
      const res = await this.httpPost(readAllComment, {});
      if (res.code == 1) this.comments = [];
    },
    async doGetNeedReadComment() {
      const res = await this.httpGet(getNeedReadComment, {});
      if (res.code == 1) {
        this.comments = res.data;
        this.comments.map((item) => {
          item.create_time = dateFormat(item.create_time, "yyyy-mm-dd hh:MM:ss");
        });
      }
    },
    getMenuClass(route) {
      if (route == this.$route.name) return "active";
      return "";
    },
    goRouter(route) {
      if (this.$route.name == "articleWrite") {
        if (confirm("放弃编辑内容？")) {
          this.$router.push({ name: route });
        }
        return;
      }
      if (!["home", "articleWrite"].includes(route)) {
        localStorage.setItem("JPage", 1);
      }
      if (route == "loginOut") {
        if (confirm("退出登录？")) {
          localStorage.removeItem("JBlogLogin");
          localStorage.removeItem("JUsername");
          localStorage.removeItem("JPassword");
          this.setJBlogLogin(false);
          this.$router.go(0);
        }
        return;
      }
      this.$router.push({ name: route });
    },
  },
};
</script>
