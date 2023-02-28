# 笔记
提示：这个项目是我学习Vue时做笔记和练手的，后台管理系统的文件照样在src中；Node_js中是一个简单服务器js文件，没什么用；src中的server文件夹就是我的Node.js后台文件夹；README.md主要内容就是我的笔记和后期做项目时记得一些东西，有需要的可以参考。
## 修改配置属性
在vue.config.js中配置，参考(https://cli.vuejs.org/config/).

## ref属性
    1.被用来给元素或子组件注册引用信息（id的替代）
    2.应用在HTML标签上获取的是真实DOM元素，应用在组件标签上获取的是组件实例对象（vc）
    3.使用方式：
        打标识：<h1 ref="xxx"></h1> 或 <School ref="xxx"/>
        获取：this.$refs.xxx
## 配置项props
    功能：让组件接收外部传过来的数据
        (1).传递数据：
            <Demo name="xxx"/>
        (2).接收数据：
            第一种：
                props:['name','sex','age'],//简单声明接收数据
            第二种：
                //接收的同时对数据进行类型限制
                props:{
                    name:String,
                    sex:String,
                    age:Number
                }
            第三种：
                //接收的同时对数据进行类型限制+默认值的指定+必要性的限制
                props:{
                    name:{
                        type:String,
                        required:true
                    },
                    sex:{
                        type:String,
                        required:true
                    },
                    age:{
                        type:Number,
                        default:99
                    },
                }
    备注：props是只读的，如果修改就会发出警告，若业务需求更改，那么复制props的内容到data中一份，
          然后修改data中的数据
## mixin(混入)
    功能：可以把多个组件共用的配置提取成一个混入对象
    使用方式：
        第一步定义混入，例如：
            {
                data(){...},
                methods:{...},
                mounted(){...}
                ...
            }
        第二步使用混入，例如：
            (1).全局混入：Vue.mixin(xxx)
            (2).局部混入：minxins:['xxx']
## 插件

    功能：用于增强Vue
    本质：包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据。
    定义插件：
            export default{
        install(Vue,x,y,z){
            console.log(x,y,z);
            //定义全局过滤器
            Vue.filter('mySlice',function(value){
            return value.slice(0,4)
            })
            //自定义全局指令
            Vue.directive('fbind',{
                //指令与元素成功绑定时（一上来）
                bind(element,binding){
                    element.value=binding.value
                },
                //指令所在元素被插入页面时
                inserted(element,binding){
                    element.focus()
                },
                //数据更新，指令所在的模板被重新解析时
                update(element,binding){
                    element.value=binding.value
                }
            })
            //定义混入
            Vue.mixin({
                data(){
                    return {
                        x:1,
                        y:2
                    }
                }
            })
            //添加实例方法
            Vue.prototype.hello=()=>{
                alert('你好啊')
            }

        }
    }
    调用插件：import plugins from './plugins'
    使用插件：Vue.use()
## scoped样式
    作用：让样式在局部中生效，防止冲突。
    写法：<style scoped>
## 总结TodoList案例：
    1.组件化编码流程：
        (1).拆分静态组件：组件要按照功能点拆分，命名不要与HTML元素冲突。
        (2).实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：
            1).一个组件在用：放在组件自身即可。
            2).一些组件在用：放在它们共同的父组件上（状态提升）。
        (3).实现交互：从绑定事件开始。

    2.props适用于：
        (1).父组件==》子组件 通信
        (2).子组件==》父组件 通信（要求父组件先给子一个函数）
    3.使用v-model时要注意：v-model绑定的值不能是props传过来的值，因为props是不可以被修改的！
    4.props传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但不推荐这样做。
