<template>
    <div class="l-block" >
        <img :src="`${rootUrl}img/login/bg.png`" class="l-bg">
        <img :src="`${rootUrl}img/login/bge.png`" class="l-bg">
        <img :src="`${rootUrl}img/login/logo.png`" class="l-logo">
        <div class="l-login-box" >
            <img :src="`${rootUrl}img/login/left.png`" class="l-left-img" >
            <div class="l-title" >欢迎登录</div>
            <el-form class="l-login-form"
                    status-icon
                    :rules="loginRules"
                    ref="loginForm"
                    :model="loginForm"
                    label-width="0">
                <el-form-item prop="account">
                    <el-input size="small"
                                @keyup.enter.native="handleLogin"
                                v-model="loginForm.account"
                                auto-complete="off"
                                :placeholder="请输入账号"
                                :disabled = "disabled"
                                ref="account"
                                >
                        <i slot="prefix"
                        class="el-icon-user"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input size="small"
                                @keyup.enter.native="handleLogin"
                                :type="passwordType"
                                v-model="loginForm.password"
                                auto-complete="off"
                                :placeholder="请输入密码"
                                :disabled = "disabled"
                                ref="password"
                                >
                        <i class="el-icon-view el-input__icon"
                        slot="suffix"
                        @click="showPassword"></i>
                        <i slot="prefix"
                        class="el-icon-lock"></i>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                                @click.native.prevent="handleLogin"
                                :loading="isLoading"
                                class="login-submit">{{submitName}}</el-button>
                </el-form-item>
                <div class="l-version" >
                    版本号:{{website.version}}
                </div>
            </el-form>
        </div>
        
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      loginForm: {
          account: "",
          password: ""
      },
      loginRules: {
          account: [
          { required: true, message: "请输入用户名", trigger: "blur" }
          ],
          password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 4, message: "密码长度最少为4位", trigger: "blur" }
          ]
      },
      passwordType: "password",
      isLoading:false,
      disabled : false,
      submitName: '登录'
    };
  },
  computed: {
    ...mapGetters([
      "website",
    ])
  },
    methods: {
    showPassword() {
      this.passwordType == ""
        ? (this.passwordType = "password")
        : (this.passwordType = "");
    },
    loading(flag){
      if(flag){
          this.submitName = '登录中...';
          this.isLoading = true;
          this.disabled = true;
      }
      else{
            this.submitName = '登录';
            this.isLoading = false;
            this.disabled = false;
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid,object) => {
        if (valid) {
          this.loading(true);
          this.$store.dispatch("Login", this.loginForm).then(() => {
            this.loading(false);
            this.$router.push({ path: '/' });
          }).catch(()=>{
            this.loading(false);
          });
        }
        else{
          const id = object.password ? 'password' :'account';
          this.$refs[id].focus();
        }
      });
    }
  }
}
</script>
<style lang="scss">
@import "../styles/login.scss";
</style>