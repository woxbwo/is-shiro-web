import {
  FetchExpertTitle,
  FetchExpertProfession,
  FetchExpertProfessionList,
  FetchAvoidUnitList,
  AddExpertProfession,
  AddAvoidUnit,
  RemoveExpertProfession,
  RemoveAvoidUnit,
  SubmitExpertInfo
} from '@api/expert.info.js'

export default {
  namespaced: true,
  actions: {
    /**
     * @description 获取专家职称
     */
    fetchExpertTitle ({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        FetchExpertTitle()
          .then(async res => {
            commit('handleExpertTitle', res)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    /**
     * @description 获取专家评标专业
     */
    fetchExpertProfession ({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        FetchExpertProfession()
          .then(async res => {
            commit('handleExpertProfession', res)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    /**
     * @description 获取专家专业列表
     */
    fetchExpertProfessionList ({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        FetchExpertProfessionList()
          .then(async res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    /**
     * @description 获取回避单位列表
     */
    fetchAvoidUnitList ({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        FetchAvoidUnitList()
          .then(async res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    /**
     * @description 新增专家专业
     */
    addExpertProfession ({ commit, dispatch }, {
      expertId = '',
      professionId = '',
      status
    } = {}) {
      return new Promise((resolve, reject) => {
        AddExpertProfession({
          expertId,
          professionId,
          status
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
     * @description 新增回避单位
     */
    addAvoidUnit ({ commit, dispatch }, {
      expertId = '',
      enterpriseName = '',
      devpOrgCode = '',
      avoidReason = ''
    } = {}) {
      return new Promise((resolve, reject) => {
        AddAvoidUnit({
          expertId,
          enterpriseName,
          devpOrgCode,
          avoidReason
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
     * @description 删除专家专业
     */
    removeExpertProfession ({ commit, dispatch }, {
      expertIndustryId = ''
    } = {}) {
      return new Promise((resolve, reject) => {
        RemoveExpertProfession({
          expertIndustryId
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
     * @description 删除回避单位
     */
    removeAvoidUnit ({ commit, dispatch }, {
      expertAvoidUnitId = ''
    } = {}) {
      return new Promise((resolve, reject) => {
        RemoveAvoidUnit({
          expertAvoidUnitId
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
     * @description 提交专家信息
     */
    submitExpertInfo ({ commit, dispatch }, {
      expertName = '',
      birthdate = '',
      gender = '',
      educational = '',
      expertGraduate = '',
      specialty = '',
      enterpriseName = '',
      expertProfessionId = '',
      expertTitleId = '',
      expertJobTitleTime = '',
      telephone = '',
      mail = '',
      credent = '',
      idNumber = '',
      area = '',
      operator = ''
    } = {}) {
      return new Promise((resolve, reject) => {
        SubmitExpertInfo({
          expertName,
          birthdate,
          gender,
          educational,
          expertGraduate,
          specialty,
          enterpriseName,
          expertProfessionId,
          expertTitleId,
          expertJobTitleTime,
          telephone,
          mail,
          credent,
          idNumber,
          area,
          operator
        })
          .then(async res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },
  mutations: {
    /**
     * @description 处理专家职称数据
     * @data 服务端专家职称数据
     */
    handleExpertTitle (state, data) {
      state.expertTitleOptions = [...data]
    },
    /**
     * @description 处理专家评标专业数据
     * @data 服务端专家评标专业数据
     */
    handleExpertProfession (state, data) {
      state.expertProfessionOptions = [...data]
    }
  },
  state: {
    expertTitleOptions: [],
    expertProfessionOptions: []
  }
}
