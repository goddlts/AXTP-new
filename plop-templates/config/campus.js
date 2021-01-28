module.exports = {
  cname: '校区',
  table: [
    {
      'title': '校区名称',
      'field': 'name'
    },
    {
      'title': '负责人',
      'field': 'campus_master'
    },
    {
      'title': '班级数量',
      'field': 'class_count'
    },
    {
      'title': '创建时间',
      'field': 'created_time'
    }
  ],
  dialog: [
    {
      'title': '负责人',
      'field': 'campus_master_id',
      'value': "''",
      'is_id': true
    },
    {
      'title': '校区名称',
      'field': 'name',
      'value': "''"
    },
    {
      'title': '备注信息',
      'field': 'desc',
      'value': "''",
      'desc': true
    }
  ]
}
