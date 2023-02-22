//该文件用于创建Vuex中最为核心的store
import Vue from 'vue'
import Vuex from 'vuex'
//准备actions——用于响应组件中的动作
const actions={
    // jia(context,value){
    //     // console.log('actions中的jia被调用了');
    //     context.commit('JIA',value)
    // },
    // jian(context,value){
    //     // console.log('actions中的jian被调用了');
    //     context.commit('JIAN',value)
    // },
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
}
//准备mutations——用于操作数据（state）
const mutations={
    JIA(state,value){
        // console.log('mutations中的JIA被调用了');
        state.sum += value
    },
    JIAN(state,value){
        // console.log('mutations中的JIAN被调用了');
        state.sum -= value
    }
}
//准备state——用于存储数据
const state={sum:0,school:'尚硅谷',subject:'前端开发'}
const getters={
    bigSum(state){
        return state.sum*10
    }
}
Vue.use(Vuex)
//创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})
// //暴露（导出）store
// export default store