import Vue from 'vue'

import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueParticles from 'vue-particles'
import './assets/global.css'
import axios from "axios"
import './mock/mockServer'
import './mock'
import './mock/english'

//引入插件
Vue.config.productionTip=false
Vue.use(VueRouter)
Vue.use(VueParticles)
// Vue.use(ElementUI);
Vue.use(ElementUI,{size:'small'});
Vue.prototype.$axios=axios;


new Vue({
    el:'#app',
    render:h=>h(App),
    beforeCreate(){
        Vue.prototype.$bus=this //安装全局事件总线，$bus就是当前应用的vm
    },
    router:router
})
