<template>
  <div>
    <h1>人员列表</h1>
    <h1 style="color:red">Count组件的和是{{sum}}</h1>
    <input type="text" placeholder="请输入名字" v-model="name">
    <button @click="addPerson">添加</button>
    <ul>
        <li v-for="p in personList" :key="p.id">{{p.name}}</li>
    </ul>
  </div>
</template>

<script>
    import { nanoid } from 'nanoid'
import { mapState } from 'vuex'

    export default {
        name:'Person',
        data(){
            return {
                // personList:this.$store.state.personList
                name:''
            }
        },
        computed:{
            personList(){
                return this.$store.state.personList
            },
            ...mapState(['sum'])
        },
        methods:{
            addPerson(){
                const personObj={id:nanoid(),name:this.name}
                this.$store.commit('ADD_PERSON',personObj)
                this.name=''
            }
            
        },
       
    }
</script>

<style>

</style>