module.exports = {
  cname: '员工',
  table: [
    {
      'title': '员工姓名',
      'field': 'fullname'
    },
    {
      'title': '校区',
      'field': 'campus_name'
    },
    {
      'title': '部门',
      'field': 'depart_name'
    },
    {
      'title': '角色',
      'field': 'role_name'
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
      'title': '员工状态',
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
      'title': '部门',
      'field': 'depart_id',
      'value': "''",
      'is_id': true,
      'rule': '请选择部门'
    },
    {
      'title': '角色',
      'field': 'role_id',
      'value': "''",
      'is_id': true,
      'rule': '请选择角色'
    },
    {
      'title': '工号',
      'field': 'user_no',
      'value': "''",
      'rule': '请输入工号'
    },
    {
      'title': '登录名',
      'field': 'username',
      'value': "''",
      'rule': '请输入登录名'
    },
    {
      'title': '真实姓名',
      'field': 'fullname',
      'value': "''",
      'rule': '请输入真实姓名'
    },
    {
      'title': '性别',
      'field': 'sex',
      'value': "'男'"
    },
    {
      'title': '手机号码',
      'field': 'mobile',
      'value': "''",
      'rule': '请输入手机号码'
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
      'title': '员工状态',
      'field': 'status',
      'value': "'在职'"
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
