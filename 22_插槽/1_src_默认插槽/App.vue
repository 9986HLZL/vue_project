<template>
  <div class="container">
    <Category title="美食">
      <img src="https://img1.baidu.com/it/u=3630469637,3488547884&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800"
       alt="">
    </Category>

    <Category title="游戏">
      <ul>
        <li v-for="(g,index) in games" :key="index">{{g}}</li>
      </ul>
    </Category>
    <Category title="电影">
      <video controls src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"></video>
    </Category>
  </div>
</template>

<script>
   
  
  import  Category from './components/Category'
  export default {
  name: 'App',
  data(){
    return{
        foods:['火锅','烧烤','小龙虾','牛排'],
        games:['红色警戒','穿越火线','劲舞团','超级玛丽'],
        films:['《教父》','《拆弹专家》','《你好，李焕英》','《尚硅谷》'],
    }
},
  components: {Category}
}
</script>
<style>
.container{
  display: flex;
  justify-content: space-around;
}
img{
  width: 100%;
}
video{
  width: 100%;
}
</style>