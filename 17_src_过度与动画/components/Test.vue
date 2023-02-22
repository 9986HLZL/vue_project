<template>
  <div>
    <button @click="isShow=!isShow">显示/隐藏</button>
    <transition name="hello" appear>  
        <h2 v-show="isShow">{{msg}}</h2>
    </transition>
  </div>
</template>

<script>
    export default {
        data(){
            return{
                msg:"你好啊",
                isShow:true
            }
        }
    }
</script>

<style>
    h2{
        background-color: orange;
    }
    .hello-enter-active{
        animation: atiguigu 0.5s linear;
    }
    .hello-leave-active{
        animation: atiguigu 0.5s linear reverse;
    }
    @keyframes atiguigu {
        from{
            transform: translateX(-100%);
        }
        to{
            transform: translateX(0px);
        }
    }
</style>