<template>
  <div>
    <h1>人员列表</h1>
    <h3 style="color:red">Count组件的和是{{sum}}</h3>
    <h3>列表中第一个人的名字是：{{firstPersonName}}</h3>
    <input type="text" placeholder="请输入名字" v-model="name">
    <button @click="addPerson">添加</button>
    <button @click="addPersonWang">添加一个姓王的人</button>
    <button @click="addPersonServer">添加一个人，名字随机</button>
    <ul>
        <li v-for="p in personList" :key="p.id">{{p.name}}</li>
    </ul>
  </div>
</template>

<script>
    import { nanoid } from 'nanoid'


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
                return this.$store.state.personOptions.personList
            },
            sum(){
                return this.$store.state.countOptions.sum
            },
            firstPersonName(){
                return this.$store.getters['personOptions/firstPersonName']
            }
        },
        methods:{
            addPerson(){
                const personObj={id:nanoid(),name:this.name}
                this.$store.commit('personOptions/ADD_PERSON',personObj)
                this.name=''
            },
            addPersonWang(){
                const personObj={id:nanoid(),name:this.name}
                this.$store.dispatch('personOptions/addPersonWang',personObj)
                this.name=''
            },
            addPersonServer(){
                this.$store.dispatch('personOptions/addPersonServer')
            }
            
        },
       
    }
</script>

<style>

</style>