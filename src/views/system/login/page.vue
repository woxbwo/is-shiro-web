<template>
  <div class="page-login">
    <div class="page-login--layer page-login--layer-area">
      <ul class="circles">
        <li v-for="n in 10" :key="n"></li>
      </ul>
    </div>
    <div
      class="page-login--layer page-login--layer-time"
      flex="main:center cross:center">
      {{time}}
    </div>
    <div class="page-login--layer">
      <div
        class="page-login--content"
        flex="dir:top main:justify cross:center box:justify">
        <div class="page-login--content-header">
          <p class="page-login--content-header-motto">
            时间是一切财富中最宝贵的财富。 <span>—— 德奥弗拉斯多</span>
          </p>
        </div>
        <div
          class="page-login--content-main"
          flex="dir:top main:center cross:center">
          <!-- logo -->
          <img class="page-login--logo" src="./image/logo@2x.png">
          <!-- 表单 -->
          <div class="page-login--form">
            <el-card shadow="never">
              <el-form ref="loginForm" label-position="top" :rules="rules" :model="formLogin" size="default">
                <el-form-item prop="username">
                  <el-input type="text" v-model="formLogin.username" placeholder="手机号码">
                    <i slot="prepend" class="fa fa-user-circle-o"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input type="password" v-model="formLogin.password" placeholder="密码">
                    <i slot="prepend" class="fa fa-keyboard-o"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="code">
                  <el-input type="text" v-model="formLogin.code" placeholder="- - - -">
                    <template slot="prepend">验证码</template>
                    <template slot="append">
                      <img class="login-code" style="width: 90px; height: 38px;" :src="captchaUrl" alt="验证码" title="验证码" @click="refreshCaptcha">
                    </template>
                  </el-input>
                </el-form-item>
                <el-button :loading="loginLoading" size="default" @click="submit" type="primary" class="button-login">{{ loginLoading ? '登录中' : '登录' }}</el-button>
              </el-form>
            </el-card>
            <p
              class="page-login--options"
              flex="main:justify cross:center">
              <span><d2-icon name="question-circle"/> 忘记密码</span>
              <span @click="register">注册用户</span>
            </p>
          </div>
        </div>
        <div class="page-login--content-footer">
          <p class="page-login--content-footer-options">
            <a href="#">帮助</a>
            <a href="#">隐私</a>
            <a href="#">条款</a>
          </p>
          <p class="page-login--content-footer-copyright">
            Copyright <d2-icon name="copyright"/><a href="http://www.cnzhutong.com/" target="__self">西安筑通软件科技有限公司</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapActions } from 'vuex'
// import { customChildrenRoute } from '../../../router/routes'
// import layoutHeaderAside from '@/layout/header-aside'
export default {
  data () {
    const validatePhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8|9][0-9]{9}$/
      if (value === '') {
        callback(new Error('请输入手机号码'))
      } else {
        if (!(phoneReg.test(value) && value.length === 11)) {
          callback(new Error('手机号码不符合规则'))
        } else {
          callback()
        }
      }
    }
    return {
      timeInterval: null,
      time: dayjs().format('HH:mm:ss'),
      captchaUrl: '/api/auth/jwt/getLoginVerifyCode',
      // 表单
      formLogin: {
        username: '',
        password: '',
        code: ''
      },
      // 校验
      rules: {
        username: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      loginLoading: false
    }
  },
  mounted () {
    this.timeInterval = setInterval(() => {
      this.refreshTime()
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.timeInterval)
  },
  methods: {
    ...mapActions('d2admin/account', [
      'login'
    ]),
    refreshTime () {
      this.time = dayjs().format('HH:mm:ss')
    },
    refreshCaptcha () {
      this.captchaUrl += `?${Math.random().toString()}`
    },
    /**
     * @description 提交表单
     */
    submit () {
      // 动态路由
      // 创建一个数组用来存储符合权限的路由
      // let dataRouter = []
      // 循环遍历动态路由表的每一个路由
      // for (let i = 0; i < customChildrenRoute.length; i++) {
      //   let data = {}
      //   data.path = customChildrenRoute[i].path
      //   data.name = customChildrenRoute[i].name
      //   data.component = customChildrenRoute[i].component
      //   dataRouter.push(data)
      // }

      // 将路由信息，菜单信息，用户信息存到sessionStorage里
      // sessionStorage.setItem('routes', JSON.stringify(dataRouter))

      // 动态添加路由信息
      // this.$router.addRoutes([
      //   {
      //     path: '/',
      //     redirect: { name: 'index' },
      //     component: layoutHeaderAside,
      //     children: dataRouter
      //   }
      // ])
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loginLoading = true
          this.login({
            username: this.formLogin.username,
            password: this.formLogin.password,
            verifyCode: this.formLogin.code
          })
            .then(() => {
              this.loginLoading = false
              // 重定向对象不存在则返回顶层路径
              this.$router.replace(this.$route.query.redirect || '/')
            })
            .catch(() => {
              this.loginLoading = false
              this.$refs.loginForm.resetFields()
              this.refreshCaptcha()
            })
        } else {
          // 登录表单校验失败
          this.$message.error('表单校验失败')
        }
      })
    },
    register () {
      this.$router.push({ path: '/register' })
    }
  }
}
</script>

