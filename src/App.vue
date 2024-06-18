<template>
  <div id="app">  
    <router-view></router-view>
  </div>
</template>

<script>
import Loging from './components/Loging.vue'
import Loging1 from './components/Loging1.vue'
import Query from './components/Query.vue'
import Select from './components/Select.vue'
import User from './components/User.vue'
import Home from './components/Home.vue'

import axios from 'axios'

export default {
  name: 'App',
  components: {
    Loging,Loging1,Query,Select,User,Home
  },
  created:function(){
      console.log("App组件创建成功");
    },
    mounted:function(){
      console.log("App组件挂载成功");
    },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  margin-left: 0px;
}
</style>
