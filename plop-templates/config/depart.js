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
      'value': "''",
      // 是否是id，是id的话，生成下拉框
      'is_id': true,
      // 开启表单验证
      'rule': '请选择部门主管'
    },
    {
      'title': '部门名称',
      'field': 'depart_name',
      'value': "''",
      'rule': '请输入部门名称'
    },
    {
      'title': '部门描述',
      'field': 'desc',
      'value': "''",
      'desc': true
    }
  ]
}
