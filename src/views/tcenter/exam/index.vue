<template>
  <div class="app-container">
    <!-- 表头 -->
    <div class="filter-container">
      <el-input v-model="searchValue" size="small" placeholder="请输入考试" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-plus" @click="handleShowAddDialog">
        添加考试
      </el-button>
    </div>
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      :row-class-name="tableRowClassName"
    >
      <el-table-column align="center" label="#" width="50" type="index" />
      <el-table-column label="校区" align="center">
        <template slot-scope="scope">
          {{ scope.row.campus_name }}
        </template>
      </el-table-column>
      <el-table-column label="班级" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.class_name }}
        </template>
      </el-table-column>
      <el-table-column label="考试类型" align="center">
        <template slot-scope="scope">
          {{ scope.row.exam_type }}
        </template>
      </el-table-column>
      <el-table-column label="考试内容" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.exam_content }}
        </template>
      </el-table-column>
      <el-table-column label="考试时间" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.exam_date }}
        </template>
      </el-table-column>
      <el-table-column label="班主任" align="center">
        <template slot-scope="scope">
          {{ scope.row.class_master }}
        </template>
      </el-table-column>
      <el-table-column label="代课老师" align="center">
        <template slot-scope="scope">
          {{ scope.row.teacher }}
        </template>
      </el-table-column>
      <el-table-column label="合格率" align="center">
        <template slot-scope="scope">
          {{ scope.row.pass_rate | percent }}
        </template>
      </el-table-column>
      <el-table-column label="平均成绩" align="center">
        <template slot-scope="scope">
          {{ scope.row.average_score | numberToFixed | unInput }}
        </template>
      </el-table-column>
      <el-table-column label="最高成绩" align="center">
        <template slot-scope="scope">
          {{ scope.row.max_score | numberToFixed | unInput }}
        </template>
      </el-table-column>
      <el-table-column label="最低成绩" align="center">
        <template slot-scope="scope">
          {{ scope.row.min_score | numberToFixed | unInput }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="$router.push('/tcenter/exam/inputscore/' + scope.row.id + '/' + scope.row.class_id)">录入</el-button>
          <el-button type="text" size="mini" @click="handleInput(scope.row.id)">Excel导入</el-button>
          <el-button type="text" size="mini" @click="handleDetail(scope.row.id)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      style="margin-top: 10px"
      :current-page="1"
      :page-sizes="[8, 16, 32, 64]"
      :page-size="8"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- 弹出框 -->
    <el-dialog label-width="10px" :title="dialogTitle" :visible.sync="dialogFormVisible" @closed="handleDialogClosed">
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, addExam, editExam, getExamById } from '@/api/exam'

export default {
  filters: {
    numberToFixed (v) {
      return v.toFixed(2)
    },
    unInput (v) {
      return v === -1 ? '未录入' : v
    },
    percent (v) {
      return (v * 100) + '%'
    }
  },
  data () {
    return {
      list: [],
      listLoading: true,
      searchValue: '',
      // 分页数据
      pagenum: 1,
      pagesize: 10,
      total: 0,
      // 弹出框数据
      dialogTitle: '',
      dialogFormVisible: false,
      form: {
      },
      // rules
      rules: {
      }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    // 根据及格率显示行的颜色
    tableRowClassName ({ row }) {
      if (row.pass_rate < 0.5) {
        return 'warning-row'
      }
      return ''
    },
    async fetchData () {
      this.listLoading = true
      const { data } = await getList({
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        query: this.searchValue
      })
      this.list = data.items
      this.total = data.total
      this.listLoading = false
    },
    // 搜索
    handleFilter () {
      this.pagenum = 1
      this.fetchData()
    },
    // 点击打开添加对话框
    handleShowAddDialog () {
      this.dialogFormVisible = true
      this.dialogTitle = '添加考试'
    },
    // 点击编辑按钮
    async handleShowEditDialog (id) {
      this.dialogFormVisible = true
      this.dialogTitle = '修改考试'
      const { data } = await getExamById(id)
      this.form = data
    },
    // 弹出框的确定按钮
    async handleSure () {
      // 表单验证
      const valid = await this.$refs.ruleForm.validate()
      if (!valid) {
        return
      }

      if (this.dialogTitle === '添加考试') {
        await addExam(this.form)
      } else if (this.dialogTitle === '修改考试') {
        await editExam(this.form.id, this.form)
      }
      this.fetchData()
      this.$message({
        type: 'success',
        message: '操作成功'
      })
      this.dialogFormVisible = false
    },
    // 分页方法
    handleSizeChange (val) {
      this.pagesize = val
      this.pagenum = 1
      this.fetchData()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.fetchData()
    },
    // 录入成绩
    async handleInput (id) {
    },
    // 班级成绩详情
    handleDetail (id) {
    },
    // 弹出框关闭之后重置表单
    handleDialogClosed () {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-table ::v-deep .warning-row {
  background: oldlace;
  // background: #f56c6c;
}
</style>
