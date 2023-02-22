<template>
  <div style="display: flex;line-height 60px;">
    <div style="margin-top:8px;">
        <i @click="doCollapse" :class="icon" style="font-size:20px;margin-left: 25px;cursor: pointer;"></i>
    </div>
    <div style="flex:1;text-align: center;font-size: 34px;">
        <span>后台管理系统</span>
    </div>
    <el-dropdown>
        <span style="cursor: pointer;">{{ activeUser[0] }}</span><i class="el-icon-arrow-down" style="margin-left: 5px;margin-right: 20px;"></i>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="toUser">个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
    
  </div>
</template>

<script>
export default {
    name:'Header',
    data(){
        return{
            activeUser:[]
        }
    },
    props:{
        icon:String
    },
    beforeMount(){
        this.activeUser=JSON.parse(sessionStorage.getItem('ActiveUser'))
        this.activeUser=Object.values(this.activeUser[0])
    },
    mounted(){
        //登录时跳转到个人中心
        this.toUser()
    },
    methods:{
        toUser(){
            // console.log('to_user');
            this.$router.push('/index/home',()=>{})
        },
        logout(){
           this.$confirm('您确定要退出登录吗？','提示',{
            confirmButtonText:'确定',
            type:'warning',
            center:true
           }).then(()=>{
            this.$message.success('退出登录成功')
            this.$router.push('/login')
           }).catch(()=>{
            this.$message.info('已取消退出登录')
           })
        },
        doCollapse(){
            this.$bus.$emit('doCollapse')
            this.$bus.$emit('asideWidth')
        }
    },
    // created(){
    //     this.$router.push('Home')
    // }
}
</script>

<style>

</style>