<template>
  <div class="app-container">
    <!-- 表头 -->
    <div class="filter-container">
      <el-select v-model="s_subject_id" style="width: 160px" size="small" class="filter-item" placeholder="请选择所属学科">
        <el-option
          v-for="item in subjectList"
          :key="item.subjectId"
          :label="item.subjectName"
          :value="item.subjectName"
        />
      </el-select>
      <el-select v-model="s_book_master_id" style="width: 180px" size="small" class="filter-item" placeholder="请选择书籍负责人">
        <el-option
          v-for="item in userList"
          :key="item.id"
          :label="item.fullname"
          :value="item.fullname"
        />
      </el-select>
      <el-input v-model="bookName" size="small" placeholder="请输入书籍" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    </div>
    <div class="filter-container">
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-plus" @click="handleShowAddDialog">
        添加书籍
      </el-button>
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-plus" @click="handleShowAddDialog">
        批量添加书籍
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
      <el-table-column label="学科名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.subjectName }}
        </template>
      </el-table-column>
      <el-table-column label="书籍名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.bookName }}
        </template>
      </el-table-column>
      <el-table-column label="版本" align="center">
        <template slot-scope="scope">
          {{ scope.row.bookVersion }}
        </template>
      </el-table-column>
      <el-table-column label="是否启用" align="center">
        <template slot-scope="scope">
            {{ scope.row.subjectInuse === 0 ? '未启用' : '启用' }}
        </template>
      </el-table-column>
      <el-table-column label="书籍负责人" align="center">
        <template slot-scope="scope">
          {{ scope.row.bookMaster }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="班级数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.bookInuseClassNum }}
        </template>
      </el-table-column>
      <el-table-column label="章数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.bookChapterNum }}
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="mini" icon="el-icon-edit" @click="handleShowEditDialog(scope.row.bookId)">编辑</el-button>
          <el-button type="text" size="mini" icon="el-icon-delete" @click="handleDelete(scope.row.bookId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      style="margin-top: 10px"
      :current-page="pagenum"
      :page-sizes="[8, 16, 32, 64]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- 弹出框 -->
    <el-dialog label-width="10px" :title="dialogTitle" :visible.sync="dialogFormVisible" @closed="handleDialogClosed">
      <el-form
        ref="ruleForm"
        :rules="rules"
        :model="form"
        label-width="120px"
      >
        <el-form-item label="所属学科" prop="subjectName">
          <el-select v-model="form.subjectName" placeholder="请选择所属学科">
            <el-option
              v-for="item in subjectList"
              :key="item.subjectId"
              :label="item.subjectName"
              :value="item.subjectName"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="书籍负责人" prop="book_master_id">
          <el-select v-model="form.bookMaster" placeholder="请选择书籍负责人">
            <el-option
              v-for="item in userList"
              :key="item.id"
              :label="item.fullname"
              :value="item.fullname"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="书籍名称" prop="bookName">
          <el-input v-model="form.bookName" />
        </el-form-item>
        <el-form-item label="版本" prop="bookVersion">
          <el-input v-model="form.bookVersion" />
        </el-form-item>
        <el-form-item label="是否启用">
          <el-radio-group v-model="form.bookInuse">
            <el-radio :label="true">启用</el-radio>
            <el-radio :label="false">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注信息">
          <el-input
            v-model="form.bookDesc"
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
import { getList, removeBook, addBook, editBook, getBookById } from '@/api/book'
import { getList as getUsers } from '@/api/user'
import { getList as getSubjects } from '@/api/subject'

export default {
  data () {
    return {
      list: [],
      listLoading: true,
      // 搜索框下拉框
      s_subject_id: '',
      subjectList: [],
      s_book_master_id: '',
      userList: [],
      bookName: '',
      // 分页数据
      pagenum: 1,
      pagesize: 10,
      total: 0,
      // 弹出框数据
      dialogTitle: '',
      dialogFormVisible: false,
      form: {
        subjectName: '',
        bookMaster: '',
        bookName: '',
        bookVersion: '',
        bookInuse: true,
        bookDesc: ''
      },
      // rules
      rules: {
        subjectName: [
          { required: true, message: '请选择所属学科', trigger: 'change' }
        ],
        bookMaster: [
          { required: true, message: '请选择书籍负责人', trigger: 'change' }
        ],
        bookName: [
          { required: true, message: '请输入书籍名称', trigger: 'blur' }
        ],
        bookVersion: [
          { required: true, message: '请输入版本', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    if (this.$route.query.cid) {
      this.s_course_id = Number.parseInt(this.$route.query.cid)
      // if (isNaN(this.s_course_id)) {
      //   this.s_course_id = ''
      // }
    }
    // console.log(this.s_course_id)
    this.fetchData()
    this.loadSelect()
  },
  methods: {
    async fetchData () {
      this.listLoading = true
      const { data } = await getList({
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        query: JSON.stringify({
          subjectName: this.s_subject_id,
          bookMaster: this.s_book_master_id,
          bookName: this.bookName
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
      this.dialogFormVisible = true
      this.dialogTitle = '添加书籍'
    },
    // 点击编辑按钮
    async handleShowEditDialog (id) {
      this.dialogFormVisible = true
      this.dialogTitle = '修改书籍'
      const { data } = await getBookById(id)
      this.form = data
      // 1和0转换成bool类型
      this.form.bookInuse = Boolean(this.form.bookInuse)
    },
    // 弹出框的确定按钮
    async handleSure () {
      // 表单验证
      const valid = await this.$refs.ruleForm.validate()
      if (!valid) {
        return
      }

      this.form.bookInuse = this.form.bookInuse ? 1 : 0
      if (this.dialogTitle === '添加书籍') {
        await addBook(this.form)
      } else if (this.dialogTitle === '修改书籍') {
        await editBook(this.form.bookId, this.form)
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
      await this.$confirm('此操作将永久删除该书籍, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await removeBook(id)
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
    },
    // 绑定下拉框
    async loadSelect () {
      const { data: data1 } = await getUsers({
        pagenum: 1,
        pagesize: 1000
      })
      this.userList = data1.items

      const { data: data2 } = await getSubjects({
        pagenum: 1,
        pagesize: 1000
      })
      this.subjectList = data2.items
    }
  }
}
</script>

<style>

</style>
