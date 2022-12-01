<template>
  <div class="el-dialog">
    <div class="mask" v-if="JDialogIsShow" @click="maskClick()"></div>
    <div class="el-dialog-content" v-if="JDialogIsShow">
      <div class="el-dialog-header">
        <div class="el-dialog-header-title">
          <span class="title">{{ title }}</span>
          <span class="el-dialog-header-icon" @click="closeDialog()" title="关闭">x</span>
        </div>
      </div>
      <div class="el-dialog-main">
        <slot name="el-dialog-main-content"></slot>
      </div>
      <div class="el-dialog-footer">
        <div class="el-dialog-footer-btn">
          <div
            v-for="(item, index) in btnList"
            :key="index"
            class="btn"
            :style="getStyle(item.style)"
            @click="doClick(item.click)"
            :title="item.text"
          >
            {{ item.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import { camelTo_ } from "../../util/strTool";
export default {
  name: "JDialog",
  props: {
    title: {
      type: String,
      default: "我是标题"
    },
    closable: {
      type: Boolean,
      default: true
    },
    btnList: {
      type: Array,
      default: () => [
        {
          text: "取消",
          click: "close"
        },
        {
          text: "确认",
        }
      ]
    }
  },
  data() {
    return {
      JDialogIsShow: true
    };
  },
  methods: {
    getStyle(obj) {
      let res = "";
      for (let k in obj) {
        res += camelTo_(k) + ":" + obj[k] + ";";
      }
      return res;
    },
    doClick(flag = "") {
      if (flag == "close") {
        this.closeDialog();
      }
      this.$emit(flag);
    },
    maskClick() {
      this.JDialogIsShow = !this.closable;
    },
    showDialog() {
      this.JDialogIsShow = true;
    },
    closeDialog() {
      this.JDialogIsShow = false;
    }
  }
};
</script>

<style lang="less" scoped>
.el-dialog {
  display: auto;
  .mask {
    background-color: dimgrey;
    opacity: 0.7;
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 999;
    top: 0;
    left: 0;
  }
  .el-dialog-content {
    background-color: whitesmoke;
    width: 60vw;
    position: fixed;
    top: 20vh;
    left: 20vw;
    z-index: 1000;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    .el-dialog-header {
      border-bottom: 1px solid dimgrey;
      height: 3rem;
      line-height: 3rem;
      text-align: left;
      padding-left: 1rem;
      .el-dialog-header-title {
        .title {
          font-weight: bold;
        }
        .el-dialog-header-icon {
          // border: solid 1px black;
          float: right;
          height: 20px;
          width: 20px;
          line-height: 20px;
          text-align: center;
          border-radius: 50%;
          font-size: large;
          margin-right: 0.5rem;
          margin-top: 0.3rem;
          color: red;
          cursor: pointer;
        }
      }
    }
    .el-dialog-main {
      min-height: 20vh;
    }
    .el-dialog-footer {
      border-top: 1px solid dimgrey;
      height: 2rem;
      padding: 0.3rem;
      .el-dialog-footer-btn {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        .btn {
          padding-top: 0.2rem;
          padding-bottom: 0.2rem;
          padding-left: 0.3rem;
          padding-right: 0.3rem;
          text-align: center;
          font-weight: bold;
          cursor: pointer;
        }
        .confirm-btn {
          background-color: white;
        }
        .cancel-btn {
          background-color: white;
        }
      }
    }
  }
}
</style>
