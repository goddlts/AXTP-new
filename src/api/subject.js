import request from '@/utils/request'

export function getList (params) {
  return request({
    // url: '/subject',
    url: `http://192.168.15.153:8080/renren-fast/api/subject`,
    method: 'get',
    params
  })
}

export function removeSubject (id) {
  return request({
    // url: `/subject/${id}`,
    url: `http://192.168.15.153:8080/renren-fast/api/subject/${id}`,
    method: 'delete'
  })
}

export function addSubject (data) {
  return request({
    // url: `/subject`,
    url: `http://192.168.15.153:8080/renren-fast/api/subject`,
    method: 'post',
    data
  })
}

export function editSubject (id, data) {
  return request({
    // url: `/subject/${id}`,
    url: `http://192.168.15.153:8080/renren-fast/api/subject/${id}`,
    method: 'put',
    data
  })
}

export function getSubjectById (id) {
  return request({
    // url: `/subject/${id}`,
    url: `http://192.168.15.153:8080/renren-fast/api/subject/${id}`,
    method: 'get'
  })
}
