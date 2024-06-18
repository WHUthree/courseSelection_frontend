<template>
    <div>
        <h2 style="text-align:left;background-color: #409EFF;color: #ffffff;margin-top: 0;">用户信息</h2>
        <el-descriptions title="用户信息">
            <el-descriptions-item label="姓名">{{ tableData.student_name }}</el-descriptions-item>
            <el-descriptions-item label="学号">{{ tableData.schoolNumber }}</el-descriptions-item>
            <el-descriptions-item label="性别">{{ tableData.gender }}</el-descriptions-item>
            <el-descriptions-item label="学院">{{ tableData.department}}</el-descriptions-item>
        </el-descriptions>
    </div>

</template>

<script>  
import axios from 'axios';  
  
export default {  
  data() {  
    return {  
      tableData: {}  
    };  
  },  
  created: function() {  
    this.fetchUser();  
  },  
  methods: {  
    fetchUser: function() {  
      var userInfoString = sessionStorage.getItem("userInfo");  
      var userInfo = JSON.parse(userInfoString);  
      var userId = userInfo.id;  
      axios.get(`/students/${userId}`)
        .then((response) => {  
          this.tableData = response.data.data;  
        })  
        .catch((error) => {  
          console.error('Error fetching user data:', error);  
        });  
    }  
  }  
};  
</script>