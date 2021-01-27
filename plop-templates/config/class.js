module.exports = {
  cname: '班级',
  table: [
    {
      'title': '校区',
      'field': 'campus_name'
    },
    {
      'title': '班级名称',
      'field': 'class_name'
    },
    {
      'title': '年级',
      'field': 'grade'
    },
    {
      'title': '班主任',
      'field': 'class_master'
    },
    {
      'title': '班级人数',
      'field': 'students_count'
    },
    {
      'title': '班级状态',
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
      'title': '班主任',
      'field': 'class_master_id',
      'value': -1,
      'is_id': true
    },
    {
      'title': '教室',
      'field': 'classroom_id',
      'value': -1,
      'is_id': true
    },
    {
      'title': '班级名称',
      'field': 'class_name',
      'value': "''",
    },
    {
      'title': '班级状态',
      'field': 'status',
      'value': "'在读'",
    },
    {
      'title': '备注信息',
      'field': 'desc',
      'value': "''",
      'desc': true
    }
  ]
}
