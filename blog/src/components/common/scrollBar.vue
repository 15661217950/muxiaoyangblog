<template>
  <div>
    <div class="scroll" id="scroll">
      <div class="bar" id="bar"></div>
      <div class="mask" id="mask"></div>
    </div>
    <span class="scroll-bar-num"></span>
  </div>
</template>

<script lang="ts">
export default {
  name: "scrollBar",
  props: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.scroll {
  margin: 100px auto;
  width: 500px;
  height: 5px;
  background: #ccc;
  position: relative;
  .bar {
    width: 20px;
    height: 20px;
    background: #369;
    position: absolute;
    top: -7px;
    left: 0;
    cursor: pointer;
    border-radius: 50% 50%;
  }
  .mask {
    position: absolute;
    left: 0;
    top: 0;
    background: #369;
    width: 0;
    height: 5px;
  }
}
.scroll-bar-num {
  font-size: large;
  display: none;
}
</style>
