<style lang="less" scoped>
.preview-content {
  .preview-title {
    font-size: large;
    font-weight: bold;
  }
  .preview-img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }
}
.select-content {
  height: 30vh;
  overflow-y: scroll;
  position: relative;
  .select-img {
    position: absolute;
    width: 100px;
    vertical-align: top;
    padding: 3px;
  }
}
</style>

<template>
  <j-dialog
    :title="title"
    :closable="false"
    ref="imgListDialog"
    @close="close"
    @confirm="confirm"
    :btnList="btnList"
  >
    <template v-slot:j-dialog-main-content>
      <div class="preview-content">
        <div class="preview-title">预览</div>
        <img :src="selected" class="preview-img" />
        <div><input placeholder="输入图片地址" v-model="selected" /></div>
      </div>
      <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
      <div id="select-content" class="select-content">
        <!-- <img
          class="select-img"
          v-for="(item, index) in imgList"
          :key="'img' + index"
          :src="item"
          @click="selectImg(item)"
        /> -->
        <j-waterfall
          :imgList="imgList"
          :column="5"
          :imgMargin="0.2"
          @imgClick="selectImg"
        ></j-waterfall>
      </div>
    </template>
  </j-dialog>
</template>

<script lang="js">
export default {
  name: "imgList",
  props: {
    title: {
      type: String,
      default: "选择头像"
    },
    defaultImg: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selected: "",
      imgList: [
        "https://img2.baidu.com/it/u=134769530,4268043097&fm=253&fmt=auto&app=138&f=JPEG?w=533&h=333",
        "https://img1.baidu.com/it/u=2580690117,2413329602&fm=253&fmt=auto&app=138&f=JPEG?w=642&h=500",
        "https://img2.baidu.com/it/u=3133697304,2308274678&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313",
        "https://img1.baidu.com/it/u=2539150145,3709425073&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=711",
        "https://img2.baidu.com/it/u=3772577665,2044310843&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=727",
        "https://img0.baidu.com/it/u=3966731730,957573008&fm=253&fmt=auto&app=138&f=JPEG?w=281&h=500",
        "https://img2.baidu.com/it/u=3440095388,1687551735&fm=253&fmt=auto&app=120&f=JPEG?w=1363&h=614",
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201701%2F17%2F20170117163054_C3ydM.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651752631&t=65ba649ba066495acb0bbd112920eabb",
        "https://img1.baidu.com/it/u=2912396327,2474337263&fm=253&fmt=auto&app=138&f=JPEG?w=347&h=500",
        "https://img1.baidu.com/it/u=1568155621,1811293689&fm=253&fmt=auto&app=138&f=JPEG?w=700&h=495",
        "https://img2.baidu.com/it/u=461269782,2772059667&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313",
        "https://img1.baidu.com/it/u=2599508183,3079977410&fm=253&fmt=auto&app=138&f=JPEG?w=416&h=499",
        "https://img1.baidu.com/it/u=857618379,3899031461&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
        "https://img1.baidu.com/it/u=1702938387,792201763&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=447",
        "https://img1.baidu.com/it/u=1539021674,3840242491&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=246",
        "https://img0.baidu.com/it/u=3159006221,3574011460&fm=253&fmt=auto&app=120&f=JPEG?w=1067&h=800",
        "https://img2.baidu.com/it/u=451082639,696249795&fm=253&fmt=auto&app=138&f=JPEG?w=720&h=405",
        "https://img2.baidu.com/it/u=1444438974,3214886495&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        "https://img0.baidu.com/it/u=754308036,2423815123&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
        "https://img0.baidu.com/it/u=1811280816,2994744388&fm=253&fmt=auto&app=138&f=JPG?w=659&h=452",
        "https://img1.baidu.com/it/u=3819643902,1000613763&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        "https://img1.baidu.com/it/u=1303707706,2356690886&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        "https://img0.baidu.com/it/u=573627639,3491865163&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        "https://img1.baidu.com/it/u=2552181951,114177955&fm=253&fmt=auto&app=138&f=PNG?w=502&h=500",
        "https://img0.baidu.com/it/u=1688278494,1421949150&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        "https://img2.baidu.com/it/u=3149693868,1058312070&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        "https://img2.baidu.com/it/u=2003437735,1374592373&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        "https://img0.baidu.com/it/u=4068300737,290575386&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        "https://img2.baidu.com/it/u=1328092326,573376744&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        "https://img0.baidu.com/it/u=1280320387,1585665801&fm=253&fmt=auto&app=138&f=JPEG?w=368&h=368",
        "https://img0.baidu.com/it/u=1403512971,1919400898&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        "https://img0.baidu.com/it/u=707869343,3146161581&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        "https://img1.baidu.com/it/u=1473510751,3362722835&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        "https://img0.baidu.com/it/u=751714707,705901550&fm=253&fmt=auto&app=138&f=JPEG?w=559&h=500",
        "https://img2.baidu.com/it/u=3288691327,4041002989&fm=253&fmt=auto&app=138&f=JPEG?w=304&h=303",
        "https://img1.baidu.com/it/u=2172054385,2684839842&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        "https://img1.baidu.com/it/u=1879107733,3573789717&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        "https://img2.baidu.com/it/u=1720323410,218932174&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        "https://img1.baidu.com/it/u=2479779032,1379361694&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        "https://img1.baidu.com/it/u=537208727,895387248&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        "https://img1.baidu.com/it/u=3310720258,943543712&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        "https://img2.baidu.com/it/u=2165957654,3023194084&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        "https://img0.baidu.com/it/u=1446729335,4267600834&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        "https://img2.baidu.com/it/u=2922694860,2270800253&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        "https://img0.baidu.com/it/u=595403291,2269048245&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        "https://img0.baidu.com/it/u=1164365158,2722332607&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        "https://img2.baidu.com/it/u=9876582,1040648435&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
      ],
      btnList: [
        {
          text: "取消",
          style: {
            backgroundColor: "write"
          },
          click: "close"
        },
        {
          text: "确认",
          style: {
            backgroundColor: "write"
          },
          click: "confirm"
        }
      ]
    };
  },
  created() {},
  mounted() {
    window.onresize = () => {
      return (() => {
        this.waterfallHandler();
      })();
    };
  },
  activated() {},
  methods: {
    confirm() {
      if (!this.selected) {
        this.$JToast("请选择头像");
        return;
      }
      this.$emit("confirm", this.selected);
      this.$refs["imgListDialog"].closeDialog();
    },
    show() {
      this.selected = this.defaultImg;
      this.$refs["imgListDialog"].showDialog();
      this.$nextTick(() => {
        setTimeout(() => {
          this.waterfallHandler();
        }, 500);
      });
      var mo = function(e) {
        e.preventDefault();
      };
      document.body.style.overflow = "hidden";
      document.addEventListener("touchmove", mo, false); //禁止页面滑动
    },
    close() {
      var mo = function(e) {
        e.preventDefault();
      };
      document.body.style.overflow = ""; //出现滚动条
      document.removeEventListener("touchmove", mo, false);
    },
    selectImg(item) {
      this.selected = item;
    },
    waterfallHandler(times = 0) {
      let imgWidth = 106;
      let contentW = document.querySelector("#select-content");
      if (!contentW && time < 5) this.waterfallHandler(times + 1);
      // 获取图片的列数
      let column = parseInt(contentW / imgWidth);
      // 高度数组
      let heightArr = [];
      for (let i = 0; i < column; i++) {
        heightArr[i] = 0;
      }
      const imgList = document.querySelectorAll(".select-img");
      for (let i = 0; i < imgList.length; i++) {
        const item = imgList[i];
        // console.log("item: ", item);
        // 当前元素的高度
        let itemHeight = item.offsetHeight;
        // 高度数组最小的高度
        let minHeight = Math.min(...heightArr);
        // 高度数组最小的高度的索引
        let minIndex = heightArr.indexOf(minHeight);
        item.style.top = minHeight + "px";
        item.style.left = minIndex * imgWidth + "px";
        heightArr[minIndex] += itemHeight;
      }
    }
  }
};
</script>
