import request from '@/utils/request'

// 点到
export function callTheRoll (id, data) {
  return request({
    url: `/student/${id}/calltheroll`,
    method: 'post',
    data
  })
}

export function getStudentsInClass (cid, params) {
  return request({
    url: `/student/class/${cid}`,
    method: 'get',
    params
  })
}

// 获取学生出勤率等各种数据
export function getStudentDataInClass (cid, params) {
  return request({
    url: `/student/class/${cid}/data`,
    method: 'get',
    params
  })
}

// 获取学生出勤详情
// /student/:sid/attendance
export function getStudentAttendance (sid, params) {
  return request({
    url: `/student/${sid}/attendance`,
    method: 'get',
    params
  })
}

// 获取班级学生出勤
export function getStudentAttendanceInClass (cid, params) {
  return request({
    url: `/student/class/${cid}/attendance`,
    method: 'get',
    params
  })
}

// 班级学生作业提交
export function getStudentSubmissionInClass (cid, params) {
  return request({
    url: `/student/class/${cid}/submission`,
    method: 'get',
    params
  })
}

export function getList (params) {
  return request({
    // url: '/student',
    url: 'http://192.168.15.153:8080/renren-fast/api/student',
    method: 'get',
    params
  })
}

export function removeStudent (id) {
  return request({
    // url: `/student/${id}`,
    url: `http://192.168.15.153:8080/renren-fast/api/student/${id}`,
    method: 'delete'
  })
}

export function addStudent (data) {
  return request({
    // url: `/student`,
    url: 'http://192.168.15.153:8080/renren-fast/api/student',
    method: 'post',
    data
  })
}

export function editStudent (id, data) {
  return request({
    // url: `/student/${id}`,
    url: `http://192.168.15.153:8080/renren-fast/api/student/${id}`,
    method: 'put',
    data
  })
}

export function getStudentById (id) {
  return request({
    // url: `/student/${id}`,
    url: `http://192.168.15.153:8080/renren-fast/api/student/${id}`,
    method: 'get'
  })
}
