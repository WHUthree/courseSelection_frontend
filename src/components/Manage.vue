<template>  
    <div class="manage-container">  
      <h2>管理界面</h2>  
      <div class="form-group">  
        <h3>注册学生</h3>  
        <el-form @submit.native.prevent="registerStudent">  

          <el-form-item label="学号">  
            <el-input v-model="newStudent.schoolNumber"></el-input>  
          </el-form-item>  
          <el-form-item label="姓名">  
            <el-input v-model="newStudent.student_name"></el-input>  
          </el-form-item>
          <el-form-item label="学院">  
            <el-input v-model="newStudent.department"></el-input>  
          </el-form-item>  
          <el-form-item label="性别">  
            <el-input v-model="newStudent.gender"></el-input>  
          </el-form-item>    
          <el-form-item label="密码">  
            <el-input v-model="newStudent.password"></el-input>  
          </el-form-item>  
          <el-form-item>  
            <el-button type="primary" @click="registerStudent">注册</el-button>  
          </el-form-item>  
        </el-form>  
      </div>  
      <div class="form-group">  
        <h3>添加课程</h3>  
        <el-form @submit.native.prevent="addCourse">  
          <el-form-item label="上课地点">  
            <el-input v-model="newCourse.course_location"></el-input>  
          </el-form-item>  
          <el-form-item label="课程名称">  
            <el-input v-model="newCourse.course_name"></el-input>  
          </el-form-item>  
          <el-form-item label="上课时间">  
            <el-input v-model="newCourse.course_time"></el-input>  
          </el-form-item>  
          <el-form-item>  
            <el-button type="primary" @click="addCourse">添加</el-button>  
          </el-form-item>  
        </el-form>  
      </div>  
      <div class="form-group">  
        <h3>绑定课程老师</h3>  
        <el-form @submit.native.prevent="bindTeacherToCourse">  
          <el-form-item label="课程编号">  
            <el-select v-model="bindInfo.courseCode" placeholder="请选择课程">  
              <el-option  
                v-for="course in courses"  
                :key="course.courseCode"  
                :label="course.courseName"  
                :value="course.courseCode">  
              </el-option>  
            </el-select>  
          </el-form-item>  
          <el-form-item label="教师编号">  
            <el-input v-model="bindInfo.teacherId"></el-input>  
          </el-form-item>  
          <el-form-item>  
            <el-button type="primary" @click="bindTeacherToCourse">绑定</el-button>  
          </el-form-item>  
        </el-form>  
      </div>  
    </div>  
  </template>  
    
  <script>  
  import axios from 'axios';  
    
  export default {  
    data() {  
      return {  
        newStudent: {  
          schoolNumber: '',  
          name: ''  
        },  
        newCourse: {  
          courseCode: '',  
          courseName: ''  
        },  
        bindInfo: {  
          courseCode: '',  
          teacherId: ''  
        },  
        courses: [] 
      };  
    },  
    methods: {  
      async registerStudent() {  
        try {  
          await axios.post('/students', this.newStudent);  
          this.$message({ message: '学生注册成功', type: 'success' });  
        } catch (error) {  
          this.$message({ message: '学生注册失败', type: 'error' });  
          console.error(error);  
        }  
      },  
      async addCourse() {  
        try {  
          await axios.post('/courses', this.newCourse);  
          this.$message({ message: '课程添加成功', type: 'success' });  
        } catch (error) {  
          this.$message({ message: '课程添加失败', type: 'error' });  
          console.error(error);  
        }  
      },  
      async bindTeacherToCourse() {  
        try {  
          await axios.post(`/courses/${this.bindInfo.courseCode}/teachers`, { teacherId: this.bindInfo.teacherId });  
          this.$message({ message: '课程老师绑定成功', type: 'success' });  
        } catch (error) {  
          this.$message({ message: '课程老师绑定失败', type: 'error' });  
          console.error(error);  
        }  
      }  
    }  
  };  
  </script>