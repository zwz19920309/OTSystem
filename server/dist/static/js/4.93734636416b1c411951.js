webpackJsonp([4],{"+7PJ":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a("26HL"),n=a("eyK8"),i=a("byj+"),r=a("js1Z"),l={data:function(){var e=new Date,t=e.getFullYear(),a=e.getMonth(),o=e.getDate(),n=new Date(t,a,o,19,30,0),i=new Date(t,a,o,20,30,0);return{activeName:this.$route.name,dialogFormVisible:!1,form:{time:[n,i],totalTime:"1",reason:""},beginTime:new Date(t,a,o,19,30,0),endTime:new Date(t,a,o,20,30,0),datePeriod:"",rules:{time:[{validator:function(e,n,i){console.log("@@##validateTotalTime:"+n);var r=new Date(n[0].getFullYear(),n[0].getMonth(),n[0].getDate()),l=new Date(t,a,o),s=r.getDay(),m=l.getDay(),d=(r.getTime()-l.getTime())/864e5;d>3||d<-3||d>6&&5!==s&&1!==m?i(new Error("申请日期已超出范围（不得超过最近3天），如有疑问请联系项目人员!")):i()},trigger:"blur"}],reason:[{required:!0,message:"请输入加班原因",trigger:"blur"}]}}},methods:{handleClick:function(e,t){console.log(e,t),this.$router.push({name:e.name})},showApplicationModal:function(){this.dialogFormVisible=!0},applyOtDialog:function(){var e=this;this.form.beginTime=i.a.formatDate(this.form.time[0].getTime(),"yyyy-MM-dd hh:mm:ss"),this.form.endTime=i.a.formatDate(this.form.time[1].getTime(),"yyyy-MM-dd hh:mm:ss"),this.$refs.applyForm.validate(function(t){if(!t)return!1;var a=e.$store.state.user.userInfo;Object(o.a)({name:a.realname,userId:a.id,deptId:a.dept,startTime:e.form.beginTime,endTime:e.form.endTime,days:Math.floor(e.form.totalTime),holidays:e.form.holidays,reason:e.form.reason}).then(function(t){if(e.$refs.applyForm.resetFields(),e.dialogFormVisible=!1,1===t.code)return e.$message({message:t.msg,type:"success"}),void r.a.$emit("applySuccess");e.$message.error(t.msg)})})},changeTime:function(e){var t=new Date(e[1]-e[0]).getTime();this.form.totalTime=Math.floor(t/36e5)},downLoadExcel:function(){this.datePeriod=this.datePeriod?this.datePeriod:i.a.formatDate(new Date,"yyyy-MM-dd");var e=n.a.downloadExcelUrl+"?datePeriod="+this.datePeriod;window.open(e,"_blank")}},created:function(){var e=this;r.a.$on("changeAllOTDate",function(t){e.datePeriod=t})}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"f-right t-home-btngroup"},[a("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-download"},on:{click:e.downLoadExcel}},[e._v("导出")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-plus"},on:{click:e.showApplicationModal}},[e._v("申请")])],1),e._v(" "),a("el-tabs",{attrs:{type:"card"},on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"我的加班",name:"myot"}}),e._v(" "),a("el-tab-pane",{attrs:{label:"我的审批",name:"myexamine"}}),e._v(" "),a("el-tab-pane",{attrs:{label:"所有加班",name:"allovertimen"}})],1),e._v(" "),a("router-view"),e._v(" "),a("el-dialog",{attrs:{title:"申请",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"applyForm",staticClass:"t-form",attrs:{rules:e.rules,model:e.form,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"加班时间",prop:"time"}},[a("el-col",{attrs:{span:19}},[a("el-date-picker",{attrs:{type:"datetimerange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",format:"yyyy-MM-dd HH:mm"},on:{change:e.changeTime},model:{value:e.form.time,callback:function(t){e.$set(e.form,"time",t)},expression:"form.time"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"总时长",prop:"totalTime"}},[a("el-col",{attrs:{span:19}},[a("el-input",{attrs:{disabled:!0},model:{value:e.form.totalTime,callback:function(t){e.$set(e.form,"totalTime",t)},expression:"form.totalTime"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"调休时长",prop:"holidays"}},[a("el-col",{attrs:{span:19}},[a("el-input",{model:{value:e.form.holidays,callback:function(t){e.$set(e.form,"holidays",t)},expression:"form.holidays"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"事由",prop:"reason"}},[a("el-col",{attrs:{span:19}},[a("el-input",{attrs:{type:"textarea"},model:{value:e.form.reason,callback:function(t){e.$set(e.form,"reason",t)},expression:"form.reason"}})],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.$store.state.common.fullLoading},on:{click:e.applyOtDialog}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var m=a("VU/8")(l,s,!1,function(e){a("Wpz5")},null,null);t.default=m.exports},"26HL":function(e,t,a){"use strict";a.d(t,"a",function(){return n}),a.d(t,"c",function(){return i}),a.d(t,"b",function(){return r});var o=a("tNif"),n=function(e){return o.a.post("info/applyOt",e,o.a.FULL_LOADING)},i=function(e){return o.a.post("info/getPersonalInfo",e,o.a.TABLE_LOADING)},r=function(e){return o.a.post("info/deleteInfo",e,o.a.TABLE_LOADING)}},K0VR:function(e,t,a){(e.exports=a("FZ+f")(!0)).push([e.i,"\n.t-home-btngroup {\r\n  position: relative;\r\n  z-index: 1;\n}\n.t-form .el-date-editor--datetimerange.el-input__inner {\r\n  width: 100%;\n}\r\n","",{version:3,sources:["/Users/cninsure/workspace-zzb/NodeJS/OT-Application/app/src/views/ot/ot-home.vue"],names:[],mappings:";AACA;EACE,mBAAmB;EACnB,WAAW;CACZ;AACD;EACE,YAAY;CACb",file:"ot-home.vue",sourcesContent:["\n.t-home-btngroup {\r\n  position: relative;\r\n  z-index: 1;\n}\n.t-form .el-date-editor--datetimerange.el-input__inner {\r\n  width: 100%;\n}\r\n"],sourceRoot:""}])},Wpz5:function(e,t,a){var o=a("K0VR");"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);a("rjj0")("721d60d6",o,!0,{})},eyK8:function(e,t,a){"use strict";var o=a("tNif"),n={infoList:function(e){return o.a.post("overtimen/infoList",e,o.a.BUTTON_LOADING)},download:function(e){return o.a.get("overtimen/download",e,o.a.BUTTON_LOADING)},findDataByPage:function(e){return o.a.post("overtimen/findDataByPage",e,o.a.BUTTON_LOADING)},deleteData:function(e){return o.a.post("overtimen/deleteData",e,o.a.BUTTON_LOADING)},updateData:function(e){return o.a.post("overtimen/updateData",e,o.a.BUTTON_LOADING)},downloadExcelUrl:{ip:"//"+window.location.host}.ip+"/overtimen/download"};t.a=n}});
//# sourceMappingURL=4.93734636416b1c411951.js.map