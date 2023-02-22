<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <MyHeader :receive="receive" />
        <MyList :todos="todos" :checkTodo="checkTodo" :deleteTodo="deleteTodo" />
        <MyFooter :todos="todos" :checkAllTodos="checkAllTodos" :clearAllTodos="clearAllTodos" />
      </div>
    </div>
  </div>
</template>

<script>

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
          //删除一个todo
          deleteTodo(id){
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
        }
    }
</script>
<style>
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