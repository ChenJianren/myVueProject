<template>
  <div>
    <div class="login">
      <div class="title">后台管理系统</div>
      <el-form label-position="left" status-icon ref="formLabelAlign" label-width="60px" :rules="rules" :model="formLabelAlign">
        <el-form-item label="用户名" prop="uname">
          <el-input v-model="formLabelAlign.uname"></el-input>
        </el-form-item>
        <el-form-item label="密 码" prop="upwd">
          <el-input type="password" v-model="formLabelAlign.upwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('formLabelAlign')">登录</el-button>
          <el-button @click="resetForm('formLabelAlign')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    function validateUname(rule, value, callback) {
      if (value == "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    }
    function validateUpwd(rule, value, callback) {
      if (value == "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    }
    return {
      formLabelAlign: {
        uname: "",
        upwd: ""
      },
      rules: {
        uname: [{ validator: validateUname, trigger: "blur" }],
        upwd: [{ validator: validateUpwd, trigger: "blur" }]
      }
    };
  },
  methods: {
    login() {
      this.$http.post(this.$api.login, this.formLabelAlign).then(res => {
        if (res.data.status == 0) {
          this.$notify({
            title: "登录成功",
            message: "欢迎使用管理系统",
            type: "success",
            duration: 2000
          });
          let nextPath = this.$route.query.nextPath;
          this.$router.push({ path: nextPath ? nextPath : "admin" });
        } else {
          this.$alert(res.data.message);
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login();
        } else {
          this.$alert("用户名或密码不能为空！");
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped lang="less">
.login {
  width: 400px;
  height: 165px;
  margin: 0 auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  border: 1px solid #fff;
  border-radius: 20px;
  padding: 20px;
  .title {
    width: 400px;
    text-align: center;
    color: #fff;
    font-size: 24px;
    position: absolute;
    top: -40px;
  }
}
</style>