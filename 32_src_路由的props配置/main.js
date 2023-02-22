import Vue from 'vue'

import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'

//引入插件
Vue.config.productionTip=false
Vue.use(VueRouter)

new Vue({
    el:'#app',
    render:h=>h(App),
    router:router
})
