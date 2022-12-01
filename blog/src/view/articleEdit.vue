<style></style>
<style lang="less" scoped>
/deep/.v-note-wrapper.shadow {
  border: none;
  height: 80vh;
  overflow-y: scroll;
}
.dialog-content {
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 1rem;
  .dialog-content-item {
    margin-top: 0.5rem;
    display: inherit;
    justify-content: center;
    .dialog-content-item-label {
      flex: 1;
    }
    .dialog-content-item-t {
      flex: 6;
    }
  }
  input,
  textarea {
    width: 60%;
  }
  .input-title {
  }
  .input-descript {
  }
}
.article-edit {
  padding-bottom: 1rem;
  .article-edit-title {
    width: 50vw;
    margin: auto;
    margin-top: 2rem;
    margin-bottom: 1rem;
    line-height: 3rem;
    text-align: center;
    border-radius: 5px;
  }
  .article-edit-descript {
    width: 60vw;
    margin: auto;
    margin-bottom: 2rem;
    min-height: 5rem;
    text-indent: 2em;
    padding: 1rem;
  }
  .article-edit-btn {
    cursor: pointer;
    width: 10vw;
    border-radius: 5px;
    line-height: 2rem;
    color: #fff;
    margin: auto;
    margin-top: 1rem;
    background-color: #00b7ff;
  }
}
</style>

<template>
  <div class="article-edit">
    <input class="article-edit-title" v-model="article.title" />
    <textarea class="article-edit-descript" v-model="article.description" />
    <mavon-editor
      class="md"
      :value="article.content"
      :subfield="prop.subfield"
      :defaultOpen="prop.defaultOpen"
      :toolbarsFlag="prop.toolbarsFlag"
      :editable="prop.editable"
      :scrollStyle="prop.scrollStyle"
      :navigation="prop.navigation"
      @save="save"
    ></mavon-editor>
    <div class="article-edit-btn" @click="showDialog()">保存</div>
    <j-dialog
      :title="title"
      :closable="true"
      ref="JDialog"
      :btnList="btnList"
      @confirm="confirm"
    >
      <template v-slot:j-dialog-main-content>
        <div class="dialog-content">
          <div class="dialog-content-item">
            <span class="dialog-content-item-label">标题：</span>
            <input
              class="input-title dialog-content-item-t"
              v-model="article.title"
              placeholder="标题"
            />
          </div>
          <div class="dialog-content-item">
            <span class="dialog-content-item-label">摘要：</span>
            <textarea
              class="input-descript dialog-content-item-t"
              v-model="article.description"
              placeholder="摘要"
            />
          </div>
          <div class="dialog-content-item">
            <span class="dialog-content-item-label">栏目：</span>
            <j-drop-down-box
              class="dialog-content-item-t"
              :value="article.type_id && article.type_id.toString()"
              :selectData="typeList"
              :closed="false"
              @selectItem="selectItem"
              @selectIndexValue="selectIndexValue"
            >
            </j-drop-down-box>
          </div>
          <div class="dialog-content-item">
            <span class="dialog-content-item-label">标签：</span>
            <div
              class="dialog-content-item-t"
              style="border: gray solid 1px; padding: 0.2rem"
            >
              <j-tag-list
                style="border: gray solid 1px; padding: 0.2rem; min-height: 1rem"
                :tagList="addTagList"
                :isShow="true"
                @deleteTag="tagDelete1"
              ></j-tag-list>
              <j-tag-list
                :tagList="tagList"
                :tagColor="tagColor"
                :canRepeat="false"
                :isShow="false"
                :canDelete="false"
                @tagClick="tagClick"
                @deleteTag="tagDelete"
                @addTag="tagAdd"
              >
              </j-tag-list>
            </div>
          </div>
        </div>
      </template>
    </j-dialog>
  </div>
</template>

