<template>
  <div class="Student">
   
    <h2>学生姓名：{{name}}</h2>
    <h2>性别：{{sex}}</h2>
    <button @click="sendStudentName">点我发送学生姓名</button>
  </div>
</template>

<script>
    
    export default {
        name:'Student',
        data(){
            return{
                name:'张三',
                sex:'男',
              
            }
        },
        mounted(){
          
        },
        methods:{
          sendStudentName(){
            this.$bus.$emit('name',666)
          }
        }
        
    }
</script>
<style scoped>
  .Student{
    background-color: aqua;
    padding: 5px;
    margin-top: 30px;
  }
</style>


