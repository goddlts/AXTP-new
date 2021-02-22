import request from '@/utils/request'

// 获取班级的考试信息
export function getClassExamInfo (examId, classId) {
  return request({
    url: `/exam/${examId}/${classId}`,
    method: 'get'
  })
}

export function getList (params) {
  return request({
    url: '/exam',
    method: 'get',
    params
  })
}

export function removeExam (id) {
  return request({
    url: `/exam/${id}`,
    method: 'delete'
  })
}

export function addExam (data) {
  return request({
    url: `/exam`,
    method: 'post',
    data
  })
}

export function editExam (id, data) {
  return request({
    url: `/exam/${id}`,
    method: 'put',
    data
  })
}

export function getExamById (id) {
  return request({
    url: `/exam/${id}`,
    method: 'get'
  })
}
