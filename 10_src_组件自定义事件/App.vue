<template>
  <div class="app">
    <h1>你好啊</h1>
    <School></School>
    <!-- 通过给子组件传递函数类型的props，实现：子给父传数据 -->

    <!-- 通过给子组件绑定自定义事件，实现：子给父传数据 -->
    <!-- <Student v-on:atiguigu.once="demo"></Student> -->

    <Student ref="student" @click.native="test"></Student>
  </div>
</template>

<script>

    import Student from './components/Student'
    import School from './components/School'
    export default {
        name:'App',
        components:{Student,School},
        methods:{
          demo(name,...params){
            console.log('demo被调用了',name,params);
          },
          test(){
            alert(123)
          }
        },
        mounted(){
          // setTimeout(()=>{
          //   this.$refs.student.$on('atiguigu',this.demo)  //.$once事件只触发一次
          // },3000)
          this.$refs.student.$on('atiguigu',this.demo)
        }
    }
</script>
<style>
  .app{
    background-color: gray;
    padding:5px
  }
</style>