<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">学生工作管理系统</div>
      <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="username" class="ms-content-item">
          <el-input v-model="param.username" placeholder="请输入账号" autofocus="true">
            <template #prepend>
              <el-button icon="el-icon-user"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" class="ms-content-item">
          <el-input type="password" placeholder="请输入密码" clearable="true" v-model="param.password"
                    @keyup.enter="submitForm()">
            <template #prepend>
              <el-button icon="el-icon-lock"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <div class="login-action">
          <el-checkbox label="记住密码"></el-checkbox>
          <el-button type="text" @click="forgotPassword">忘记密码？</el-button>
        </div>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
        <p class="login-tips">请登录</p>
      </el-form>
    </div>
  </div>
</template>

<script>
import {ref, reactive} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";

export default {
  methods:{
    forgotPassword(){
      ElMessage.error('忘了就忘了，关我啥事');
    }
  },
  setup() {
    const router = useRouter();
    const param = reactive({
      username: "admin",
      password: "123456",
    });

    const rules = {
      username: [
        {
          required: true,
          message: "请输入用户名",
          trigger: "blur",
        },
      ],
      password: [
        {required: true, message: "请输入密码", trigger: "blur"},
      ],
    };
    const login = ref(null);
    const submitForm = () => {
      login.value.validate((valid) => {
        if (valid) {
          ElMessage.success("登录成功");
          localStorage.setItem("ms_username", param.username);
          router.push("/");
        } else {
          ElMessage.error("登录成功");
          return false;
        }
      });
    };

    const store = useStore();
    store.commit("clearTags");

    return {
      param,
      rules,
      login,
      submitForm,
    };
  },
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/login-bg.png);
  background-size: 100%;
}

.ms-title {
  width: 100%;
  line-height: 80px;
  text-align: center;
  font-size: 24px;
  padding-top: 20px;
}

.ms-login {
  position: absolute;
  left: 80%;
  top: 50%;
  width: 450px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: #fff;
  overflow: hidden;
}

.ms-content {
  padding: 30px 30px;
}

.ms-content-item {
  padding-top: 5px;
}

.login-btn {
  text-align: center;
  padding-top: 10px;
}

.login-btn button {
  width: 100%;
  height: 40px;
  margin: 40px 0px 0px 0px;
}

.login-action {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #868686;
}

.login-action button{
  min-height: 20px;
  padding:0px 10px;
  color: #868686;
}

.login-tips {
  font-size: 14px;
  line-height: 30px;
  color: #fff;
}
</style>
