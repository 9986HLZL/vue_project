<template>
    <!-- default-active="/index/main" -->
    <el-menu 
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    style="height:100%"
    
    :collapse="isCollapse"
    :collapse-transition="false"
    router
    >
        <el-menu-item index="/index/main"> 
            <i class="el-icon-user-solid"></i>
            <span slot="title">员工信息</span>
        </el-menu-item>
        <el-menu-item index="/index/user"> 
            <i class="el-icon-user"></i>
            <span slot="title">用户管理</span>
        </el-menu-item>
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-menu"></i>
                <span>工单管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item style="min-width:199px;" index="/index/taskList">任务列表</el-menu-item>
                <el-menu-item style="min-width:199px;" index="/index/waitingTask">可执行任务</el-menu-item>
                <el-menu-item style="min-width:199px;" index="/index/acceptableTask">可验收任务</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <!-- <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-menu"></i>
                <span>安全环保</span>
            </template>
            <el-submenu index="2-1">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>固废处理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item style="min-width:199px;" index="2-1-1">固废记录列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-submenu> -->
    </el-menu>
</template>

<script>
export default {
    name:'Aside',
    data(){
        return{
            isCollapse:false
        }
    },
    // props:{
    //     isCollapse:Boolean
    // },
    methods:{
        reviseCollapse(){
            this.isCollapse=!this.isCollapse
        }
    },
    mounted(){
        this.$bus.$on('doCollapse',this.reviseCollapse)
    },
    beforeDestroy(){
        this.$bus.$off('doCollapse')
    }
}
</script>

<style>

</style>