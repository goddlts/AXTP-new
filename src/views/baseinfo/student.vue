<template>
  <div class="app-container">
    <!-- 表头 -->
    <div class="filter-container">
      <el-select v-model="s_campus_name" style="width: 140px" size="small" class="filter-item" placeholder="请选择校区" @change="handleFilter">
        <el-option
          v-for="item in s_campusList"
          :key="item.id"
          :label="item.campusName"
          :value="item.campusName"
        />
      </el-select>
      <el-select v-model="s_class_name" style="width: 140px" size="small" class="filter-item" placeholder="请选择班级" @change="handleFilter">
        <el-option
          v-for="item in s_classList"
          :key="item.id"
          :label="item.className"
          :value="item.className"
        />
      </el-select>
      <el-select v-model="s_status" style="width: 140px" size="small" class="filter-item" placeholder="请选择状态" @change="handleFilter">
        <el-option label="在读" value="在读" />
        <el-option label="休学" value="休学" />
        <el-option label="转班" value="转班" />
        <el-option label="开除" value="开除" />
      </el-select>
      <el-input v-model="s_fullname" size="small" placeholder="请输入学生姓名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    </div>
    <div class="filter-container">
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-plus" @click="handleShowAddDialog">
        添加学生
      </el-button>
      <el-upload
        style="display: inline-block"
        action="http://192.168.15.153:8080/renren-fast/api/upload/student"
        accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        :headers="{
          token: 'edcc14ad35ee6f9ba1752ce1fb7764df'
        }"
        :show-file-list="false"
        :on-success="handleUploadSuccess"
      >
        <el-button size="small" type="primary" class="filter-item" icon="el-icon-plus">批量导入学生</el-button>
      </el-upload>
      <el-button size="small" type="primary" class="filter-item" icon="el-icon-minus" @click="handleDeleteMultiple">批量删除学生</el-button>
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
      <el-table-column label="学号" align="center">
        <template slot-scope="scope">
          {{ scope.row.stuNo }}
        </template>
      </el-table-column>
      <el-table-column label="学生姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.stuName }}
        </template>
      </el-table-column>
      <el-table-column label="校区" align="center">
        <template slot-scope="scope">
          {{ scope.row.campusName }}
        </template>
      </el-table-column>
      <el-table-column label="班级" align="center">
        <template slot-scope="scope">
          {{ scope.row.className }}
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          {{ scope.row.stuSex }}
        </template>
      </el-table-column>
      <el-table-column label="年龄" align="center">
        <template slot-scope="scope">
          {{ getAge(scope.row.stuBirthday) }}
        </template>
      </el-table-column>
      <el-table-column label="电话" align="center">
        <template slot-scope="scope">
          {{ scope.row.stuMobile }}
        </template>
      </el-table-column>
      <el-table-column label="学生状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.stuStatus }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="mini" icon="el-icon-edit" @click="handleShowEditDialog(scope.row.studentId)">编辑</el-button>
          <el-button type="text" size="mini" icon="el-icon-delete" @click="handleDelete(scope.row.studentId)">删除</el-button>
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
        <el-form-item label="校区" prop="campus_id">
          <el-select v-model="form.campusName" placeholder="请选择校区">
            <el-option
              v-for="item in campusList"
              :key="item.id"
              :label="item.campusName"
              :value="item.campusName"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="班级" prop="className">
          <el-select v-model="form.className" placeholder="请选择班级">
            <el-option
              v-for="item in classList"
              :key="item.id"
              :label="item.className"
              :value="item.className"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="学号" prop="stuNo">
          <el-input v-model="form.stuNo" />
        </el-form-item>
        <el-form-item label="姓名" prop="stuName">
          <el-input v-model="form.stuName" />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.stuSex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="form.stuMobile" />
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input v-model="form.stuEmail" />
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
            v-model="form.stuBirthday"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="学生状态">
          <el-select v-model="form.stuStatus">
            <el-option label="在读" value="在读" />
            <el-option label="休学" value="休学" />
            <el-option label="转班" value="转班" />
            <el-option label="开除" value="开除" />
          </el-select>
        </el-form-item>
        <el-form-item label="学历">
          <el-input v-model="form.stuEduBackground" />
        </el-form-item>
        <el-form-item label="毕业院校">
          <el-input v-model="form.stuEduSchool" />
        </el-form-item>
        <el-form-item label="专业">
          <el-input v-model="form.stuMajor" />
        </el-form-item>
        <el-form-item label="备注信息">
          <el-input
            v-model="form.stuDesc"
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
import { getList, removeStudent, addStudent, editStudent, getStudentById, removeMultiplyStudent } from '@/api/student'
import { getList as getCampuses } from '@/api/campus'
import { getList as getClasses } from '@/api/class'
import { getToken } from '@/utils/auth'

