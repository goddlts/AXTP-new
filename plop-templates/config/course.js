// 学科管理

module.exports = {
  cname: '学科',
  table: [
    {
      'title': '学科名称',
      'field': 'course_name'
    },
    {
      'title': '版本',
      'field': 'version'
    },
    {
      'title': '是否启用',
      'field': 'in_use'
    },
    {
      'title': '学科负责人',
      'field': 'course_master'
    },
    {
      'title': '班级数量',
      'field': 'in_use_classs_num'
    },
    {
      'title': '书籍数量',
      'field': 'books_num'
    }
  ],
  dialog: [
    {
      'title': '学科负责人',
      'field': 'course_master_id',
      'value': "''",
      'is_id': true,
      'rule': '请选择学科负责人'
    },
    {
      'title': '学科名称',
      'field': 'course_name',
      'value': "''",
      'rule': '请输入学科名称'
    },
    {
      'title': '版本',
      'field': 'version',
      'value': "''",
      'rule': '请输入版本'
    },
    {
      'title': '是否启用',
      'field': 'in_use',
      'value': 'true'
    },
    {
      'title': '备注信息',
      'field': 'desc',
      'value': "''",
      'desc': true
    }
  ]
}
