import request from '@/utils/request'

export function getList (params) {
  return request({
    url: '/student',
    method: 'get',
    params
  })
}

export function removeStudent (id) {
  return request({
    url: `/student/${id}`,
    method: 'delete'
  })
}

export function addStudent (data) {
  return request({
    url: `/student`,
    method: 'post',
    data
  })
}

export function editStudent (id, data) {
  return request({
    url: `/student/${id}`,
    method: 'put',
    data
  })
}

export function getStudentById (id) {
  return request({
    url: `/student/${id}`,
    method: 'get'
  })
}
