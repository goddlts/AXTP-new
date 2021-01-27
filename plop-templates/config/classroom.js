module.exports = {
  cname: '教室',
  table: [
    {
      'title': '校区',
      'field': 'campus_name'
    },
    {
      'title': '教室名称',
      'field': 'classroom_name'
    },
    {
      'title': '教室容量',
      'field': 'count'
    },
    {
      'title': '教室状态',
      'field': 'status'
    }
  ],
  dialog: [
    {
      'title': '校区',
      'field': 'campus_id',
      'value': -1,
      'is_id': true
    },
    {
      'title': '教室名称',
      'field': 'classroom_name',
      'value': "''"
    },
    {
      'title': '教室容量',
      'field': 'count',
      'value': "''"
    },
    {
      'title': '教室状态',
      'field': 'status',
      'value': "'空闲'"
    },
    {
      'title': '备注信息',
      'field': 'desc',
      'value': "''",
      'desc': true
    }
  ]
}
