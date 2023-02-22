import Vue from 'vue'

import App from './App.vue'

Vue.config.productionTip=false

// const Demo=Vue.extend({})
// const d=new Demo()
// Vue.prototype.x=d

new Vue({
    el:'#app',
    render:h=>h(App),
    
})
