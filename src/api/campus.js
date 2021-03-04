import request from '@/utils/request'

export function getList (params) {
  return request({
    url: '/campus',
    method: 'get',
    params
  })
}

export function removeCampus (id) {
  return request({
    url: `/campus/${id}`,
    method: 'delete'
  })
}

export function addCampus (data) {
  return request({
    url: `/campus`,
    method: 'post',
    data
  })
}

export function editCampus (id, data) {
  return request({
    url: `/campus/${id}`,
    method: 'put',
    data
  })
}

export function getCampusById (id) {
  return request({
    url: `/campus/${id}`,
    method: 'get'
  })
}
