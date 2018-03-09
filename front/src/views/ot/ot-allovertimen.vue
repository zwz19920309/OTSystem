<template>
<div>
  <div class="mrg10 t-left">
    <el-form ref="form" :inline="true">
      <span class="demonstration">月份{{downDate}}</span>
      <el-date-picker 
      v-model="searchDate"
      type="month"
      @change="changeDate"
      value-format="yyyy-MM-dd"
      max-height="600"
      placeholder="选择月">
    </el-date-picker>
    <el-form-item label="部门" label-width="50px">
      <el-select  @change="changeDept" v-model="deptId" placeholder="请选择">
        <el-option
           v-for="dept in deptList"
           :key="dept.id"
           :label="dept.name"
           :value="dept.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="部门" label-width="50px" v-if="deptChildList.length > 0">
      <el-select  @change="changeChildDept" v-model="deptChildId" placeholder="请选择">
        <el-option
           v-for="dept in deptChildList"
           :key="dept.id"
           :label="dept.name"
           :value="dept.id">
        </el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="姓名">
        <el-input v-model="name"></el-input>
      </el-form-item>
      <el-form-item label="申请状态">
      <el-select  placeholder="请选择" v-model="status">
        <el-option
           v-for="status in options"
           :key="status.status"
           :label="status.name"
           :value="status.status">
        </el-option>
      </el-select>
      </el-form-item>
       <el-button icon="el-icon-search" type="primary" @click="getAllovertimen" size="small">搜索</el-button>
        <el-button type="primary" size="small" icon="el-icon-download"  @click="downLoadExcel">导出</el-button>
    </el-form>  
  </div>
  <el-table
    :data="dataList"
    border
    style="width: 100%">
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
      >
    </el-table-column>
    <el-table-column
      label="状态"
      >
      <template slot-scope="scope">
        <span>{{options['status'+scope.row.status].name}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="t_dept.checkerName"
      label="部门负责人"
      >
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      min-width="120">
      <template slot-scope="scope">
        <el-button  type="text" size="small"  @click="dataDetail(scope.row)">详情</el-button>
        <!-- <el-button type="text" size="small" @click="deletAction(scope.row)">撤销</el-button>
        <el-button type="text" size="small" @click="dataEdit(scope.row)">编辑</el-button>
        <el-button type="text" size="small" @click="deletAction(scope.row)">删除</el-button> -->
      </template>
    </el-table-column>
  </el-table>
  <div class="next-page"> 
    <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
  </div>  
  <ot-info-detail-dialog ref="detailDialog" ></ot-info-detail-dialog>
</div>
</template>
<script>
import Tools from '@/common/utils/tools';
import overtimen from '@/common/api/overtimen';
import bus from '@/common/bus/bus';
import checkStatus from '@/common/utils/check-status';
import authApi from '@/common/api/settings/auth';

export default {
  props: ['downDate'],
  data () {
    return {
      dataList: [],
      currentPage: 1,
      total: 0,
      limit: 10,
      searchDate: new Date(),
      dialogFormVisible: false,
      formLabelWidth: '120px',
      selectedData: {},
      editAble: false,
      dateVal: [new Date(), new Date()],
      options: checkStatus,
      deptId: '',
      deptChildId: '',
      deptList: [],
      deptChildList: [],
      status: '',
      name: '',
      datePeriod: ''
    };
  },
  components: {
    'ot-info-detail-dialog': () => import('./components/ot-info-detail-dialog.vue')
  },
  methods: {
    getAllovertimen () {
      this.datePeriod = this.datePeriod ? this.datePeriod : Tools.formatDate(this.searchDate, 'yyyy-MM-dd');
      let params = { limit: this.limit, offset: (this.currentPage - 1) * this.limit, datePeriod: this.datePeriod };
      params.deptId = (this.deptId || this.deptId === 0) ? this.deptId : '';
      params.status = (this.status || this.status === 0) ? this.status : '';
      params.name = this.name ? params.name : '';
      if (this.deptChildList.length > 0 && this.deptChildId) {
       params.deptId = this.deptChildId;
      }
      overtimen.findDataByPage(params).then((result) => {
        if (result.code === 1) {
          this.dataList = result.data.list;
          this.total = result.data.total;
        }
      });
    },
    getDeptList (params) {
      let options = {grade: 1};
      authApi.getDeptList(options).then((result) => {
        if (result.code === 1) {
          this.deptList = result.data;
        } else {
          this.$message.error(result.msg);
        }
      });
    },
    // 多少条一页
    sizeChange (size) {
      this.currentPage = 1;
      this.limit = size;
      this.getAllovertimen();
    },
    // 第几页
    currentChange (current) {
      this.currentPage = current;
      this.getAllovertimen();
    },
    // 日期涮选
    changeDate (date) {
      this.datePeriod = date;
      this.getAllovertimen();
      bus.$emit('changeAllOTDate', this.datePeriod);
    },
    // 修改编辑数据日期
    changeEditorDate (dateVal) {
      if (dateVal && dateVal.length === 2) {
        this.selectedData.startTime = dateVal[0];
        this.selectedData.endTime = dateVal[1];
      }
    },
    // 数据复原
    reverseData () {
      this.dataList = [];
      this.currentPage = 1;
      this.total = 0;
      this.limit = 10;
    },
    // 删除数据
    deleteData (data) {
      let params = { id: data.id };
      overtimen.deleteData(params).then(result => {
        if (result.code === 1) {
          this.reverseData();
          this.getAllovertimen();
        }
      });
    },
    // 删除数据
    deletAction (data) {
      this.$confirm('确认删除该数据？')
        .then(_ => {
          this.deleteData(data);
        })
        .catch(_ => { });
    },
    // 更新数据
    updateData (data) {
      overtimen.updateData(this.selectedData).then(result => {
        if (result.code === 1) {
          this.getAllovertimen();
        }
      });
    },
    updateAction (data) {
      this.$confirm('确认更新该数据？')
        .then(_ => {
          this.updateData(data);
          this.dialogFormVisible = false;
        })
        .catch(_ => { });
    },
    // 详情
    dataDetail (data) {
      this.dialogFormVisible = true;
      this.editAble = false;
      this.selectedData = Tools.clone(data);
      this.dateVal = [this.selectedData.startTime, this.selectedData.endTime];
      console.dir(this.selectedData);
      this.$refs.detailDialog.open(this.selectedData, false);
    },
    // 编辑
    dataEdit (data) {
      this.dialogFormVisible = true;
      this.editAble = true;
      this.selectedData = Tools.clone(data);
      this.dateVal = [this.selectedData.startTime, this.selectedData.endTime];
    },
    dateFormat (row, column) {
      let dateStr = row[column.property];
      let date = Tools.parseDate(dateStr);
      return Tools.formatDate(date, 'yyyy-MM-dd hh:mm');
    },
    changeDept (val) {
      this.deptId = val;
      authApi.getDeptList({parent: this.deptId}).then((result) => {
        if (result.code === 1) {
          this.deptChildList = result.data;
          if (result.data && result.data[0]) {
            this.deptChildId = result.data[0].id;
          }  
        } else {
          this.$message.error(result.msg);
        }
      });
    },
    changeChildDept (val) {
      this.deptChildId = val;
    },
    // 导出Eexcl
    downLoadExcel () {
      this.datePeriod = this.datePeriod ? this.datePeriod : Tools.formatDate(new Date(), 'yyyy-MM-dd');
      let dwnloadExcUrl = overtimen.downloadExcelUrl + '?datePeriod=' + this.datePeriod;
      window.open(dwnloadExcUrl, '_blank');
    }
  },
  created () {
    bus.$on('applySuccess', () => { this.getAllovertimen(); });
    this.getDeptList();
  }
};
</script>
<style lang="less">
.mrg10 {
  margin: 10px;
}
.next-page {
  padding: 10px 0;
  text-align: right;
}
</style>
