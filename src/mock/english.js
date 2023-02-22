import Mock from 'mockjs'
var englishArr = [];
//保存英文单词
Mock.mock('/addEnglish', /post/i,(options) => {
    let english = JSON.parse(options.body).params.english;
    if (english.noid == null) {
        english.noid = Mock.Random.increment();
        englishArr.push(english);
    } else {
        for (let i = 0; i < englishArr.length; i++) {
            if (englishArr[i].noid == english.noid) {
                englishArr.splice(i, 1);
                englishArr.push(english);
            }
        }
    }
    return 0;
});

//获取所有英文单词
Mock.mock("/getEnglishList", /post/i, (options)=> {
    let info = JSON.parse(options.body).params.info;
    if (!info.pageNum) {
        info.pageNum = 1;
    }
    let newArr = [];
    // pageNum, pageSize, searchKey
    // console.log("截取指定元素："+newArr.length)
    //englishArr.splice((info.pageNum -1) * info.pageSize, info.pageSize)
    if (englishArr.length > 0) {
        let pageNum = (info.pageNum -1) * info.pageSize;
        console.log(pageNum+"--"+info.pageSize)
        //计算截取的数组长度，如果用splice会导致原数组数据丢失
        let num = info.pageNum * info.pageSize;
        console.log(num);
        for (let i = pageNum; i < num; i++) {
            //全部数据的数组长度不能为空
            if (englishArr[i] != undefined) {
                //查询条件为单词时直接将符合的数据添加到新数组内
                if (info.searchKey && !englishArr[i].world.indexOf(info.searchKey)) {
                    console.log("查询条件："+info.searchKey)
                    newArr.push(englishArr[i]);
                }

                //查询条件为中文时将符合的数据添加到新数组内
                if (info.searchKey && !englishArr[i].chinese.indexOf(info.searchKey)) {
                    console.log("查询条件："+info.searchKey)
                    newArr.push(englishArr[i]);
                }

                //查询条件为空时添加所有数据到新数组
                if (!info.searchKey) {
                    newArr.push(englishArr[i]);
                }
            }
        }
        console.log(newArr)
        let page={ list: newArr, pageSize: 2, total: englishArr.length };
        return page;
    }
    let page={ list: englishArr, pageSize: 2, total: englishArr.length };
    return page;
});

//删除英文单词
Mock.mock("/deleteEnglish", /post/i, (options)=> {
    let english = JSON.parse(options.body).params.english;
    for (let i = 0; i < englishArr.length; i++) {
        if (englishArr[i].noid == english.noid) {
            englishArr.splice(i, 1);
        }
    }
    return 0;
})
