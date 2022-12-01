<style lang="less" scoped>
.filter-content {
  display: flex;
  justify-content: space-around;
  padding: 0.5em;
}
</style>
<template>
  <div>
    <div class="filter-content">
      <div>
        <span>是否显示：</span>
        <el-select
          @change="isShowChange"
          v-model="filterConfig.is_show"
          placeholder="请选择"
        >
          <el-option
            v-for="item in isShowoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div>
        <el-input
          placeholder="请输入ip"
          v-model="filterConfig.ip"
          @input="isShowChange"
        >
          <template slot="prepend">ip：</template>
        </el-input>
      </div>
      <div>
        <el-input
          placeholder="请输入昵称"
          v-model="filterConfig.nickName"
          @input="isShowChange"
        >
          <template slot="prepend">昵称：</template>
        </el-input>
      </div>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="id" label="id"> </el-table-column>
      <el-table-column label="头像">
        <template slot-scope="scope">
          <el-avatar :src="scope.row.avatar"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="nickname" label="昵称"> </el-table-column>
      <el-table-column prop="content" label="内容"> </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="create_time" label="时间"> </el-table-column>
      <el-table-column prop="clientIp" label="ip"> </el-table-column>
      <el-table-column label="是否显示">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.is_show"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            @change="setIsShow(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="index"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="js">
import { getAllComment, setCommentShow } from "@/config/api";
import { dateFormat } from "@/util/dateTool";
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      comments: [],
      pageSize: 10,
      index: 1,
      total: 0,
      filterConfig: {
        is_show: 0,
        nickName: "",
        ip: ""
      },
      isShowoptions: [
        {
          label: "全部",
          value: -1
        },
        {
          label: "是",
          value: 1
        },
        {
          label: "否",
          value: 0
        }
      ]
    };
  },
  mounted() {
    this.doGetAllComment();
  },
  methods: {
    isShowChange() {
      this.pageSize = 10;
      this.index = 1;
      this.doGetAllComment();
    },
    async doGetAllComment() {
      const params = {
        pageSize: this.pageSize,
        index: this.index,
        is_show: this.filterConfig.is_show,
        clientIp: this.filterConfig.ip,
        nickname: this.filterConfig.nickName
      };
      let res = await this.httpGet(getAllComment, params);
      if (res.code != 1) {
        alert(res.msg);
        return;
      }
      this.tableData = res.data;
      this.total = res.total;
      this.tableData.map(item => {
        item.create_time = dateFormat(item.create_time, "yyyy-mm-dd hh:MM:ss");
      });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.doGetAllComment();
    },
    handleCurrentChange(val) {
      this.index = val;
      this.doGetAllComment();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    async setIsShow(row) {
      let res = await this.httpPost(setCommentShow, {
        id: row.id,
        is_show: row.is_show
      });
    }
  }
};
</script>
