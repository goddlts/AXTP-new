import request from '@/utils/request'

// 获取班级的数据统计
export function getClassData (params) {
  return request({
    url: '/classdata',
    method: 'get',
    params
  })
}

export function getList (params) {
  return request({
    url: '/class',
    method: 'get',
    params
  })
}

export function removeClass (id) {
  return request({
    url: `/class/${id}`,
    method: 'delete'
  })
}

export function addClass (data) {
  return request({
    url: `/class`,
    method: 'post',
    data
  })
}

export function editClass (id, data) {
  return request({
    url: `/class/${id}`,
    method: 'put',
    data
  })
}

export function getClassById (id) {
  return request({
    url: `/class/${id}`,
    method: 'get'
  })
}
