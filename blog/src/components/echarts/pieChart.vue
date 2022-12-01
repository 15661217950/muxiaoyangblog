<style lang="less" scoped></style>
<template>
  <div>
    <div
      :id="id"
      style="width:600px;height: 400px;margin: auto;margin-top: 10px;"
    ></div>
  </div>
</template>

<script lang="js">
// import * as echarts from "echarts";
import { getUId } from "../../util/util";
export default {
  name: "pieChart",
  props: {
    title: {
      type: String,
      default: "饼状图"
    },
    series: {
      type: Array,
      default: () => {
        return [
          { value: 1, name: "星期一" },
          { value: 2, name: "星期二" },
          { value: 3, name: "星期三" }
        ];
      }
    }
  },
  data() {
    return {
      id: ""
    };
  },
  watch: {
    series() {
      this.drawChart();
    }
  },
  methods: {
    getId() {
      this.id = "pie-chart-" + getUId();
    },
    drawChart() {
      const dom = document.getElementById(this.id);
      let myEchart = this.$echarts.init(dom);
      let option = {
        title: {
          text: this.title
        },
        series: [
          {
            type: "pie",
            radius: "55%", //这个属性设置图的大小
            center: ["50%", "60%"], //这个属性设置图的上下左右的位置
            stillShowZeroSum: false,
            label: {
              show: true,
              formatter: "{b} : {c} ({d}%)" //带当前图例名 + 百分比
            },
            data: this.series
          }
        ]
      };
      myEchart.setOption(option);
    }
  },
  created() {
    this.getId();
  },
  mounted() {
    this.drawChart();
  }
};
</script>


