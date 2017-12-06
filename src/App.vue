<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  import apiAuth from '@/api/auth';

  export default {
    created() {
      apiAuth.checkAuth()
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  };
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
