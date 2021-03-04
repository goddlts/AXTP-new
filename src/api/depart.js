import request from '@/utils/request'

export function getList (params) {
  return request({
    url: '/depart',
    method: 'get',
    params
  })
}

export function removeDepart (id) {
  return request({
    url: `/depart/${id}`,
    method: 'delete'
  })
}

export function addDepart (data) {
  return request({
    url: `/depart`,
    method: 'post',
    data
  })
}

export function editDepart (id, data) {
  return request({
    url: `/depart/${id}`,
    method: 'put',
    data
  })
}

export function getDepartById (id) {
  return request({
    url: `/depart/${id}`,
    method: 'get'
  })
}
