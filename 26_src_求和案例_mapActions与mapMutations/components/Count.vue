<template>
  <div>
    <h1>当前求和为{{sum}}</h1>
    <h1>当前求和的10倍为{{bigSum}}</h1>
    <h1>学校是：{{school}}</h1>
    <h1>学科是：{{subject}}</h1>
    <select v-model.number="n">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
    </select>
    <button @click="increment(n)">+</button>
    <button @click="decrement(n)">-</button>
    <button @click="incrementOdd(n)">当前求和为奇数再加</button>
    <button @click="incrementWait(n)">等一等再加</button>
  </div>
</template>

<script>
    import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
    
    export default {
        name:'Count',
        data(){
            return{
                n:1,//用户选择的数字
                
            }
        },
        computed:{
           
            //借助mapState生成计算属性，从state中读取数据（对象写法）
            // ...mapState({he:'sum',xuexiao:"school",xueke:"subject"})//   ...{}将对象里的属性展示出来

            //借助mapState生成计算属性，从state中读取数据（数组写法）
            ...mapState(['sum',"school","subject"]),//   ...{}将对象里的属性展示出来

            /*********************************************************************************************** */
            

            //借助mapGetters生成计算属性，从state中读取数据（对象写法）
            // ...mapGetters({bigSum:'bigSum'}),
            //借助mapGetters生成计算属性，从state中读取数据（数组写法）
            ...mapGetters(['bigSum'])


        },
        methods:{
            // increment(){
            //    this.$store.commit('JIA',this.n)
            // },
            // decrement(){
            //     this.$store.commit('JIAN',this.n)
            // },
            //借助mapMutations生成对应的方法，方法中会调用commit去联系mutations(对象写法)
            ...mapMutations({increment:'JIA',decrement:'JIAN'}),
            //借助mapMutations生成对应的方法，方法中会调用commit去联系mutations(数组写法)
            // ...mapMutations(['JIA','JIAN']),
            /*************************************************************************/

            // incrementOdd(){
            //     this.$store.dispatch('jiaOdd',this.n)
            // },
            // incrementWait(){
            //     this.$store.dispatch('jiaWait',this.n)
            //借助mapActions生成对应的方法，方法中会调用dispatch去联系actions(对象写法)
            ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'}),
            //借助mapActions生成对应的方法，方法中会调用dispatch去联系actions(数组写法)
            ...mapActions(['jiaOdd','jiaWait']),
        }
    }

</script>

<style>
    button{
        margin-left: 5px;
    }
</style>