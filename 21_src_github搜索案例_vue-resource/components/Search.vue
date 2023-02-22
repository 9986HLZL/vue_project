<template>
  <div>
    <section class="jumbotron">
      <h3 class="jumbotron-heading">Search Github Users</h3>
      <div>
        <input type="text" placeholder="enter the name you search" v-model="keyWord"/>&nbsp;
        <button @click="searchUsers">Search</button>
      </div>
    </section>
  </div>
</template>

<script>
   
    export default {
        name:'Search',
        data(){
          return{
            keyWord:""
          }
        },
        methods:{
          searchUsers(){
            //请求前更新List的数据
            this.$bus.$emit('updateListData',{isFirst:false,isLoading:true,errorMsg:'',users:[]})
            this.$http.get(`https://api.github.com/search/users?q=${this.keyWord}`).then(
              response => {
                console.log('请求成功了');
                this.$bus.$emit('updateListData',{isLoading:false,errorMsg:'',users:response.data.items})
              },
              error => {
                console.log('请求失败了',error.message);
                this.$bus.$emit('updateListData',{isLoading:false,errorMsg:error.message,users:[]})
              }
            )
          }
        }
    }
</script>

<style>

</style>