<template>
  <div class="Student">
   
    <h2>学生姓名：{{name}}</h2>
    <h2>性别：{{sex}}</h2>
    <h2>当前求和是：{{number}}</h2>

    <button @click="add">点我number++</button>
  
    <button @click="sendStudentName">点我发送学生名</button>
    <button @click="unbind">点我解绑事件</button>
    <button @click="death">点我销毁</button>
  </div>
</template>

<script>
    
    export default {
        name:'Student',
        data(){
            return{
                name:'张三',
                sex:'男',
                number:0
            }
        },
        methods:{
          add(){
            console.log('@@@@')
            this.number++
          },
          sendStudentName(){
            //触发Student组件实例身上的atiguigu事件
            this.$emit('atiguigu',this.name,369,888,999)
          },
          unbind(){
            this.$off('atiguigu')
            // this.$off(['xxx','xxx'])//解绑多个自定义事件
            // this.$off()             //解绑全部自定义事件
          },
          
          death(){
            this.$destroy()              //销毁了当前Student组件实例，销毁后所有Student实例的自定义事件全部不奏效
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