## webStorage
    1.存储内容大小一般支持5MB左右（不同浏览器可能还不一样）
    2.浏览器通过Window.sessionStorage和Window.localStorage属性来实现本地存储
    3.相关API：
        xxxStorage.setItem('key','value')       添加
        xxxStorage.getItem('key')               读取
        xxxStorage.removeItem('key')            删除   
        xxxStorage.clear()                      清空

    4.备注：
        1.sessionStorage存储的内容会随浏览器窗口关闭而消失
        2.localStorage存储的内容，需要手动清除才会消失
        3.xxxStorage.getItem('xxx')如果xxx对应的value获取不到，那么getItem的返回值是null。
        4.JSON.parse(null)的结果依然是null。
## 组件的自定义事件
    1.一种组件间的通信方式，适用于：子==》父
    2.使用：子想给父传数据，就要在父中给子绑定自定义事件（事件回调在父中）
    3.绑定自定义事件：
        1.第一种：在父组件中：<Demo @atiguigu="demo"/>或<Demo v-on:atiguigu="demo"/> 
        2.第二种：在父组件中：
            <Student ref="student"></Student>
            .........
            mounted(){
                this.$refs.student.$on('atiguigu',this.demo)
            }
        3.若想让自定义事件只能触发一次，可使用once修饰符或$once方法
        4.触发自定义事件：this.$emit('atiguigu',数据)
        5.解绑自定义事件：this.$off('atiguigu')
        6.组件上也可以绑定原生DOM事件，需要使用native修饰符
        7.注意：通过this.$refs.student.$on('atiguigu',this.demo(回调))绑定自定义事件时，回调要么配置在methods中，要么用箭头函数
            否则this指向会出问题！
## 全局事件总线(GlobalEventBus)
    1.一种组件间通信的方式，适用于任意组件间通信。
    2.安装全局事件总线：
        new Vue({
            ...
            beforeCreate(){
                Vue.prototype.$bus=this //安装全局事件总线，$bus就是当前应用的vm
            }
            ...
        })
    3.使用事件总线：
        1.接收数据：A组件想接收数据，则在A中给$bus绑定自定义事件，事件的回调留在A。
            methods:{
                demo(data){...}
            }
            ...
            mounted(){
                this.$bus.$on('xxxx',this.demo)
            }
        2.提供数据：this.$bus.$emit('xxxx',data)
    4.最好在beforeDestroy钩子中，用$off去解绑当前组件中所用到的事件
## 消息订阅与发布(pubsub)
    1.一种组件间的通信方式，适用于任意组件间通信。
    2.使用步骤：
        1.安装pubsub：npm i pubsub-js
        2.引入：import pubsub from 'pubsub-js'
        3.接收数据：A组件想要接收数据，则在A组件中订阅消息，订阅的回调留在A组件自身。
            methods:{
                demo(消息名,data){...}
            }
            ...
            mounted(){
                this.pid=pubsub.subscribe('xxx',this.demo) //订阅消息
            }
        4.提供数据：pubsub.publish('xxx',data)
        5.最好在beforeDestroy钩子中，用pubsub.unsubscribe(this.pid)去取消订阅
## nextTick
    1.语法：this.$nextTick(回调函数)
    2.作用：在下一次DOM更新结束之后执行其指定的回调函数。
    3.什么时候用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行
## Vue封装的过度与动画
    1.作用：在插入、更新或移除DOM元素时，在合适的时候给元素添加样式类名。
    2.图示：
        Enter:Opacity:0========>Opacity:1
        Leave:Opacity:1========>Opacity:0

    3.写法：
        1.准备好样式：
            ·元素进入的样式：
            1.v-enter:进入的起点
            2.v-enter-active:进入的过程中
            3.v-enter-to: 进入的终点

            ·元素离开的样式：
            1.v-leave:离开的起点
            2.v-leave-active:离开的过程中
            3.v-leave-to: 离开的终点

        2.使用<transition>包裹要过度的元素，并配置name属性：
            <transition name="hello" appear>  
            <h2 v-show="isShow">{{msg}}</h2>
            </transition>
        3.备注：若有多个元素需要过度，则需要使用：<transition-group>，且每个元素都要指定key值。
