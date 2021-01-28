import request from '@/utils/request'

export function getList (params) {
  return request({
    url: '/class',
    method: 'get',
    params
  })
}

export function removeClass (id) {
  return request({
    url: `/class/${id}`,
    method: 'delete'
  })
}

export function addClass (data) {
  return request({
    url: `/class`,
    method: 'post',
    data
  })
}

export function editClass (id, data) {
  return request({
    url: `/class/${id}`,
    method: 'put',
    data
  })
}

export function getClassById (id) {
  return request({
    url: `/class/${id}`,
    method: 'get'
  })
}
