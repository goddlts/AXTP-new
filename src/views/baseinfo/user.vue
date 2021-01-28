<template>
  <div class="app-container">
    <!-- 表头 -->
    <div class="filter-container">
      <el-select v-model="s_campus_id" style="width: 140px" size="small" class="filter-item" placeholder="请选择校区" @change="handleFilter">
        <el-option
          v-for="item in s_campusList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-select v-model="s_depart_id" style="width: 140px" size="small" class="filter-item" placeholder="请选择部门" @change="handleFilter">
        <el-option
          v-for="item in s_departList"
          :key="item.id"
          :label="item.depart_name"
          :value="item.id"
        />
      </el-select>
      <el-select v-model="s_role_id" style="width: 140px" size="small" class="filter-item" placeholder="请选择校区">
        <el-option
          v-for="item in s_roleList"
          :key="item.id"
          :label="item.role_name"
          :value="item.id"
        />
      </el-select>
      <el-input v-model="s_fullname" size="small" placeholder="请输入员工姓名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    </div>
    <div class="filter-container">
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-plus" @click="handleShowAddDialog">
        添加员工
      </el-button>
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-plus" @click="handleShowAddDialog">
        批量导入员工
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
      <el-table-column label="员工姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.fullname }}
        </template>
      </el-table-column>
      <el-table-column label="校区" align="center">
        <template slot-scope="scope">
          {{ scope.row.campus_name }}
        </template>
      </el-table-column>
      <el-table-column label="部门" align="center">
        <template slot-scope="scope">
          {{ scope.row.depart_name }}
        </template>
      </el-table-column>
      <el-table-column label="角色" align="center">
        <template slot-scope="scope">
          {{ scope.row.role_name }}
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          {{ scope.row.sex }}
        </template>
      </el-table-column>
      <el-table-column label="年龄" align="center">
        <template slot-scope="scope">
          {{ scope.row.age }}
        </template>
      </el-table-column>
      <el-table-column label="电话" align="center">
        <template slot-scope="scope">
          {{ scope.row.mobile }}
        </template>
      </el-table-column>
      <el-table-column label="员工状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
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
            <el-option
              v-for="item in s_campusList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="depart_id">
          <el-select v-model="form.depart_id" placeholder="请选择部门">
            <el-option
              v-for="item in s_departList"
              :key="item.id"
              :label="item.depart_name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="form.role_id" placeholder="请选择选择角色">
            <el-option
              v-for="item in s_roleList"
              :key="item.id"
              :label="item.role_name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="工号" prop="user_no">
          <el-input v-model="form.user_no" />
        </el-form-item>
        <el-form-item label="登录名" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="fullname">
          <el-input v-model="form.fullname" />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="form.mobile" />
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="出生日期">
          <el-input v-model="form.birthday" />
        </el-form-item>
        <el-form-item label="员工状态">
          <el-select v-model="form.status">
            <el-option label="在职" value="在职" />
            <el-option label="离职" value="离职" />
          </el-select>
        </el-form-item>
        <el-form-item label="学历">
          <el-input v-model="form.edu_background" />
        </el-form-item>
        <el-form-item label="毕业院校">
          <el-input v-model="form.edu_school" />
        </el-form-item>
        <el-form-item label="专业">
          <el-input v-model="form.major" />
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, removeUser, addUser, editUser, getUserById } from '@/api/user'
import { getList as getCampuses } from '@/api/campus'
import { getList as getDepartments } from '@/api/depart'
import { getList as getRoles } from '@/api/role'

export default {
  data () {
    return {
      list: [],
      listLoading: true,
      // 绑定搜索框的下拉框/搜索框数据
      s_campus_id: '',
      s_depart_id: '',
      s_fullname: '',
      s_role_id: '',
      s_campusList: [],
      s_departList: [],
      s_roleList: [],
      // 绑定表单中的下拉框
      campus_id: '',
      depart_id: '',
      fullname: '',
      campusList: [],
      departList: [],
      roleList: [],
      // 分页数据
      pagenum: 1,
      pagesize: 10,
      total: 0,
      // 弹出框数据
      dialogTitle: '',
      dialogFormVisible: false,
      form: {
        campus_id: '',
        depart_id: '',
        role_id: '',
        user_no: '',
        username: '',
        fullname: '',
        sex: '男',
        mobile: '',
        email: '',
        birthday: '',
        status: '在职',
        edu_background: '',
        edu_school: '',
        major: '',
        desc: ''
      },
      // rules
      rules: {
        campus_id: [
          { required: true, message: '请选择校区', trigger: 'change' }
        ],
        depart_id: [
          { required: true, message: '请选择部门', trigger: 'change' }
        ],
        role_id: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
        user_no: [
          { required: true, message: '请输入工号', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入登录名', trigger: 'blur' }
        ],
        fullname: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
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
        query: JSON.stringify({
          campus_id: this.s_campus_id,
          depart_id: this.s_depart_id,
          role_id: this.s_role_id,
          fullname: this.s_fullname
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
      this.dialogTitle = '添加员工'
    },
    // 点击编辑按钮
    async handleShowEditDialog (id) {
      this.dialogFormVisible = true
      this.dialogTitle = '修改员工'
      const { data } = await getUserById(id)
      this.form = data
      console.log(this.form)
    },
    // 弹出框的确定按钮
    async handleSure () {
      // 表单验证
      const valid = await this.$refs.ruleForm.validate()
      if (!valid) {
        return
      }

      if (this.dialogTitle === '添加员工') {
        await addUser(this.form)
      } else if (this.dialogTitle === '修改员工') {
        await editUser(this.form.id, this.form)
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
      await this.$confirm('此操作将永久删除该员工, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await removeUser(id)
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
    // 绑定下拉框数据
    async loadSelect () {
      // 绑定下拉框的数据，使用的接口处理不太好，使用的是支持分页的接口
      // 绑定校区
      const { data: data1 } = await getCampuses({
        pagenum: 1,
        pagesize: 1000
      })
      this.s_campusList = data1.items
      this.campusList = data1.items
      // 绑定部门
      const { data: data2 } = await getDepartments({
        pagenum: 1,
        pagesize: 1000
      })
      this.s_departList = data2.items
      this.departList = data2.items
      // 绑定角色
      const { data: data3 } = await getRoles({
        pagenum: 1,
        pagesize: 1000
      })
      this.s_roleList = data3.items
      this.roleList = data3.items
    },
    // 弹出框关闭之后
    handleDialogClosed () {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style>

</style>
