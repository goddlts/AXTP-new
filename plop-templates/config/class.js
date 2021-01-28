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
      'value': "''",
      'is_id': true,
      'rule': '请选择校区'
    },
    {
      'title': '班主任',
      'field': 'class_master_id',
      'value': "''",
      'is_id': true,
      'rule': '请选择班主任'
    },
    {
      'title': '教室',
      'field': 'classroom_id',
      'value': "''",
      'is_id': true,
      'rule': '请选择教室'
    },
    {
      'title': '班级名称',
      'field': 'class_name',
      'value': "''",
      'rule': '请输入班级名称'
    },
    {
      'title': '班级状态',
      'field': 'status',
      'value': "'在读'",
      'is_select': true,
      'options': [
        '在读',
        '毕业'
      ]
    },
    {
      'title': '备注信息',
      'field': 'desc',
      'value': "''",
      'desc': true
    }
  ]
}
