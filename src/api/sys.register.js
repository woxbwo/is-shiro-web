import request from '@/plugin/axios'

export function Register (data) {
  return request({
    url: '/api/expert/expert/expertRegist',
    method: 'post',
    data
  })
}
