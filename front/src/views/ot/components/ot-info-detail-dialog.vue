<template>
   <div>
   <el-dialog title="详情" :visible.sync="dialogFormVisible" @close="close">
    <el-form >
      <el-form-item label="编号" :label-width="formLabelWidth">
        <el-input  v-model="selectedData.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="申请者" :label-width="formLabelWidth">
        <el-input  v-model="selectedData.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="部门" :label-width="formLabelWidth">
        <el-input v-if="selectedData.deptName" v-model="selectedData.deptName" disabled></el-input>
      </el-form-item>
      <el-form-item label="加班时间" :label-width="formLabelWidth">
          <el-date-picker
          :disabled="!isEdited"
        v-model="dateVal"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="yyyy-MM-dd HH:mm" 
        @change="changeTime">
      </el-date-picker>
      </el-form-item>
      <el-form-item label="总时长" :label-width="formLabelWidth">
        <el-input  v-model="selectedData.days" disabled></el-input>
      </el-form-item>
      <el-form-item label="调休时长" :label-width="formLabelWidth">
        <el-input  v-model="selectedData.holidays" :disabled="!isEdited"></el-input>
      </el-form-item>
      <el-form-item label="事由" :label-width="formLabelWidth">
        <el-input  v-model="selectedData.reason" :disabled="!isEdited"></el-input>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
       <template slot-scope="scope">
        <!-- {{options[scope.row.status]}} -->
       {{ options['status'+selectedData.status].name}} 
       <span class="reject-tip" v-if="selectedData.status === 11 || selectedData.status === 21 || selectedData.status === 31"> 
         (拒绝理由: 
              <span v-if="selectedData.remark1">{{selectedData.operator}}:{{selectedData.remark1 }}</span>
              <span v-if="selectedData.remark2">{{selectedData.operator}}:{{selectedData.remark2 }}</span>
        )
       </span>
     

      </template>
      </el-form-item>
        <el-form-item label="部门负责人" :label-width="formLabelWidth">
        <el-input v-model="selectedData.leaderName" disabled></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        
      <el-button v-if="isEdited&&(selectedData.status === 1 || selectedData.status === 2 || selectedData.status === 3)" type="danger" @click="changeStatus('reject',selectedData)">审核拒绝</el-button>
      <el-button v-if="isEdited&&(selectedData.status === 11 || selectedData.status === 21 || selectedData.status === 31)" type="success" @click="changeStatus('pass',selectedData)">审核通过</el-button>
       
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="updateData" v-if="isEdited">保 存</el-button>
    </div>
  </el-dialog>
 </div> 
</template>
<script>
import Tools from '@/common/utils/tools';
import checkStatus from '@/common/utils/check-status';
import { fuzzySearch } from '@/common/api/user';
import ApplyApi from '@/common/api/apply';
import HttpStatus from '@/common/http/status';
import { applyOt } from '@/common/api/info';
export default {
  data () {
    return {
      dialogFormVisible: false,
      dateVal: [],
      formLabelWidth: '100px',
      isEdited: false,
      options: checkStatus,
      selectedData: { t_dept: {} }
    };
  },
  methods: {
    open (data, isEdited) {
      this.dialogFormVisible = true;
      if (isEdited) this.isEdited = isEdited;
      this.selectedData = Object.assign({}, data);
      this.dateVal = [this.selectedData.startTime, this.selectedData.endTime];
      if (this.selectedData.operator) {
        fuzzySearch({ account: this.selectedData.operator }).then((result) => {
          if (result.code === 1) {
            if (result.data && result.data[0]) {
              this.selectedData.operator = result.data[0].realname;
            }
          }
        });
      }
    },
    changeStatus (passStatus, row) {
      // status.passStatus = passStatus;
      // this.$emit('callback', status);
      if (passStatus === 'reject') {
        this.$prompt('请输入理由', '提示', {
          confirmButtonText: '拒绝',
          cancelButtonText: '取消',
          inputPattern: /\S/,
          inputErrorMessage: '请输入拒绝理由'
        }).then(({ value }) => {
          console.log('@@##rejct :' + JSON.stringify(row));
          ApplyApi.changeExaminaStatus({
            id: row.id,
            deptId: row.deptId,
            status: row.status,
            reason: row.reason,
            remark: value, // 状态改变原因
            holidays: row.holidays,
            startTime: this.selectedData.startTime,
            endTime: this.selectedData.endTime,
            days: this.selectedData.days,
            ctrl: passStatus,
            rejectOwn: true // 修改拒绝自己
          }).then(result => {
            if (HttpStatus.checkHttpResult(result)) {
              this.$emit('callback', this.selectedData);
              this.close();
            } else {
              this.$message.error(result.msg);
            }
          });
        }).catch(() => {

        });
      } else if (passStatus === 'pass') {
        ApplyApi.changeExaminaStatus({
          id: row.id,
          deptId: row.deptId,
          status: row.status,
          reason: row.reason,
          ctrl: passStatus,
          holidays: row.holidays,
          startTime: this.selectedData.startTime,
          endTime: this.selectedData.endTime,
          days: this.selectedData.days
        }).then(result => {
          if (HttpStatus.checkHttpResult(result)) {
            this.$emit('callback', this.selectedData);
            this.close();
          } else {
            this.$message.error(result.msg);
          }
        });
      }
    },
    close () {
      this.dialogFormVisible = false;
      this.selectedData = { status: 0, t_dept: {} };
      this.isEdited = false;
    },
    updateData () {
      // this.$emit('callback', this.selectedData);
      if (this.selectedData.holidays === '') {
        this.selectedData.holidays = 0;
      }
      applyOt(this.selectedData).then(result => {
        this.dialogFormVisible = false;
        if (result.code === 1) {
          this.$emit('callback', this.selectedData);
          this.$refs.detailDialog.close();
          this.$message({
            message: '修改成功！',
            type: 'success'
          });
          return;
        }
        this.$message.error(result.msg);
      });
    },
    changeTime (time) {
      this.selectedData.startTime = Tools.formatDate(time[0].getTime(), 'yyyy-MM-dd hh:mm:ss');
      this.selectedData.endTime = Tools.formatDate(time[1].getTime(), 'yyyy-MM-dd hh:mm:ss');
      // let total = new Date(time[1] - time[0]).getTime();
      this.selectedData.days = Tools.getValidHoliDays(time[0], time[1]);
    }
  },
  created () {

  }
};
</script>
<style lang="less">
.reject-tip {
  margin: 0 10px;
  color: red;
}
</style>

