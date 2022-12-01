<style lang="less" scoped>
.title-list-menu {
  background-color: white;
  max-height: calc(100vh - 120px);
  position: fixed;
  right: 1rem;
  top: 7.3rem;
  padding: 1rem;
  width: 20vw;
  overflow-y: scroll;
  border: 1px solid #e9ecef;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 5%);

  .title-item {
    text-align: left;
    line-height: 1.5rem;
    cursor: pointer;
    .page-tools {
      display: flex;
      justify-content: space-around;
      overflow-y: scroll;
      span {
        display: inline-block;
        &:hover {
          color: orange;
        }
      }
    }
    .title-item-tip {
      text-align: center;
      font-size: large;
      font-weight: bold;
    }
    .title-item-text {
      line-height: 2rem;
      font-weight: bolder;
    }
    .title-item-text:hover {
      color: orange;
    }
  }
}
</style>

<template>
  <div class="title-list-menu" v-if="titleList.length > 0">
    <div class="title-item">
      <div class="title-item-tip">目录</div>
      <div
        v-for="(item, index) in titleList"
        :key="index"
        class="title-item-text"
        :title="item.description"
        @click="hTagClick(index)"
      >
        {{ index + 1 + "、" + item.title }}
      </div>
      <div class="page-tools">
        <span v-if="showPrePage" @click="changePage('pre')">上一页</span>
        <span v-if="showNextPage" @click="changePage('next')">下一页</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "titleList",
  props: {
    titleList: {
      type: Array,
      default: () => [],
    },
    float: {
      type: String,
      default: "right",
    },
    titleTagName: {
      type: String,
      default: "title",
    },
    showNextPage: {
      type: Boolean,
      default: false,
    },
    showPrePage: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tagYList: [],
    };
  },
  mounted() {
    setTimeout(() => {
      this.getTagYList();
    }, 1000);
  },
  methods: {
    getTagYList() {
      let dom = document.getElementsByClassName(this.titleTagName);
      for (let i = 0; i < dom.length; i++) {
        this.tagYList.push(dom[i].offsetTop);
      }
    },
    hTagClick(index) {
      window.scrollTo(0, this.tagYList[index] - 100);
    },
    changePage(flag) {
      this.$emit("changePage", flag);
    },
  },
};
</script>
