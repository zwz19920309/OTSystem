<template>
<div class="t-left">
   <div class="mrg10 t-left">
    <span class="demonstration">审批状态 </span>
    <el-select v-model="selectModel" placeholder="请选择" @change="selectModelChange">
      <el-option
      v-for="item in modelOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      </el-option>
     </el-select>
  </div>
  <el-table
   v-loading="$store.state.common.tableLoading"
    :data="tableData"
    border
    @selection-change="handleSelectionChange"
    class="t-center"
    max-height="600"
    ref="multipleTable"
    style="width: 100%">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      type=index
      prop="index"
      label="编号"
      width="80"
      >
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
      show-overflow-tooltip
      >
      <!-- show-overflow-tooltip 过长时，会在hover的时候显示全部信息 -->
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      >
       <template slot-scope="scope">
        <!-- {{options[scope.row.status]}} -->
       {{ options['status'+scope.row.status].name}}
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      min-width="150">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row,false)" type="text">详情</el-button>
        <!-- <el-button type="text">撤销</el-button> -->
        <el-button @click="handleClick(scope.row,true)" type="text">编辑</el-button>
        <el-button v-if="selectModel === 0"  type="text" @click="singleCtrl(scope.row, 'pass')">审核通过</el-button>
        <el-button v-if="selectModel === 0" type="text" @click="singleCtrl(scope.row, 'reject')">审核拒绝</el-button>
        <!-- <el-button type="text">删除</el-button> -->
      </template>
    </el-table-column>
  </el-table>
  <div class="mrg10">
    <el-button @click="selectAll(tableData)">全选</el-button>
    <el-button @click="toggleSelection(tableData)">反选</el-button>
    <el-button type="primary" @click="multipPass()">批量通过</el-button>
  </div>
   <el-pagination
    background
    layout="sizes, prev, pager, next"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :page-sizes="[5, 10, 20, 50]"
    :page-size="pageSize"
    :total="totalCount"
    class="overHidden t-right mrg10"
    >
  </el-pagination>
   <ot-info-detail-dialog ref="detailDialog" @callback="dialogCallback"></ot-info-detail-dialog>
</div>
</template>

<script>
import ApplyApi from '@/common/api/apply';
import Tools from '@/common/utils/tools';
import HttpStatus from '@/common/http/status';
import checkStatus from '@/common/utils/check-status';
import bus from '@/common/bus/bus';
// import Vue from 'vue';
export default {
  components: {
    'ot-info-detail-dialog': () => import('./components/ot-info-detail-dialog.vue')
  },
  mounted () {
    console.log('@@##myexamine mounted!!');
    this.getList();
    bus.$on('applySuccess', () => { this.getList(); });
  },
  methods: {
    selectModelChange (item) {
      console.log('@@##selectModelChange:' + JSON.stringify(item));

      this.getList();
    },
    handleSizeChange (pageSize) {
      this.pageSize = pageSize;
      this.getList();
    },
    handleCurrentChange (page) {
      this.page = page;
      this.getList();
    },
    handleClick (row, edit) {
      this.$refs.detailDialog.open(row, edit);
    },
    /* @desc 获取列表数据 */
    getList () {
      let user = this.$store.state.user.userInfo;
      if (this.selectModel === 1) {
        ApplyApi.getCheckedList({
          userId: user.id,
          page: this.page,
          size: this.pageSize,
          account: user.account
        }).then(result => {
          if (HttpStatus.checkHttpResult(result)) {
            this.tableData = result.data.rows;
            this.totalCount = result.data.count;
          } else {
            this.$message.error(result.msg);
          }
        });
      } else {
        ApplyApi.getExaminaList({
          userId: user.id,
          page: this.page,
          size: this.pageSize,
          account: user.account
        }).then(result => {
          if (HttpStatus.checkHttpResult(result)) {
            this.tableData = result.data.rows;
            this.totalCount = result.data.count;
          } else {
            this.$message.error(result.msg);
          }
        });
      }
    },
    /* 全选 */
    selectAll (table) {
      if (table) {
        table.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row, true);
        });
      }
    },
    /* 反选 */
    toggleSelection (table) {
      if (table) {
        table.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      }
    },
    /* @desc 单个审核
    @params row--列表上的数据对象，status--通过或拒绝
    @author jiabao
    */
    singleCtrl (row, ctrl) {
      if (ctrl === 'reject') {
        this.$prompt('请输入理由', '提示', {
          confirmButtonText: '拒绝',
          cancelButtonText: '取消',
          inputPattern: /\S/,
          inputErrorMessage: '请输入拒绝理由'
        }).then(({ value }) => {
          ApplyApi.changeExaminaStatus({
            id: row.id,
            deptId: row.deptId,
            status: row.status,
            remark: value,
            ctrl: ctrl
          }).then(result => {
            if (HttpStatus.checkHttpResult(result)) {
              this.getList();
            } else {
              this.$message.error(result.msg);
            }
          });
        }).catch(() => {

        });
        return;
      }
      ApplyApi.changeExaminaStatus({
        id: row.id,
        deptId: row.deptId,
        status: row.status,
        ctrl: ctrl
      }).then(result => {
        if (HttpStatus.checkHttpResult(result)) {
          this.getList();
        } else {
          this.$message.error(result.msg);
        }
      });
    },
    /* @desc 每一行发生勾选变化时，将勾选中的行数存到数组中
    @param val--状态是选中的行数数组
    */
    handleSelectionChange (val) {
      this.multipleSelection = [];
      if (val && val.length > 0) {
        for (let item of val) {
          this.multipleSelection.push(item.id);
        }
      }
    },
    /* @desc 批量审核通过 */
    multipPass () {
      if (!this.multipleSelection || this.multipleSelection.length < 1) {
        this.$message.error('请需要审核的选项!');
        return;
      }
      ApplyApi.passExaminaList({
        ids: this.multipleSelection
      }).then(result => {
        if (HttpStatus.checkHttpResult(result)) {
          this.changePage(0);
          this.getList();
        }
      });
    },
    /* @desc 改变页数 */
    changePage (val) {
      this.page = val;
    },
    dateFormat (row, column) {
      let dateStr = row[column.property];
      let date = Tools.parseDate(dateStr);
      return Tools.formatDate(date, 'yyyy-MM-dd hh:mm');
    },
    dialogCallback (data) {
      this.getList();
    }
  },

  data () {
    return {
      tableData: [], // 表格数据
      pageSize: 10, // 一页显示的条数
      page: 1, // 当前页
      totalCount: 0, // 数据总数
      multipleSelection: [], // 被选中的行数
      options: checkStatus,
      selectModel: 0,
      modelOptions: [
        {
          value: 0,
          label: '未审批'
        }, {
          value: 1,
          label: '已审批'
        }
      ]
    };
  }
};
</script>
<style lang="less">
.mrg10 {
  margin: 10px;
}
</style>
