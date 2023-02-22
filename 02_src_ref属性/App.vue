<template>
  <div>
    <h1 v-text="msg"  ref="title"></h1>
    <button @click="showDOM" ref="btn">点我输出上方的DOM元素</button>
   <School ref="sch"/>
  </div>
</template>

<script>
//引入School组件
    import School from './components/School'
    export default {
        name:'App',
        data(){
            return{
                msg:'欢迎学习Vue!'
            }
        },
        components:{School},
        methods:{
            showDOM(){
                console.log(this.$refs.title);
                console.log(this.$refs.btn);
                console.log(this.$refs.sch);
            }
        }
    }
</script>

<style>

</style>