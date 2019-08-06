import request from '@/plugin/axios'

export function AccountLogin (data) {
  return request({
    url: '/api/auth/jwt/token',
    method: 'post',
    data
  })
}
