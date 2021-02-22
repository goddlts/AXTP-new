import request from '@/utils/request'

// 获取班级的数据统计
export function getClassData (params) {
  return request({
    // url: '/classdata',
    url: `http://192.168.15.153:8080/renren-fast/api/classdata`,
    method: 'get',
    params
  })
}

export function getList (params) {
  return request({
    // url: '/class',
    url: `http://192.168.15.153:8080/renren-fast/api/class`,
    method: 'get',
    params
  })
}

export function removeClass (id) {
  return request({
    // url: `/class/${id}`,
    url: `http://192.168.15.153:8080/renren-fast/api/class/${id}`,
    method: 'delete'
  })
}

export function addClass (data) {
  return request({
    // url: `/class`,
    url: `http://192.168.15.153:8080/renren-fast/api/class`,
    method: 'post',
    data
  })
}

export function editClass (id, data) {
  return request({
    // url: `/class/${id}`,
    url: `http://192.168.15.153:8080/renren-fast/api/class/${id}`,
    method: 'put',
    data
  })
}

export function getClassById (id) {
  return request({
    // url: `/class/${id}`,
    url: `http://192.168.15.153:8080/renren-fast/api/class/${id}`,
    method: 'get'
  })
}
