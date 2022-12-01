<style lang="less" scoped>
.filing-list {
  background-color: white;
  // width: 60vw;
  // margin: auto;
  // margin-top: 1rem;
  // margin-left: 10vw;
  box-shadow: 0 0 10px rgba(0, 0, 0, 3%);
  padding: 2rem 2rem;
  padding-bottom: 3rem;
  font-family: gid;
  border-radius: 10px;
  text-align: left;
  box-sizing: border-box;
  border: 1px solid #e9ecef;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 10%);
  }
  .filing {
    margin-top: 2rem;

    .filing-date {
      font-size: xx-large;
      font-weight: bold;
    }
    .filling-month {
      font-size: x-large;
      font-weight: bold;
      margin-left: 0.5em;
      color: orange;
      // border-bottom: orange 1px solid;
    }
    .filing-item {
      margin-top: 1rem;
      text-indent: 1em;
      font-size: large;
      cursor: pointer;
      &:hover {
        transform: translateX(4px);
        transition: all 0.2s;
      }
      .filing-item-time {
        color: #2c3e50;
      }
      .filing-item-title {
        color: orangered;
        margin-left: 1rem;
        word-break: break-all;
        font-weight: 700;
      }
      .filing-item-line {
        height: 1px;
        background: #ccc;
        width: 100%;
        margin-top: 0.5rem;
      }
    }
  }
}
</style>

<template>
  <div class="filing-list">
    <div class="filing" v-for="(filing, index) in filingList" :key="index + 'filing'">
      <div class="filing-date">
        {{ filing.year }}
      </div>
      <template v-for="(month, monthind) in filing.monthList">
        <template v-if="month.length > 0">
          <div
            class="filling-month"
            :key="monthind + 'month'"
            :id="filing.year + '-' + (monthind + 1)"
          >
            {{ monthind + 1 }}月
          </div>
          <div
            class="filing-item"
            v-for="(item, ind) in month"
            :key="monthind + '-' + ind"
          >
            <span class="filing-item-time">{{ item.time }}</span>
            <span class="filing-item-title" @click="toDetail(item.id)">{{
              item.title
            }}</span>
            <div class="filing-item-line"></div>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script lang="js">
export default {
  name: "filingList",
  props: {
    filingList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    toDetail(id) {
      this.$router.push({ name: "articleDetail", query: { id: id } });
    }
  }
};
</script>
