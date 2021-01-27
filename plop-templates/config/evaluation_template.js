module.exports = {
  cname: '评分模板',
  table: [
    {
      'title': '模板名称',
      'field': 'template_name'
    },
    {
      'title': '角色名称',
      'field': 'role_name'
    },
    {
      'title': '创建时间',
      'field': 'created_time'
    },
    {
      'title': '使用次数',
      'field': 'use_times'
    }
  ],
  dialog: [
    {
      'title': '角色名称',
      'field': 'role_id',
      'value': -1,
      'is_id': true
    },
    {
      'title': '模板名称',
      'field': 'template_name',
      'value': "''"
    },
    {
      'title': '描述',
      'field': 'desc',
      'value': "''",
      'desc': true
    }
  ]
}
