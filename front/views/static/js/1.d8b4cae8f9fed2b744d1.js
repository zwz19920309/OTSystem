webpackJsonp([1],{"26HL":function(e,t,a){"use strict";a.d(t,"a",function(){return n}),a.d(t,"c",function(){return i}),a.d(t,"b",function(){return l});var s=a("tNif"),n=function(e){return s.a.post("info/applyOt",e,s.a.FULL_LOADING)},i=function(e){return s.a.post("info/getPersonalInfo",e,s.a.TABLE_LOADING)},l=function(e){return s.a.post("info/deleteInfo",e,s.a.TABLE_LOADING)}},"2jM5":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("byj+"),n=a("26HL"),i=a("js1Z"),l=a("yKaH"),o=a("/P1q"),r={components:{otInfoDetailDialog:l.default},methods:{dataDetail:function(e,t){this.$refs.detailDialog.open(e,t)},search:function(){this.getData()},handleSizeChange:function(e){this.pageSize=e,this.getData()},handleCurrentChange:function(e){this.page=e,this.getData()},getData:function(){var e=this,t={id:this.$store.state.user.userInfo.id,page:this.page,pageSize:this.pageSize,month:this.searchDate};Object(n.c)(t).then(function(t){if(1===t.code&&t.data)return e.tableData=t.data.rows,void(e.count=t.data.count);e.$message.error(t.msg)}).catch(function(e){console.log(e)})},updateData:function(e){this.getData()},deleteData:function(e){var t=this;this.$confirm("是否将该申请强制撤回(删除不可恢复)").then(function(a){Object(n.b)({id:e}).then(function(e){if(1===e.code)return t.$message({message:e.msg,type:"success"}),void t.getData();t.$message.error(e.msg)})}).catch(function(e){})},dateFormat:function(e,t){var a=e[t.property],n=s.a.parseDate(a);return s.a.formatDate(n,"yyyy-MM-dd hh:mm")}},data:function(){return{searchDate:"",tableData:[],count:0,pageSize:5,page:1,dateVal:[],formLabelWidth:"100px",options:o.a}},created:function(){var e=this;this.getData(),i.a.$on("applySuccess",function(){e.getData()})}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"mrg10 t-left"},[a("span",{staticClass:"demonstration"},[e._v("月份")]),e._v(" "),a("el-date-picker",{attrs:{type:"month",placeholder:"选择月"},on:{change:e.search},model:{value:e.searchDate,callback:function(t){e.searchDate=t},expression:"searchDate"}})],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.$store.state.common.tableLoading,expression:"$store.state.common.tableLoading"}],staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{label:"编号",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.$index+1+e.pageSize*(e.page-1)))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"申请者"}}),e._v(" "),a("el-table-column",{attrs:{prop:"deptName",label:"部门","min-width":"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"startTime",label:"开始时间",formatter:e.dateFormat,"min-width":"120"}}),e._v(" "),a("el-table-column",{attrs:{prop:"endTime",label:"结束时间",formatter:e.dateFormat,"min-width":"120"}}),e._v(" "),a("el-table-column",{attrs:{prop:"days",label:"总时长"}}),e._v(" "),a("el-table-column",{attrs:{prop:"holidays",label:"调休时长"}}),e._v(" "),a("el-table-column",{attrs:{prop:"reason",label:"加班事由","min-width":"150"}}),e._v(" "),a("el-table-column",{attrs:{label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\r\n       "+e._s(e.options["status"+t.row.status].name)+"\r\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"t_dept.checkerName",label:"审批人"}}),e._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作","min-width":"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.dataDetail(t.row)}}},[e._v("详情")]),e._v(" "),0===t.row.status?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.dataDetail(t.row,!0)}}},[e._v("编辑")]):e._e(),e._v(" "),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.deleteData(t.row.id)}}},[e._v("强制撤回")])]}}])})],1),e._v(" "),a("el-pagination",{staticClass:"overHidden t-right mrg10",attrs:{background:"",layout:"sizes, prev, pager, next","page-sizes":[5,10,20,50],"page-size":e.pageSize,total:e.count},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}),e._v(" "),a("ot-info-detail-dialog",{ref:"detailDialog",on:{callback:e.updateData}})],1)},staticRenderFns:[]};var d=a("X4nt")(r,c,!1,function(e){a("vRyr")},null,null);t.default=d.exports},QpbR:function(e,t,a){var s=a("iDuR");"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);a("5ten")("cfe117c2",s,!0,{})},XOUc:function(e,t,a){(e.exports=a("I71c")(!0)).push([e.i,"\n.mrg10 {\n  margin: 10px;\n}\n","",{version:3,sources:["F:/OTProduction/app/src/views/ot/ot-myot.vue"],names:[],mappings:";AACA;EACE,aAAa;CACd",file:"ot-myot.vue",sourcesContent:["\n.mrg10 {\n  margin: 10px;\n}\n"],sourceRoot:""}])},Zmd7:function(e,t,a){"use strict";var s=a("tNif"),n={getCheckedList:function(e){return s.a.post("examina/getCheckedList",e,s.a.TABLE_LOADING)},getExaminaList:function(e){return s.a.post("examina/getExaminaList",e,s.a.TABLE_LOADING)},changeExaminaStatus:function(e){return s.a.post("examina/changeExaminaStatus",e,s.a.FULL_LOADING)},passExaminaList:function(e){return s.a.post("examina/passExaminaList",e,s.a.FULL_LOADING)}};t.a=n},g8hR:function(e,t,a){"use strict";var s={SUCCESS:1,FAIL:-1,EMPTY:-2,EXCEPTION:-3,ERROR_DB:11,ERROR_PARAMS:12,checkHttpResult:function(e){return e&&e.code===s.SUCCESS}};t.a=s},iDuR:function(e,t,a){(e.exports=a("I71c")(!0)).push([e.i,"\n.reject-tip {\n  margin: 0 10px;\n  color: red;\n}\n","",{version:3,sources:["F:/OTProduction/app/src/views/ot/components/ot-info-detail-dialog.vue"],names:[],mappings:";AACA;EACE,eAAe;EACf,WAAW;CACZ",file:"ot-info-detail-dialog.vue",sourcesContent:["\n.reject-tip {\n  margin: 0 10px;\n  color: red;\n}\n"],sourceRoot:""}])},vRyr:function(e,t,a){var s=a("XOUc");"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);a("5ten")("682d91dc",s,!0,{})},yKaH:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("3cXf"),n=a.n(s),i=a("aA9S"),l=a.n(i),o=a("byj+"),r=a("/P1q"),c=a("TDFl"),d=a("Zmd7"),u=a("g8hR"),m=a("26HL"),p={data:function(){return{dialogFormVisible:!1,dateVal:[],formLabelWidth:"100px",isEdited:!1,options:r.a,selectedData:{t_dept:{}}}},methods:{open:function(e,t){var a=this;this.dialogFormVisible=!0,t&&(this.isEdited=t),this.selectedData=l()({},e),this.dateVal=[this.selectedData.startTime,this.selectedData.endTime],this.selectedData.operator&&Object(c.a)({account:this.selectedData.operator}).then(function(e){1===e.code&&e.data&&e.data[0]&&(a.selectedData.operator=e.data[0].realname)})},changeStatus:function(e,t){var a=this;"reject"===e?this.$prompt("请输入理由","提示",{confirmButtonText:"拒绝",cancelButtonText:"取消",inputPattern:/\S/,inputErrorMessage:"请输入拒绝理由"}).then(function(s){var i=s.value;console.log("@@##rejct :"+n()(t)),d.a.changeExaminaStatus({id:t.id,deptId:t.deptId,status:t.status,reason:t.reason,remark:i,holidays:t.holidays,startTime:a.selectedData.startTime,endTime:a.selectedData.endTime,days:a.selectedData.days,ctrl:e,rejectOwn:!0}).then(function(e){u.a.checkHttpResult(e)?(a.$emit("callback",a.selectedData),a.close()):a.$message.error(e.msg)})}).catch(function(){}):"pass"===e&&d.a.changeExaminaStatus({id:t.id,deptId:t.deptId,status:t.status,reason:t.reason,ctrl:e,holidays:t.holidays,startTime:this.selectedData.startTime,endTime:this.selectedData.endTime,days:this.selectedData.days}).then(function(e){u.a.checkHttpResult(e)?(a.$emit("callback",a.selectedData),a.close()):a.$message.error(e.msg)})},close:function(){this.dialogFormVisible=!1,this.selectedData={status:0,t_dept:{}},this.isEdited=!1},updateData:function(){var e=this;""===this.selectedData.holidays&&(this.selectedData.holidays=0),Object(m.a)(this.selectedData).then(function(t){if(e.dialogFormVisible=!1,1===t.code)return e.$emit("callback",e.selectedData),e.$refs.detailDialog.close(),void e.$message({message:"修改成功！",type:"success"});e.$message.error(t.msg)})},changeTime:function(e){this.selectedData.startTime=o.a.formatDate(e[0].getTime(),"yyyy-MM-dd hh:mm:ss"),this.selectedData.endTime=o.a.formatDate(e[1].getTime(),"yyyy-MM-dd hh:mm:ss"),this.selectedData.days=o.a.getValidHoliDays(e[0],e[1])}},created:function(){}},f={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-dialog",{attrs:{title:"详情",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t},close:e.close}},[a("el-form",[a("el-form-item",{attrs:{label:"编号","label-width":e.formLabelWidth}},[a("el-input",{attrs:{disabled:""},model:{value:e.selectedData.id,callback:function(t){e.$set(e.selectedData,"id",t)},expression:"selectedData.id"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"申请者","label-width":e.formLabelWidth}},[a("el-input",{attrs:{disabled:""},model:{value:e.selectedData.name,callback:function(t){e.$set(e.selectedData,"name",t)},expression:"selectedData.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"部门","label-width":e.formLabelWidth}},[e.selectedData.deptName?a("el-input",{attrs:{disabled:""},model:{value:e.selectedData.deptName,callback:function(t){e.$set(e.selectedData,"deptName",t)},expression:"selectedData.deptName"}}):e._e()],1),e._v(" "),a("el-form-item",{attrs:{label:"加班时间","label-width":e.formLabelWidth}},[a("el-date-picker",{attrs:{disabled:!e.isEdited,type:"datetimerange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",format:"yyyy-MM-dd HH:mm"},on:{change:e.changeTime},model:{value:e.dateVal,callback:function(t){e.dateVal=t},expression:"dateVal"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"总时长","label-width":e.formLabelWidth}},[a("el-input",{attrs:{disabled:""},model:{value:e.selectedData.days,callback:function(t){e.$set(e.selectedData,"days",t)},expression:"selectedData.days"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"调休时长","label-width":e.formLabelWidth}},[a("el-input",{attrs:{disabled:!e.isEdited},model:{value:e.selectedData.holidays,callback:function(t){e.$set(e.selectedData,"holidays",t)},expression:"selectedData.holidays"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"事由","label-width":e.formLabelWidth}},[a("el-input",{attrs:{disabled:!e.isEdited},model:{value:e.selectedData.reason,callback:function(t){e.$set(e.selectedData,"reason",t)},expression:"selectedData.reason"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"状态","label-width":e.formLabelWidth},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n      "+e._s(e.options["status"+e.selectedData.status].name)+" \n      "),11===e.selectedData.status||21===e.selectedData.status||31===e.selectedData.status?a("span",{staticClass:"reject-tip"},[e._v(" \n        (拒绝理由: \n             "),e.selectedData.remark1?a("span",[e._v(e._s(e.selectedData.operator)+":"+e._s(e.selectedData.remark1))]):e._e(),e._v(" "),e.selectedData.remark2?a("span",[e._v(e._s(e.selectedData.operator)+":"+e._s(e.selectedData.remark2))]):e._e(),e._v("\n       )\n      ")]):e._e()]}}])}),e._v(" "),a("el-form-item",{attrs:{label:"部门负责人","label-width":e.formLabelWidth}},[a("el-input",{attrs:{disabled:""},model:{value:e.selectedData.leaderName,callback:function(t){e.$set(e.selectedData,"leaderName",t)},expression:"selectedData.leaderName"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[!e.isEdited||1!==e.selectedData.status&&2!==e.selectedData.status&&3!==e.selectedData.status?e._e():a("el-button",{attrs:{type:"danger"},on:{click:function(t){e.changeStatus("reject",e.selectedData)}}},[e._v("审核拒绝")]),e._v(" "),!e.isEdited||11!==e.selectedData.status&&21!==e.selectedData.status&&31!==e.selectedData.status?e._e():a("el-button",{attrs:{type:"success"},on:{click:function(t){e.changeStatus("pass",e.selectedData)}}},[e._v("审核通过")]),e._v(" "),a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),e.isEdited?a("el-button",{attrs:{type:"primary"},on:{click:e.updateData}},[e._v("保 存")]):e._e()],1)],1)],1)},staticRenderFns:[]};var h=a("X4nt")(p,f,!1,function(e){a("QpbR")},null,null);t.default=h.exports}});
//# sourceMappingURL=1.d8b4cae8f9fed2b744d1.js.map