module.exports = {
  cname: '排课',
  table: [
    {
      'title': '上课日期',
      'field': 'dateforclass'
    },
    {
      'title': '上课时间',
      'field': 'timeforclass'
    },
    {
      'title': '校区',
      'field': 'campus_name'
    },
    {
      'title': '班级',
      'field': 'class_name'
    },
    {
      'title': '年级',
      'field': 'grade'
    },
    {
      'title': '教员',
      'field': 'teacher'
    },
    {
      'title': '班主任',
      'field': 'class_master'
    },
    {
      'title': '教室',
      'field': 'classroom_name'
    },
    {
      'title': '章',
      'field': 'chapter_name'
    },
    {
      'title': '书籍',
      'field': 'book_name'
    },
    {
      'title': '学科',
      'field': 'course_name'
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
      'title': '年级',
      'field': 'grade',
      'value': "''",
      'is_select': true,
      'options': [
        'S1',
        'S2',
        'Y2'
      ],
      'rule': '请选择年级'
    },
    {
      'title': '班级',
      'field': 'class_id',
      'value': "''",
      'is_id': true,
      'rule': '请选择班级'
    },
    {
      'title': '教员',
      'field': 'teacher_id',
      'value': "''",
      'is_id': true,
      'rule': '请选择教员'
    },
    {
      'title': '学科',
      'field': 'course_id',
      'value': "''",
      'is_id': true,
      'rule': '请选择学科'
    },
    {
      'title': '书籍',
      'field': 'book_id',
      'value': "''",
      'is_id': true,
      'rule': '请选择书籍'
    },
    {
      'title': '章',
      'field': 'chapter_id',
      'value': "''",
      'is_id': true,
      'rule': '请选择章'
    },
    {
      'title': '教室',
      'field': 'classroom_id',
      'value': "''",
      'is_id': true,
      'rule': '请选择教室'
    },
    {
      'title': '上课日期',
      'field': 'dateforclass',
      'value': "''",
      'rule': '请输入上课时间'
    },
    {
      'title': '上课时间',
      'field': 'timeforclass',
      'value': "''",
      'rule': '请输入上课时间'
    }
  ]
}
