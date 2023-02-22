<template>
    <div style="...">
        <el-descriptions style="margin-top:25px" class="margin-top" title="个人中心" :column="2" :size="40+''" border>
            <el-descriptions-item>
            <template slot="label">
                <i class="el-icon-user"></i>
                用户名
            </template>
            {{activeUser[0]}}
            </el-descriptions-item>
            <el-descriptions-item>
            <template slot="label">
                <i class="el-icon-mobile-phone"></i>
                电话
            </template>
            {{activeUser[2]}}
            </el-descriptions-item>
            <el-descriptions-item>
            <template slot="label">
                <i class="el-icon-location-outline"></i>
                居住地
            </template>
            {{activeUser[3]}}
            </el-descriptions-item>
            <el-descriptions-item>
            <template slot="label">
                <i class="el-icon-tickets"></i>
                备注
            </template>
            <el-tag size="small">西门子</el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
            <template slot="label">
                <i class="el-icon-office-building"></i>
                联系地址
            </template>
            {{activeUser[4]}}
            </el-descriptions-item>
        </el-descriptions>
    <DateUtlis></DateUtlis>
</div>
</template>

<script>
    import DateUtlis from './DateUtlis';
    export default {
        name:'Home',
        components:{DateUtlis},
        data(){
            return{
                size:'',
                activeUser:[]
            }
        },
        beforeMount(){
            this.activeUser=JSON.parse(sessionStorage.getItem('ActiveUser'))
            this.activeUser=Object.values(this.activeUser[0])
            // console.log('this.activeUser',this.activeUser);
            // console.log('activeUser',Object.values(this.activeUser[0]));    //Object.values获取对象的值，返回数组
        }
    }
</script>

<style>

</style>