## vue脚手架配置代理
    方法一
        在vue.config.js中添加如下配置：
            devServer: {
            proxy: 'http://localhost:5000'
            }
    说明：
        1.优点：配置简单，请求资源时发给前端(8080)即可。
        2.缺点：不能配置多个代理，不能灵活控制请求是否走代理。
        3.工作方式：如果按照上述配置代理，当请求了前端资源不存在时，那么该请求会转发给服务器（优先匹配前端资源）

    方法二
        编写vue.config.js配置具体代理规则：
        module.exports = {
            devServer: {
                proxy: {
                '/api1': {
                    target: '<http://localhost:5000>',
                    pathRewrite:{'^api1':''}
                    changeOrigin: true
                }
                },
                proxy: {
                '/api2': {
                    target: '<http://localhost:5001>',
                    pathRewrite:{'^api2':''}
                    changeOrigin: true
                }
                }
            }
        }
        /*
            changeOrigin为true（默认）时：localhost:5000
            changeOrigin为false时：localhost:8080
        */

        说明：
            1.优点：可以配置多个代理，且可以灵活的控制请求是否代理。
            1.缺点：配置略微繁琐，请求资源时必须加前缀。
## 插槽
    1.作用：让父组件向子组件指定位置插入HTML结构，也是一种组件间的通信方式。
    2.分类：默认插槽、具名插槽、作用域插槽
    3.使用方式：
        1.默认插槽：
        父组件中：<Category title="游戏">
                    <div>html结构</div>
                </Category>
        子组件中：<template>
                    <div>
                        <slot>谢谢谢谢啦</slot>
                    </div>
                </template>
        2.具名插槽：
        父组件中：<Category title="美食">
                    <img slot="center">
                    <a slot="footer"更多美食</a>
                    <template v-slot:footer>
                        <div>html结构</div>
                    </template>
                </Category>
        子组件中：<template>
                    <div class="category">
                        <h3>{{title}}分类</h3>
                        <!-- 定义一个插槽 -->
                        <slot name="center">谢谢谢谢</slot>
                        <slot name="footer">谢谢谢谢</slot>
                    </div>
                    </template>
        3.作用域插槽：
        1.理解：数据在组件自身，但根据数据生成的结构需要组件使用者来决定。（数据在子组件中，但使用数据遍历出来的结构由父组件决定）
        2.具体编码：
            父组件：
                <template>
                    <div class="container">
                        <Category title="游戏">
                        <template scope="atguigu">
                            <ul>
                            <li v-for="(g,index) in atguigu.games" :key="index">{{g}}</li>
                            </ul>
                        </template>
                        </Category>

                        <Category title="游戏">
                        <template scope="{games}">
                            <ol>
                            <li style="color:red" v-for="(g,index) in games" :key="index">{{g}}</li>
                            </ol>
                        </template>
                        </Category>
                    
                        <Category title="游戏">
                        <template slot-scope="{games}">
                            <h4 v-for="(g,index) in games" :key="index">{{g}}</h4>
                        </template>
                        </Category>
                    </div>
                </template>
            子组件：<template>
                        <div class="category">
                            <h3>{{title}}分类</h3>
                            <slot :games="games">谢谢谢谢啦</slot>
                            
                        </div>
                    </template>

                    <script>
                        export default {
                            name:'Category',
                            props:['title'],
                            //数据在子组件自身
                            data(){
                                return{
                                    games:['红色警戒','穿越火线','劲舞团','超级玛丽'],
                                }
                            }
                        }
                    </script>
