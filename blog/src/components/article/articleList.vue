<style lang="less" scoped>
.article-list {
  .pagination-class {
    width: 60vw;
    margin-left: 10vw;
    padding: 1rem;
  }
  .article {
    background-color: #fff;
    width: 60vw;
    margin-left: 5vw;
    margin-top: 1rem;
    padding: 2rem 2rem;
    padding-bottom: 3rem;
    font-family: god;
    border-radius: 10px;
    position: relative;
    cursor: pointer;
    border: 1px solid #e9ecef;
    box-sizing: border-box;
    box-shadow: 0 0 10px rgba(0, 0, 0, 3%);
    &:hover {
      box-shadow: 0 0 10px rgba(0, 0, 0, 10%);
    }
    .is-top {
      position: absolute;
      top: 0;
      left: 0;
      width: 6rem;
    }

    .header {
      .article-title {
        font-size: x-large;
        font-weight: bold;
        cursor: pointer;
        list-style: none;
        display: inline-block;
        position: relative;
        height: 1.5rem;
        &::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          opacity: 0;
          transform: scaleX(0);
          transition: 0.2s ease-in-out;
        }
        &:hover {
          color: orange;
        }
        &.active:after,
        &:hover:after {
          opacity: 1;
          transform: scaleX(1);
        }
      }
      .info {
        margin-top: 0.5rem;
        font-size: large;
        .tag-list {
          display: flex;
          justify-content: space-around;
        }
        .oprate-btn {
          width: 20px;
          height: 30px;
          padding: 10px;
          cursor: pointer;
          font-size: large;
          &:hover {
            border-radius: 10px;
            background-color: orange;
            color: #fff;
          }
        }
        .edit-btn {
          color: rgb(0, 183, 255);
          &:hover {
            background-color: rgb(0, 183, 255);
            color: #fff;
          }
        }
        .top-btn {
          color: orange;
        }
        .delete-btn {
          color: red;
          background-color: 30px;
          &:hover {
            background-color: red;
            color: #fff;
          }
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
      text-indent: 2em;
      line-height: 1.5rem;
      // width: 200px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
    .read {
      color: #000;
      font-weight: 700;
      float: right;
      cursor: pointer;
      padding-top: 10px;
      font-size: large;
      &:hover {
        color: orange;
      }
    }
  }
}
@media screen and (max-width: 980px) {
  .arcticle-title-list {
    display: none;
  }
  .article-list {
    display: flex;
    flex-direction: column;
    .article {
      width: 70vw;
    }
    .pagination-class {
      width: 70vw;
      padding: 1rem;
      margin: 0;
    }
  }
}
</style>

<template>
  <div class="article-list">
    <div class="article" v-for="(article, index) in articles" :key="index">
      <div class="header">
        <img class="is-top" v-if="article.is_top == 1" src="../../assets/img/isTop.png" />
        <div class="article-title" @click="toDetail(article.id)">
          {{ article.title }}
        </div>
        <div class="info">
          <span
            ><i class="iconfont icon-shijian" title="发布时间"></i
            >{{ article.create_time }}</span
          >
          <span
            ><i class="iconfont icon-zishutongji" title="字数"></i>约{{
              article.length
            }}字</span
          >
        </div>
        <div class="info">
          <span
            ><i class="iconfont icon-yuedu" title="阅读量"></i>{{ article.views }}</span
          >
          <span>
            <i class="iconfont icon-pinglun" title="评论">{{ article.commentNums }}</i>
          </span>
        </div>
        <div class="info">
          <span>{{
            article.type_name != null ? "《" + article.type_name + "》" : ""
          }}</span>
        </div>
        <div class="info">
          <j-tag-list
            class="tag-list"
            :tagList="getTags(article.tags)"
            :tagColor="['orange', 'pink', 'skyblue']"
            :canRepeat="false"
            :isShow="true"
            :canDelete="false"
          >
          </j-tag-list>
        </div>
        <div class="info" v-if="getJBlogLogin">
          <span class="oprate-btn top-btn" @click="topBlog(article.id, article.is_top)">
            {{ article.is_top == 1 ? "取消置顶" : "置顶" }}
          </span>
          <span class="oprate-btn edit-btn" @click="editBlog(article.id)"> 编辑 </span>
          <span class="oprate-btn delete-btn" @click="deleteBlog(article.id)">
            删除
          </span>
        </div>
      </div>
      <div class="line"></div>
      <div class="content">{{ article.description }}</div>
      <div class="read" @click="toDetail(article.id)">阅读全文</div>
    </div>
    <titleList
      :titleList="getTitleList()"
      titleTagName="article"
      class="arcticle-title-list"
      @changePage="changePage"
      :showNextPage="showNextPage"
      :showPrePage="showPrePage"
    >
    </titleList>
    <el-pagination
      v-if="total > 0"
      class="pagination-class"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      hide-on-single-page
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      :pager-count="5"
      :layout="layout"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { toTopBlog, deleteBlog, visitBlog } from "../../config/api";
import titleList from "../menu/titleList.vue";
import { mapGetters } from "vuex";
import { dateFormat } from "@/util/dateTool";
import { entitiestoUtf16 } from "@/util/util.js";
export default {
  name: "articleList",
  components: {
    titleList,
  },
  computed: {
    ...mapGetters(["getJBlogLogin"]),
    showPrePage() {
      return this.currentPage > 1;
    },
    showNextPage() {
      return Math.ceil(this.total / this.pageSize) > this.currentPage;
    },
  },
  props: {
    allArticles: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  watch: {
    allArticles() {
      this.initData();
    },
  },
  data() {
    return {
      total: 0,
      showNum: 5,
      pageSize: 10,
      currentPage: 1,
      articles: [],
      layout: "total, prev, pager, next, jumper",
    };
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(currentPage) {
      // console.log(`当前页: ${val}`);
      this.currentPage = currentPage;
      const start = (currentPage - 1) * this.pageSize;
      localStorage.setItem("JPage", currentPage);
      this.articles = this.allArticles.slice(start, start + this.pageSize);
    },
    getTags(tags) {
      if (tags == undefined) return [];
      return tags.split(",");
    },
    getTitleList() {
      let articles = this.articles;
      let res = [];
      if (!articles) return [];
      articles.map((item) => {
        res.push({ title: item.title, description: item.description });
      });
      return res;
    },
    currentPageChange(currentPage) {
      this.currentPage = currentPage;
      const start = (currentPage - 1) * this.pageSize;
      localStorage.setItem("JPage", currentPage);
      this.articles = this.allArticles.slice(start, start + this.pageSize);
    },
    changePage(flag) {
      let currentPage = this.currentPage;
      if (flag == "pre") currentPage = Math.max(currentPage - 1, 1);
      else {
        currentPage = Math.min(currentPage + 1, Math.ceil(this.total / this.pageSize));
      }
      this.currentPageChange(currentPage);
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
    },
    toDetail(id) {
      this.httpPost(visitBlog, { id: id });
      this.$router.push({ name: "articleDetail", query: { id: id } });
    },
    editBlog(id) {
      this.$router.push({ name: "articleEdit", query: { id: id } });
    },
    topBlog(id, isTop) {
      if (confirm(isTop == 1 ? "确定取消置顶？" : "置顶该博客？")) {
        this.httpPost(toTopBlog, { id: id, isTop: isTop ^ 1 })
          .then((res) => {
            if (res.code == 1) {
              this.refreshData();
            } else {
              alert(res.msg);
            }
          })
          .catch((err) => {
            console.log("--err---", err);
          });
      }
    },
    deleteBlog(id) {
      if (confirm("您确定要删除吗？")) {
        this.httpPost(deleteBlog, { id: id })
          .then((res) => {
            if (res.code == 1) {
              this.refreshData();
            } else {
              alert(res.msg);
            }
          })
          .catch((err) => {
            console.log("--err---", err);
          });
      }
    },
    refreshData() {
      this.$emit("refreshData");
    },
    initData() {
      let JPage = localStorage.getItem("JPage");
      JPage != undefined ? (this.currentPage = parseInt(JPage)) : "";
      const allArticles = [...this.allArticles];
      allArticles.map((item) => {
        item.create_time = dateFormat(item.create_time, "yyyy-mm-dd hh:MM:ss");
        item.title = entitiestoUtf16(item.title);
        item.description = entitiestoUtf16(item.description);
      });
      this.total = allArticles.length;
      let currentPage = this.currentPage;
      const start = (currentPage - 1) * this.pageSize;
      this.articles = allArticles.slice(start, start + this.pageSize);
    },
    initPage() {
      const windowWidth = document.getElementById("app");
      if (this.appendScript || windowWidth.offsetWidth <= 900) {
        this.layout = "total, prev, pager, next";
      }
      this.initData();
    },
  },
  created() {
    this.initPage();
  },
  beforeDestroy() {},
};
</script>
