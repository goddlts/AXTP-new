import request from '@/utils/request'

export function getList (params) {
  return request({
    // url: '/campus',
    url: 'http://192.168.15.153:8080/renren-fast/api/campus',
    method: 'get',
    params
  })
}

export function removeCampus (id) {
  return request({
    // url: `/campus/${id}`,
    url: `http://192.168.15.153:8080/renren-fast/api/campus/${id}`,
    method: 'delete'
  })
}

export function addCampus (data) {
  return request({
    // url: `/campus`,
    url: 'http://192.168.15.153:8080/renren-fast/api/campus',
    method: 'post',
    data
  })
}

export function editCampus (id, data) {
  return request({
    // url: `/campus/${id}`,
    url: `http://192.168.15.153:8080/renren-fast/api/campus/${id}`,
    method: 'put',
    data
  })
}

export function getCampusById (id) {
  return request({
    // url: `/campus/${id}`,
    url: `http://192.168.15.153:8080/renren-fast/api/campus/${id}`,
    method: 'get'
  })
}
