<style lang="less" scoped>
.type-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: 73.5vw;
  font-size: 1vw;
  .type-list-item {
    margin-left: 0.2rem;
    margin-top: 0.5rem;
    border: orange 1px solid;
    background-color: rgb(236, 202, 138);
    cursor: pointer;
    color: white;
    padding: 0.3rem 0.8rem;
    border-radius: 10px;
    &:hover {
      background-color: orange;
    }
  }
}

@media screen and (max-width: 1500px) {
  .type-list {
    transition: all 0.5s;
    justify-content: center;
    margin-left: 70vw;
    font-size: small;
  }
}

@media screen and (max-width: 1200px) {
  .type-list {
    justify-content: center;
    margin-left: 72vw;
    font-size: 0.5vw;
  }
}

@media screen and (max-width: 980px) {
  .type-list {
    margin-left: 0px;
    margin-right: 18vw;
    font-size: 1vw;
  }
}
</style>

<template>
  <div>
    <div class="type-list">
      <span
        class="type-list-item"
        v-for="(item, index) in typeList"
        :style="item.name == currentType ? 'background-color: orange;' : ''"
        :key="'type-' + index"
        @click="changeType(item)"
        >{{ item.name }}</span
      >
      <span
        class="type-list-item"
        style="background-color: #ecca8a; border: 1px solid #ecca8a"
        v-if="getJBlogLogin"
        @click="showInput"
      >
        +
      </span>
      <j-dialog
        title="添加新栏目"
        ref="newTypeDialog"
        :closable="true"
        @doAddType="doAddType"
        :btnList="btnList"
      >
        <template v-slot:j-dialog-main-content>
          <div class="login-panel">
            <div class="login-panel-item">
              <span>栏目名：</span>
              <input placeholder="请输入栏目名" v-model="newType" />
            </div>
          </div>
        </template>
      </j-dialog>
    </div>
    <article-list :allArticles="allArticles" @refreshData="initData" ref="columnList">
    </article-list>
  </div>
</template>

<script lang="js">
import { getBlogs, getType, addType } from "@/config/api";
import articleList from "@/components/article/articleList.vue";
import { mapGetters } from "vuex";
export default {
  name: "column",
  components: {
    articleList
  },
  computed: {
    ...mapGetters(["getJBlogLogin"])
  },
  data() {
    return {
      typeList: [],
      currentType: "",
      typeMap: {},
      allTypeArticles: [],
      allArticles: [],
      newType: "",
      btnList: [
        {
          text: "取消",
          style: {
          backgroundColor: "#f5f5f5",
          },
          click: "close"
        },
        {
          text: "确认",
          style: {
            backgroundColor: "#f5f5f5"
          },
          click: "doAddType"
        }
      ]
    };
  },
  methods: {
    showInput() {
      this.$refs["newTypeDialog"].showDialog();
    },
    async doAddType() {
      let res = await this.httpPost(addType, { name: this.newType });
      if (res.code == 1) {
        this.getTypeList();
        this.$refs["newTypeDialog"].closeDialog();
      } else {
        alert(res.msg);
      }
    },
    changeType(item) {
      this.currentPage = 1;
      this.allArticles = this.allTypeArticles.filter(article => {
        return article.type_id == item.id;
      });
      this.currentType = item.name;
      this.$refs["columnList"].currentPageChange(1);
    },
    async getTypeList() {
      const res = await this.httpGet(getType, {});
      if (res.code == 1) {
        this.typeList = res.data;
        this.currentType = res.data[0].name;
        this.typeList.map(item => {
          item.value = item.name;
          this.typeMap[item.id + ""] = item.name;
        });
      } else {
        alert(res.msg);
      }
    },
    async initData() {
      const res = await this.httpGet(getBlogs, {});
      if (res.code == 1) {
        this.allTypeArticles = res.data;
        this.changeType(this.typeList[0]);
      } else {
        alert(res.msg);
      }
    },
    async initPage() {
      const windowWidth = document.querySelector("#app");
      if (this.appendScript || windowWidth.offsetWidth <= 900) {
        this.layout = "total, prev, pager, next";
      }
      await this.getTypeList();
      await this.initData();
    }
  },
  created() {
    this.initPage();
  },
  beforeDestroy() {}
};
</script>
