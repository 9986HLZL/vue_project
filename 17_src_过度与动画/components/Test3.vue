<template>
  <div>
    <button @click="isShow=!isShow">显示/隐藏</button>
    <transition-group
        appear
        name="animate__animated animate__bounce"
        enter-active-class="animate__swing"
        leave-active-class="animate__backOutUp"
    >  
        <h2 v-show="!isShow" key="1">{{msg}}</h2>
        <h2 v-show="isShow" key="2">{{atiguigu}}</h2>
    </transition-group>
  </div>
</template>
<!-- 用过度实现 -->
<script>
    import 'animate.css'
    export default {
        data(){
            return{
                msg:"你好啊",
                atiguigu:'尚硅谷',
                isShow:true
            }
        }
    }
</script>

<style>
    h2{
        background-color: orange;

    }
  
</style>