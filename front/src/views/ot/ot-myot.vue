<template>
<div>
  <div class="mrg10 t-left">
    <span class="demonstration">月份</span>
    <el-date-picker
      v-model="searchDate"
      type="month"
      placeholder="选择月"
      @change="search">
    </el-date-picker>
  </div>
  <el-table
  v-loading="$store.state.common.tableLoading"
  :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      label="编号"
      width="80">
    <template slot-scope="scope">{{(scope.$index + 1) + (pageSize * (page - 1))}}</template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="申请者"
      >
    </el-table-column>
    <el-table-column
      prop="deptName"
      label="部门"
      min-width="150">
    </el-table-column>
    <el-table-column
      prop="startTime"
      label="开始时间"
      :formatter="dateFormat"
      min-width="120"  
      >
    </el-table-column>
    <el-table-column
      prop="endTime"
      label="结束时间"
      :formatter="dateFormat"
      min-width="120"  
      >
    </el-table-column>
    <el-table-column
      prop="days"
      label="总时长"
      >
    </el-table-column>
    <el-table-column
      prop="holidays"
      label="调休时长"
      >
    </el-table-column>
    <el-table-column
      prop="reason"
      label="加班事由"
      min-width="150"
      >
    </el-table-column>
    <el-table-column
      label="状态"
      >
      <template slot-scope="scope">
        <!-- {{options[scope.row.status]}} -->
       {{ options['status'+scope.row.status].name}}
      </template>
    </el-table-column>
    <el-table-column
      prop="t_dept.checkerName"
      label="审批人"
      >
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      min-width="120">
      <template slot-scope="scope">
        <el-button @click="dataDetail(scope.row)" type="text" size="small">详情</el-button>
        <el-button v-if="scope.row.status === 0" @click="dataDetail(scope.row, true)" type="text" size="small">编辑</el-button>
        <el-button @click="deleteData(scope.row.id)" type="text" size="small">强制撤回</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    background
    layout="sizes, prev, pager, next"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :page-sizes="[5, 10, 20, 50]"
    :page-size="pageSize"
    :total="count"
    class="overHidden t-right mrg10"
    >
  </el-pagination>
  <ot-info-detail-dialog ref="detailDialog" @callback="updateData"></ot-info-detail-dialog>
</div>
</template>
<script>
import Tools from '@/common/utils/tools';
import { getPersonalInfo, deleteInfo } from '@/common/api/info';
import bus from '@/common/bus/bus';
import otInfoDetailDialog from './components/ot-info-detail-dialog.vue';
import checkStatus from '@/common/utils/check-status';

export default {
  components: {
    otInfoDetailDialog
  },
  methods: {
    dataDetail (data, isEdited) {
      this.$refs.detailDialog.open(data, isEdited);
    },
    search () {
      this.getData();
    },
    handleSizeChange (pageSize) {
      this.pageSize = pageSize;
      this.getData();
    },
    handleCurrentChange (page) {
      this.page = page;
      this.getData();
    },
    getData () {
      let userInfo = this.$store.state.user.userInfo;
      let params = {
        id: userInfo.id,
        page: this.page,
        pageSize: this.pageSize,
        month: this.searchDate
      };
      getPersonalInfo(params).then(result => {
        if (result.code === 1 && result.data) {
          this.tableData = result.data.rows;
          this.count = result.data.count;
          return;
        }
        this.$message.error(result.msg);
      }).catch(err => {
        console.log(err);
      });
    },
    updateData (selectedData) {
      // if (selectedData.holidays === '') {
      //   selectedData.holidays = 0;
      // }
      // applyOt(selectedData).then(result => {
      //   this.dialogFormVisible = false;
      //   if (result.code === 1) {
      //     this.$refs.detailDialog.close();
      //     this.$message({
      //       message: '修改成功！',
      //       type: 'success'
      //     });
      //     this.getData();
      //     return;
      //   }
      //   this.$message.error(result.msg);
      // });
      this.getData();
    },
    deleteData (id) {
      this.$confirm('是否将该申请强制撤回(删除不可恢复)').then(_ => {
        deleteInfo({ id: id }).then(result => {
          if (result.code === 1) {
            this.$message({
              message: result.msg,
              type: 'success'
            });
            this.getData();
            return;
          }
          this.$message.error(result.msg);
        });
      }).catch(_ => {
        // this.$message('已取消删除！');
      });
    },
    dateFormat (row, column) {
      let dateStr = row[column.property];
      let date = Tools.parseDate(dateStr);
      return Tools.formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  data () {
    return {
      searchDate: '',
      tableData: [],
      count: 0,
      pageSize: 5,
      page: 1,
      dateVal: [],
      formLabelWidth: '100px',
      // '0:未审核 1:部门审核 2:项目审核 3:CTO审核' 4:审核通过 5:审核拒绝,
      options: checkStatus
    };
  },
  created () {
    this.getData();
    bus.$on('applySuccess', () => { this.getData(); });
  }
};
</script>
<style lang="less">
.mrg10 {
  margin: 10px;
}
</style>
