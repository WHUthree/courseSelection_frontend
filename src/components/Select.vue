<template>  
  <div>  
    <h2 style="text-align:left;background-color: #409EFF;color: #ffffff;margin-top: 0;">选课界面</h2>  
    <div>  
      <el-table  
        :data="tableData"  
        border  
        style="width: 100%">  
        <el-table-column
          prop="id"
          label="课程编号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="course_name"
          label="课程名称"
          width="250">
        </el-table-column>
        <el-table-column
          prop="teacher_name"
          label="教师姓名"
          width="200">
        </el-table-column>
        <el-table-column
          prop="course_time"
          label="上课时间"
          width="250">
        </el-table-column>
        <el-table-column
          prop="course_location"
          label="上课地点"
          width="250">
        </el-table-column> 
        <el-table-column  
          prop="course_select"  
          label="选课"  
          width="250">  
          <template slot-scope="scope">  
            <el-button type="primary" @click="selectCourse(scope.row)" :disabled="scope.row.isSelected">选课</el-button>  
          </template>  
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
      userId: null,  
    };  
  },  
  created() {  
    this.getUserId().then(id => {  
      this.userId = id;  
      if (!this.userId) {   
        console.error('User is not logged in');  
        return;  
      }  
      this.fetchData();  
    }).catch(error => {  
      console.error("Error fetching user ID:", error);  
    });  
  },  
  methods: {  
    getUserId() {  
      return new Promise((resolve, reject) => {  
        var userInfoString = sessionStorage.getItem("userInfo");  
        try {  
          var userInfo = userInfoString ? JSON.parse(userInfoString) : null;  
          resolve(userInfo ? userInfo.id : null);  
        } catch (e) {  
          reject(e);  
        }  
      });  
    },  
    fetchData() {
      axios.get(`/courses`,).then((response) => {  
        this.tableData = response.data.data;
      }).catch(error => {  
        console.error("Error fetching data:", error);  
      });  
    },  
    selectCourse(row) {  
      axios.post(`/students/${this.userId}/courses`,[row.id]).then((response) => {  
        if (response.data.success) {  
          row.isSelected = true;  
          this.$message.success('选课成功');  
        } else {  
          this.$message.error('选课失败');  
        }  
      }).catch(error => {  
        console.error('Error selecting course:', error);  
        this.$message.error('选课失败，请稍后再试');  
      });  
    },  
  },  
};  
</script>  
  
<style>  
    body {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif
  }
</style>