module.exports = {
  cname: '学生',
  table: [
    {
      'title': '学号',
      'field': 'stu_no'
    },
    {
      'title': '学生姓名',
      'field': 'name'
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
      'title': '性别',
      'field': 'sex'
    },
    {
      'title': '年龄',
      'field': 'age'
    },
    {
      'title': '电话',
      'field': 'mobile'
    },
    {
      'title': '学生状态',
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
      'title': '班级',
      'field': 'class_id',
      'value': "''",
      'is_id': true,
      'rule': '请选择班级'
    },
    {
      'title': '学号',
      'field': 'stu_no',
      'value': "''",
      'rule': '请输入学号'
    },
    {
      'title': '姓名',
      'field': 'name',
      'value': "''",
      'rule': '请输入姓名'
    },
    {
      'title': '性别',
      'field': 'sex',
      'value': "'男'"
    },
    {
      'title': '手机号码',
      'field': 'mobile',
      'value': "''"
    },
    {
      'title': '电子邮箱',
      'field': 'email',
      'value': "''"
    },
    {
      'title': '出生日期',
      'field': 'birthday',
      'value': "''",
      'is_date': true
    },
    {
      'title': '学生状态',
      'field': 'status',
      'value': "'在读'",
      'is_select': true,
      'options': [
        '在读',
        '休学',
        '转班',
        '开除'
      ]
    },
    {
      'title': '学历',
      'field': 'edu_background',
      'value': "''"
    },
    {
      'title': '毕业院校',
      'field': 'edu_school',
      'value': "''"
    },
    {
      'title': '专业',
      'field': 'major',
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
