import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo (token) {
  return request({
    url: '/profile',
    method: 'get',
    params: { token }
  })
}

export function logout () {
  return request({
    url: '/logout',
    method: 'get'
  })
}

export function getList (params) {
  return request({
    url: '/user',
    method: 'get',
    params
  })
}

export function removeUser (id) {
  return request({
    url: `/user/${id}`,
    method: 'delete'
  })
}

export function addUser (data) {
  return request({
    url: `/user`,
    method: 'post',
    data
  })
}

export function editUser (id, data) {
  return request({
    url: `/user/${id}`,
    method: 'put',
    data
  })
}

export function getUserById (id) {
  return request({
    url: `/user/${id}`,
    method: 'get'
  })
}
