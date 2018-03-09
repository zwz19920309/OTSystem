<template>
<div>
  <div class="mrg10 clearfix">
    <div class="t-left f-left">
      <span class="demonstration">月份</span>
      <el-date-picker
        v-model="searchDate"
        type="month"
        @change="changeDate"
        value-format="yyyy-MM-dd"
        max-height="600"
        placeholder="选择月">
      </el-date-picker>
    </div>
    <div class="ot-count-injectbtns t-home-btngroup f-left">
      <span  class="down-load-btn">
        <i class="el-icon-download"></i>导入
        <input  id="excel-upload-input" ref="fileInput" type='file' v-on:change="upload" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
      </span>
      <el-button type="primary" size="small" icon="el-icon-plus" @click="exportHoliday">导出</el-button>
    </div>
 </div> 
 <div class="t-center mar-title"><h3>{{mothText}}掌中保休假明细</h3></div>
 <div v-if="dataList">
   <el-table border :data="dataList" style="width: 100%" v-loading="$store.state.common.tableLoading">
      <el-table-column label="序号" prop="sid"  width="180"></el-table-column>
      <el-table-column label="姓名" prop="name"  width="180"></el-table-column>
      <el-table-column label="开发部门" prop="deptName"></el-table-column>
      <!-- <el-table-column label="禅道账号" prop="account"></el-table-column> -->
      <el-table-column label="剩余年假(d)" prop="vacation"></el-table-column>
      <el-table-column label="剩余调休(d)" prop="holidays"></el-table-column>
      <el-table-column label="本月剩余调休(d)" prop="mothLess"></el-table-column>
    </el-table>
 </div>
</div>
</template>
<script>
import Tools from '@/common/utils/tools';
import otcountApi from '@/common/api/otcount';

export default {
  mounted () {
    let params = { moth: Tools.formatDate(new Date().getTime(), 'yyyy-MM') };
    this.getDataList(params);
  },
  methods: {
    // 日期涮选
    changeDate (date) {
      this.moth = Tools.formatDate(date, 'yyyy-MM');
      this.mothText = Tools.formatDate(date, 'yyyy年MM月');
      this.getDataList({ moth: this.moth });
    },
    // 获取数据列表
    getDataList (params) {
      otcountApi.findDataByMoth(params).then((result) => {
        if (result.code === 1) {
          this.dataList = result.data;
        } else {
          this.$message.error(result.msg);
        }
      });
    },
     // 获取数据列表
    exportHoliday (params) {
      this.moth = this.moth ? this.moth : Tools.formatDate(new Date().getTime(), 'yyyy-MM');
      let dwnloadExcUrl = otcountApi.downloadExcelUrl + '?moth=' + this.moth;
      window.open(dwnloadExcUrl, '_blank');
    },
    upload () {
      let datePeriod = Tools.formatDate(this.searchDate, 'yyyy-MM');
      let fileData = new FormData();
      fileData.append('file', this.$refs.fileInput.files[0]);
      fileData.append('datePeroid', datePeriod);
      otcountApi.uploadHoliday(fileData).then((result) => {
        if (result.code === 1) {
          this.dataList = result.data;
        } else {
          this.$message.error(result.msg);
        }
        document.getElementById('excel-upload-input').value = '';
      });
    }
  },
  data () {
    return {
      searchDate: new Date(),
      datePeriod: '',
      dataList: null,
      mothText: Tools.formatDate(new Date().getTime(), 'yyyy年MM月')
    };
  }
};
</script>
<style lang="less">
.mrg10 {
  margin: 10px;
}
.mar-title{
  margin: 30px 0 30px ;
}
.ot-count-injectbtns{
  margin-left: 30px;
  height: 35px;
  line-height: 35px;
}
.down-load-btn {
  display:inline-block;
  padding:0 12px;
  height:32px;
  line-height:32px;
  color:#fff;
  font-size:12px;
  border-radius:3px;
  background: #409EFF;
  cursor: pointer;
}
.down-load-btn i {
  padding:  0 4px;
}
.down-load-btn input{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 70px;
  height:32px;
  line-height:32px;
  opacity: 0;
  cursor: pointer;
}
</style>
