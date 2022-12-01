<template>
  <div class="pagination-item" v-if="total > 0">
    <div class="total" v-if="total > 0">
      总共{{ getPageNum() }}页,{{ total }}条数据
    </div>
    <div class="total" v-else>暂无数据</div>
    <div class="pagination-content" v-if="total > 0">
      <span v-if="showPageSize"
        >每页<input
          v-model="pageSizeT"
          @change="pageSizeChange(pageSizeT)"
          class="input-item"
        />条</span
      >
      <span class="btn btn-pre" @click="jumpPage(currentPageT - 1)">＜</span>
      <span
        v-for="num in endPage - startPage"
        :key="num"
        :style="
          currentPageT === num + startPage
            ? 'color:' + activePageColor + ';'
            : ''
        "
        class="btn btn-num"
        @click="jumpPage(num + startPage)"
        >{{ num + startPage }}</span
      >
      <span class="btn btn-next" @click="jumpPage(currentPageT + 1)">＞</span>
      <span v-if="showJump"
        ><input v-model="currentPageT" type="number" class="input-item" /><span
          class="btn btn-jump"
          @click="jumpPage(currentPageT)"
          >跳转</span
        ></span
      >
    </div>
  </div>
</template>
<script lang="js">
export default {
  name: "pagination",
  props: {
    //总数
    total: {
      type: Number,
      default: 0
    },
    //每页条数
    pageSize: {
      type: Number,
      default: 10
    },
    //数字页码展示个数
    showNum: {
      type: Number,
      default: 3
    },
    //当前页码
    currentPage: {
      type: Number,
      default: 1
    },
    //当前页码颜色
    activePageColor: {
      type: String,
      default: "#2A97FF"
    },
    showPageSize: {
      type: Boolean,
      default: false
    },
    showJump: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      totalT: this.total,
      pageSizeT: this.pageSize,
      currentPageT: "",
      startPage: 0,
      endPage: 0
    };
  },
  watch: {
    currentPage(newVal) {
      this.calPages(newVal);
      this.currentPageT = newVal;
    },
    pageSize() {
      this.calPages(this.currentPage);
    },
    total(newVal) {
      this.totalT = newVal;
      this.calPages(this.currentPage);
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    calPages(newVal) {
      const left = Math.ceil(this.showNum / 2);
      this.startPage =
        left > newVal
          ? 0
          : Math.min(newVal - left, this.getPageNum() - this.showNum);
      this.startPage = Math.max(this.startPage, 0);
      this.endPage = Math.min(this.getPageNum(), this.startPage + this.showNum);
    },
    getPageNum() {
      return Math.ceil(this.total / this.pageSize);
    },
    initData() {
      this.endPage = Math.min(this.getPageNum(), this.startPage + this.showNum);
      if (this.endPage !== 0) this.currentPageT = this.currentPage;
    },
    jumpPage(currentPageT) {
      if (currentPageT <= 0 || currentPageT > this.getPageNum()) return;
      window.scrollTo(0, 0);
      this.currentPageT = parseInt(currentPageT);
      this.$emit("currentPageChange", parseInt(currentPageT));
    },
    pageSizeChange(pageSizeT) {
      this.$emit("pageSizeChange", parseInt(pageSizeT));
    }
  }
};
</script>
<style lang="less" scoped>
.pagination-item {
  font-size: large;
  width: 50vw;
  margin: auto;
  padding: 2rem;
  .total {
    text-align: center;
    padding: 1rem;
  }
  .btn {
    cursor: pointer;
  }
  .pagination-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    input {
      width: 5rem;
      border: rgb(201, 194, 194) 1px solid;
      text-align: center;
      margin-right: 1rem;
      margin-left: 1rem;
    }
  }
}
</style>
