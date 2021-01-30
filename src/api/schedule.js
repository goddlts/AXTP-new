import request from '@/utils/request'

export function getList (params) {
  return request({
    url: '/schedule',
    method: 'get',
    params
  })
}

export function removeSchedule (id) {
  return request({
    url: `/schedule/${id}`,
    method: 'delete'
  })
}

export function addSchedule (data) {
  return request({
    url: `/schedule`,
    method: 'post',
    data
  })
}

export function editSchedule (id, data) {
  return request({
    url: `/schedule/${id}`,
    method: 'put',
    data
  })
}

export function getScheduleById (id) {
  return request({
    url: `/schedule/${id}`,
    method: 'get'
  })
}
