<style lang="less" scoped></style>

<template>
  <div>
    <article-list
      :allArticles="allArticles"
      @refreshData="initData"
    ></article-list>
  </div>
</template>

<script lang="js">
import articleList from "@/components/article/articleList.vue";
import { getBlogs } from "@/config/api";
export default {
  name: "homePage",
  components: {
    articleList
  },
  data() {
    return {
      allArticles: []
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      const res = await this.httpGet(getBlogs, {});
      res.code == 1 ? (this.allArticles = res.data) : alert(res.msg);
    }
  },
  beforeDestroy() {}
};
</script>
