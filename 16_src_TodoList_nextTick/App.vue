<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <MyHeader @receive="receive" />
        <MyList :todos="todos"/>
        <MyFooter :todos="todos" @checkAllTodos="checkAllTodos" @clearAllTodos="clearAllTodos" />
      </div>
    </div>
  </div>
</template>

<script>
    import pubsub from 'pubsub-js'
    import MyHeader from './components/MyHeader.vue'
    import MyList from './components/MyList.vue'
    import MyFooter from './components/MyFooter.vue'

    export default {
        name:'App',
        data(){
          return{
            todos:JSON.parse(localStorage.getItem('todos')) || []
          }
        },
        components:{MyHeader,MyList,MyFooter},
        methods:{
          receive(x){
            this.todos.unshift(x)
          },
          //勾选或取消勾选一个todo
          checkTodo(id){
            this.todos.forEach((todo)=>{
              if(todo.id===id) todo.done=!todo.done
            })
          },
          editTodo(id,title){
            this.todos.forEach((todo)=>{
              if(todo.id===id) todo.title=title
            })
          },
          //删除一个todo
          deleteTodo(_,id){
           this.todos = this.todos.filter(todo => todo.id!==id)
          },
          //全选或取消全选
          checkAllTodos(done){
            this.todos.forEach((todo)=>{
              todo.done=done
            })
          },
          //清除所有以及完成的todo
          clearAllTodos(){
           this.todos= this.todos.filter((todo)=>{
              return !todo.done
            })
          }
        },
        watch:{
          todos:{
            deep:true,
            handler(value){
              localStorage.setItem('todos',JSON.stringify(value))
            }
            
          }
        },
        mounted(){
          this.$bus.$on('checkTodo',this.checkTodo)
          // this.$bus.$on('deleteTodo',this.deleteTodo)
         this.pid= pubsub.subscribe('deleteTodo',this.deleteTodo)
         this.$bus.$on('editTodo',this.editTodo)
        },
        beforeDestroy(){
          this.$bus.$off('checkTodo')
          // this.$bus.$off('deleteTodo')
          pubsub.unsubscribe(this.pid)
          this.$bus.$off('editTodo')
        }
    }
</script>
<style>
.btn{
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}
.btn-danger{
  color: #fff;
  background-color: #da4f49;
  border:1px solid #bd362f;
}
.btn-edit{
  color: #fff;
  background-color: skyblue;
  border:1px solid rgb(101, 163, 190);
  margin-right: 5px;
}
.btn-edit:hover{
  color: #fff;
  background-color: rgb(101, 163, 190);
}
.btn-danger:hover{
  color: #fff;
  background-color: #bd362f;
}
  .todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>