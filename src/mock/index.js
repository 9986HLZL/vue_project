const Mock = require('mockjs')
import {getMessageList} from './mockDataList'
Mock.mock(/\/api\/messages/,'get',getMessageList)

Mock.mock(/\/api\/handleSave/,'post',(options)=>{
    let data = JSON.parse(options.body).editData;
    console.log('data',data);
    if(data.isEdit){
        console.log('startArr',startArr);
        for (let i = 0; i < startArr.length; i++) {
            if (startArr[i].id == data.form.id) {
                console.log('data.form',data.form);
                startArr.splice(i,1,data.form)
                
                console.log('编辑被调用了');
            }
        }
    } else{
        startArr.unshift(data.form)
        console.log('添加被调用了');
    }
    
    return 0;
})

const getList = getMessageList()
var startArr = getList.data

Mock.mock(/\/api\/messagesPage/,'post',(options)=>{
    let info = JSON.parse(options.body).params.info
    if (!info.pageNum){
        info.pageNum=1
    }
    
    let newArr = [];

    // if(info.form.isMale==='0' || info.form.isMale==='1'){
    //     console.log('添加被调用了');
    //     startArr.unshift(info.form)
    // }
    
    if (startArr.length > 0) {
        let pageNum = (info.pageNum -1) * info.pageSize;
        
        //计算截取的数组长度，如果用splice会导致原数组数据丢失
        let num = info.pageNum * info.pageSize;
        
        for (let i = pageNum; i < num; i++) {
            //全部数据的数组长度不能为空
            if (startArr[i] != undefined) {
                //查询姓名和性别
                if(info.searchKey && info.isMale){
                    if (startArr[i].name.indexOf(info.searchKey)!=-1 && info.isMale==startArr[i].isMale){
                        newArr.push(startArr[i]);
                    }
                } else if ((info.searchKey && startArr[i].name.indexOf(info.searchKey)!=-1)||(info.isMale && info.isMale==startArr[i].isMale)) {
    
                    
                    newArr.push(startArr[i]);
                }   

                //查询条件为空时添加所有数据到新数组
                if (!info.searchKey && !info.isMale) {
                    newArr.push(startArr[i]);
                }
            }
        }
        
        let page={ list: newArr, pageSize:info.pageSize,pageNum:info.pageNum, total: startArr.length };
        return page;
        
    }
    let page={ list: startArr, pageSize:info.pageSize,pageNum:info.pageNum, total: startArr.length };
    return page;
})
Mock.mock(/\/api\/handleDelete/,'post', (options)=> {
    let data = JSON.parse(options.body).data;
    for (let i = 0; i < startArr.length; i++) {
        if (startArr[i].id == data.row.id) {
            startArr.splice(i, 1);
        }
    }
    
    return 0;
})

