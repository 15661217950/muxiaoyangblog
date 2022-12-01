<style lang="less" scoped>
.filling-view {
  margin-top: 1rem;
  display: flex;
  justify-content: space-around;
  .filing-list {
    width: 60vw;
  }
  .date-statistics {
    width: 20vw;
  }
}
@media screen and (max-width: 980px) {
  .filling-view {
    .filing-list {
      width: 80vw;
    }
    .date-statistics {
      display: none;
    }
  }
}
</style>

<template>
  <div class="filling-view">
    <filing-list class="filing-list" :filingList="filingList"></filing-list>
    <date-statistics
      class="date-statistics"
      :dataList="filingList"
    ></date-statistics>
  </div>
</template>

<script lang="js">
import filingList from "@/components/filing/filingList.vue";
import dateStatistics from "@/components/filing/dateStatistics.vue";
import { getFilingList } from "../config/api";
import { dateFormat } from "../util/dateTool";
export default {
  name: "filing",
  components: {
    filingList,
    dateStatistics
  },
  data() {
    return {
      filingList: []
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.httpGet(getFilingList, {})
        .then(res => {
          if (res.code == 1) {
            const data = res.data;
            if (data.length == 0) return;
            this.comFillingList(data);
          } else {
            alert(res.data.msg);
            if (res.data.code == 5) {
              this.$route.replace("home");
            }
          }
        })
        .catch(err => {
          console.log("--err---", err);
        });
    },
    comFillingList(data) {
      let filingList = [];
      let year = data[0].year;
      let list = [
        {
          time: dateFormat(data[0].create_time, "yyyy-mm-dd hh:MM:ss"),
          id: data[0].id,
          title: data[0].title,
          month: data[0].month
        }
      ];
      for (let i = 1; i < data.length; i++) {
        if (year != data[i].year) {
          filingList.push({
            year: year,
            list: [...list],
            monthList: this.filterMonth(list)
          });
          list = [
            {
              time: dateFormat(data[i].create_time, "yyyy-mm-dd hh:MM:ss"),
              id: data[i].id,
              title: data[i].title,
              month: data[i].month
            }
          ];
          year = data[i].year;
          if (i == data.length - 1)
            filingList.push({
              year: year,
              list: [...list],
              monthList: this.filterMonth(list)
            });
        } else {
          list.push({
            time: dateFormat(data[i].create_time, "yyyy-mm-dd hh:MM:ss"),
            id: data[i].id,
            title: data[i].title,
            month: data[i].month
          });
          if (i == data.length - 1)
            filingList.push({
              year: year,
              list: [...list],
              monthList: this.filterMonth(list)
            });
        }
      }
      this.filingList = filingList;
    },
    filterMonth(list) {
      let res = Array(12);
      for (let i = 0; i < res.length; i++) res[i] = [];
      list.map(item => {
        res[parseInt(item.month) - 1].push({ ...item });
      });
      return res;
    }
  }
};
</script>
