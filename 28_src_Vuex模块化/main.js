import Vue from 'vue'

import App from './App.vue'

//引入store
import store from './store'
//引入插件
Vue.config.productionTip=false


new Vue({
    el:'#app',
    render:h=>h(App),
    store,
    beforeCreate(){
        Vue.prototype.$bus=this
    }
})
