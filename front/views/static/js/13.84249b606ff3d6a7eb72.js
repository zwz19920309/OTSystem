webpackJsonp([13,14],{"26HL":function(e,t,a){"use strict";a.d(t,"a",function(){return i}),a.d(t,"c",function(){return l}),a.d(t,"b",function(){return n});var s=a("tNif"),i=function(e){return s.a.post("info/applyOt",e,s.a.FULL_LOADING)},l=function(e){return s.a.post("info/getPersonalInfo",e,s.a.TABLE_LOADING)},n=function(e){return s.a.post("info/deleteInfo",e,s.a.TABLE_LOADING)}},QpbR:function(e,t,a){var s=a("iDuR");"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);a("5ten")("cfe117c2",s,!0,{})},TDFl:function(e,t,a){"use strict";a.d(t,"b",function(){return i}),a.d(t,"a",function(){return l}),a.d(t,"c",function(){return n});var s=a("tNif"),i=function(e){return s.a.post("user/login",e,s.a.BUTTON_LOADING)},l=function(e){return s.a.post("user/fuzzySearch",e,s.a.BUTTON_LOADING)},n=function(e){return s.a.post("user/logout",e,s.a.BUTTON_LOADING)}},Zmd7:function(e,t,a){"use strict";var s=a("tNif"),i={getCheckedList:function(e){return s.a.post("examina/getCheckedList",e,s.a.TABLE_LOADING)},getExaminaList:function(e){return s.a.post("examina/getExaminaList",e,s.a.TABLE_LOADING)},changeExaminaStatus:function(e){return s.a.post("examina/changeExaminaStatus",e,s.a.FULL_LOADING)},passExaminaList:function(e){return s.a.post("examina/passExaminaList",e,s.a.FULL_LOADING)}};t.a=i},g8hR:function(e,t,a){"use strict";var s={SUCCESS:1,FAIL:-1,EMPTY:-2,EXCEPTION:-3,ERROR_DB:11,ERROR_PARAMS:12,checkHttpResult:function(e){return e&&e.code===s.SUCCESS}};t.a=s},iDuR:function(e,t,a){(e.exports=a("I71c")(!0)).push([e.i,"\n.reject-tip {\n  margin: 0 10px;\n  color: red;\n}\n","",{version:3,sources:["F:/OTProduction/app/src/views/ot/components/ot-info-detail-dialog.vue"],names:[],mappings:";AACA;EACE,eAAe;EACf,WAAW;CACZ",file:"ot-info-detail-dialog.vue",sourcesContent:["\n.reject-tip {\n  margin: 0 10px;\n  color: red;\n}\n"],sourceRoot:""}])},yKaH:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("3cXf"),i=a.n(s),l=a("aA9S"),n=a.n(l),d=a("byj+"),o=a("/P1q"),c=a("TDFl"),r=a("Zmd7"),u=a("g8hR"),m=a("26HL"),f={data:function(){return{dialogFormVisible:!1,dateVal:[],formLabelWidth:"100px",isEdited:!1,options:o.a,selectedData:{t_dept:{}}}},methods:{open:function(e,t){var a=this;this.dialogFormVisible=!0,t&&(this.isEdited=t),this.selectedData=n()({},e),this.dateVal=[this.selectedData.startTime,this.selectedData.endTime],this.selectedData.operator&&Object(c.a)({account:this.selectedData.operator}).then(function(e){1===e.code&&e.data&&e.data[0]&&(a.selectedData.operator=e.data[0].realname)})},changeStatus:function(e,t){var a=this;"reject"===e?this.$prompt("请输入理由","提示",{confirmButtonText:"拒绝",cancelButtonText:"取消",inputPattern:/\S/,inputErrorMessage:"请输入拒绝理由"}).then(function(s){var l=s.value;console.log("@@##rejct :"+i()(t)),r.a.changeExaminaStatus({id:t.id,deptId:t.deptId,status:t.status,reason:t.reason,remark:l,holidays:t.holidays,startTime:a.selectedData.startTime,endTime:a.selectedData.endTime,days:a.selectedData.days,ctrl:e,rejectOwn:!0}).then(function(e){u.a.checkHttpResult(e)?(a.$emit("callback",a.selectedData),a.close()):a.$message.error(e.msg)})}).catch(function(){}):"pass"===e&&r.a.changeExaminaStatus({id:t.id,deptId:t.deptId,status:t.status,reason:t.reason,ctrl:e,holidays:t.holidays,startTime:this.selectedData.startTime,endTime:this.selectedData.endTime,days:this.selectedData.days}).then(function(e){u.a.checkHttpResult(e)?(a.$emit("callback",a.selectedData),a.close()):a.$message.error(e.msg)})},close:function(){this.dialogFormVisible=!1,this.selectedData={status:0,t_dept:{}},this.isEdited=!1},updateData:function(){var e=this;""===this.selectedData.holidays&&(this.selectedData.holidays=0),Object(m.a)(this.selectedData).then(function(t){if(e.dialogFormVisible=!1,1===t.code)return e.$emit("callback",e.selectedData),e.$refs.detailDialog.close(),void e.$message({message:"修改成功！",type:"success"});e.$message.error(t.msg)})},changeTime:function(e){this.selectedData.startTime=d.a.formatDate(e[0].getTime(),"yyyy-MM-dd hh:mm:ss"),this.selectedData.endTime=d.a.formatDate(e[1].getTime(),"yyyy-MM-dd hh:mm:ss"),this.selectedData.days=d.a.getValidHoliDays(e[0],e[1])}},created:function(){}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-dialog",{attrs:{title:"详情",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t},close:e.close}},[a("el-form",[a("el-form-item",{attrs:{label:"编号","label-width":e.formLabelWidth}},[a("el-input",{attrs:{disabled:""},model:{value:e.selectedData.id,callback:function(t){e.$set(e.selectedData,"id",t)},expression:"selectedData.id"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"申请者","label-width":e.formLabelWidth}},[a("el-input",{attrs:{disabled:""},model:{value:e.selectedData.name,callback:function(t){e.$set(e.selectedData,"name",t)},expression:"selectedData.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"部门","label-width":e.formLabelWidth}},[e.selectedData.deptName?a("el-input",{attrs:{disabled:""},model:{value:e.selectedData.deptName,callback:function(t){e.$set(e.selectedData,"deptName",t)},expression:"selectedData.deptName"}}):e._e()],1),e._v(" "),a("el-form-item",{attrs:{label:"加班时间","label-width":e.formLabelWidth}},[a("el-date-picker",{attrs:{disabled:!e.isEdited,type:"datetimerange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",format:"yyyy-MM-dd HH:mm"},on:{change:e.changeTime},model:{value:e.dateVal,callback:function(t){e.dateVal=t},expression:"dateVal"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"总时长","label-width":e.formLabelWidth}},[a("el-input",{attrs:{disabled:""},model:{value:e.selectedData.days,callback:function(t){e.$set(e.selectedData,"days",t)},expression:"selectedData.days"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"调休时长","label-width":e.formLabelWidth}},[a("el-input",{attrs:{disabled:!e.isEdited},model:{value:e.selectedData.holidays,callback:function(t){e.$set(e.selectedData,"holidays",t)},expression:"selectedData.holidays"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"事由","label-width":e.formLabelWidth}},[a("el-input",{attrs:{disabled:!e.isEdited},model:{value:e.selectedData.reason,callback:function(t){e.$set(e.selectedData,"reason",t)},expression:"selectedData.reason"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"状态","label-width":e.formLabelWidth},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n      "+e._s(e.options["status"+e.selectedData.status].name)+" \n      "),11===e.selectedData.status||21===e.selectedData.status||31===e.selectedData.status?a("span",{staticClass:"reject-tip"},[e._v(" \n        (拒绝理由: \n             "),e.selectedData.remark1?a("span",[e._v(e._s(e.selectedData.operator)+":"+e._s(e.selectedData.remark1))]):e._e(),e._v(" "),e.selectedData.remark2?a("span",[e._v(e._s(e.selectedData.operator)+":"+e._s(e.selectedData.remark2))]):e._e(),e._v("\n       )\n      ")]):e._e()]}}])}),e._v(" "),a("el-form-item",{attrs:{label:"部门负责人","label-width":e.formLabelWidth}},[a("el-input",{attrs:{disabled:""},model:{value:e.selectedData.leaderName,callback:function(t){e.$set(e.selectedData,"leaderName",t)},expression:"selectedData.leaderName"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[!e.isEdited||1!==e.selectedData.status&&2!==e.selectedData.status&&3!==e.selectedData.status?e._e():a("el-button",{attrs:{type:"danger"},on:{click:function(t){e.changeStatus("reject",e.selectedData)}}},[e._v("审核拒绝")]),e._v(" "),!e.isEdited||11!==e.selectedData.status&&21!==e.selectedData.status&&31!==e.selectedData.status?e._e():a("el-button",{attrs:{type:"success"},on:{click:function(t){e.changeStatus("pass",e.selectedData)}}},[e._v("审核通过")]),e._v(" "),a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),e.isEdited?a("el-button",{attrs:{type:"primary"},on:{click:e.updateData}},[e._v("保 存")]):e._e()],1)],1)],1)},staticRenderFns:[]};var h=a("X4nt")(f,p,!1,function(e){a("QpbR")},null,null);t.default=h.exports}});
//# sourceMappingURL=13.84249b606ff3d6a7eb72.js.map