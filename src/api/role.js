import request from '@/utils/request'

export function getList (params) {
  return request({
    url: '/role',
    method: 'get',
    params
  })
}

export function removeRole (id) {
  return request({
    url: `/role/${id}`,
    method: 'delete'
  })
}

export function addRole (data) {
  return request({
    url: `/role`,
    method: 'post',
    data
  })
}

export function editRole (id, data) {
  return request({
    url: `/role/${id}`,
    method: 'put',
    data
  })
}

export function getRoleById (id) {
  return request({
    url: `/role/${id}`,
    method: 'get'
  })
}
