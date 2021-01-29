import request from '@/utils/request'

export function getList (params) {
  return request({
    url: '/book',
    method: 'get',
    params
  })
}

export function removeBook (id) {
  return request({
    url: `/book/${id}`,
    method: 'delete'
  })
}

export function addBook (data) {
  return request({
    url: `/book`,
    method: 'post',
    data
  })
}

export function editBook (id, data) {
  return request({
    url: `/book/${id}`,
    method: 'put',
    data
  })
}

export function getBookById (id) {
  return request({
    url: `/book/${id}`,
    method: 'get'
  })
}
