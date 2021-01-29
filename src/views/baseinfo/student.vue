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
      <el-select v-model="s_class_id" style="width: 140px" size="small" class="filter-item" placeholder="请选择班级" @change="handleFilter">
        <el-option
          v-for="item in s_classList"
          :key="item.id"
          :label="item.class_name"
          :value="item.id"
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
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-plus" @click="handleShowAddDialog">
        批量导入学生
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
      <el-table-column label="学号" align="center">
        <template slot-scope="scope">
          {{ scope.row.stu_no }}
        </template>
      </el-table-column>
      <el-table-column label="学生姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="校区" align="center">
        <template slot-scope="scope">
          {{ scope.row.campus_name }}
        </template>
      </el-table-column>
      <el-table-column label="班级" align="center">
        <template slot-scope="scope">
          {{ scope.row.class_name }}
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
      <el-table-column label="学生状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.status }}
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
            <el-option
              v-for="item in campusList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="班级" prop="class_id">
          <el-select v-model="form.class_id" placeholder="请选择班级">
            <el-option
              v-for="item in classList"
              :key="item.id"
              :label="item.class_name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="学号" prop="stu_no">
          <el-input v-model="form.stu_no" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="form.mobile" />
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
            v-model="form.birthday"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="学生状态">
          <el-select v-model="form.status">
            <el-option label="在读" value="在读" />
            <el-option label="休学" value="休学" />
            <el-option label="转班" value="转班" />
            <el-option label="开除" value="开除" />
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
import { getList, removeStudent, addStudent, editStudent, getStudentById } from '@/api/student'
import { getList as getCampuses } from '@/api/campus'
import { getList as getClasses } from '@/api/class'

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
      list: [],
      listLoading: true,
      // 搜索框数据
      s_campus_id: '',
      s_class_id: '',
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
        campus_id: '',
        class_id: '',
        stu_no: '',
        name: '',
        sex: '男',
        mobile: '',
        email: '',
        birthday: getDefaultDate(),
        status: '在读',
        edu_background: '',
        edu_school: '',
        major: '',
        desc: ''
      },
      // rules
      rules: {
        campus_id: [
          { required: true, message: '请选择校区', trigger: 'blur' }
        ],
        class_id: [
          { required: true, message: '请选择班级', trigger: 'blur' }
        ],
        stu_no: [
          { required: true, message: '请输入学号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
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
        await editStudent(this.form.id, this.form)
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
    }
  }
}
</script>

<style>

</style>
