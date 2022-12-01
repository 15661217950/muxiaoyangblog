<style lang="less" scoped>
.statistics-content {
  position: fixed;
  margin-right: 1rem;
  border-radius: 10px;
  border: 1px solid #e9ecef;
  background-color: white;
  box-shadow: 0 0 10px rgb(0 0 0 / 5%);
  .statistics-header {
    text-align: center;
    background-color: orange;
    border-bottom: 1px solid #e9ecef;
    height: 2rem;
    line-height: 2rem;
    color: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    .pre-btn {
      transform: rotate(-90deg);
    }
    .next-btn {
      transform: rotate(90deg);
    }
    .click-btn {
      cursor: pointer;
      display: inline-block;
    }
  }
  .statistics-body {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .month-data {
      width: 20%;
      display: flex;
      flex-direction: column;
      padding: 0.3rem;
      cursor: pointer;
      .month-text {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        border: 1px solid #e9ecef;
      }
      .num-text {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        border: 1px solid #e9ecef;
      }
    }
  }
}
</style>

<template>
  <div v-if="dataList && dataList[currentInd]">
    <div class="statistics-content">
      <div class="statistics-header">
        <span class="pre-btn click-btn" @click="changeCurrentInd('+')">▲</span>
        {{ dataList[currentInd].year }}
        <span class="next-btn click-btn" @click="changeCurrentInd('-')">▲</span>
      </div>
      <div class="statistics-body">
        <div
          class="month-data"
          v-for="(item, index) in dataList[currentInd].monthList"
          :key="index + 'month'"
          @click="monthItemClick(index)"
        >
          <span class="month-text">{{ index + 1 }}月</span>
          <span class="num-text">{{ item.length }}篇</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dateStatistics",
  props: {
    dataList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentInd: 0
    };
  },
  methods: {
    monthItemClick(index) {
      const id = this.dataList[this.currentInd].year + "-" + (index + 1);
      const dom = document.getElementById(id);
      if (dom) {
        scrollTo(0, dom.offsetTop - 60);
      }
    },
    changeCurrentInd(flag) {
      switch (flag) {
        case "+":
          this.currentInd = Math.min(
            this.currentInd + 1,
            this.dataList.length - 1
          );
          break;
        case "-":
          this.currentInd = Math.max(this.currentInd - 1, 0);
          break;
        default:
          break;
      }
    }
  }
};
</script>
