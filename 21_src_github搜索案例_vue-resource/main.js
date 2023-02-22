import Vue from 'vue'

import App from './App.vue'
import Vueresource from 'vue-resource'
//引入插件
Vue.config.productionTip=false
Vue.use(Vueresource)

new Vue({
    el:'#app',
    render:h=>h(App),
    beforeCreate(){
        Vue.prototype.$bus=this
    }
})