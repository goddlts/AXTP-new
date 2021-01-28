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
      <el-select v-model="s_class_master_id" filterable style="width: 140px" size="small" class="filter-item" placeholder="请选择班主任" @change="handleFilter">
        <el-option
          v-for="item in s_userList"
          :key="item.id"
          :label="item.fullname"
          :value="item.id"
        />
      </el-select>
      <el-select v-model="s_grade" style="width: 140px" size="small" class="filter-item" placeholder="请选择年级">
        <el-option label="S1" value="S1" />
        <el-option label="S2" value="S2" />
        <el-option label="Y2" value="Y2" />
      </el-select>
      <el-input v-model="s_class_name" size="small" placeholder="请输入班级" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-plus" @click="handleShowAddDialog">
        添加班级
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
      <el-table-column label="校区" align="center">
        <template slot-scope="scope">
          {{ scope.row.campus_name }}
        </template>
      </el-table-column>
      <el-table-column label="班级名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.class_name }}
        </template>
      </el-table-column>
      <el-table-column label="年级" align="center">
        <template slot-scope="scope">
          {{ scope.row.grade }}
        </template>
      </el-table-column>
      <el-table-column label="班主任" align="center">
        <template slot-scope="scope">
          {{ scope.row.class_master }}
        </template>
      </el-table-column>
      <el-table-column label="班级人数" align="center">
        <template slot-scope="scope">
          {{ scope.row.students_count }}
        </template>
      </el-table-column>
      <el-table-column label="班级状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.status }}
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
        <el-form-item label="班主任" prop="class_master_id">
          <el-select v-model="form.class_master_id" placeholder="请选择班主任">
            <el-option
              v-for="item in userList"
              :key="item.id"
              :label="item.fullname"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="教室" prop="classroom_id">
          <el-select v-model="form.classroom_id" placeholder="请选择教室">
            <el-option
              v-for="item in classroomList"
              :key="item.id"
              :label="item.classroom_name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="班级名称" prop="class_name">
          <el-input v-model="form.class_name" />
        </el-form-item>
        <el-form-item label="班级状态">
          <el-select v-model="form.status">
            <el-option label="在读" value="在读" />
            <el-option label="毕业" value="毕业" />
          </el-select>
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
import { getList, removeClass, addClass, editClass, getClassById } from '@/api/class'
import { getList as getCampuses } from '@/api/campus'
import { getList as getUsers } from '@/api/user'
import { getList as getClassrooms } from '@/api/classroom'

export default {
  data () {
    return {
      list: [],
      listLoading: true,
      // 搜索框数据
      s_campus_id: '',
      s_class_master_id: '',
      s_grade: '',
      s_class_name: '',
      s_campusList: [],
      s_userList: [],
      // 弹出框绑定数据
      campusList: [],
      userList: [],
      classroomList: [],
      // 分页数据
      pagenum: 1,
      pagesize: 10,
      total: 0,
      // 弹出框数据
      dialogTitle: '',
      dialogFormVisible: false,
      form: {
        campus_id: '',
        class_master_id: '',
        classroom_id: '',
        class_name: '',
        status: '在读',
        desc: ''
      },
      // rules
      rules: {
        campus_id: [
          { required: true, message: '请选择校区', trigger: 'blur' }
        ],
        class_master_id: [
          { required: true, message: '请选择班主任', trigger: 'blur' }
        ],
        classroom_id: [
          { required: true, message: '请选择教室', trigger: 'blur' }
        ],
        class_name: [
          { required: true, message: '请输入班级名称', trigger: 'blur' }
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
      this.dialogTitle = '添加班级'
    },
    // 点击编辑按钮
    async handleShowEditDialog (id) {
      this.dialogFormVisible = true
      this.dialogTitle = '修改班级'
      const { data } = await getClassById(id)
      this.form = data
    },
    // 弹出框的确定按钮
    async handleSure () {
      // 表单验证
      const valid = await this.$refs.ruleForm.validate()
      if (!valid) {
        return
      }

      if (this.dialogTitle === '添加班级') {
        await addClass(this.form)
      } else if (this.dialogTitle === '修改班级') {
        await editClass(this.form.id, this.form)
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
      await this.$confirm('此操作将永久删除该班级, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await removeClass(id)
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
    // 绑定搜索下拉框
    async loadSelect () {
      // s_campusList: [],
      // s_user: [],
      const { data: data1 } = await getCampuses()
      this.s_campusList = data1.items
      this.campusList = data1.items

      const { data: data2 } = await getUsers()
      this.s_userList = data2.items
      this.userList = data2.items

      const { data: data3 } = await getClassrooms()
      this.classroomList = data3.items
    }
  }
}
</script>

<style>

</style>
