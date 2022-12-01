<style lang="less" scoped>
.chart-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .chart-item {
    min-width: 500px;
  }
}
</style>

<template>
  <div class="chart-box">
    <bar-chart
      class="chart-item"
      title="文章阅读数"
      :series="articleViews"
      :xAxis="articleViewsXAxis"
      :width="'800px'"
      :showNum="8"
      :lineTextNum="6"
    ></bar-chart>
    <bar-chart
      class="chart-item"
      title="分类阅读量"
      :series="typeViews"
      :xAxis="typeViewsXAxis"
      :width="'600px'"
    ></bar-chart>
    <line-chart
      class="chart-item"
      title="日访问量"
      :series="dateVisits"
      :xAxis="dateVisitsXAxis"
      :showNum="10"
    ></line-chart>
    <china
      style="width:500px"
      class="chart-item"
      title="地区访问量"
      :mapData="provinceVisitData"
    ></china>
  </div>
</template>

<script lang="js">
import barChart from "../components/echarts/barChart.vue";
import lineChart from "../components/echarts/lineChart.vue";
import pieChart from "../components/echarts/pieChart.vue";
import china from "../components/echarts/Map/china.vue";
import {
  getArticleView,
  getTypeView,
  getDateVisit,
  getHourVisit,
  getCityVisit,
  getDateCityVisit
} from "../config/api";
export default {
  name: "statistics",
  components: {
    barChart,
    lineChart,
    pieChart,
    china
  },
  data() {
    return {
      articleViews: [],
      articleViewsXAxis: [],
      typeViews: [],
      typeViewsXAxis: [],
      dateVisits: [],
      dateVisitsXAxis: [],
      cityVisit: [],
      provinceVisitData: []
    };
  },
  methods: {
    initData() {
      this.doGetArticleView();
      this.doGetTypeView();
      this.doGetDateVisit();
      this.doGetCityVisit();
    },
    filterProvince() {
      let provinceVisitData = this.cityVisit.filter(item => {
        return item.id.slice(2) == "0000";
      });
      this.provinceVisitData = provinceVisitData;
    },
    async doGetArticleView() {
      let res = await this.httpGet(getArticleView, {});
      if (res.code == 1) {
        const data = res.data;
        if (data.length == 0) return;
        let articleViews = [{ name: "文章", data: [] }];
        let articleViewsXAxis = [];
        data.map(item => {
          articleViews[0].data.push(item.views);
          articleViewsXAxis.push(item.title);
        });
        this.articleViews = [
          {
            name: articleViews[0].name,
            data: articleViews[0].data //.slice(0, 10)
          }
        ];
        this.articleViewsXAxis = articleViewsXAxis; //.slice(0, 10);
      } else {
        alert(res.msg);
      }
    },
    async doGetTypeView() {
      let res = await this.httpGet(getTypeView, {});
      if (res.code == 1) {
        const data = res.data;
        if (data.length == 0) return;
        let typeViews = [{ name: "分类", data: [] }];
        let typeViewsXAxis = [];
        data.map(item => {
          typeViews[0].data.push(item.views);
          typeViewsXAxis.push(item.type_name);
        });
        this.typeViews = [
          {
            name: typeViews[0].name,
            data: typeViews[0].data //.slice(0, 10)
          }
        ];
        this.typeViewsXAxis = typeViewsXAxis; //.slice(0, 10);
      } else {
        alert(res.msg);
      }
    },
    async doGetDateVisit() {
      let res = await this.httpGet(getDateVisit, {});
      if (res.code == 1) {
        const data = res.data;
        if (data.length == 0) return;
        let dateVisits = [{ name: "日期", data: [] }];
        let dateVisitsXAxis = [];
        data.map(item => {
          dateVisits[0].data.push(item.visits);
          dateVisitsXAxis.push(item.date);
        });
        this.dateVisits = [
          {
            name: dateVisits[0].name,
            data: dateVisits[0].data //.slice(0, 10)
          }
        ];
        this.dateVisitsXAxis = dateVisitsXAxis; //.slice(0, 10);
      } else {
        alert(res.msg);
      }
    },
    async doGetCityVisit() {
      let res = await this.httpGet(getCityVisit, {});
      if (res.code == 1) {
        const data = res.data;
        if (data.length == 0) return;
        let cityVisit = [];
        data.map(item => {
          cityVisit.push({
            name: item.cname,
            id: item.cid,
            value: item.visits
          });
        });
        this.cityVisit = cityVisit;
        this.filterProvince();
      } else {
        alert(res.msg);
      }
    }
  },
  created() {
    this.initData();
  },
  mounted() {}
};
</script>
