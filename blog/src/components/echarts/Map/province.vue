<template>
  <div>
    <div @click="goBack()">返回</div>
    <div :id="id" class="o-echarts"></div>
  </div>
</template>

<script lang="js">
export default {
  name: "province",
  data() {
    return {
      id: "echarts_" + new Date().getTime() + Math.floor(Math.random() * 1000),
      echartObj: null,
      radioList: {},
      radioActive: "",
      option: {
        title: {
          text: "",
          top: "8%",
          left: "8%",
          textStyle: {
            fontSize: 18,
            fontWeight: 300,
            color: "#b6d7ff"
          }
        },
        tooltip: {
          padding: 0,
          //   backgroundColor: "transparent",
          // 数据格式化
          formatter: function(params, callback) {
            return params.name + "：" + params.value;
          }
        },
        legend: {
          orient: "vertical",
          top: "9%",
          left: "5%",
          icon: "circle",
          data: [],
          selectedMode: "single",
          selected: {},
          itemWidth: 12,
          itemHeight: 12,
          itemGap: 30,
          inactiveColor: "#b6d7ff",
          textStyle: {
            color: "#ec808d",
            fontSize: 14,
            fontWeight: 300,
            padding: [0, 0, 0, 15]
          }
        },
        visualMap: {
          min: 0,
          max: 500,
          left: "left",
          top: "bottom",
          text: ["高", "低"], // 取值范围的文字
          inRange: {
            color: ["#e0ffff", "blue"] // 取值范围的颜色
          },
          show: true // 图注
        },
        geo: {
          map: "",
          roam: false, // 不开启缩放和平移
          zoom: 0.6, // 视角缩放比例
          label: {
            normal: {
              show: true,
              color: "#000"
            },
            emphasis: {
              show: true,
              color: "#fff"
            }
          },
          itemStyle: {
            normal: {
              borderColor: "rgba(0, 0, 0, 0.2)"
            },
            emphasis: {
              areaColor: "skyblue", // 鼠标选择区域颜色
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          },
          left: "5%",
          right: "5%",
          top: "5%",
          bottom: "5%"
        },
        series: [
          {
            name: "年度总项目数据查询",
            type: "map",
            geoIndex: 0, // 不可缺少，否则无tooltip 指示效果
            data: []
          }
        ],
        provinceJSON: {},
        provinceName: ""
      }
    };
  },
  mounted() {
    const provinceName = this.$route.query.provinceName;
    const province = this.$route.query.province;
    this.provinceName = provinceName;
    this.provinceJSON = require("../../../util/省份数据/json(省份)/" +
      provinceName);
    this.option.geo.map = province;
    this.echartObj = echarts.init(document.getElementById(this.id));
    echarts.registerMap(province, this.provinceJSON);
    this.echartObj.setOption(this.getOptions(), true);
    this.echartObj.on("legendselectchanged", params => {
      this.radioActive = Object.keys(this.radioList).filter(
        item => this.radioList[item] === params.name
      )[0];
      this.echartObj.clear();
      this.echartObj.setOption(this.getOptions());
    });
    window.addEventListener("resize", () => {
      if (this.echartObj && this.echartObj.resize) {
        this.echartObj.resize();
      }
    });
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getOptions() {
      this.setOptions("legend", {
        data: Object.values(this.radioList),
        selected: (list => {
          const obj = {};
          Object.keys(list).map((item, index) => {
            obj[list[item]] = item === this.radioActive;
          });
          return obj;
        })(this.radioList)
      });
      return this.option;
    },
    setOptions(objKey, objVal) {
      if (
        this.option[objKey] &&
        typeof this.option[objKey] === "object" &&
        !Array.isArray(this.option[objKey])
      ) {
        this.option[objKey] = Object.assign(this.option[objKey], objVal);
      } else {
        this.option[objKey] = objVal;
      }
      this.$set(this.option, objKey, this.option[objKey]);
    }
  }
};
</script>
<style lang="less">
.o-echarts {
  // min-width: 30px;
  // min-height: 400px;
  // width: 100%;
  // height: 100%;
  height: 400px;
}
</style>
