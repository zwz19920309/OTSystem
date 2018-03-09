<template>
<div>
 <!-- <h3>审批权限表</h3>

 选择图片：<input  ref="fileInput" type='file'/>
    
 <h3 @click="upload">提交</h3>
  <el-table :data="deptList">
    <el-table-column  prop="name" label="部门名称" ></el-table-column>
    <el-table-column prop="leaderName" label="部门负责人"  ></el-table-column>
    <el-table-column prop="checkerName" label="部门审批人"> </el-table-column>
  </el-table> -->
</div> 
</template>
<script>
// import axios from 'axios';
// import authApi from '@/common/api/settings/auth';
export default {
  mounted () {
    // this.getDeptList();
  },
  methods: {
    // handleClick (row) {
    //   console.log(row);
    // },
    // getDeptList (params) {
    //   let options = params || {};
    //   authApi.getDeptList(options).then((result) => {
    //     if (result.code === 1) {
    //       this.deptList = result.data;
    //     } else {
    //       this.$message.error(result.msg);
    //     }
    //   });
    // },
    // upload () {
    //   var fileData = new FormData();
    //   fileData.append('file', this.$refs.fileInput.files[0])
    //   axios.post('http://10.68.19.13:8080/ot/otcount/uploadExcel', fileData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data"
    //     }
    //   })
    // }
  },
  data () {
    return {
      deptList: []
    };
  }
};
</script>
<style lang="less">
.mrg10 {
  margin: 10px;
}

</style>
