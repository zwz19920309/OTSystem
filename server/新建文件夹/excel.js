const xlsx = require('node-xlsx');  
const fs = require('fs');  

const create = function (tname, jsonArr, colnames) {
    //json数组转换对应excel数组
    function trurnToExcelData(dataJson,cols) {
        //列表名称
        if(cols instanceof Array){
            data.push(cols);
        }
        let data=[];
        for(let n in dataJson)
        {
            let arr=[];
            let value=dataJson[n];
            for(var m in value){
                arr.push(value[m]);
            }
            data.push(arr);
        }
        return data;
     }
    if(!(jsonArr && jsonArr instanceof Array)) {
        return {error:'jsonArr必须是数组'};
    }
    let info = [{ name: tname,data:(trurnToExcelData(jsonArr,colnames))}];
    let buffer = xlsx.build(info);  
    return buffer; 
}  

module.exports = {
    create
};
