<template>
<div>
  <div class="f-right t-home-btngroup">
    <el-button type="primary" size="small" icon="el-icon-plus" @click="showApplicationModal">申请</el-button>
  </div>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="我的加班" name="myot"></el-tab-pane>
    <el-tab-pane label="我的审批" name="myexamine"></el-tab-pane>
    <el-tab-pane label="所有加班"  name="allovertimen"></el-tab-pane>
    <el-tab-pane label="调休统计"  name="otcount"></el-tab-pane>
  </el-tabs>
  <!-- 每个tab下的路由 start -->
  <router-view></router-view>
  <!-- 每个tab下的路由 end -->

  <!-- 申请加班的弹出框 start -->
  <el-dialog title="申请" :visible.sync="dialogFormVisible">
    <el-form :rules="rules" :model="form" label-width="80px" class="t-form" ref="applyForm">
      <el-form-item label="加班时间" prop="time">
        <el-col :span="19">
           <el-date-picker
              v-model="form.time"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="changeTime"
               format="yyyy-MM-dd HH:mm"
             >
            </el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="总时长" prop="totalTime">
        <el-col :span="19">
          <el-input v-model="form.totalTime" :disabled="true"></el-input>
        </el-col>
      </el-form-item>
       <el-form-item label="调休时长" prop="holidays">
        <el-col :span="19">
          <el-input v-model="form.holidays"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="事由" prop="reason">
        <el-col :span="19">
          <el-input type="textarea" v-model="form.reason"></el-input>
        </el-col>
      </el-form-item>
    </el-form>
      
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button @click="applyOtDialog" type="primary" :loading="$store.state.common.fullLoading">确 定</el-button>
    </div>
  </el-dialog>
  <!-- 申请加班的弹出框 end -->
</div>
</template>
<script>
import { applyOt } from '@/common/api/info';
import Tools from '@/common/utils/tools';
import bus from '@/common/bus/bus';
export default {
  data () {
    let today = new Date();
    let toyear = today.getFullYear();
    let tomonth = today.getMonth();
    let todate = today.getDate();
    let beginTime = new Date(toyear, tomonth, todate, 19, 30, 0);
    let endTime = new Date(toyear, tomonth, todate, 20, 30, 0);
    // var validateHolidays = (rule, value, callback) => {
    //   if (parseFloat(value) > parseFloat(this.form.totalTime)) {
    //     callback(new Error('调休时长不能超过加班时长!'));
    //   } else {
    //     callback();
    //   }
    // };

    let validateTotalTime = (rule, value, callback) => {
      console.log('@@##validateTotalTime:' + value);
      let begin = new Date(value[0].getFullYear(), value[0].getMonth(), value[0].getDate());
      let now = new Date(toyear, tomonth, todate);
      // 如果周一，可以提上周五
      let beginDay = begin.getDay();
      let nowDay = now.getDay();
      let dis = (begin.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
      if (dis > 3 || dis < -3 || (dis > 6 && beginDay !== 5 && nowDay !== 1)) {
        callback(new Error('申请日期已超出范围（不得超过最近3天），如有疑问请联系项目人员!'));
      } else {
        callback();
      }
    };
    return {
      activeName: this.$route.name,
      dialogFormVisible: false, // 弹出框是否显示
      form: {
        time: [beginTime, endTime], // 加班日期时间
        totalTime: '1', // 总时长
        reason: '' // 事由
      },
      beginTime: new Date(toyear, tomonth, todate, 19, 30, 0),
      endTime: new Date(toyear, tomonth, todate, 20, 30, 0),
      rules: {
        time: [{
          validator: validateTotalTime, trigger: 'blur'
        }],
        reason: [{
          required: true, message: '请输入加班原因', trigger: 'blur'
        }]
        // holidays: [{
        //   validator: validateHolidays, trigger: 'blur'
        // }]
      }
    };
  },
  methods: {
    /* @desc 点击tab切换路由
    @params tab--点击的tab的element，event--点击事件
    @author jiabao
   */
    handleClick (tab, event) {
      console.log(tab, event);
      this.$router.push({
        name: tab.name
      });
    },
    /* @desc 弹出申请加班的模态框
    @author jiabao
   */
    showApplicationModal () {
      this.dialogFormVisible = true;
    },
    // 确认申请加班
    applyOtDialog () {
      this.form.beginTime = Tools.formatDate(this.form.time[0].getTime(), 'yyyy-MM-dd hh:mm:ss');
      this.form.endTime = Tools.formatDate(this.form.time[1].getTime(), 'yyyy-MM-dd hh:mm:ss');
      this.$refs.applyForm.validate((validate) => {
        if (!validate) {
          return false;
        }
        let userInfo = this.$store.state.user.userInfo;
        applyOt({
          name: userInfo.realname,
          userId: userInfo.id,
          deptId: userInfo.dept,
          startTime: this.form.beginTime,
          endTime: this.form.endTime,
          days: Math.floor(this.form.totalTime),
          holidays: this.form.holidays,
          reason: this.form.reason
        }).then(result => {
          this.$refs.applyForm.resetFields();
          this.dialogFormVisible = false;
          if (result.code === 1) {
            this.$message({
              message: result.msg,
              type: 'success'
            });
            bus.$emit('applySuccess');
            // bus.$emit('getAllData');
            // bus.$emit('getAllData');
            return;
          }
          this.$message.error(result.msg);
        });
      });
    },
    changeTime (time) {
      // let total = new Date(time[1] - time[0]).getTime();
      // this.form.totalTime = Math.floor(total / (1000 * 60 * 60));
      this.form.totalTime = Tools.getValidHoliDays(time[0], time[1]);
    }
  },
  created () {
    bus.$on('changeAllOTDate', (res) => {
      this.datePeriod = res;
    });
  }
};
</script>
<style>
.t-home-btngroup {
  position: relative;
  z-index: 1;
}
.t-form .el-date-editor--datetimerange.el-input__inner {
  width: 100%;
}
</style>
