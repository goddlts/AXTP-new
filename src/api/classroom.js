import request from '@/utils/request'

export function getList (params) {
  return request({
    url: '/classroom',
    method: 'get',
    params
  })
}

export function removeClassroom (id) {
  return request({
    url: `/classroom/${id}`,
    method: 'delete'
  })
}

export function addClassroom (data) {
  return request({
    url: `/classroom`,
    method: 'post',
    data
  })
}

export function editClassroom (id, data) {
  return request({
    url: `/classroom/${id}`,
    method: 'put',
    data
  })
}

export function getClassroomById (id) {
  return request({
    url: `/classroom/${id}`,
    method: 'get'
  })
}
