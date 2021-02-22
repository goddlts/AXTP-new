import request from '@/utils/request'

export function getList (params) {
  return request({
    // url: '/classroom',
    url: `http://192.168.15.153:8080/renren-fast/api/classroom`,
    method: 'get',
    params
  })
}

export function removeClassroom (id) {
  return request({
    // url: `/classroom/${id}`,
    url: `http://192.168.15.153:8080/renren-fast/api/classroom/${id}`,
    method: 'delete'
  })
}

export function addClassroom (data) {
  return request({
    // url: `/classroom`,
    url: `http://192.168.15.153:8080/renren-fast/api/classroom`,
    method: 'post',
    data
  })
}

export function editClassroom (id, data) {
  return request({
    // url: `/classroom/${id}`,
    url: `http://192.168.15.153:8080/renren-fast/api/classroom/${id}`,
    method: 'put',
    data
  })
}

export function getClassroomById (id) {
  return request({
    // url: `/classroom/${id}`,
    url: `http://192.168.15.153:8080/renren-fast/api/classroom/${id}`,
    method: 'get'
  })
}
