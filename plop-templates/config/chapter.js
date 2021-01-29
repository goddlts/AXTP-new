// 章节管理

module.exports = {
  cname: '章节',
  table: [
    {
      'title': '学科名称',
      'field': 'course_name_version'
    },
    {
      'title': '书籍名称',
      'field': 'book_name_version'
    },
    {
      'title': '章节名称',
      'field': 'text'
    },
    {
      'title': '创建时间',
      'field': 'created_time'
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
      'title': '所属书籍',
      'field': 'book_id',
      'value': "''",
      'is_id': true,
      'rule': '请选择所属书籍'
    },
    {
      'title': '章',
      'field': 'chapter_name',
      'value': "''",
      'rule': '请输入章'
    },
    {
      'title': '节',
      'field': 'sections',
      'value': "''",
      'rule': '请输入节',
      'desc': true
    },
    {
      'title': '备注信息',
      'field': 'desc',
      'value': "''",
      'desc': true
    }
  ]
}
