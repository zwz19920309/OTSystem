const checkStatus = {
  'status0': { status: 0, to: 1, name: '未审核', reject: 11 }, // 未审核状态
  'status1': { status: 1, to: 3, name: '二级部门已审核', grade: 2, reject: 31 }, // 部门已审核 grade 二级部门
  'status11': { status: 11, name: '二级部门拒绝' }, // 部门拒绝审核
  'status2': { status: 2, to: 3, name: '项目已审核' }, // 项目已审核
  'status21': { status: 21, name: '项目拒绝' }, // 项目拒绝审核
  'status3': { status: 3, to: '4', name: '一级部门已审核', grade: 1 }, // CTO审核 grade一级部门
  'status31': { status: 31, name: '一级部门拒绝' }, // CTO拒绝审核
  'status4': { status: 4, name: '完成' }
};

export default checkStatus;
