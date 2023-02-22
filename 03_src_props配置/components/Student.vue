<template>
  <div>
    <h2>欢迎使用组件{{msg}}</h2>
    <hr>
    <h2>学生姓名：{{name}}</h2>
    <h2>性别：{{sex}}</h2>
    <h2>年龄：{{myage}}</h2>
    <button @click="update">点我</button>
  </div>
</template>

<script>
    export default {
        name:'Student',
        data(){

            return{
                msg:'hhahahahahha',
                myage:this.age
            }
        },
        methods:{
            update(){
                this.myage++
            }
        },
        props:['name','sex','age'],//简单声明接收数据

        //接收的同时对数据进行类型限制
        // props:{
        //     name:String,
        //     sex:String,
        //     age:Number
        // }

        //接收的同时对数据进行类型限制+默认值的指定+必要性的限制
        // props:{
        //     name:{
        //         type:String,
        //         required:true
        //     },
        //     sex:{
        //         type:String,
        //         required:true
        //     },
        //     age:{
        //         type:Number,
        //         default:99
        //     },
        // },
        
    }
</script>

