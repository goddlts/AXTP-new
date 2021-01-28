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
      'value': "''",
      'is_id': true,
      'rule': '请选择校区'
    },
    {
      'title': '教室名称',
      'field': 'classroom_name',
      'value': "''",
      'rule': '请输入教室名称'
    },
    {
      'title': '教室容量',
      'field': 'count',
      'value': "''",
      'rule': '请输入教室容量'
    },
    {
      'title': '教室状态',
      'field': 'status',
      'value': "'空闲'",
      'is_select': true,
      'options': [
        '空闲',
        '使用',
        '维修'
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
