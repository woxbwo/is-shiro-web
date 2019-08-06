<template>
  <d2-container class="container">
    <el-row :gutter="20" class="wrapper">
      <el-col :span="12" :offset="6">
        <div class="grid-content bg-purple">
          <h2 class="title">{{ title }}</h2>
          <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="auto" size="small">
            <el-form-item label="专家名称" prop="expertName">
              <el-input v-model="registerForm.expertName"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="registerForm.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="repassword">
              <el-input type="password" v-model="registerForm.repassword"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="captcha">
              <el-input v-model="registerForm.captcha" style="width: 100px; margin-right: 20px"></el-input>
              <img class="captcha-img" :src="captchaUrl" alt="验证码" title="验证码" @click="refreshCaptcha">
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="registerForm.phone"></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" size="small" style="margin: 20px" @click="submit">注册</el-button>
        </div>
      </el-col>
    </el-row>
  </d2-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    const validatePwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.registerForm.repassword !== '') {
          this.$refs.registerForm.validateField('repassword')
        }
        callback()
      }
    }
    const validateRepwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
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
      title: '欢迎注册专家抽取管理系统'.split('').join(' '),
      captchaUrl: '/api/expert/expert/getRegistVerifyCode',
      registerForm: {
        expertName: '',
        password: '',
        repassword: '',
        captcha: '',
        phone: ''
      },
      rules: {
        expertName: [
          { required: true, message: '请输入专家名称', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 4 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePwd, trigger: 'blur' }
        ],
        repassword: [
          { required: true, validator: validateRepwd, trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        phone: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions('d2admin/account', [
      'register'
    ]),
    refreshCaptcha () {
      this.captchaUrl += `?${Math.random().toString()}`
    },
    submit () {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          const { expertName, password, repassword, captcha, phone } = this.registerForm
          this.register({
            expertName: expertName,
            password: password,
            rePassword: repassword,
            verifyCode: captcha,
            telephone: phone
          })
            .then(() => {
              this.openConfBox()
            })
            .catch(() => {
              this.refreshCaptcha()
            })
        }
      })
    },
    openConfBox () {
      this.$confirm('您已注册成功, 是否继续?', '温馨提示', {
        confirmButtonText: '返回登录页面',
        showCancelButton: false,
        type: 'success',
        center: true
      }).then(() => {
        this.$router.replace('/')
      }).catch(() => {
        this.$router.replace('/')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    background-color: #ffffff;
    width: 100%;
    height: 100%
  }
  .wrapper {
    @extend %full;
    display: flex;
    align-items: center;
    margin: 0px !important;
  }
  .grid-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 4px;
    min-width: 600px;
    min-height: 36px;
  }
  .bg-purple {
    background-color: #e8eaec;
  }
  .grid-content-title {
    font-size: 26px;
  }
  .captcha-img {
    vertical-align: middle;
    height: 29px;
    margin-top: -1.5px;
  }
</style>
