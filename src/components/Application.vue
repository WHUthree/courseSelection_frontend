<template>  
    <div class="leave-application">  
        <h2>请假条</h2>  
        <el-form :model="leaveForm" ref="leaveForm" label-width="120px">  
            <el-form-item label="课程ID">  
                <el-input v-model="leaveForm.courseId" placeholder="请输入课程ID"></el-input>  
            </el-form-item>  
            <el-form-item label="请假原因">  
                <el-input v-model="leaveForm.courseId" placeholder="请输入课程ID"></el-input>  
            </el-form-item>  
            <el-form-item>  
                <el-button type="primary" @click="submitLeaveApplication">提交请假条</el-button>  
            </el-form-item>  
        </el-form>  
        <el-table :data="leaveApplications" style="width: 100%">  
            <el-table-column prop="courseId" label="课程ID" width="180"></el-table-column>  
        </el-table>  
    </div>  
</template>
    
  <script>  
  import axios from 'axios';  
    
  export default {  
    data() {  
      return {  
        leaveForm: {  
          courseId: '',  
        },  
        userId: null, 
        loading: false,  
      };  
    },  
    created() {  
      this.userId = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')).id : null;  
      if (!this.userId) {  
        console.error('User is not logged in');  
      }  
    },  
    methods: {  
      async submitLeaveApplication() {  
        this.loading = true;  
        try {  
          const response = await axios.post('/applications', {  
            userId: this.userId,  
            courseId: this.leaveForm.courseId,    
          });  
          if (response.data.success) {  
            this.$message({  
              message: '请假条提交成功',  
              type: 'success',  
            });  
            this.leaveForm.courseId = '';  
          } else {  
            this.$message({  
              message: response.data.message,  
              type: 'warning',  
            });  
          }  
        } catch (error) {  
          console.error('提交请假条失败:', error);  
          this.$message({  
            message: '提交请假条失败，请稍后再试',  
            type: 'error',  
          });  
        } finally {  
          this.loading = false;  
        }  
      },  
    },  
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
      axios.get(`applications`,).then((response) => {  
        this.leaveApplications = response.data.data;
      }).catch(error => {  
        console.error("Error fetching data:", error);  
      });  
    },  
  };  
  </script>  
    
