import request from '@/plugin/axios'

// 新增系统
export function AddSystem (data) {
  return request({
    url: '/api/admin/system/addSystem',
    method: 'post',
    data
  })
}
// 删除系统
export function RemoveSystem (data) {
  return request({
    url: `/api/admin/system/delSystem/${data.sysId}`,
    method: 'delete'
  })
}
// 更新系统
export function UpdateSystem (data) {
  return request({
    url: '/api/admin/system/editSystem',
    method: 'patch',
    data
  })
}

// 获取系统列表
export function FetchSystemList (data) {
  return request({
    url: `/api/admin/system/showSystemByPage?pageSize=${data.pageSize}&pageIndex=${data.pageIndex}`,
    method: 'get'
  })
}
