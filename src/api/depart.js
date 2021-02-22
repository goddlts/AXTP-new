import request from '@/utils/request'

export function getList (params) {
  return request({
    // url: '/depart',
    url: 'http://192.168.15.153:8080/renren-fast/api/depart',
    method: 'get',
    params
  })
}

export function removeDepart (id) {
  return request({
    // url: `/depart/${id}`,
    url: `http://192.168.15.153:8080/renren-fast/api/depart/${id}`,
    method: 'delete'
  })
}

export function addDepart (data) {
  return request({
    // url: `/depart`,
    url: 'http://192.168.15.153:8080/renren-fast/api/depart',
    method: 'post',
    data
  })
}

export function editDepart (id, data) {
  return request({
    // url: `/depart/${id}`,
    url: `http://192.168.15.153:8080/renren-fast/api/depart/${id}`,
    method: 'put',
    data
  })
}

export function getDepartById (id) {
  return request({
    // url: `/depart/${id}`,
    url: `http://192.168.15.153:8080/renren-fast/api/depart/${id}`,
    method: 'get'
  })
}
