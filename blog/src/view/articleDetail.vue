<style>
pre {
  padding-left: 1rem !important;
  overflow: auto;
  background: #303030;
  color: whitesmoke;
  max-height: 70vh;
}
blockquote {
  background-color: antiquewhite !important;
  width: 100% !important;
  margin-left: 0 !important;
  padding: 0.5em 1em;
}
.hljs {
  color: #ddd;
  background: #303030;
  display: block;
  overflow-x: auto;
}
#app > div.article-detail.router-view > div.content > p > img {
  display: block;
  margin: auto;
  width: 50% !important;
  border-radius: 10px;
}
</style>
<style lang="less" scoped>
/deep/.j-comment .j-comment-item .j-comment-footer .j-comment-icon {
  margin: 0 !important;
}
/deep/.j-comment .j-comment-content-btns #comment-emoji {
  margin: 0 !important;
}
/deep/.j-comment {
  width: 90% !important;
  .j-comment-content {
    border-radius: 6px;
    border-color: #ccc;
  }
}
.user-inf-set {
  border: 1px solid #ccc;
  padding: 1em;
  border-radius: 10px;
  .user-inf-items {
    .user-inf-item {
      span {
        vertical-align: middle;
      }
    }
  }
  .user-inf-title {
    font-size: large;
    font-weight: bold;
  }
  .user-inf-items {
    .user-inf-item {
      margin-top: 3px;
    }
  }
  .user-header-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-size: cover !important;
    display: inline-block;
    line-height: 40px;
    cursor: pointer;
  }
}
.article-detail {
  width: 60vw;
  margin-left: 5vw;
  margin-top: 1rem;
  padding: 2rem 2rem;
  padding-bottom: 3rem;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen-Sans,
    Ubuntu, Cantarell, Helvetica Neue, sans-serif;
  overflow-wrap: break-word;
  background-color: #fff;
  border: 1px solid #e9ecef;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 3%);
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 10%);
  }
  .header {
    .title {
      font-size: x-large;
      font-weight: bold;
      list-style: none;
      display: inline-block;
      position: relative;
      height: 1.5rem;
    }
    .info {
      margin-top: 0.5rem;
      font-size: large;
      span {
        margin-left: 0.5rem;
      }
    }
  }
  .line {
    width: 80%;
    height: 2px;
    background-color: rgb(229, 226, 226);
    margin-left: 10%;
    margin-top: 1rem;
  }

  .content {
    margin-top: 1rem;
    font-size: large;
    text-align: left;
    // text-indent: 2em;
    line-height: 1.5rem;
    padding: 0rem 4.5rem;
  }
  .comment-title {
    text-align: left;
    font-weight: bolder;
    font-size: x-large;
  }
  .read {
    color: orange;
    float: right;
    cursor: pointer;
    font-size: large;
    &:hover {
      text-decoration: none;
    }
  }
}
@media screen and (max-width: 980px) {
  .md-catalogue {
    display: none;
  }
  .article-detail {
    width: calc(100vw - 3em);
    padding: 1em;
    margin-left: 0.5em;
    .content {
      padding: 0;
    }
  }
}
</style>

<template>
  <div class="article-detail">
    <div class="header">
      <div class="title">{{ article.title }}</div>
      <div class="info">
        <span>{{ article.create_time }}</span>
        <span>{{ article.type }}</span>
        <span>约{{ article.length }}字</span>
      </div>
    </div>
    <div class="line"></div>
    <div class="content" v-html="article.html_content"></div>
    <div id="user-inf-title" class="user-inf-set">
      <div class="user-inf-title">我的信息</div>
      <div class="user-inf-items">
        <div class="user-inf-item">
          <span>头 像：</span>
          <span
            class="user-header-img"
            :src="userImg"
            @click="showImglist"
            :style="getHeadStyle()"
            >{{ userImg ? "" : "+" }}</span
          >
        </div>
        <div class="user-inf-item">
          <span>昵 称：</span>
          <input placeholder="请输入用户名" v-model="userName" />
        </div>
        <div class="user-inf-item">
          <span>邮 箱：</span>
          <input placeholder="请输入邮箱" v-model="userMail" />
        </div>
      </div>
    </div>
    <div class="comment-title">评论</div>

    <j-comment
      v-if="JSON.stringify(article) !== '{}'"
      :key-map="keyMap"
      :showNumber="2"
      :comment-datas="comments"
      @submitComment="submitComment"
    >
    </j-comment>
    <imgList
      ref="imgList"
      @confirm="chooseHeadImg"
      :defaultImg="userImg"
    ></imgList>

    <!-- 目录 -->
    <md-catalogue
      class="md-catalogue"
      :content="article.html_content"
      :title="article.title"
      comment="comment-title"
    >
    </md-catalogue>
  </div>
