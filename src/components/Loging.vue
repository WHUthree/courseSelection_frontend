<template>
    <div id="home">
        <el-card class="box-card">
        <h2>登录</h2>
        <el-form 
        :model="ruleForm" 
        status-icon
        :rules="rules"
        ref="ruleForm" 
        label-position="left" 
        label-width="70px"
        class="login-form">
        <el-form-item label="学号" prop="schoolNumber">
            <el-input v-model="ruleForm.schoolNumber"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
        </el-form-item>
        </el-form>
        <div class="btnGroup">
            <el-button type="primary" @click="submitForm('ruleForm')" v-loading="loading">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <router-link to="/Loging1">
                <el-button style="margin-left:10px">教师登录</el-button>
            </router-link>
        </div>
        </el-card>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            ruleForm: {
                schoolNumber: "",
                password: "",
            },
            rules: {
                schoolNumber: [
                    { required: true, message: "学号不能为空", trigger: 'blur' },
                ],
                password: [
                    { required: true, message: "密码不能为空", trigger: 'blur' },
                ],
            },
            loading: false,
        };
},
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                this.loading = true;
                if (valid) {
                    axios({
                        url:"/students/login",
                        method:"post",
                        headers:{
                            "Content-Type": "application/json"
                        },
                        data:{
                            password: this.ruleForm.password,
                            schoolNumber: this.ruleForm.schoolNumber
                        },
                    }).then((res)=>{
                        if(res.data.success){
                            sessionStorage.setItem("userInfo",JSON.stringify(res.data.data));
                            this.$router.push("/home");
                            this.$message({
                                message:res.data.message,
                                type:"success"
                            });
                        }else{
                            this.$message({
                            message: res.data.message,
                            type: "warning",
                        });
                    }
                    this.loading = false;
                    console.log(res);
                    });
                }else{
                    console.log('error submit!!');
                    this.loading = false;
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    },
};
</script>

<style scoped>
#home {
  width: 100%;
  height: 100vh;
  background: url("../assets/background.jpg") center center no-repeat;
  background-size: 100% 100%;
  top:0;
  left:0;
  position: fixed;
}
.box-card {
  margin: auto auto;
  margin-top:10%;
  width: 400px;
}
.login-form {
  margin: auto auto;
}
</style>