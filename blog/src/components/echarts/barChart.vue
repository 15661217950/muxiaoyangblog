<template>
  <div>
    <div
      :id="id"
      :style="
        'width:' + width + ';height: ' + height + ';margin: auto;margin-top: 0.8rem;'
      "
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

<script>
// import * as echarts from "echarts";
import { getUId } from "../../util/util";
export default {
  name: "barChart",
  props: {
    height: {
      type: String,
      default: "400px",
    },
    width: {
      type: String,
      default: "800px",
    },
    lineTextNum: {
      type: Number,
      default: 5,
    },
    title: {
      type: String,
      default: "柱状图",
    },
    showNum: {
      type: Number,
      default: 10,
    },
    series: {
      type: Array,
      default: () => {
        return [{ name: "星期", data: [1, 3, 5, 7, 9] }];
      },
    },
    xAxis: {
      type: Array,
      default: () => {
        return ["星期一", "星期二", "星期三", "星期四", "星期五"];
      },
    },
  },
  watch: {
    xAxis(newVal) {
      const step = Math.floor(newVal.length / this.showNum);
      this.step = Math.ceil(100 / step || 1);
      if (this.step > 100) this.canScroll = false;
      else this.canScroll = true;
      this.showXAxis = newVal.slice(0, this.showNum);
    },
    series(newVal) {
      const step = Math.floor(newVal[0].data.length / this.showNum);
      this.step = Math.ceil(100 / step || 1);
      if (this.step > 100) this.canScroll = false;
      else this.canScroll = true;
      this.showSeries = [];
      newVal.map((item) => {
        this.showSeries.push({
          name: item.name,
          data: item.data.slice(0, this.showNum),
        });
      });
    },
    value(newVal) {
      this.value = Math.min(100, newVal);
      const start = (newVal / this.step) * this.showNum;
      this.showXAxis = this.xAxis.slice(start, start + this.showNum);
      this.showSeries = [];
      this.series.map((item) => {
        this.showSeries.push({
          name: item.name,
          data: item.data.slice(start, start + this.showNum),
        });
      });
      this.drawChart();
    },
    showXAxis() {
      this.drawChart();
    },
    showSeries() {
      this.drawChart();
    },
  },
  data() {
    return {
      id: "",
      value: 0,
      step: 10,
      showSeries: [],
      showXAxis: [],
      canScroll: true,
    };
  },
  methods: {
    initData() {
      const step = Math.floor(this.xAxis.length / this.showNum);
      this.step = Math.ceil(100 / step || 1);
      if (this.step > 100) this.canScroll = false;
      else this.canScroll = true;
      this.showXAxis = this.xAxis.slice(0, this.showNum);
      this.showSeries = [];
      this.series.map((item) => {
        this.showSeries.push({
          name: item.name,
          data: item.data.slice(0, this.showNum),
        });
      });
    },
    getId() {
      this.id = "bar-chart-" + getUId();
    },
    sliderChange(value) {},
    sliderInput(value) {},
    drawChart() {
      const dom = document.getElementById(this.id);
      let myEchart = this.$echarts.init(dom);
      let series = [];
      let legend = [];
      this.showSeries.map((item) => {
        series.push({
          name: item.name,
          data: item.data,
          type: "bar",
          label: {
            show: true, // 开启显示
            rotate: 0, // 旋转70度
            position: "top", // 在上方显示
            distance: 5, // 距离图形元素的距离。当 position 为字符描述值（如 'top'、'insideRight'）时候有效。
            verticalAlign: "middle",
            textStyle: {
              // 数值样式
              color: "black",
              fontSize: 12,
            },
          },
        });
        legend.push(item.name);
      });

      let option = {
        title: {
          text: this.title,
        },
        tooltip: {},
        legend: {
          data: legend,
        },
        xAxis: {
          data: this.showXAxis,
          axisLabel: {
            color: "#333",
            //  让x轴文字方向为竖向
            interval: 0,
            formatter: (value) => {
              let res = "";
              for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % this.lineTextNum == 0) res += "\n";
                res += value[i];
              }
              return res;
            },
          },
        },
        yAxis: {},
        series: series,
        grid: {
          //直角坐标系内绘图网格
          show: false, //是否显示直角坐标系网格。[ default: false ]
          left: "10%", //grid 组件离容器左侧的距离。
          right: "30px",
          borderColor: "#c45455", //网格的边框颜色
          bottom: "25%", //
        },
      };
      myEchart.setOption(option);
    },
  },
  created() {
    this.getId();
  },
  mounted() {
    this.initData();
    this.drawChart();
  },
};
</script>

<style lang="less" scoped>
.el-slider {
  width: 80%;
  margin: auto;
}
</style>
