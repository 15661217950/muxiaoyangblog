<template>
  <div>
    <div
      :id="id"
      style="width:600px;height: 400px;margin: auto;margin-top: 10px;"
    ></div>
    <el-slider
      class="el-slider"
      v-model="value"
      :step="step"
      v-if="canScroll"
      show-stops
      @change="sliderChange"
      @input="sliderInput"
    ></el-slider>
  </div>
</template>

<script lang="js">
// import * as echarts from "echarts";
import { getUId } from "../../util/util";
export default {
  name: "lineChart",
  props: {
    title: {
      type: String,
      default: "折线图"
    },
    showNum: {
      type: Number,
      default: 10
    },
    lineTextNum: {
      type: Number,
      default: 5
    },
    series: {
      type: Array,
      default: () => {
        return [{ name: "星期", data: [1, 5, 3, 9, 2] }];
      }
    },
    xAxis: {
      type: Array,
      default: () => {
        return ["星期一", "星期二", "星期三", "星期四", "星期五"];
      }
    }
  },
  watch: {
    xAxis(newVal) {
      const step = Math.floor(newVal.length / this.showNum);
      this.step = Math.ceil(100 / step);
      if (this.step > 100) this.canScroll = false;
      else this.canScroll = true;
      this.showXAxis = newVal.slice(0, this.showNum);
    },
    series(newVal) {
      const step = Math.floor(newVal[0].data.length / this.showNum);
      this.step = Math.ceil(100 / step);
      if (this.step > 100) this.canScroll = false;
      else this.canScroll = true;
      this.showSeries = [];
      newVal.map(item => {
        this.showSeries.push({
          name: item.name,
          data: item.data.slice(0, this.showNum)
        });
      });
    },
    value(newVal) {
      this.value = Math.min(100, newVal);
      const start = (newVal / this.step) * this.showNum;
      this.showXAxis = this.xAxis.slice(start, start + this.showNum);
      this.showSeries = [];
      this.series.map(item => {
        this.showSeries.push({
          name: item.name,
          data: item.data.slice(start, start + this.showNum)
        });
      });
      this.drawChart();
    },
    showXAxis() {
      this.drawChart();
    },
    showSeries() {
      this.drawChart();
    }
  },
  data() {
    return {
      id: "",
      value: 0,
      step: 10,
      showSeries: [],
      showXAxis: [],
      canScroll: true
    };
  },
  methods: {
    initData() {
      const step = Math.floor(this.xAxis.length / this.showNum);
      this.step = Math.ceil(100 / step);
      if (this.step > 100) this.canScroll = false;
      else this.canScroll = true;
      this.showXAxis = this.xAxis.slice(0, this.showNum);
      this.showSeries = [];
      this.series.map(item => {
        this.showSeries.push({
          name: item.name,
          data: item.data.slice(0, this.showNum)
        });
      });
    },
    sliderChange(value) {},
    sliderInput(value) {},
    getId() {
      this.id = "line-chart-" + getUId();
    },
    drawChart() {
      const dom = document.getElementById(this.id);
      let myEchart = this.$echarts.init(dom);
      let series = [];
      let legend = [];
      this.showSeries.map(item => {
        series.push({
          name: item.name,
          data: item.data,
          type: "line",
          label: {
            show: true,
            position: "top",
            textStyle: {
              fontSize: 10
            }
          }
        });
        legend.push(item.name);
      });
      let option = {
        title: {
          text: this.title
        },
        xAxis: {
          type: "category",
          data: this.showXAxis
        },
        yAxis: {
          type: "value"
        },
        series: series
      };
      myEchart.setOption(option);
    }
  },
  created() {
    this.getId();
  },
  mounted() {
    this.initData();
    this.drawChart();
  }
};
</script>

<style lang="less" scoped>
.el-slider {
  width: 80%;
  margin: auto;
}
</style>
