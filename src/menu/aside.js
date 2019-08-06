// 菜单 侧边栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '权限管理',
    icon: 'eye-slash',
    children: [
      { path: '/authority/system', title: '系统管理', icon: 'cogs' }
    ]
  },
  { path: '/expert_info', title: '专家信息维护', icon: 'wrench' },
  /**
   * @description 临时注释，请勿删除
   * @author vectorwings
   */
  {
    title: '页面',
    icon: 'folder-o',
    children: [
      { path: '/page1', title: '页面 1' },
      { path: '/page2', title: '页面 2' },
      { path: '/page3', title: '页面 3' },
      { path: '/page4', title: '页面 4' }
    ]
  }
]
