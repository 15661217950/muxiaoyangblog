<style lang="less">
.gitee-info-tag {
  display: flex;
  justify-content: center;
}
</style>
<style lang="less" scoped>
.com-inf-content {
  display: flex;
  flex-direction: column;
  .inf-user {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    .inf-head {
      margin: auto;
      height: 5vw;
      width: 5vw;
      padding: 0.3rem;
      margin-bottom: 10px;
      border: 1px solid red;
      border-radius: 50% !important;
      transition: all 1s ease;
      &:hover {
        transform: rotate(360deg);
      }
    }
  }

  .iconfont {
    font-size: 1.2rem;
    cursor: pointer;
    margin-left: 0.3rem;
    margin-top: 0.2rem;
    padding: 1vw;
    border-radius: 0.6rem;
    line-height: 2rem;
    border: 1px solid;
    .label-text {
      font-size: 1rem;
    }
  }
  .icon-csdn {
    color: #fc5531;
  }
  .icon-gitee {
    color: #d70308;
  }
  .icon-juejin {
    color: #2987fe;
  }
  .icon-github-fill {
    color: black;
  }

  .label-list {
    margin-bottom: 0.5rem;
  }
  .inf-text {
    margin-top: 10px;
  }
}
</style>
// 轮播图样式开始
<style lang="less" scoped>
.my-container {
  display: flex;
  flex-direction: column;
  padding-top: 12px;
  margin: 0 auto;
  width: 38vw;
  height: 30vw;
  position: relative;
  overflow: hidden;
  .banner-box-swiper {
    .swiper-container {
      border-radius: 15px;
      overflow: hidden;
      .swiper-slide {
        width: 38vw;
        height: 25vw;
        text-align: center;
        background: #fff;
        transition: 300ms;
        display: flex;
        flex-direction: column;
        border-radius: 15px;
        justify-content: space-between;
        a {
          width: 100%;
          height: 100%;
          display: block;
          box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.21);
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
      }
    }
  }
  .indicators {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1vw 0;
    .item {
      width: 0.5vw;
      height: 5px;
      border-radius: 5px;
      margin-left: 8px;
      background: #d9d9d9;
      &.active {
        background: #ff8008;
      }
    }
  }
}
</style>
* 轮播图样式结束*/
<template>
  <div>
    <div class="com-inf-content">
      <div class="inf-user">
        <img class="inf-head" src="../../assets/img/head.png" />
      </div>
      <div class="label-list">
        <i
          v-for="(label, labelInd) in labelList"
          :key="'label' + labelInd"
          :class="'iconfont ' + label.icon"
          @click="labelClick(label)"
          :title="label.tip"
        >
          <span class="label-text">{{ label.tip }}</span></i
        >
      </div>
      <div class="inf-text">
        <p>前端菜鸟一名 ，即将于毕业自包头职业技术学院，愿望专升本到农业大学</p>
      </div>
      <!-- 轮播图开始 -->
      <div class="my-container">
        <div class="banner-box-swiper">
          <!-- 这里一定要加 (v-if="carouselList.length > 0") 判断 否则 loop 循环就会失效 （使用静态轮播图数据不会出现这种情况）
      原因：动态获取轮播图数据，数据还没拿到，dom已经加载完成，所以loop会失效
       -->
          <swiper v-if="carouselList.length > 0" :options="swiperOption" ref="mySwiper">
            <swiper-slide
              class="swiper-slide"
              v-for="item in carouselList"
              :key="item.id"
            >
              <a :href="item.redirectUrl"><img :src="item.imgUrl" alt="" /></a>
            </swiper-slide>
          </swiper>
        </div>
        <div class="indicators">
          <div
            :class="'item ' + (carouselIndex == index ? 'active' : '')"
            v-for="(_, index) in carouselList.length"
            :key="index"
          ></div>
        </div>
      </div>
      <!-- 轮播图结束 -->
    </div>
  </div>
</template>

<script lang="js">
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
let vm = null
export default {
  name: "inf",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      labelList: [
        {
          icon: "icon-csdn",
          link: "https://blog.csdn.net/weixin_44578520?spm=1008.2028.3001.5343",
          tip: "csdn",
          textList: []
        },
        {
          icon: "icon-gitee",
          link: "https://gitee.com/hi_susu",
          tip: "gitee",
          textList: []
        },
        {
          icon: "icon-juejin",
          link: "https://juejin.cn/user/2309428247278190",
          tip: "掘金",
          textList: []
        },
        {
          icon: "icon-github-fill",
          link: "https://github.com/15661217950?tab=repositories",
          tip: "github",
          textList: []
        }
      ],
      carouselList: [],
      defaultRotationList: [
        { id: 1, imgUrl: require('../../assets/img/1.jpg') },
        { id: 2, imgUrl: require('../../assets/img/2.jpg') },
        { id: 3, imgUrl: require('../../assets/img/3.jpg') },
        { id: 4, imgUrl: require('../../assets/img/4.jpg') },
        { id: 5, imgUrl: require('../../assets/img/5.jpg') },
        { id: 6, imgUrl: require('../../assets/img/6.jpg') },
      ],
      active: 0,
      carouselIndex: 0,
      // 异形轮播图配置
      swiperOption: {
        effect: 'coverflow',
        coverflowEffect: {
          rotate: 0, // slide做3d旋转时Y轴的旋转角度 (默认50).
          stretch: 0, // 每个slide之间的拉伸值 越大slide靠得越紧.
          depth: 3000, // slide的位置深度 值越大z轴距离越远 看起来越小.
          modifier: 0, // depth和rotate和stretch的倍率 相当于(depth*modifier、rotate*modifier、stretch*modifier) 值越大这三个参数的效果越明显(默认1).
          slideShadows: false // 开启slide阴影 (默认 true)
        },
        // 默认选中中间一张
        centeredSlides: true,
        // 无限循环
        loop: true,
        // 自动轮播
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        slideToClickedSlide: true,
        on: {
          slideChange: function () {
            console.log(this.realIndex)
            vm.carouselIndex = this.realIndex
          }
        }
      }
    }
  },
  created() {
    vm = this
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted() {
    this.getCarouselList()
  },
  methods: {
    labelClick(label) {
      window.open(label.link, "_blank");
      console.log(label);
    },
  // 轮播图
  getCarouselList() {
      // 这里调接口拿轮播图数据 我这里展示的是默认的
      this.carouselList = this.defaultRotationList
    }
  }
};
</script>
