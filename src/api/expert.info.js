import request from '@/plugin/axios'

// 提交专家信息
export function SubmitExpertInfo (data) {
  return request({
    url: '/api/expert/expert/saveOrUpdateExpertBaseInfo',
    method: 'post',
    data
  })
}

// 获取专家职称
export function FetchExpertTitle () {
  return request({
    url: '/api/expert/title/professionalTitleTree',
    method: 'get'
  })
}

// 获取专家评标专业
export function FetchExpertProfession () {
  return request({
    url: '/api/expert/profession/expertBidProfessionTree',
    method: 'get'
  })
}

// 获取专家专业列表
export function FetchExpertProfessionList () {
  return request({
    url: '/api/expert/expertIndustry/getExpertIndustry',
    method: 'get'
  })
}

// 获取回避单位列表
export function FetchAvoidUnitList () {
  return request({
    url: '/api/expert/avoidUnit/getAvoidUnit',
    method: 'get'
  })
}

// 新增专家专业
export function AddExpertProfession (data) {
  return request({
    url: '/api/expert/expertIndustry/addExpertIndustry',
    method: 'post',
    data
  })
}
// 删除专家专业
export function RemoveExpertProfession (data) {
  return request({
    url: `/api/expert/expertIndustry/deleteExpertIndustry/${data.expertIndustryId}`,
    method: 'delete'
  })
}
// 新增回避单位
export function AddAvoidUnit (data) {
  return request({
    url: '/api/expert/avoidUnit/addAvoidUnit',
    method: 'post',
    data
  })
}
// 删除回避单位
export function RemoveAvoidUnit (data) {
  return request({
    url: `/api/expert/avoidUnit/deleteAvoidUnit/${data.expertAvoidUnitId}`,
    method: 'delete'
  })
}