<script lang="js">
import {
  getBlogDetail,
  editBlogById,
  getType,
  getTag,
  addTag,
  deleteTag,
  addTag2Blog,
  deleteTag2Blog
} from "../config/api";
import { mavonEditor } from "mavon-editor";
import { utf16toEntities, entitiestoUtf16 } from "../util/util.js";
import "mavon-editor/dist/css/index.css";
export default {
  name: "articleEdit",
  components: {
    mavonEditor
  },
  props: {},
  data() {
    return {
      article: {},
      title: "保存博客",
      btnList: [
        {
          text: "取消",
          style: {
            backgroundColor: "#f5f5f5"
          },
          click: "close"
        },
        {
          text: "确认",
          style: {
            backgroundColor: "#f5f5f5"
          },
          click: "confirm"
        }
      ],
      typeList: [],
      typeValue: "",
      typeMap: {},
      addTagList: [],
      tagMap: {},
      tagList: [],
      tagColor: ["orange"],
      tagListMap: []
    };
  },
  computed: {
    prop() {
      let data = {
        subfield: true, // 单双栏模式
        defaultOpen: "preview", //edit： 默认展示编辑区域 ， preview： 默认展示预览区域
        editable: true,
        toolbarsFlag: true,
        scrollStyle: true,
        navigation: true
      };
      return data;
    }
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      await this.getTypeList();
      await this.getTagList();
      await this.getDetail();
    },
    tagAdd(item) {
      if (item) {
        this.doAddTag(item);
      }
    },
    tagDelete1(item) {
      this.doDeleteTag2Blog(item);
    },
    tagDelete(item) {
      const ind = this.addTagList.indexOf(item.text);
      this.doDeleteTag2Blog(this.addTagList[ind]);
      if (ind !== -1) {
        this.addTagList.splice(ind, 1);
      }
      let tag = this.tagListMap.find(tag => {
        return tag.name == item.text;
      });
      this.doDeleteTag(tag.id);
    },
    tagClick(item) {
      if (this.addTagList.includes(item.text)) {
        return;
      }
      this.doAddTag2Blog(item);
      this.addTagList.push(item.text);
    },
    doDeleteTag2Blog(item) {
      let id = this.$route.query.id;
      let tag = this.tagListMap.find(tag => {
        return tag.name == item.text;
      });
      let params = {};
      params.blogid = parseInt(id);
      params.tagid = parseInt(tag.id);
      this.httpPost(deleteTag2Blog, params)
        .then(res => {})
        .catch(err => {
          console.log("--err---", err);
        });
    },
    doAddTag(text) {
      this.httpPost(addTag, { name: text })
        .then(res => {
          if (res.code !== 1) {
            alert(res.msg);
            if (res.code == 5) {
              this.$router.replace("home");
            }
          }
          this.getTagList();
        })
        .catch(err => {
          this.getTagList();
          console.log("--err---", err);
        });
    },
    doDeleteTag(id) {
      this.httpPost(deleteTag, { id: id })
        .then(res => {
          if (res.code !== 1) {
            alert(res.msg);
            if (res.code == 5) {
              this.$router.replace("home");
            }
          }
          this.getTagList();
        })
        .catch(err => {
          this.getTagList();
          console.log("--err---", err);
        });
    },
    getTags(tags) {
      if (tags == undefined) return [];
      let res = [];
      tags = tags.split(",");
      tags.map(item => {
        res.push(this.tagMap[item]);
      });
      return res;
    },
    getTagList() {
      this.httpGet(getTag, {})
        .then(res => {
          if (res.code == 1) {
            this.tagList = [];
            this.tagListMap = res.data;
            res.data.map(item => {
              this.tagList.push(item.name);
            });
            this.originTagList = this.tagList;
          } else {
            alert(res.msg);
            if (res.code == 5) {
              this.$router.replace("home");
            }
          }
        })
        .catch(err => {
          console.log("--err---", err);
        });
    },
    getDetail() {
      let id = this.$route.query.id;
      this.httpGet(getBlogDetail, { id: id })
        .then(res => {
          if (res.code == 1) {
            this.article = res.data[0];
            this.article.content = entitiestoUtf16(res.data[0].content);
            let tags = res.data[0].tags || "";
            tags = tags.split(",");
            let addTagList = [];
            tags.map(tag => {
              if (tag.length != 0) {
                let findTag = this.tagListMap.find(item => {
                  return item.id == tag + "";
                });
                addTagList.push(findTag.name);
              }
            });
            this.addTagList = addTagList;
            this.typeValue = res.data[0].type_id;
          } else {
            alert(res.msg);
          }
        })
        .catch(err => {
          console.log("--err---", err);
        });
    },
    selectItem(id) {
      this.typeValue = id;
      // console.log("selectItem", id);
    },
    selectIndexValue(defIndex, value) {
      // console.log("selectIndexValue", defIndex, value);
    },
    getTypeList() {
      this.httpGet(getType, {})
        .then(res => {
          if (res.code == 1) {
            this.typeList = res.data;
            this.typeList.map(item => {
              item.value = item.name;
              this.typeMap[item.id + ""] = item.name;
            });
          } else {
            alert(res.msg);
            if (res.code == 5) {
              this.$router.replace("home");
            }
          }
        })
        .catch(err => {
          console.log("--err---", err);
        });
    },
    //md编辑保存
    save(value, render) {
      this.article.html_content = render;
      this.article.content = value;
      // console.log(value, render);
    },
    showDialog() {
      this.$refs["JDialog"].showDialog();
    },
    confirm() {
      // console.log('confirm');
      this.saveBlog();
      this.$refs.JDialog.closeDialog();
    },
    doAddTag2Blog(item) {
      let id = this.$route.query.id;
      let tag = this.tagListMap.find(tag => {
        return tag.name == item.text;
      });
      let tagIdList = [];
      tagIdList.push({
        blogid: parseInt(id),
        tagid: parseInt(tag.id)
      });
      this.httpPost(addTag2Blog, { tagIdList: tagIdList })
        .then(res => {})
        .catch(err => {
          console.log("--err---", err);
        });
    },
    saveBlog() {
      let id = this.$route.query.id;
      let para = {
        id: id,
        html_content: utf16toEntities(this.article.html_content),
        content: utf16toEntities(this.article.content),
        description: utf16toEntities(this.article.description),
        title: utf16toEntities(this.article.title),
        type_id: this.typeValue
      };
      const notNUllMap = {
        content: "博客内容不能为空",
        description: "博客描述不能为空",
        title: "博客标题不能为空"
        // type_id: "请选择博客栏目"
      };
      for (let key in para) {
        if (para[key] == "" && notNUllMap[key]) {
          alert(notNUllMap[key]);
          return;
        }
      }
      this.httpPost(editBlogById, para)
        .then(res => {
          if (res.code == 1) {
            alert("已修改");
            this.$router.go(-1);
          } else {
            alert(res.msg);
            if (res.code == 5) {
              this.$router.replace("home");
            }
          }
        })
        .catch(err => {
          console.log("--err---", err);
        });
    }
  }
};
</script>
