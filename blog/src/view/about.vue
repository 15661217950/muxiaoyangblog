<style lang="less" scoped>
.about-content {
  display: flex;
  flex-direction: column;

  .about-inf {
    width: 80%;
    margin: auto;
    background-color: #fff;
    border: 1px solid #e9ecef;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 3%);
    &:hover {
      box-shadow: 0 0 10px rgba(0, 0, 0, 10%);
    }
  }
  .about-link {
    width: 40%;
    padding: 2rem;
  }
}
</style>

<template>
  <div class="about-content">
    <inf class="about-inf"></inf>
    <f-link class="about-link"></f-link>
  </div>
</template>

<script lang="js">
import inf from "../components/about/inf.vue";
import fLink from "../components/about/fLink.vue";
export default {
  name: "about",
  components: {
    inf,
    fLink
  }
};
</script>