## Vuex
    1.概念：
        在Vue中实现集中式状态(数据)管理的一个Vue插件，对vue应用中多个组件的共享状态进行集中式的管理（读/写），
        也是一种适用于任意组件间的通信方式。
    2.何时使用？
        多个组件需要共享数据时
    3.搭建vuex环境
        1.创建文件：src/store/index.js
            //该文件用于创建Vuex中最为核心的store
            import Vue from 'vue'
            import Vuex from 'vuex'

            //准备actions——用于响应组件中的动作
            const actions={}

            //准备mutations——用于操作数据（state）
            const mutations={}

            //准备state——用于存储数据
            const state={}

            Vue.use(Vuex)

            //创建并暴露store
            export default new Vuex.Store({
                actions,
                mutations,
                state
            })
            // //暴露（导出）store
            // export default store

        2.在main.js中创建vm时传入store配置项
        ....
        //引入store
        import store from './store'
        ....
        new Vue({
            el:'#app',
            render:h=>h(App),
            store,
            beforeCreate(){
                Vue.prototype.$bus=this
            }
        })
    4.基本使用：
        1.组件中读取vuex中的数据：$store.state.sum
        2.组件中修改vuex中的数据：this.$store.dispatch('jiaOdd',this.n) 或 this.$store.commit('JIA',this.n)
    5.getters的使用：
        1.概念：当state中的数据需要经过加工后再使用，可以用getters加工
        2.在store.js中追加getters配置
        3.组件中读取数据：$store.getters.bigSum

    6.四个map方法的使用
        1.mapState方法：用于帮助我们映射state中的数据为计算属性
            //借助mapState生成计算属性，从state中读取数据（对象写法）
            // ...mapState({he:'sum',xuexiao:"school",xueke:"subject"})//   ...{}将对象里的属性展示出来

            //借助mapState生成计算属性，从state中读取数据（数组写法）
            ...mapState(['sum',"school","subject"]),//   ...{}将对象里的属性展示出来

        2.mapGetters方法：用于帮助我们映射getters中的数据为计算属性
            //借助mapGetters生成计算属性，从state中读取数据（对象写法）
            // ...mapGetters({bigSum:'bigSum'}),

            //借助mapGetters生成计算属性，从state中读取数据（数组写法）
            ...mapGetters(['bigSum'])
        
        3.mapActions方法：用于帮助我们生成与actions对话的方法，即包含：$store.dispatch(xxx)的函数。
            //借助mapActions生成对应的方法，方法中会调用dispatch去联系actions(对象写法)
            ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'}),
            //借助mapActions生成对应的方法，方法中会调用dispatch去联系actions(数组写法)
            ...mapActions(['jiaOdd','jiaWait']),
        4.mapMutations方法：用于帮助我们生成与mutations对话的方法，即包含：$store.commit(xxx)的函数。
            //借助mapMutations生成对应的方法，方法中会调用commit去联系mutations(对象写法)
            ...mapMutations({increment:'JIA',decrement:'JIAN'}),
            //借助mapMutations生成对应的方法，方法中会调用commit去联系mutations(数组写法)
            // ...mapMutations(['JIA','JIAN']),

        备注：mapActions与mapMutations使用时，若需要传递参数：在模板中绑定事件时传递好参数，否则参数是事件对象。
    7.模块化+命名空间
        1.目的：让代码更好维护，让多种数据分类更加明确。
        2.修改store.js
        const countOptions={
            namespaced:true,//开启命名空间
            actions:{...},
            mutations:{...},
            state:{...},
            getters:{...}
        }
        const personOptions={
            namespaced:true,//开启命名空间
            actions:{...},
            mutations:{...},
            state:{...},
            getters:{...}
        }
        export default new Vuex.Store({
            modules:{
                countOptions,
                personOptions
            }
        })
        3.开启命名空间后，组件中读取state数据：
            方式一：自己读取
                this.$store.state.personOptions.personList
            方式二：借助mapState读取
                ...mapState('countOptions',['sum','school','subject'])
        4.开启命名空间后，组件中读取getters数据：
            方式一：自己读取
                this.$store.getters['personOptions/firstPersonName']
            方式二：借助mapGetters读取
                ...mapGetters('countOptions',['bigSum'])
        3.开启命名空间后，组件中调用dispatch：
            方式一：自己直接dispatch
                this.$store.dispatch('personOptions/addPersonWang',personObj)
            方式二：借助mapActions读取
                ...mapActions('countOptions',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'}),
        3.开启命名空间后，组件中调用commit：
            方式一：自己直接commit
                this.$store.commit('personOptions/ADD_PERSON',personObj)
            方式二：借助mapMutation读取
                ...mapMutations('countOptions',{increment:'JIA',decrement:'JIAN'}),
## 路由
    1.基本使用：
        1.安装vue-router，命令：npm i vue-router
        2.应用插件：Vue.use(VueRouter)
        3.编写router配置项：
        //该文件用于创建整个应用的路由器
        import VueRouter from 'vue-router'
        import About from '../components/About'
        import Home from '../components/Home'

        //创建并暴露一个路由器
        export default new VueRouter({
            routes:[
                {
                    path:'/about',
                    component:About
                },
                {
                    path:'/home',
                    component:Home
                }
            ]
        })
        4.实现切换：(active-class可配置高亮样式)
        <router-link active-class="active" to="/about">About</router-link>

        5.指定展示位置：
        <router-view></router-view>
    2.几个注意点
        1.路由组件通常存放在pages文件夹，一般组件通常存放在components文件夹。
        2.通过切换隐藏了的路由组件，默认是被销毁的，需要时再去挂载。
        3.每个组件都有自己的$route属性，里面存储着自己的路由信息。
        4.整个应用只有一个router，可以通过组件的$router属性获取到。

    3.多级路由
        1.配置路由规则，使用children配置项：
        routes:[
            {
                path:'/about',
                component:About
            },
            {
                path:'/home',
                component:Home,
                children:[
                    {
                        path:'news',         //此处一定不要写：/news
                        component:News
                    },
                    {
                        path:'message',      //此处一定不要写：/message
                        component:Message    
                    },
                ]
            }
        ]
        2.跳转（要写完整路径）：
            <router-link to="/home/message">Message</router-link>

    4.路由器的query参数
        1.传递参数
        <!-- 跳转路由并携带query参数，to的字符串写法 -->
        <!-- <router-link :to="`/home/message/detail?id=${m.id}&title=${m.title}`">{{m.title}}</router-link> -->

        <!-- 跳转路由并携带query参数，to的对象写法 -->
          <router-link :to="{
            path:'/home/message/detail',
            query:{
              id:m.id,
              title:m.title
            }
          }"
          >
            {{m.title}}
          </router-link>
        2.接收参数：
            $route.query.id
            $route.query.title
    5.命名路由
        1.作用：可以简化路由的跳转。
        2.如何使用
            1.给路由命名：
            {
                name:'hello',
                path:'/hello',
                component:Hello
            }

            2.简化跳转：
            <!-- 简化前，需写完整路径 -->

            <!-- 简化后，直接通过名字跳转 -->
            <router-link :to="{name:'hello'}"></router-link>
            <router-link 
            :to="{
                name:'hello',
                query:{
                    id:666,
                    title:'你好'
                }
            }"
            >
            </router-link>

    6.路由的params参数
        1.配置路由，声明接收params参数
        {
            name:'detail',
            path:'detail/:id/:title',   //使用占位符声明接收params参数
            component:Detail,
        }
        2.传递参数
        <li v-for="m in messageList" :key="m.id">
          <!-- 跳转路由并携带params参数，to的字符串写法 -->
          <!-- <router-link :to="`/home/message/detail/${m.id}/${m.title}`">{{m.title}}</router-link>&nbsp;&nbsp; -->

          <!-- 跳转路由并携带params参数，to的对象写法 -->
          <router-link :to="{
            name:'detail',    //注意：params这里不能写path，只能写name
            params:{
              id:m.id,
              title:m.title
            }
          }"
          >
            {{m.title}}
          </router-link>
        </li>
        3.接收参数
        $route.params.id
        $route.params.title
    7.路由的props配置
        作用：让路由组件更方便的接收参数
        {
            name:'detail',
            path:'detail',
            component:Detail,

            //props的第一种写法，值为对象，该对象中的所有key-value值都会以props的形式传Detail组件。
            // props:{a:1,b:'hello'}

            //props的第二种写法，值为布尔值，若布尔值为真，就会把该路由收到的所有params参数，以props形式传给Detail组件。
            // props:true

            //props的第三种写法，值为函数
            props($route){
                return {id:$route.query.id,title:$route.query.title}
            }

        }
    8.<route-link>的replace属性
        1.作用：控制路由跳转时操作浏览器历史记录的模式
        2.浏览器的历史记录有两种写入方式：分别为push和replace，push是追加历史记录，replace是替换当前记录。路由跳转时默认为push
        3.如何开启replace模式：<route-link replace ></route-link>

    9.编程式路由导航
        1.作用：不借助<router-link>实现路由跳转，让路由跳转更加灵活
        2.具体编码：
        this.$router.push({
            name:'detail',    //注意：params这里不能写path，只能写name
            query:{
              id:m.id,
              title:m.title
            }
            })
         this.$router.replace({
            name:'detail',    //注意：params这里不能写path，只能写name
            query:{
              id:m.id,
              title:m.title
            }
            })
        this.$router.forward()
        this.$router.back()
        this.$router.go(3)
    10.缓存路由组件
        1.作用：让不展示的路由组件保持挂载，不被销毁。
        2.具体编码：
        <keep-alive include="News">
            <router-view></router-view>
        </keep-alive>
    11.两个新的生命周期钩子
        1.作用：路由组件独有的两个钩子，用于捕获路由组件的激活状态。
        2.具体名字：
            1.actived:路由组件被激活（导航切过来）时触发
            2.deactived:路由组件失活（导航切走）时触发
    12.路由守卫
        1.作用：对路由进行权限控制
        2.分类：全局守卫、独享守卫、组件内守卫

        3.全局守卫：
        //全局前置路由守卫————初始化的时候被调用、每次路由切换之前被调用
        router.beforeEach((to,from,next)=>{
            console.log('前置',to,from);
            // if(to.path==='/home/news'||to.path==='/home/message')
            if(to.meta.isAuth){ //判断是否需要鉴权
                if(localStorage.getItem('school')==='atguigu'){ //权限控制的具体规则
                    next()
                }else{
                    alert('学校名不对，无权限查看')
                }
            }
            else{
                next()
            }
                
        })
        //全局后置路由守卫————初始化的时候被调用、每次路由切换之后被调用
        router.afterEach((to,from)=>{
            console.log('后置',to,from);
            document.title=to.meta.title||'硅谷系统'  //修改网页的title
        })
        export default router
    
        4.独享守卫：
        beforeEnter:(to,from,next)=>{
            console.log('前置',to,from);
            if(to.meta.isAuth){ //判断是否需要鉴权
                if(localStorage.getItem('school')==='atguigu'){
                    next()
                }else{
                    alert('学校名不对，无权限查看')
                }
            }
            else{
                next()
            }
        }
        5.组件内路由守卫：
        //通过路由规则，进入该组件时被调用
        beforeRouteEnter(to,from,next){

        },
        //通过路由规则，离开该组件时被调用
        beforeRouteLeave(to,from,next){
          console.log('beforeRouteLeave',to,from);
          next()
        }
    13.路由器的两种工作模式(history,hash)
        1.对于一个url来说，什么是hash值？——#及其后面的内容就是hash值。
        2.hash值不会包含在HTTP请求中，即：hash值不会带给服务器。
        3.hash模式：
            1.地址中永远带着#号，不美观。
            2.若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法。
            3.兼容性较好。
        4.history模式：
            1.地址干净，美观。
            2.兼容性和hash模式相比略差。
            3.应用部署上线时需要后端人员支持，解决刷新页面服务器404的问题。
        5.如何开启（默认hash）：
        const router= new VueRouter({
            mode:'history',
        }）
## options
    Mock.mock(/\/shoopList/,"post",function(options){
        console.log(options);
        return data
    })
    options：指向本次请求的Ajax选项集：
        输出的options的值为
        url:"请求的地址"
        type:"请求的类型"
        body:"post提交的数据"
