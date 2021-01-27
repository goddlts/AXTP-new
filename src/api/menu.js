import request from '@/utils/request'

// 获取权限菜单
export function getRoutes () {
  return request({
    url: '/routes',
    method: 'get'
  })
}

// 绑定菜单下拉框的数据
export function getMenuSelect (level) {
  return request({
    url: '/menu-select',
    method: 'get',
    params: {
      level
    }
  })
}

export function getList (params) {
  return request({
    url: '/menu',
    method: 'get',
    params
  })
}

export function removeMenu (id) {
  return request({
    url: `/menu/${id}`,
    method: 'delete'
  })
}

export function addMenu (data) {
  return request({
    url: `/menu`,
    method: 'post',
    data
  })
}

export function editMenu (id, data) {
  return request({
    url: `/menu/${id}`,
    method: 'put',
    data
  })
}

export function getMenuById (id) {
  return request({
    url: `/menu/${id}`,
    method: 'get'
  })
}
