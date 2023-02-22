<template>
  <!-- 没有列表项时不展示 -->
  <div class="todo-footer" v-show="total">
    <label>
        <!-- <input type="checkbox" :checked="isAll" @change="checkAll" /> -->
        <input type="checkbox" v-model="isAll" />
    </label>
    <span>
        <span>已完成{{doneTotal}}</span> / 全部{{total}}
    </span>
    <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
  </div>
</template>

<script>
    export default {
        name:'MyFooter',
        props:['todos','checkAllTodos','clearAllTodos'],
        computed:{
          doneTotal(){
            /* let i=0
            this.todos.forEach(todo => {
              if (todo.done) i++
            });
            return i */


            //使用reduce对数组操作
          //  return this.todos.reduce((pre,corrent)=>{
          //     return pre+(corrent.done?1:0)
          //   },0)

            return this.todos.reduce((pre,corrent)=>pre+(corrent.done?1:0),0)
            
          },
          total(){
            return this.todos.length
          },
          isAll:{
            get(){
              return this.doneTotal===this.total &&this.total>0
            },
            set(value){
              this.$emit('checkAllTodos',value)
            }
          }
          
        },
        methods:{
          // checkAll(event){
          //   this.checkAllTodos(event.target.checked)
          // }
          clearAll(){
            if(confirm('确定清除所有完成的任务吗？'))
            this.$emit('clearAllTodos')
          }
        }
    }
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}
.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}
.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}
.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>