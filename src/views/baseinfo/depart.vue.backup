<template>
  <div class="app-container">
    <!-- 表头 -->
    <div class="filter-container">
      <el-input v-model="searchValue" size="small" placeholder="请输入部门" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button size="small" style="margin-left: 10px;" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button size="small" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="handleShowAddDialog">
        添加部门
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
      <el-table-column label="部门名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.depart_name }}
        </template>
      </el-table-column>
      <el-table-column label="部门主管" align="center">
        <template slot-scope="scope">
          {{ scope.row.depart_master }}
        </template>
      </el-table-column>
      <el-table-column label="部门人数" align="center">
        <template slot-scope="scope">
          {{ scope.row.depart_count }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
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
    <el-dialog label-width="10px" :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form
        ref="ruleForm"
        :rules="rules"
        :model="form"
        label-width="100px"
      >
        <el-form-item label="部门主管" prop="depart_master_id">
          <el-select v-model="form.depart_master_id" filterable placeholder="请选择负责人">
            <el-option v-for="item in users" :key="item.id" :label="item.fullname" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="部门名称" prop="depart_name">
          <el-input v-model="form.depart_name" />
        </el-form-item>
        <el-form-item label="部门描述">
          <el-input
            v-model="form.desc"
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
import { getList, removeDepart, addDepart, editDepart, getDepartById } from '@/api/depart'
import { getList as getUsers } from '@/api/user'

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
        depart_master_id: '',
        depart_name: '',
        desc: ''
      },
      users: [],
      // rules
      rules: {
        depart_master_id: [
          { required: true, message: '请选择部门主管', trigger: 'blur' }
        ],
        depart_name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.fetchData()
    this.loadUser()
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
      this.dialogTitle = '添加部门'
    },
    // 点击编辑按钮
    async handleShowEditDialog (id) {
      this.dialogFormVisible = true
      this.dialogTitle = '修改部门'
      const { data } = await getDepartById(id)
      this.form = data
    },
    // 弹出框的确定按钮
    async handleSure () {
      // 表单验证
      const valid = await this.$refs.ruleForm.validate()
      if (!valid) {
        return
      }

      if (this.dialogTitle === '添加部门') {
        await addDepart(this.form)
      } else if (this.dialogTitle === '修改部门') {
        await editDepart(this.form.id, this.form)
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
      await this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await removeDepart(id)
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
    // 加载用户下拉框数据
    async loadUser () {
      const { data } = await getUsers({
        pagenum: 1,
        pagesize: 1000
      })
      this.users = data.items
    }
  }
}
</script>

<style>

</style>