<style lang="scss">
.page-login {
  @extend %unable-select;
  $backgroundColor: #F0F2F5;
  // ---
  background-color: $backgroundColor;
  height: 100%;
  position: relative;
  // 层
  .page-login--layer {
    @extend %full;
    overflow: auto;
  }
  .page-login--layer-area {
    overflow: hidden;
  }
  // 时间
  .page-login--layer-time {
    font-size: 24em;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.03);
    overflow: hidden;
  }
  // 登陆页面控件的容器
  .page-login--content {
    height: 100%;
    min-height: 500px;
  }
  // header
  .page-login--content-header {
    padding: 1em 0;
    .page-login--content-header-motto {
      margin: 0px;
      padding: 0px;
      color: $color-text-normal;
      text-align: center;
      font-size: 12px;
      span {
        color: $color-text-sub;
      }
    }
  }
  // main
  .page-login--logo {
    width: 240px;
    margin-bottom: 2em;
    margin-top: -2em;
  }
  // 登录表单
  .page-login--form {
    width: 280px;
    // 卡片
    .el-card {
      margin-bottom: 15px;
    }
    // 登录按钮
    .button-login {
      width: 100%;
    }
    // 输入框左边的图表区域缩窄
    .el-input-group__prepend {
      padding: 0px 14px;
    }
    .login-code {
      height: 40px - 2px;
      display: block;
      margin: 0px -20px;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
    // 登陆选项
    .page-login--options {
      margin: 0px;
      padding: 0px;
      font-size: 14px;
      color: $color-primary;
      margin-bottom: 15px;
      font-weight: bold;
    }
    .page-login--quick {
      width: 100%;
    }
  }
  // 快速选择用户面板
  .page-login--quick-user {
    @extend %flex-center-col;
    padding: 10px 0px;
    border-radius: 4px;
    &:hover {
      background-color: $color-bg;
      i {
        color: $color-text-normal;
      }
      span {
        color: $color-text-normal;
      }
    }
    i {
      font-size: 36px;
      color: $color-text-sub;
    }
    span {
      font-size: 12px;
      margin-top: 10px;
      color: $color-text-sub;
    }
  }
  // footer
  .page-login--content-footer {
    padding: 1em 0;
    .page-login--content-footer-options {
      padding: 0px;
      margin: 0px;
      margin-bottom: 10px;
      font-size: 14px;
      text-align: center;
      a {
        color: $color-text-normal;
        margin: 0 1em;
      }
    }
    .page-login--content-footer-copyright {
      padding: 0px;
      margin: 0px;
      font-size: 12px;
      color: $color-text-normal;
      a {
        color: $color-text-normal;
      }
    }
  }
  // 背景
  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0px;
    padding: 0px;
    li {
      position: absolute;
      display: block;
      list-style: none;
      width: 20px;
      height: 20px;
      background: #FFF;
      animation: animate 25s linear infinite;
      bottom: -200px;
      @keyframes animate {
        0%{
          transform: translateY(0) rotate(0deg);
          opacity: 1;
          border-radius: 0;
        }
        100%{
          transform: translateY(-1000px) rotate(720deg);
          opacity: 0;
          border-radius: 50%;
        }
      }
      &:nth-child(1) {
        left: 15%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
      }
      &:nth-child(2) {
        left: 5%;
        width: 20px;
        height: 20px;
        animation-delay: 2s;
        animation-duration: 12s;
      }
      &:nth-child(3) {
        left: 70%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
      }
      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        animation-delay: 0s;
        animation-duration: 18s;
      }
      &:nth-child(5) {
        left: 65%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
      }
      &:nth-child(6) {
        left: 75%;
        width: 150px;
        height: 150px;
        animation-delay: 3s;
      }
      &:nth-child(7) {
        left: 35%;
        width: 200px;
        height: 200px;
        animation-delay: 7s;
      }
      &:nth-child(8) {
        left: 50%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 45s;
      }
      &:nth-child(9) {
        left: 20%;
        width: 15px;
        height: 15px;
        animation-delay: 2s;
        animation-duration: 35s;
      }
      &:nth-child(10) {
        left: 85%;
        width: 150px;
        height: 150px;
        animation-delay: 0s;
        animation-duration: 11s;
      }
    }
  }
}
</style>
