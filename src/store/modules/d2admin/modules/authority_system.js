import {
  AddSystem,
  RemoveSystem,
  UpdateSystem,
  FetchSystemList
} from '@api/authority_system.js'

export default {
  namespaced: true,
  actions: {
    /**
     * @description 获取系统列表
     */
    fetchSystemList ({ commit, dispatch }, {
      pageSize = '',
      pageIndex = ''
    } = {}) {
      return new Promise((resolve, reject) => {
        FetchSystemList({
          pageSize,
          pageIndex
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
     * @description 新增系统
     */
    addSystem ({ commit, dispatch }, {
      sysName = '',
      sysCode = '',
      remark = '',
      orderNum = ''
    } = {}) {
      return new Promise((resolve, reject) => {
        AddSystem({
          sysName,
          sysCode,
          remark,
          orderNum
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
     * @description 删除系统
     */
    removeSystem ({ commit, dispatch }, {
      sysId = ''
    } = {}) {
      return new Promise((resolve, reject) => {
        RemoveSystem({
          sysId
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
     * @description 更新系统
     */
    updateSystem ({ commit, dispatch }, {
      sysId = '',
      sysName = '',
      sysCode = '',
      remark = '',
      orderNum = ''
    } = {}) {
      return new Promise((resolve, reject) => {
        UpdateSystem({
          sysId,
          sysName,
          sysCode,
          remark,
          orderNum
        })
          .then(async res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}
