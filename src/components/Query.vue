<template>
    <div>
     <h2 style="text-align:left;background-color: #409EFF;color: #ffffff;margin-top: 0;">课表查询</h2>
      <div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="course_time"
          label="上课时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="id"
          label="课程编号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="course_name"
          label="课程名称"
          width="300">
        </el-table-column>
        <el-table-column
          prop="teacher_name"
          label="教师姓名"
          width="300">
        </el-table-column>
        <el-table-column
          prop="course_location"
          label="上课地点"
          width="300">
        </el-table-column>
      </el-table>
    </div>
    </div>
</template>

<script>    
import axios from 'axios';    
    
export default {    
  data() {    
    return {    
      tableData: [],  
      userInfo: null  
    };    
  },    
  created: function() {    
    this.getUserInfo()  
      .then(userInfo => {  
        this.userInfo = userInfo;  
        return this.fetchCourseSchedule(userInfo.id); 
      })  
      .then(scheduleData => {  
        this.tableData = scheduleData;  
      })  
      .catch(error => {  
        console.error("Error fetching course schedule:", error);  
      });  
  },    
  methods: {    
    getUserInfo() {  
      return new Promise((resolve, reject) => {  
        var userInfoString = sessionStorage.getItem("userInfo");    
        try {    
          var userInfo = userInfoString ? JSON.parse(userInfoString) : null;    
          resolve(userInfo || {});    
          console.log("User info:", userInfo);    
        } catch (e) {    
          console.error("Error parsing userInfo from sessionStorage:", e);    
          reject(e);  
        }    
      });  
    },  
    fetchCourseSchedule(userId) {  
      return axios.get(`/students/${userId}`)  
        .then(response => {  
            console.log("Course schedule data:", response.data.data.courses);  
          return response.data.data.courses; 
        });  
    } 
}
}  
</script>