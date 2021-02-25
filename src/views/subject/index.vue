<template>
  <div class="app-container">
    <!-- 表头 -->
    <div class="filter-container">
      <el-input v-model="searchValue" size="small" placeholder="请输入学科" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-plus" @click="handleShowAddDialog">
        添加学科
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
          <router-link :to="'/subject/book?cid=' + scope.row.id">{{ scope.row.subjectName }}</router-link>
        </template>
      </el-table-column>
      <el-table-column label="版本" align="center">
        <template slot-scope="scope">
          {{ scope.row.subjectVersion }}
        </template>
      </el-table-column>
      <el-table-column label="是否启用" align="center">
        <template slot-scope="scope">
          {{ scope.row.subjectInuse === 0 ? '未启用' : '启用' }}
        </template>
      </el-table-column>
      <el-table-column label="学科负责人" align="center">
        <template slot-scope="scope">
          {{ scope.row.subjectMaster }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="班级数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.subjectInuseClasssNum }}
        </template>
      </el-table-column>
      <el-table-column label="书籍数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.subjectBooksNum }}
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="mini" icon="el-icon-edit" @click="handleShowEditDialog(scope.row.subjectId)">编辑</el-button>
          <el-button type="text" size="mini" icon="el-icon-delete" @click="handleDelete(scope.row.subjectId)">删除</el-button>
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
        <el-form-item label="学科负责人" prop="subjectMaster">
          <el-select v-model="form.subjectMaster" placeholder="请选择学科负责人">
            <el-option
              v-for="item in userList"
              :key="item.id"
              :label="item.fullname"
              :value="item.fullname"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="学科名称" prop="subjectName">
          <el-input v-model="form.subjectName" />
        </el-form-item>
        <el-form-item label="版本" prop="subjectVersion">
          <el-input v-model="form.subjectVersion" />
        </el-form-item>
        <el-form-item label="是否启用">
          <el-radio-group v-model="form.subjectInuse">
            <el-radio :label="true">启用</el-radio>
            <el-radio :label="false">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注信息">
          <el-input
            v-model="form.subjectDesc"
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
import { getList, removeSubject, addSubject, editSubject, getSubjectById } from '@/api/subject'
import { getList as getUsers } from '@/api/user'

export default {
  data () {
    return {
      list: [],
      listLoading: true,
      searchValue: '',
      // 弹出框的选择框
      userList: [],
      // 分页数据
      pagenum: 1,
      pagesize: 10,
      total: 0,
      // 弹出框数据
      dialogTitle: '',
      dialogFormVisible: false,
      form: {
        subjectMaster: '',
        subjectName: '',
        subjectVersion: '',
        subjectInuse: true,
        subjectDesc: ''
      },
      // rules
      rules: {
        subjectMaster: [
          { required: true, message: '请选择学科负责人', trigger: 'blur' }
        ],
        subjectName: [
          { required: true, message: '请输入学科名称', trigger: 'blur' }
        ],
        subjectVersion: [
          { required: true, message: '请输入版本', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.fetchData()
    this.loadSelect()
  },
  methods: {
    async fetchData () {
      this.listLoading = true
      const { data } = await getList({
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        query: {
          subjectName: this.searchValue
        }
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
      this.dialogTitle = '添加学科'
    },
    // 点击编辑按钮
    async handleShowEditDialog (id) {
      this.dialogFormVisible = true
      this.dialogTitle = '修改学科'
      const { data } = await getSubjectById(id)
      this.form = data
      // 1和0转换成bool类型
      this.form.subjectInuse = Boolean(this.form.subjectInuse)
    },
    // 弹出框的确定按钮
    async handleSure () {
      // 表单验证
      const valid = await this.$refs.ruleForm.validate()
      if (!valid) {
        return
      }
      this.form.subjectInuse = this.form.subjectInuse ? 1 : 0
      if (this.dialogTitle === '添加学科') {
        await addSubject(this.form)
      } else if (this.dialogTitle === '修改学科') {
        await editSubject(this.form.subjectId, this.form)
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
      await this.$confirm('此操作将永久删除该学科, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await removeSubject(id)
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
    // 下拉框数据
    async loadSelect () {
      const { data } = await getUsers()
      this.userList = data.items
    }
  }
}
</script>

<style>

</style>
