<template>
  <div class="app-container">
    <!-- 表头 -->
    <div class="filter-container">
      <el-select v-model="s_campusId" style="width: 140px" filterable size="small" class="filter-item" placeholder="请选择校区" @change="campusChange">
        <el-option label="请选择校区" :value="-1" />
        <el-option
          v-for="item in s_campusList"
          :key="item.id"
          :label="item.campusName"
          :value="item.id"
        />
      </el-select>
      <el-select v-model="s_departId" style="width: 140px" filterable size="small" class="filter-item" placeholder="请选择部门" @change="handleFilter">
        <el-option label="请选择部门" :value="-1" />
        <el-option
          v-for="item in s_departList"
          :key="item.id"
          :label="item.departName"
          :value="item.id"
        />
      </el-select>
      <el-select v-model="s_roleId" style="width: 140px" filterable size="small" class="filter-item" placeholder="请选择角色" @change="handleFilter">
        <el-option label="请选择角色" :value="-1" />
        <el-option
          v-for="item in s_roleList"
          :key="item.id"
          :label="item.roleName"
          :value="item.id"
        />
      </el-select>
      <el-input v-model="s_realname" size="small" placeholder="请输入员工姓名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    </div>

    <div class="filter-container">
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-plus" @click="handleShowAddDialog">
        添加员工
      </el-button>
      <el-upload
        style="display: inline-block"
        action="http://192.168.15.153:8080/renren-fast/api/upload/user"
        accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        :headers="{
          token: token
        }"
        :show-file-list="false"
        :on-success="handleUploadSuccess"
      >
        <el-button size="small" type="primary" class="filter-item" icon="el-icon-plus">批量导入员工</el-button>
      </el-upload>
      <el-button size="small" type="primary" class="filter-item" icon="el-icon-minus" @click="handleDeleteMultiple">批量删除员工</el-button>
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
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        align="center"
        width="40"
      />
      <!-- <el-table-column align="center" label="#" width="50" type="index" /> -->
      <el-table-column label="员工姓名" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.realname }}
        </template>
      </el-table-column>
      <el-table-column label="校区" align="center">
        <template slot-scope="scope">
          {{ scope.row.Campus && scope.row.Campus.campusName }}
        </template>
      </el-table-column>
      <el-table-column label="部门" align="center">
        <template slot-scope="scope">
          {{ scope.row.Depart && scope.row.Depart.departName }}
        </template>
      </el-table-column>
      <el-table-column label="角色" align="center">
        <template slot-scope="scope">
          {{ scope.row.Role && scope.row.Role.roleName }}
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          {{ scope.row.sex }}
        </template>
      </el-table-column>
      <el-table-column label="年龄" align="center">
        <template slot-scope="scope">
          {{ getAge(scope.row.birthday) }}
        </template>
      </el-table-column>
      <el-table-column label="电话" align="center" width="120">
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
        label-width="100px"
      >
        <el-form-item label="校区" prop="campusId">
          <el-select v-model="form.CampusId" filterable placeholder="请选择校区" @change="campusChange1">
            <el-option label="请选择校区" :value="-1" />
            <el-option
              v-for="item in campusList"
              :key="item.id"
              :label="item.campusName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="departId">
          <el-select v-model="form.DepartId" filterable placeholder="请选择部门">
            <el-option label="请选择部门" :value="-1" />
            <el-option
              v-for="item in departList"
              :key="item.id"
              :label="item.departName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select v-model="form.RoleId" filterable placeholder="请选择角色">
            <el-option label="请选择角色" :value="-1" />
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="工号" prop="jobNumber">
          <el-input v-model="form.jobNumber" />
        </el-form-item>
        <el-form-item label="登录名" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="form.realname" />
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
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker
            v-model="form.birthday"
            style="width: 200px"
            align="right"
            type="date"
            placeholder="请选择出生日期"
            :picker-options="pickerOptions"
          />
        </el-form-item>
        <el-form-item label="员工状态">
          <el-select v-model="form.status" style="width: 200px">
            <el-option label="在职" value="在职" />
            <el-option label="离职" value="离职" />
          </el-select>
        </el-form-item>
        <el-form-item label="学历">
          <el-input v-model="form.eduBackground" />
        </el-form-item>
        <el-form-item label="毕业院校">
          <el-input v-model="form.eduSchool" />
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
import { getList, removeUser, addUser, editUser, getUserById, removeMultiplyUser } from '@/api/user'
import { getList as getCampuses } from '@/api/campus'
import { getList as getDepartments } from '@/api/depart'
import { getList as getRoles } from '@/api/role'
import { getToken } from '@/utils/auth'

