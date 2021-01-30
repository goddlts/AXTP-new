<template>
  <div class="app-container">
    <!-- 表头 -->
    <div class="filter-container">
      <el-input v-model="searchValue" size="small" placeholder="请输入教室" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-plus" @click="handleShowAddDialog">
        排课
      </el-button>
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-plus" @click="handleShowAddDialog">
        导入课表
      </el-button>
    </div>
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      stripe
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="#" width="50" type="index" />
      <el-table-column label="上课日期" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.dateforclass }}
        </template>
      </el-table-column>
      <el-table-column label="上课时间" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.timeforclass }}
        </template>
      </el-table-column>
      <el-table-column label="校区" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.campus_name }}
        </template>
      </el-table-column>
      <el-table-column label="班级" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.class_name }}
        </template>
      </el-table-column>
      <el-table-column label="年级" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.grade }}
        </template>
      </el-table-column>
      <el-table-column label="教员" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.teacher }}
        </template>
      </el-table-column>
      <el-table-column label="班主任" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.class_master }}
        </template>
      </el-table-column>
      <el-table-column label="教室" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.classroom_name }}
        </template>
      </el-table-column>
      <el-table-column label="章" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.chapter_name }}
        </template>
      </el-table-column>
      <el-table-column label="书籍" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.book_name }}
        </template>
      </el-table-column>
      <el-table-column label="学科" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.course_name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="mini" icon="el-icon-edit" @click="handleShowEditDialog(scope.row.id)">编辑</el-button>
          <el-button type="text" size="mini" icon="el-icon-delete" @click="handleDelete(scope.row.id)">删除</el-button>
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
      <el-form
        ref="ruleForm"
        :rules="rules"
        :model="form"
        label-width="100px"
      >
        <el-form-item label="校区" prop="campus_id">
          <el-select v-model="form.campus_id" placeholder="请选择校区">
            <option label="请选择" :value="-1" />
          </el-select>
        </el-form-item>
        <el-form-item label="年级" prop="grade">
          <el-select v-model="form.grade">
            <el-option label="S1" value="S1" />
            <el-option label="S2" value="S2" />
            <el-option label="Y2" value="Y2" />
          </el-select>
        </el-form-item>
        <el-form-item label="班级" prop="class_id">
          <el-select v-model="form.class_id" placeholder="请选择班级">
            <option label="请选择" :value="-1" />
          </el-select>
        </el-form-item>
        <el-form-item label="教员" prop="teacher_id">
          <el-select v-model="form.teacher_id" placeholder="请选择教员">
            <option label="请选择" :value="-1" />
          </el-select>
        </el-form-item>
        <el-form-item label="学科" prop="course_id">
          <el-select v-model="form.course_id" placeholder="请选择学科">
            <option label="请选择" :value="-1" />
          </el-select>
        </el-form-item>
        <el-form-item label="书籍" prop="book_id">
          <el-select v-model="form.book_id" placeholder="请选择书籍">
            <option label="请选择" :value="-1" />
          </el-select>
        </el-form-item>
        <el-form-item label="章" prop="chapter_id">
          <el-select v-model="form.chapter_id" placeholder="请选择章">
            <option label="请选择" :value="-1" />
          </el-select>
        </el-form-item>
        <el-form-item label="教室" prop="classroom_id">
          <el-select v-model="form.classroom_id" placeholder="请选择教室">
            <option label="请选择" :value="-1" />
          </el-select>
        </el-form-item>
        <el-form-item label="上课日期" prop="dateforclass">
          <el-input v-model="form.dateforclass" />
        </el-form-item>
        <el-form-item label="上课时间" prop="timeforclass">
          <el-input v-model="form.timeforclass" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, removeSchedule, addSchedule, editSchedule, getScheduleById } from '@/api/schedule'

export default {
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
        campus_id: '',
        grade: '',
        class_id: '',
        teacher_id: '',
        course_id: '',
        book_id: '',
        chapter_id: '',
        classroom_id: '',
        dateforclass: '',
        timeforclass: ''
      },
      // rules
      rules: {
        campus_id: [
          { required: true, message: '请选择校区', trigger: 'blur' }
        ],
        grade: [
          { required: true, message: '请选择年级', trigger: 'blur' }
        ],
        class_id: [
          { required: true, message: '请选择班级', trigger: 'blur' }
        ],
        teacher_id: [
          { required: true, message: '请选择教员', trigger: 'blur' }
        ],
        course_id: [
          { required: true, message: '请选择学科', trigger: 'blur' }
        ],
        book_id: [
          { required: true, message: '请选择书籍', trigger: 'blur' }
        ],
        chapter_id: [
          { required: true, message: '请选择章', trigger: 'blur' }
        ],
        classroom_id: [
          { required: true, message: '请选择教室', trigger: 'blur' }
        ],
        dateforclass: [
          { required: true, message: '请输入上课时间', trigger: 'blur' }
        ],
        timeforclass: [
          { required: true, message: '请输入上课时间', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
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
      this.dialogTitle = '添加教室'
    },
    // 点击编辑按钮
    async handleShowEditDialog (id) {
      this.dialogFormVisible = true
      this.dialogTitle = '修改教室'
      const { data } = await getScheduleById(id)
      this.form = data
    },
    // 弹出框的确定按钮
    async handleSure () {
      // 表单验证
      const valid = await this.$refs.ruleForm.validate()
      if (!valid) {
        return
      }

      if (this.dialogTitle === '添加教室') {
        await addSchedule(this.form)
      } else if (this.dialogTitle === '修改教室') {
        await editSchedule(this.form.id, this.form)
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
    // 删除
    async handleDelete (id) {
      await this.$confirm('此操作将永久删除该教室, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await removeSchedule(id)
      this.$message({
        type: 'success',
        message: '删除成功'
      })
      // 处理最后一页只有一条数据的问题
      if (this.pagenum > 1 && this.list.count === 1) {
        this.pagenum--
      }
      this.fetchData()
    },
    // 弹出框关闭之后重置表单
    handleDialogClosed () {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style>

</style>
