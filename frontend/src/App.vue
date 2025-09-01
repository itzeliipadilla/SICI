<template>
  <div id="app"> 
    <NavComp />
    <router-view />
  </div>
</template>

<script>
import NavComp from './components/NavComp.vue'; 

export default {
  name: 'App',
  components: {
    NavComp,  
  },
};
</script>

<style>
body {
  background-color: #F8F8F8;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>