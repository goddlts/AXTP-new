<template>
  <div class="app-container">
    <!-- 表头 -->
    <div class="filter-container">
      <el-select v-model="s_course_id" style="width: 160px" size="small" class="filter-item" placeholder="请选择所属学科" @change="loadBooks">
        <el-option
          v-for="item in courseList"
          :key="item.id"
          :label="item.course_name"
          :value="item.id"
        />
      </el-select>
      <el-select v-model="s_book_id" style="width: 250px" size="small" class="filter-item" placeholder="请选择所属书籍" @change="handleFilter">
        <el-option
          v-for="item in s_bookList"
          :key="item.id"
          :label="item.book_name"
          :value="item.id"
        />
      </el-select>
      <el-input v-model="searchValue" size="small" placeholder="请输入章节" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-plus" @click="handleShowAddDialog">
        添加章节
      </el-button>
    </div>
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      :tree-props="{children: 'sections', hasChildren: 'hasChildren'}"
      row-key="id"
      element-loading-text="Loading"
      border
      stripe
      fit
      highlight-current-row
    >
      <el-table-column label="章节名称" align="left">
        <template slot-scope="scope">
          {{ scope.row.text }}
        </template>
      </el-table-column>
      <el-table-column label="学科名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.course_name_version }}
        </template>
      </el-table-column>
      <el-table-column label="书籍名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.book_name_version }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.created_time }}
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
      <!-- 添加表单 -->
      <el-form
        v-if="addOrEdit==='add'"
        ref="ruleForm"
        :rules="rules"
        :model="form"
        label-width="100px"
      >
        <el-form-item label="所属学科" prop="course_id">
          <el-select v-model="form.course_id" placeholder="请选择所属学科" @change="loadBooks1(form.course_id)">
            <el-option
              v-for="item in courseList"
              :key="item.id"
              :label="item.course_name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属书籍" prop="book_id">
          <el-select v-model="form.book_id" placeholder="请选择所属书籍">
            <el-option
              v-for="item in bookList"
              :key="item.id"
              :label="item.book_name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="章" prop="chapter_name">
          <el-input v-model="form.chapter_name" />
        </el-form-item>
        <el-form-item label="节" prop="sections">
          <el-input
            v-model="form.sectionsText"
            type="textarea"
            :rows="6"
            placeholder="请输入小结，小结名称单独占一行"
          />
        </el-form-item>
        <el-form-item label="备注信息">
          <el-input
            v-model="form.desc"
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>
      <el-form
        v-else-if="addOrEdit==='edit'"
        ref="ruleFormEdit"
        :rules="rulesEdit"
        :model="formEdit"
        label-width="100px"
      >
        <el-form-item label="章/节内容" prop="text">
          <el-input v-model="formEdit.text" />
        </el-form-item>
        <el-form-item label="备注信息">
          <el-input
            v-model="formEdit.desc"
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
          />
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
import { getList, removeChapter, addChapter, editChapter, getChapterById } from '@/api/chapter'
import { getList as getCourses } from '@/api/course'
import { getList as getBooks } from '@/api/book'

export default {
  data () {
    return {
      list: [],
      listLoading: true,
      // 搜索框数据
      searchValue: '',
      s_course_id: '',
      courseList: [],
      s_book_id: '',
      s_bookList: [],
      bookList: [],
      // 分页数据
      pagenum: 1,
      pagesize: 10,
      total: 0,
      // 弹出框数据
      dialogTitle: '',
      dialogFormVisible: false,
      form: {
        course_id: '',
        book_id: '',
        chapter_name: '',
        sectionsText: '',
        sections: [],
        desc: ''
      },
      // 标记添加和修改
      addOrEdit: '',
      // rules
      rules: {
        course_id: [
          { required: true, message: '请选择所属学科', trigger: 'change' }
        ],
        book_id: [
          { required: true, message: '请选择所属书籍', trigger: 'change' }
        ],
        chapter_name: [
          { required: true, message: '请输入章', trigger: 'blur' }
        ],
        sectionsText: [
          { required: true, message: '请输入节', trigger: 'blur' }
        ]
      },
      formEdit: {
        id: -1,
        text: '',
        desc: ''
      },
      rulesEdit: {
        text: [
          { required: true, message: '请输入章/节内容', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.fetchData()
    this.loadCourses()
  },
  methods: {
    async fetchData () {
      this.listLoading = true
      const { data } = await getList({
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        query: JSON.stringify({
          course_id: this.s_course_id,
          book_id: this.s_book_id,
          text: this.searchValue
        })
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
      this.addOrEdit = 'add'
      this.dialogFormVisible = true
      this.dialogTitle = '添加章节'
    },
    // 点击编辑按钮
    async handleShowEditDialog (id) {
      this.addOrEdit = 'edit'
      this.dialogFormVisible = true
      this.dialogTitle = '修改章节'

      const { data } = await getChapterById(id)
      this.formEdit = data
    },
    // 弹出框的确定按钮
    async handleSure () {
      // 表单验证
      let valid = false
      if (this.addOrEdit === 'add') {
        valid = await this.$refs.ruleForm.validate()
      } else {
        valid = await this.$refs.ruleFormEdit.validate()
      }
      if (!valid) {
        console.log(valid)
        return
      }

      if (this.dialogTitle === '添加章节') {
        this.form.sections = this.form.sectionsText.split('\n').filter(item => item && item.trim())
        await addChapter(this.form)
      } else if (this.dialogTitle === '修改章节') {
        await editChapter(this.formEdit.id, this.formEdit)
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
      await this.$confirm('此操作将永久删除该章节, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await removeChapter(id)
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
      // this.$refs.ruleForm.resetFields()
      // this.$refs.ruleFormEdit.resetFields()
      if (this.addOrEdit === 'add') {
        this.$refs.ruleForm.resetFields()
      } else {
        this.$refs.ruleFormEdit.resetFields()
      }
    },
    // 绑定下拉框
    async loadCourses () {
      const { data } = await getCourses({
        pagenum: 1,
        pagesize: 1000
      })
      this.courseList = data.items
    },
    async loadBooks () {
      const { data } = await getBooks({
        pagenum: 1,
        pagesize: 1000,
        query: JSON.stringify({
          course_id: this.s_course_id
        })
      })
      this.s_bookList = data.items

      this.handleFilter()
    },
    async loadBooks1 (course_id) {
      const { data } = await getBooks({
        pagenum: 1,
        pagesize: 1000,
        query: JSON.stringify({
          course_id: course_id
        })
      })
      this.bookList = data.items
    }
  }
}
</script>

<style>

</style>
