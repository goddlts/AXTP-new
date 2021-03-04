import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function getInfo () {
  return request({
    url: '/auth/me',
    method: 'get'
  })
}

export function logout () {
  return request({
    url: '/auth/logout',
    method: 'get'
  })
}

export function getList (params) {
  return request({
    // url: '/user',
    url: 'http://192.168.15.153:8080/renren-fast/api/user',
    method: 'get',
    params
  })
}

export function removeUser (id) {
  return request({
    // url: `/user/${id}`,
    url: `http://192.168.15.153:8080/renren-fast/api/user/${id}`,
    method: 'delete'
  })
}

export function addUser (data) {
  return request({
    // url: `/user`,
    url: `http://192.168.15.153:8080/renren-fast/api/user`,
    method: 'post',
    data
  })
}

export function editUser (id, data) {
  return request({
    // url: `/user/${id}`,
    url: `http://192.168.15.153:8080/renren-fast/api/user/${id}`,
    method: 'put',
    data
  })
}

export function getUserById (id) {
  return request({
    // url: `/user/${id}`,
    url: `http://192.168.15.153:8080/renren-fast/api/user/${id}`,
    method: 'get'
  })
}

export function removeMultiplyUser (ids) {
  return request({
    // url: `/user/${id}`,
    url: `http://192.168.15.153:8080/renren-fast/api/user?ids=${ids}`,
    method: 'delete'
  })
}
