import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/profile',
    method: 'get',
    params: { token }
  })
}

export function getRoutes() {
  return request({
    url: '/routes',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}
