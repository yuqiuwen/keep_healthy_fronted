<template>
    <Nav style="height: 0;"></Nav>
    <router-view />


</template>
<script setup>
import Nav from '@/views/common/Nav'

</script>


<style lang="scss">
#app {
  font-family: Microsoft YaHei,Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  // height: 100%;
  background-color: #f4f7f6;
}
.router-view{
  width: 100%;
  // height: 100%;
  // position: absolute;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  -webkit-overflow-scrolling: touch;
}
html, body {
  height: 100%;
  width: 100%;
  overflow-x: auto;
  overflow-y: auto;
  color: #2c3e50;
  //padding-bottom: 0;

}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
