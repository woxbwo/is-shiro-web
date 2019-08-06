import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

// 新加，测试动态路由，权限
export const customChildrenRoute = [
  // 首页
  {
    path: 'index',
    name: 'index',
    meta: {
      auth: true
    },
    component: _import('system/index')
  },
  // 图表
  {
    path: 'expert_info',
    name: 'expert_info',
    meta: {
      title: '专家信息维护',
      auth: true
    },
    component: _import('expert_info/index')
  },
  // 演示页面
  {
    path: 'page1',
    name: 'page1',
    meta: {
      title: '页面 1',
      auth: true
    },
    component: _import('demo/page1')
  },
  {
    path: 'page2',
    name: 'page2',
    meta: {
      title: '页面 2',
      auth: true
    },
    component: _import('demo/page2')
  },
  {
    path: 'page3',
    name: 'page3',
    meta: {
      title: '页面 3',
      auth: true
    },
    component: _import('demo/page3')
  },
  {
    path: 'page4',
    name: 'page4',
    meta: {
      title: '页面4',
      auth: true
    },
    component: _import('demo/page4')
  },
  // 系统 前端日志
  {
    path: 'log',
    name: 'log',
    meta: {
      title: '前端日志',
      auth: true
    },
    component: _import('system/log')
  },
  // 刷新页面 必须保留
  {
    path: 'refresh',
    name: 'refresh',
    hidden: true,
    component: _import('system/function/refresh')
  },
  // 页面重定向 必须保留
  {
    path: 'redirect/:route*',
    name: 'redirect',
    hidden: true,
    component: _import('system/function/redirect')
  }
]

/**
 * 子路由
 */
const childrenRoute = [
  // 首页
  {
    path: 'index',
    name: 'index',
    meta: {
      auth: true
    },
    component: _import('system/index')
  },
  // 图表
  {
    path: 'expert_info',
    name: 'expert_info',
    meta: {
      title: '专家信息维护',
      auth: true
    },
    component: _import('expert_info/index')
  },
  // 演示页面
  {
    path: 'page1',
    name: 'page1',
    meta: {
      title: '页面 1',
      auth: true
    },
    component: _import('demo/page1')
  },
  {
    path: 'page2',
    name: 'page2',
    meta: {
      title: '页面 2',
      auth: true
    },
    component: _import('demo/page2')
  },
  {
    path: 'page3',
    name: 'page3',
    meta: {
      title: '页面 3',
      auth: true
    },
    component: _import('demo/page3')
  },
  {
    path: 'page4',
    name: 'page4',
    meta: {
      title: '页面4',
      auth: true
    },
    component: _import('demo/page4')
  },
  // 系统 前端日志
  {
    path: 'log',
    name: 'log',
    meta: {
      title: '前端日志',
      auth: true
    },
    component: _import('system/log')
  },
  // 刷新页面 必须保留
  {
    path: 'refresh',
    name: 'refresh',
    hidden: true,
    component: _import('system/function/refresh')
  },
  // 页面重定向 必须保留
  {
    path: 'redirect/:route*',
    name: 'redirect',
    hidden: true,
    component: _import('system/function/redirect')
  }
]

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: childrenRoute
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('system/login')
  },
  {
    path: '/register',
    name: 'register',
    component: _import('system/register')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]