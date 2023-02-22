//该文件用于创建Vuex中最为核心的store
import axios from 'axios'
import { nanoid } from 'nanoid'
import Vue from 'vue'
import Vuex from 'vuex'

const countOptions={
    namespaced:true,//开启命名空间
    actions:{
        jiaOdd(context,value){
            if(context.state.sum%2){
             context.commit('JIA',value)
            }
        },
        jiaWait(context,value){
            setTimeout(()=>{
                context.commit('JIA',value)
            },500)
        }, 
    },
    mutations:{
        JIA(state,value){
            // console.log('mutations中的JIA被调用了');
            state.sum += value
        },
        JIAN(state,value){
            // console.log('mutations中的JIAN被调用了');
            state.sum -= value
        },
    },
    state:{
        sum:0,
        school:'尚硅谷',
        subject:'前端开发',
    },
    getters:{
        bigSum(state){
            return state.sum*10
        }
    }
}
const personOptions={
    namespaced:true,
    actions:{
        addPersonWang(context,value){
            if(value.name.indexOf('王')===0){
                context.commit('ADD_PERSON',value)
            }
            else{
                alert('添加的人必须姓王！')
            }
        },
        addPersonServer(context){
            axios.get('https://api.uixsj.cn/hitokoto/get?type=social').then(
                response=>{
                    context.commit('ADD_PERSON',{id:nanoid(),name:response.data})
                },
                error=>{
                    alert(error.message)
                }
            )
        }
    },
    mutations:{
        ADD_PERSON(state,value){
            state.personList.unshift(value)
        }
    },
    state:{
        personList:[
            {id:'001',name:'张三'}
        ]
    },
    getters:{
        firstPersonName(state){
           return state.personList[0].name
        }
    }
}


Vue.use(Vuex)
//创建并暴露store
export default new Vuex.Store({
    modules:{
        countOptions,
        personOptions
    }
})
// //暴露（导出）store
// export default store