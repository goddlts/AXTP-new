module.exports = {
  cname: '部门',
  table: [
    {
      'title': '部门名称',
      'field': 'depart_name'
    },
    {
      'title': '部门主管',
      'field': 'depart_master'
    },
    {
      'title': '部门人数',
      'field': 'depart_count'
    }
  ],
  dialog: [
    {
      'title': '部门主管',
      'field': 'depart_master_id',
      'value': -1,
      'is_id': true
    },
    {
      'title': '部门名称',
      'field': 'depart_name',
      'value': "''",
    },
    {
      'title': '部门描述',
      'field': 'desc',
      'value': "''",
      'desc': true
    }
  ]
}
