// 书籍管理

module.exports = {
  cname: '书籍',
  table: [
    {
      'title': '学科名称',
      'field': 'course_name'
    },
    {
      'title': '书籍名称',
      'field': 'book_name'
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
      'title': '书籍负责人',
      'field': 'book_master'
    },
    {
      'title': '班级数量',
      'field': 'in_use_classs_num'
    },
    {
      'title': '章数量',
      'field': 'chapter_num'
    }
  ],
  dialog: [
    {
      'title': '所属学科',
      'field': 'course_id',
      'value': "''",
      'is_id': true,
      'rule': '请选择所属学科'
    },
    {
      'title': '书籍负责人',
      'field': 'book_master_id',
      'value': "''",
      'is_id': true,
      'rule': '请选择书籍负责人'
    },
    {
      'title': '书籍名称',
      'field': 'book_name',
      'value': "''",
      'rule': '请输入书籍名称'
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
