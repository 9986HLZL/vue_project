<template>
  <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside :width="aside_width" style="background-color: rgb(238, 241, 246);margin-left: -1px;margin-top: -1px;">
        <Aside></Aside>
      </el-aside>
      
      <el-container style="height: 100%;">
        <el-header style="text-align: right; font-size: 12px;height: 100%;border-bottom: darkgray;margin-top: -1px;margin-left: -2px;">
          <Header :icon="icon"></Header>
        </el-header>
        
        <el-main style="height: 100%;margin-left: 3px;margin-right: 3px;">
          <router-view></router-view>
        </el-main>
      </el-container>
  </el-container>
</template>


<script>
  import Aside from './Aside';
  import Header from './Header';
  export default {
    name:'Index',
    components:{Aside,Header},
    data(){
      return{
        aside_width:'200px',
        isCollapse:false,
        icon:'el-icon-s-fold'
      }
    },
    methods:{
      reAsideWidth(){
        this.isCollapse=!this.isCollapse
        if(!this.isCollapse){
          this.aside_width='200px'
          this.icon='el-icon-s-fold'
        } else{
          this.aside_width='64px'
          this.icon='el-icon-s-unfold'
        }
        
      }
    },
    mounted(){
      this.$bus.$on('asideWidth',this.reAsideWidth)
    }
  }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    padding: 0px;
  }
  .el-main {
    padding: 0px;
  }
  .el-aside {
    color: #333;
  }
</style>