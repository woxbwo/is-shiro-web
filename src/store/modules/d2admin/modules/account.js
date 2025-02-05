import { Message, MessageBox } from 'element-ui'
import util from '@/libs/util.js'
import router from '@/router'
import jwtDecode from 'jwt-decode'
import { AccountLogin } from '@api/sys.login'
import { Register } from '@api/sys.register'
import { FetchUserInfo } from '@api/sys.user'

export default {
  namespaced: true,
  actions: {
    /**
     * @description 注册
     * @param {Object} param context
     * @param {Object} param expertName {String} 专家名称
     * @param {Object} param password {String} 密码
     * @param {Object} param repassword {String} 确认密码
     * @param {Object} param captcha {String} 验证码
     * @param {Object} param phone {String} 电话号码
     */
    register ({ commit, dispatch }, {
      expertName = '',
      password = '',
      rePassword = '',
      verifyCode = '',
      telephone = ''
    } = {}) {
      return new Promise((resolve, reject) => {
        Register({
          expertName,
          password,
          rePassword,
          verifyCode,
          telephone
        })
          .then(async res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    /**
     * @description 登录
     * @param {Object} param context
     * @param {Object} param username {String} 用户账号
     * @param {Object} param password {String} 密码
     * @param {Object} param route {Object} 登录成功后定向的路由对象 任何 vue-router 支持的格式
     */
    login ({ commit, dispatch }, {
      username = '',
      password = '',
      verifyCode = ''
    } = {}) {
      return new Promise((resolve, reject) => {
        // 开始请求登录接口
        AccountLogin({
          username,
          password,
          verifyCode
        })
          .then(async res => {
            // 设置 cookie 一定要存 uuid 和 token 两个 cookie
            // 整个系统依赖这两个数据进行校验和存储
            // uuid 是用户身份唯一标识 用户注册的时候确定 并且不可改变 不可重复
            // token 代表用户当前登录状态 建议在网络请求中携带 token
            // 如有必要 token 需要定时更新，默认保存一天
            // util.cookies.set('uuid', res.uuid)
            // util.cookies.set('token', res.token)

            // 新增
            util.cookies.set('token', res)
            // 解析 Token
            const tokenDecode = jwtDecode(res)
            console.log('解析后的token信息：', tokenDecode)
            // 设置 vuex 用户信息
            // await dispatch('d2admin/user/set', {
            //   name: res.name,
            //   name: 'admin', // 新增
            //   name: tokenDecode.uniqueName
            // }, { root: true })
            // 新增
            // 参考：https://vuex.vuejs.org/zh/guide/modules.html
            // 设置左侧菜单信息
            // await commit('d2admin/menu/asideSet', res.aside, { root: true })

            // 从服务器端根据 token 获取用户基本信息
            await dispatch('fetchUserInfo')
            // 用户登录后从持久化数据加载一系列的设置
            await dispatch('load')
            // 结束
            resolve(res)
          })
          .catch(err => {
            console.log('err: ', err)
            reject(err)
          })
      })
    },
    /**
     * @description 注销用户并返回登录页面
     * @param {Object} param context
     * @param {Object} param confirm {Boolean} 是否需要确认
     */
    logout ({ commit, dispatch }, { confirm = false } = {}) {
      /**
       * @description 注销
       */
      async function logout () {
        // 删除cookie
        util.cookies.remove('token')
        util.cookies.remove('uuid')
        // 清空 vuex 用户信息
        await dispatch('d2admin/user/set', {}, { root: true })
        // 跳转路由
        router.push({
          name: 'login'
        })
      }
      // 判断是否需要确认
      if (confirm) {
        commit('d2admin/gray/set', true, { root: true })
        MessageBox.confirm('注销当前账户吗?  打开的标签页和用户设置将会被保存。', '确认操作', {
          confirmButtonText: '确定注销',
          cancelButtonText: '放弃',
          type: 'warning'
        })
          .then(() => {
            commit('d2admin/gray/set', false, { root: true })
            logout()
          })
          .catch(() => {
            commit('d2admin/gray/set', false, { root: true })
            Message({
              message: '放弃注销用户'
            })
          })
      } else {
        logout()
      }
    },
    /**
     * @description 用户登录后从持久化数据加载一系列的设置
     * @param {Object} state vuex state
     */
    load ({ dispatch }) {
      return new Promise(async resolve => {
        // DB -> store 加载用户名
        await dispatch('d2admin/user/load', null, { root: true })
        // DB -> store 加载主题
        await dispatch('d2admin/theme/load', null, { root: true })
        // DB -> store 加载页面过渡效果设置
        await dispatch('d2admin/transition/load', null, { root: true })
        // DB -> store 持久化数据加载上次退出时的多页列表
        await dispatch('d2admin/page/openedLoad', null, { root: true })
        // DB -> store 持久化数据加载侧边栏折叠状态
        await dispatch('d2admin/menu/asideCollapseLoad', null, { root: true })
        // DB -> store 持久化数据加载全局尺寸
        await dispatch('d2admin/size/load', null, { root: true })
        // end
        resolve()
      })
    },
    /**
     * @description 根据token获取用户基本信息
     */
    fetchUserInfo ({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        FetchUserInfo()
          .then(async res => {
            console.log('用户信息：', res)
            // 设置 vuex 用户信息
            await dispatch('d2admin/user/set', {
              name: res.expertName,
              ...res
            }, { root: true })
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}
