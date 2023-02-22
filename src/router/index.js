import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Index from '../components/Index.vue'
import Home from '../components/Home.vue'
import TaskList from '../components/workOrder/TaskList.vue'
import WaitingTask from '../components/workOrder/WaitingTask.vue'
import UserManage from '../components/user/UserManage.vue'
import Main from '../components/Main.vue'



export default new VueRouter({
    mode:'history',
    routes:[
        {
            path:'/',
            redirect:'/login'
        },
        {
            name:'login',
            path:'/login',
            component:Login
        },
        {
            name:'register',
            path:'/register',
            component:Register
        },
        {
            name:'index',
            path:'/index',
            component:Index,
            children:[
                {
                    name:'Home',
                    path:'home',
                    meta:{
                        title:"首页"
                    },
                    component:Home
                   
                },
                {
                    name:'TaskList',
                    path:'taskList',
                    component:TaskList
                },
                {
                    name:'WaitingTask',
                    path:'waitingTask',
                    component:WaitingTask
                },
                {
                    name:'acceptableTask',
                    path:'acceptableTask',
                    component:()=>import('../components/workOrder/AcceptableTask.vue')
                },
                {
                    name:'User',
                    path:'user',
                    component:UserManage
                },
                {
                    name:'Main',
                    path:'main',
                    component:Main
                },
            ]
        }
    ]
})