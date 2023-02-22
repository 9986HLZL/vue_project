<template>
  <div>
    <Search></Search>
    <List></List>
  </div>
</template>

<script>
   
  import List from './components/List'
  import Search from './components/Search'
  export default {
  name: 'App',
  components: {
    Search,
    List
  
  }
}
</script>
<style>

</style>