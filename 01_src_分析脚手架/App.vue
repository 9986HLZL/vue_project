<template>
  <div>
    <img src="./assets/logo.png" alt="logo">
    <MySchool></MySchool>
    <MyStudent></MyStudent>
  </div>
</template>

<script>
    import MySchool from './components/MySchool'
    import MyStudent from './components/MyStudent'
    export default {
        name:'App',
        components:{
            MySchool,
            MyStudent
        }
    }
</script>

<style>

</style>