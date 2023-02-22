<template>
    <div class="demo">
        <h2>学校：{{schoolName}}</h2>
        <h2>地址：{{address}}</h2>
        
    </div>
</template>

<script>
    export default ({
        name:'MySchool',
        data(){
            return{
                schoolName:'尚硅谷',
                address:'北京'
            }
        },
        methods:{

        }
    })
    // export default school
</script>

<style>
    .demo{
        background-color: orange;
    }
</style>