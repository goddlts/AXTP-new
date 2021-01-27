module.exports = {
  cname: '角色',
  table: [
    {
      'title': '角色名称',
      'field': 'role_name'
    },
    {
      'title': '创建时间',
      'field': 'created_time'
    },
    {
      'title': '描述',
      'field': 'desc'
    }
  ],
  dialog: [
    {
      'title': '角色名称',
      'field': 'role_name',
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
