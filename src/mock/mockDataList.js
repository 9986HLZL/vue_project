const Mock=require('mockjs')
// const Random=Mock.Random

const messageList=Mock.mock({
  'data|30':[
    {
      id: '@id',//随机id
      name: '@cname',//随机名称
      nickName: '@last',//随机昵称
      phone: /^1[34578]\d{9}$/,//随机电话号码
      'age|11-99': 1,//年龄
      address: '@county(true)',//随机地址
      isMale: '@boolean',//随机性别
    }
  ]
})
export function getMessageList(){
  return {
    code:200,
    data:messageList.data
  }
}

