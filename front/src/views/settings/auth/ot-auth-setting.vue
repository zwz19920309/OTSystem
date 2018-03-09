<template>
 <div>
   <div class="auth-title">审批权限</div>
   <div class="auth-title"></div>
   <div>
    <el-row>
     <el-col :span="6">
       <div>
        <el-select v-model="sDeptIndex" @change="change" placeholder="请选择">
          <el-option v-for="item in deptList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
       </div>
     </el-col>
     <el-col :span="18">
       <div>
        <el-form :inline="true">  
          <el-form-item  label="部门负责人"  :label-width="formLabelWidth"><el-input disabled v-model="pDept.checkerName"></el-input></el-form-item>
            <el-form-item  label="审批人"  :label-width="formLabelWidth">
              <el-select  v-model="pDept.sAuthIndex"  placeholder="请选择" filterable  remote :remote-method="filterAuth">
                <el-option v-for="item in pDept.authList" :key="item.id" :label="item.realname" :value="item.id"></el-option>
              </el-select>
              <el-button type="primary" @click="changeDeptChecker(pDept)">确 认</el-button>
            </el-form-item>
        </el-form> 
        </div>
      </el-col>
    </el-row>
   </div>
  <div>
     <el-row v-if="childDeptList" :key="dept.id" v-for="(dept, index) in childDeptList ">
        <el-col :span="6">
           <div>
              <el-input v-model="dept.name"></el-input>  
           </div>
        </el-col>
       <el-col :span="18">
         <div @click="selectChildDept(index)">
           <el-form :inline="true">  
             <el-form-item  label="部门负责人"  :label-width="formLabelWidth"><el-input v-model="dept.leaderName" disabled></el-input></el-form-item>
             <el-form-item  label="审批人"  :label-width="formLabelWidth">
               <el-select  v-model="dept.sAuthIndex"  placeholder="请选择" filterable  remote :remote-method="filterChirdAuth" @change="seleChildAuth">
                 <el-option v-for="item in dept.authList" :key="item.id" :label="item.realname" :value="item.id"></el-option>
               </el-select>
               <el-button type="primary" @click="changeDeptChecker(dept)">确 认</el-button>
             </el-form-item>
           </el-form>
         </div>
       </el-col>
     </el-row>   
  </div>
  </div>
</template>
<script>
import authApi from '@/common/api/settings/auth';
import { fuzzySearch } from '@/common/api/user';

export default {
  mounted () {
    this.getDeptList();
  },
  methods: {
    // 获取部门列表
    getDeptList (params) {
      let options = params || {};
      authApi.getDeptList(options).then((result) => {
        if (result.code === 1) {
          this.deptList = result.data;
          if (this.deptList && this.deptList[0]) {
            this.sDeptIndex = this.deptList[0].id;
            this.pDept = this.deptList[0];
            this.pDept.sDeptIndex = this.deptList[0].id;
            if (this.deptList[0].checkerName) {
              // 获取默认部门的负责人列表
              this.getAuthList({ realname: this.deptList[0].checkerName });
            }
            this.getChildDeptList({ parent: this.sDeptIndex });
          }
        } else {
          this.$message.error(result.msg);
        }
      });
    },
    // 获取负责人列表
    getAuthList (params) {
      fuzzySearch(params).then((result) => {
        if (result.code === 1) {
          this.pDept.authList = result.data;
          if (this.pDept.authList && this.pDept.authList[0]) {
            this.pDept.sAuthIndex = this.pDept.authList[0].id;
            this.pDept = Object.assign({}, this.pDept);
          }
        } else {
          this.$message.error(result.msg);
        }
      });
    },
    // 获取子部门
    getChildDeptList (params) {
      let options = params || {};
      authApi.getDeptList(options).then((result) => {
        if (result.code === 1) {
          this.childDeptList = result.data;
          this.childDeptList.forEach((dept, index) => {
            if (dept && dept.checkerName) {
              // 获取子部门的负责人列表
              fuzzySearch({ realname: dept.checkerName }).then((result) => {
                if (result.code === 1) {
                  if (result.data && result.data[0]) {
                    dept.authList = result.data;
                    dept.sAuthIndex = result.data[0].id;
                    this.$set(this.childDeptList, index, dept);
                  }
                }
              });
            }
          });
        } else {
          this.$message.error(result.msg);
        }
      });
    },
    // 模糊查询父部门用户列表
    filterAuth (search) {
      if (search) {
        console.log('@parent:Search: ' + search);
        setTimeout(() => {
          fuzzySearch({ account: search, realname: search }).then((result) => {
            if (result.code === 1) {
              this.pDept.authList = result.data;
              this.pDept = Object.assign({}, this.pDept);
            }
          });
        }, 200);
      }
    },
    // 模糊查询子部门用户列表
    filterChirdAuth (search) {
      if (search) {
        setTimeout(() => {
          fuzzySearch({ account: search, realname: search }).then((result) => {
            if (result.code === 1) {
              this.childDeptList[this.sChildDeptIndex].authList = result.data;
              this.childDeptList = Object.assign({}, this.childDeptList);
            }
          });
        }, 200);
      }
    },
    change (id) {
      let dept = this.deptList.find((item) => {
        return item.id === id;
      });
      this.pDept = dept;
      if (dept.checkerName) {
        this.getAuthList({ realname: dept.checkerName });
      }
      this.getChildDeptList({ parent: dept.id });
    },
    selectAuth (id) {
      this.pDept.sAuthIndex = id;
    },
    selectChildDept (index) {
      this.sChildDeptIndex = index;
    },
    seleChildAuth (id) {
      let auth = this.childDeptList[this.sChildDeptIndex].authList.find((item) => {
        return item.id === id;
      });
      this.childDeptList[this.sChildDeptIndex].sAuthIndex = auth.id;
      this.childDeptList = Object.assign({}, this.childDeptList);
    },
    // 确认部门负责人
    changeDeptChecker (dept) {
      if (!dept || !dept.authList) {
        this.$message.error('请选择部门或者部门审批人');
        return;
      }
      let auth = dept.authList.find((item) => {
        return item.id === dept.sAuthIndex;
      });
      authApi.updateDept({ id: dept.id, checker: auth.account, checkerName: auth.realname }).then((result) => {
        if (result.code === 1) {
          this.$message(result.msg);
        } else {
          this.$message.error(result.msg);
        }
      });
    }
  },
  data () {
    return {
      deptList: [],
      pDept: { authList: [], sDeptIndex: '', sAuthIndex: null },
      childDeptList: [],
      sDeptIndex: '',
      sAuthIndex: '',
      sChildDeptIndex: '',
      formLabelWidth: '120px'
    };
  }
};
</script>
</script>
<style lang="less">
.auth-title {
  margin: 20px 5px;
}
.mrg10 {
  margin: 10px;
}
.el-row::after,
.el-row::before {
  display: initial;
}
</style>
