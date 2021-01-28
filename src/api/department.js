import request from '@/utils/request'

export function getList (params) {
  return request({
    url: '/department',
    method: 'get',
    params
  })
}

export function removeDepartment (id) {
  return request({
    url: `/department/${id}`,
    method: 'delete'
  })
}

export function addDepartment (data) {
  return request({
    url: `/department`,
    method: 'post',
    data
  })
}

export function editDepartment (id, data) {
  return request({
    url: `/department/${id}`,
    method: 'put',
    data
  })
}

export function getDepartmentById (id) {
  return request({
    url: `/department/${id}`,
    method: 'get'
  })
}
