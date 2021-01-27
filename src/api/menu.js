import request from '@/utils/request'

// 获取权限菜单
export function getRoutes () {
  return request({
    url: '/routes',
    method: 'get'
  })
}