</template>

<script lang="js">
import { getBlogDetail, getComment, addComment } from "@/config/api";
import mdCatalogue from "@/components/md/mdCatalogue.vue";
import imgList from "@/components/common/imgList.vue";
import { dateFormat } from "@/util/dateTool";
import { mapGetters } from "vuex";

export default {
  name: "articleDetail",
  components: {
    mdCatalogue,
    imgList
  },
  computed: {
    ...mapGetters(["getJBlogLogin"])
  },
  data() {
    return {
      article: {},
      comments: [],
      keyMap: {
        pid: "parent_comment_id",
        id: "id",
        isAdmin: "admin_comment"
      },
      userImg: "",
      userName: "",
      userMail: ""
    };
  },
  watch: {
    $route() {
      this.initData();
    },
    userName(newVal) {
      localStorage.setItem("JNickName", newVal);
    },
    userImg(newVal) {
      localStorage.setItem("avatar", newVal);
    },
    userMail(newVal) {
      localStorage.setItem("JUserMail", newVal);
    }
  },
  created() {
    this.initData();
  },
  methods: {
    chooseHeadImg(item) {
      this.userImg = item;
    },
    showImglist() {
      this.$refs["imgList"].show();
    },
    getHeadStyle() {
      if (!this.userImg) return "border:1px solid black;";
      return `background:url("${this.userImg}");`;
    },
    initData() {
      let id = this.$route.query.id;
      this.getBlog(id);
      this.doGetComment(id);
      this.userName = localStorage.getItem("JNickName") || "";
      this.userImg = localStorage.getItem("avatar") || "";
      this.userMail = localStorage.getItem("JUserMail") || "";
    },
    async submitComment(item) {
      const nickName = this.userName.trim();
      const avatar = this.userImg.trim();
      const userMail = this.userMail.trim();
      if (!nickName || !avatar) {
        let userInfoSet = document.getElementById("user-inf-title");
        this.$JToast("请设置用户信息");
        window.scrollTo(0, userInfoSet.offsetTop - 80);
        return;
      }
      if (item.content === "") {
        this.$JToast("请输入内容");
        return;
      }
      let params = {
        avatar: avatar,
        nickname: nickName,
        content: item.content,
        blog_id: this.$route.query.id,
        admin_comment: this.getJBlogLogin ? 1 : 0,
        is_show: this.getJBlogLogin ? 1 : 0,
        realIp: returnCitySN["cip"]
      };
      item.pid ? (params.parent_comment_id = item.pid) : "";
      userMail ? (params.email = userMail) : "";
      const res = await this.httpPost(addComment, params);
      if (res.code != 1) {
        alert(res.msg);
        return;
      }
      const tip = this.getJBlogLogin
        ? "评论已发布"
        : "评论已发布,请等待博主审核";
      this.$JToast(tip);
      this.doGetComment(this.$route.query.id);
    },
    async doGetComment(id) {
      let res = await this.httpGet(getComment, { id: id });
      if (res.code != 1) {
        alert(res.msg);
        return;
      }
      this.comments = res.data;
      this.comments.map(item => {
        item.create_time = dateFormat(item.create_time, "yyyy-mm-dd hh:MM:ss");
      });
    },
    async getBlog(id) {
      let res = await this.httpGet(getBlogDetail, { id: id });
      if (res.code != 1) {
        alert(res.msg);
        return;
      }
      this.article = res.data[0];
      this.article.create_time = dateFormat(
        res.data[0].create_time,
        "yyyy-mm-dd hh:MM:ss"
      );
    }
  }
};
</script>
<js>
