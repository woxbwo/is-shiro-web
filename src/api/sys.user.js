import request from '@/plugin/axios'

export function FetchUserInfo () {
  return request({
    url: '/api/expert/expert/getExpertBaseInfo',
    method: 'get'
  })
}