function getDefaultDate () {
  const date = new Date()
  const y = date.getFullYear() - 17
  const m = date.getMonth() + 1
  const d = date.getDate()
  return y + '-' + (m >= 10 ? m : '0' + m) + '-' + (d >= 10 ? d : '0' + d)
}

export default {
  data () {
    return {
      token: getToken(),
      list: [],
      listLoading: true,
      // 搜索框数据
      s_campus_name: '',
      s_class_name: '',
      s_status: '',
      s_fullname: '',
      s_campusList: [],
      s_classList: [],
      // 弹出框绑定数据
      campusList: [],
      classList: [],
      // 分页数据
      pagenum: 1,
      pagesize: 10,
      total: 0,
      // 弹出框数据
      dialogTitle: '',
      dialogFormVisible: false,
      form: {
        campusName: '',
        className: '',
        stuNo: '',
        stuName: '',
        stuSex: '男',
        stuMobile: '',
        stuEmail: '',
        stuBirthday: getDefaultDate(),
        stuStatus: '在读',
        stuEduBackground: '',
        stuEduSchool: '',
        stuMajor: '',
        stuDesc: ''
      },
      // rules
      rules: {
        campusName: [
          { required: true, message: '请选择校区', trigger: 'blur' }
        ],
        className: [
          { required: true, message: '请选择班级', trigger: 'blur' }
        ],
        stuNo: [
          { required: true, message: '请输入学号', trigger: 'blur' }
        ],
        stuName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
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
    async fetchData () {
      this.listLoading = true
      const { data } = await getList({
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        query: {
          campusName: this.s_campus_name,
          className: this.s_class_name,
          stuStatus: this.s_status,
          stuName: this.s_fullname
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
      this.dialogTitle = '添加学生'
    },
    // 点击编辑按钮
    async handleShowEditDialog (id) {
      this.dialogFormVisible = true
      this.dialogTitle = '修改学生'
      const { data } = await getStudentById(id)
      this.form = data
    },
    // 弹出框的确定按钮
    async handleSure () {
      // 表单验证
      const valid = await this.$refs.ruleForm.validate()
      if (!valid) {
        return
      }

      if (this.dialogTitle === '添加学生') {
        await addStudent(this.form)
      } else if (this.dialogTitle === '修改学生') {
        await editStudent(this.form.studentId, this.form)
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
      await this.$confirm('此操作将永久删除该学生, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await removeStudent(id)
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

      const { data: data2 } = await getClasses({
        pagenum: 1,
        pagesize: 1000
      })
      this.s_classList = data2.items
      this.classList = data2.items
    },
    // 获取年龄
    getAge (birthday) {
      const age = new Date().getFullYear() - new Date(birthday).getFullYear()
      if (isNaN(age)) {
        return '-'
      }
      return age
    },
    handleUploadSuccess (res) {
      this.pagenum = 1
      this.fetchData()
      this.$message({
        type: 'success',
        message: `批量上传成功，已添加 ${res.data.count} 个学生`
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
          message: '请选择要删除的学生'
        })
      }
      await this.$confirm('此操作将永久删除学生, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      const ids = this.multipleSelection.map(row => {
        return row.stuId
      })
      const count = ids.length
      await removeMultiplyStudent(ids.splice(','))
      this.$message({
        type: 'success',
        message: `已删除${count}条学生数据`
      })
      this.fetchData()
    },
  }
}
</script>

<style>

</style>
