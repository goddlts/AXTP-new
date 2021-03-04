<template>
  <div class="app-container">
    <!-- 表头 -->
    <div class="filter-container">
      <el-select v-model="s_campusId" style="width: 140px" size="small" class="filter-item" placeholder="请选择校区" @change="handleFilter">
        <el-option label="请选择校区" :value="-1" />
        <el-option
          v-for="item in s_campusList"
          :key="item.id"
          :label="item.campusName"
          :value="item.id"
        />
      </el-select>
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
      <el-table-column label="校区名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.Campus && scope.row.Campus.campusName }}
        </template>
      </el-table-column>
      <el-table-column label="部门名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.departName }}
        </template>
      </el-table-column>
      <el-table-column label="部门主管" align="center">
        <template slot-scope="scope">
          {{ scope.row.departMaster }}
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
      :current-page="pagenum"
      :page-sizes="[8, 16, 32, 64]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
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
        <el-form-item label="校区" prop="campusId">
          <el-select v-model="form.campusId" filterable placeholder="请选择校区">
            <el-option label="请选择校区" :value="-1" />
            <el-option
              v-for="item in campusList"
              :key="item.id"
              :label="item.campusName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="部门主管" prop="departMasterId">
          <el-select v-model="form.departMasterId" filterable placeholder="请选择负责人">
            <el-option label="请选择部门主管" :value="-1" />
            <el-option v-for="item in users" :key="item.id" :label="item.realname" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="部门名称" prop="departName">
          <el-input v-model="form.departName" />
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
import { getList as getCampuses } from '@/api/campus'

export default {
  data () {
    return {
      list: [],
      listLoading: true,
      searchValue: '',
      // 下拉框
      s_campusId: -1,
      s_campusList: [],
      campusList: [],
      // 分页数据
      pagenum: 1,
      pagesize: 10,
      total: 0,
      // 弹出框数据
      dialogTitle: '',
      dialogFormVisible: false,
      form: {
        campusId: -1,
        departMasterId: -1,
        departName: '',
        desc: ''
      },
      users: [],
      rules: {
        campusId: [
          { required: true, message: '请选择校区', trigger: 'blur' }
        ],
        departMasterId: [
          { required: true, message: '请选择部门主管', trigger: 'blur' }
        ],
        departName: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.fetchData()
    this.loadUser()
    // 加载校区下拉框
    this.loadCampus()
  },
  methods: {
    async loadCampus () {
      const { data } = await getCampuses({
        pagenum: 1,
        pagesize: 1000
      })
      this.s_campusList = data.items

      this.campusList = [...this.s_campusList]
    },
    async fetchData () {
      this.listLoading = true
      const { data } = await getList({
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        query: {
          departName: this.searchValue,
          campusId: this.s_campusId
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
