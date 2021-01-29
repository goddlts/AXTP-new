import request from '@/utils/request'

export function getList (params) {
  return request({
    url: '/course',
    method: 'get',
    params
  })
}

export function removeCourse (id) {
  return request({
    url: `/course/${id}`,
    method: 'delete'
  })
}

export function addCourse (data) {
  return request({
    url: `/course`,
    method: 'post',
    data
  })
}

export function editCourse (id, data) {
  return request({
    url: `/course/${id}`,
    method: 'put',
    data
  })
}

export function getCourseById (id) {
  return request({
    url: `/course/${id}`,
    method: 'get'
  })
}
