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
        <el-form-item label="工号" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
        </el-form-item>
        </el-form>
        <div class="btnGroup">
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <el-button @click="goBack">返回</el-button>
        </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ruleForm: {
                title: "",
                password: "",
            },
            rules: {
                title: [
                    { required: true, message: "工号不能为空", trigger: 'blur' },
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
                    let _this = this;
                    this.axios({
                        url:"/teachers/login",
                        method:"post",
                        headers:{
                            "Content-Type": "application/json"
                        },
                        params:{
                            password: _this.ruleForm.password,
                            title: _this.ruleForm.title
                        },
                    }).then((res)=>{
                        if(res.data.success){
                            sessionStorage.setItem("userInfo",JSON.stringify(res.data.data));
                            this.$router.push("/manage");
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
        goBack() {
            this.$router.go(-1);
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
.login-from {
  margin: auto auto;
}
</style>