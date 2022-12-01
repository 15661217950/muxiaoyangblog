<style lang="less" scoped>
.md-catalogue {
  position: fixed;
  right: 1rem;
  top: 80px;
  padding: 1rem;
  width: 20vw;
  overflow-y: scroll;
  background-color: #fff;
  border: 1px solid #e9ecef;
  border-radius: 10px;
  .md-title {
    text-align: left;
    line-height: 1.5rem;
    cursor: pointer;
    .md-title-tip {
      text-align: center;
      font-size: large;
      font-weight: bold;
      &:hover {
        color: orange;
      }
    }
    .md-title-text {
    }
    .md-title-text:hover {
      color: orange;
    }
    .tag-h0 {
      font-size: larger;
      font-weight: bold;
    }
    .tag-h1 {
      // text-indent: 1em;
      margin-left: 1em;
      font-size: medium;
      font-weight: bold;
    }
    .tag-h2 {
      margin-left: 2em;
      font-size: small;
      font-weight: bold;
    }
    .tag-h3 {
      margin-left: 3em;
      font-size: smaller;
      font-weight: bold;
    }
    .tag-h4 {
      margin-left: 4em;
      font-size: x-small;
      font-weight: bold;
    }
    .tag-h5 {
      margin-left: 5em;
      font-size: xx-small;
      font-weight: bold;
    }
  }
}
</style>

<template>
  <div class="md-catalogue">
    <div class="md-title">
      <div class="md-title-tip" @click="goHead()">{{ title }}</div>
      <div
        v-for="(item, index) in getHTags()"
        :key="index"
        :class="item.class + ' md-title-text'"
        @click="hTagClick(item)"
      >
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mdCatalogue",
  props: {
    content: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    comment: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      catalogue: "",
      tagMap: {}
    };
  },
  mounted() {},
  methods: {
    goHead() {
      window.scrollTo(0, 0);
    },
    //替换转义字符
    transformstr(str) {
      str = str.replace(/\\'/g, "'");
      str = str.replace(/\\"/g, '"');
      return str;
    },
    getHTags() {
      let tagMap = this.tagMap;
      if (!this.content) return;
      this.content = this.transformstr(this.content);
      let reg = /<h.+>/g;
      let tags = this.content.match(reg);
      let tagList = [];
      if (!tags) return;
      let floor = tags[0].match(/<(h\d+)><a.+a>(.+)<\/h\d+/)[1].slice(1);
      for (let i = 0; i < tags.length; i++) {
        let tag = tags[i].match(/<(h\d+)><a.+a>(.+)<\/h\d+/);
        if (!tag) continue;
        let t = tag[2].match("<.+>(.+)<.+>");
        if (t) {
          tag[2] = t[1];
        }
        tagMap[tag[2]] = (tagMap[tag[2]] || 0) + 1;
        let temp = {
          tag: tag[1],
          class: "tag-h" + (tag[1].slice(1) - floor),
          text: tag[2],
          index: tagMap[tag[2]]
        };
        tagList.push(temp);
      }
      if (this.comment) {
        tagList.push({
          tag: "h2",
          class: "tag-h0",
          text: "评论",
          index: 1,
          isComment: true,
          targetClass: this.comment
        });
      }
      return tagList;
    },
    hTagClick(item) {
      let dom = document.getElementsByTagName(item.tag);
      if (item.isComment) {
        dom = document.getElementsByClassName(item.targetClass)[0];
        window.scrollTo(0, dom.offsetTop - 50);
        return;
      }
      let tarDom = "";
      let ind = 0;
      for (let i = 0; i < dom.length; i++) {
        if (dom[i].innerText == item.text) {
          ind++;
          if (ind < item.index) continue;
          tarDom = dom[i];
          break;
        }
      }
      let top = tarDom.offsetTop;
      window.scrollTo(0, top - 50);
    }
  }
};
</script>
