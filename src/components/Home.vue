<template>
    <div>
      <div>
        <el-container>
          <el-header>
           <el-menu :default-active="1" :router="true" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="select">选课界面</el-menu-item>
            <el-menu-item index="application">请假界面</el-menu-item>
            <el-menu-item index="query">课表查询</el-menu-item>
            <el-submenu index="4">
             <template slot="title">个人中心</template>
             <el-menu-item index="user">用户信息</el-menu-item>
              <el-menu-item index="loging">退出登录</el-menu-item>
            </el-submenu>
           </el-menu>
          </el-header>
          <el-main>
           <router-view></router-view>
          </el-main>
        </el-container>
      </div>
    </div>
  </template>
  
  <script>
import Query from './Query.vue'
import Select from './Select.vue'
import User from './User.vue'
import Application from './Application.vue'
  
import axios from 'axios'

  export default {
    name: 'App',
    components: {
      Query,Select,User,Application
    },
  }
  </script>
  
  <style>
    .el-container {
      position: fixed;
      top: 0;
      left: 0;
    }
  </style>