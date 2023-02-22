<template>
  <div>
    <button @click="isShow=!isShow">显示/隐藏</button>
    <transition-group name="hello" appear>  
        <h2 v-show="!isShow" key="1">{{msg}}</h2>
        <h2 v-show="isShow" key="2">{{atiguigu}}</h2>
    </transition-group>
  </div>
</template>
<!-- 用过度实现 -->
<script>
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
    /* 进入的起点、离开的起点 */
    .hello-enter,.hello-leave-to{
        transform: translateX(-100%);
    }
    .hello-enter-active,.hello-leave-active{
        transition: 0.5s linear;
    }
    /* 进入的终点、离开的终点 */
    .hello-enter-to,.hello-leave{
        transform: translateX(0px);
    }
</style>