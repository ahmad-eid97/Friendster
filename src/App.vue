<template>
  <div id="app">
    <app-navbar></app-navbar>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import './css/variables.scss';
@import './css/mixins.scss';
#app {
  font-family: Roboto,-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 50px;
  background-color: #f4f4f4;
  overflow-x: hidden;
}
html, body {
  overflow-x: hidden;
}
</style>

<script>
import navbar from './components/Navbar'
export default {
  data() {
    return {
      
    }
  },
  methods: {
    
  },
  components: {
    'app-navbar': navbar
  }
}
</script>