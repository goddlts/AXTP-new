import request from '@/utils/request'

export function getFeedbacksByChapterId (cid) {
  return request({
    url: `/chapter/${cid}/feedback`,
    method: 'get'
  })
}

export function getList (params) {
  return request({
    url: '/chapter',
    method: 'get',
    params
  })
}

export function removeChapter (id) {
  return request({
    url: `/chapter/${id}`,
    method: 'delete'
  })
}

export function addChapter (data) {
  return request({
    url: `/chapter`,
    method: 'post',
    data
  })
}

export function editChapter (id, data) {
  return request({
    url: `/chapter/${id}`,
    method: 'put',
    data
  })
}

export function getChapterById (id) {
  return request({
    url: `/chapter/${id}`,
    method: 'get'
  })
}