export default {
  data () {
    return {
      token: getToken(),
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      list: [],
      listLoading: true,
      // 绑定搜索框的下拉框/搜索框数据
      s_campusId: -1,
      s_departId: -1,
      s_realname: '',
      s_roleId: -1,
      s_campusList: [],
      s_departList: [],
      s_roleList: [],
      // 绑定表单中的下拉框
      realname: '',
      campusList: [],
      departList: [],
      roleList: [],
      // 分页数据
      pagenum: 1,
      pagesize: 8,
      total: 0,
      // 弹出框数据
      dialogTitle: '',
      dialogFormVisible: false,
      form: {
        campusId: -1,
        departId: -1,
        roleId: -1,
        jobNumber: '',
        username: '',
        realname: '',
        sex: '男',
        mobile: '',
        email: '',
        birthday: '',
        status: '在职',
        eduBackground: '',
        eduSchool: '',
        major: '',
        desc: ''
      },
      // rules
      rules: {
        campusName: [
          { required: true, message: '请选择校区', trigger: 'change' }
        ],
        departName: [
          { required: true, message: '请选择部门', trigger: 'change' }
        ],
        roleName: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
        jobNumber: [
          { required: true, message: '请输入工号', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入登录名', trigger: 'blur' }
        ],
        realname: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入电子邮箱', trigger: 'blur' }
        ],
        birthday: [
          { required: true, message: '请输入出生日期', trigger: 'blur' }
        ]
      },
      // 获取选中的行
      multipleSelection: []
    }
  },
  created () {
    this.fetchData()
    this.loadSelect()
  },
  methods: {
    // 选择校区，自动加载该校区下的部门
    async campusChange () {
      const { data } = await getDepartments({
        pagenum: 1,
        pagesize: 1000,
        query: JSON.stringify({
          campusId: this.s_campusId,
        })
      })
      this.s_departList = data.items

      this.handleFilter()
    },
    async campusChange1 () {
      const { data } = await getDepartments({
        pagenum: 1,
        pagesize: 1000,
        query: JSON.stringify({
          campusId: this.form.campusId,
        })
      })
      this.departList = data.items

      this.handleFilter()
    },
    async fetchData () {
      this.listLoading = true
      const { data } = await getList({
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        query: JSON.stringify({
          campusId: this.s_campusId,
          departId: this.s_departId,
          roleId: this.s_roleId,
          realname: this.s_realname
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
    },
    handleUploadSuccess (res) {
      this.pagenum = 1
      this.fetchData()
      this.$message({
        type: 'success',
        message: `批量上传成功，已添加 ${res.data.count} 个员工`
      })
    },
    // 单选框发生改变的时候执行(批量删除使用)
    handleSelectionChange (rows) {
      // rows 当前选中的行
      this.multipleSelection = rows
    },
    // 批量删除
    async handleDeleteMultiple () {
      if (this.multipleSelection.length <= 0) {
        return this.$message({
          type: 'warning',
          message: '请选择要删除的员工'
        })
      }
      await this.$confirm('此操作将永久删除员工, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      const ids = this.multipleSelection.map(row => {
        return row.id
      })
      const count = ids.length
      await removeMultiplyUser(ids.splice(','))
      this.$message({
        type: 'success',
        message: `已删除${count}条员工数据`
      })
      this.fetchData()
    },
    // 获取年龄
    getAge (birthday) {
      const age = new Date().getFullYear() - new Date(birthday).getFullYear()
      if (isNaN(age)) {
        return '-'
      }
      return age
    }
  }
}
</script>

<style>

</style>
