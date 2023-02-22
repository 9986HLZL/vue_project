/* 该文件是整个项目的入口文件 */
//引入Vue
import Vue from 'vue'
//引入App组件，它是所有组件的父组件
import App from './App.vue'
//关闭生产提示
Vue.config.productionTip = false
/* 
  关于不同版本的Vue：

    1.vue.js与vue.runtime.xxx.js的区别：
      (1).前者是完整版的Vue，包含核心功能和模板解析器
      (2).后者是运行版本的Vue，只包含核心功能

    2.因为vue.runtime.xxx.js没有模板解析器，所有不能使用template配置项，需要使用render函数
      接收到的createElement函数去指定具体内容



*/
//创建Vue实例对象
new Vue({
  
  // template:`<h2>你好啊</h2>`
  // components:{App}
  //将App组件放入容器中
  render: h => h(App)
  
  
}).$mount('#app')

