<template>
  <div class="app-container">
    <!-- 表头 -->
    <div class="filter-container">
      <el-select v-model="s_campus_id" style="width: 140px" size="small" class="filter-item" placeholder="请选择校区" @change="handleFilter">
        <el-option
          v-for="item in s_campusList"
          :key="item.id"
          :label="item.campusName"
          :value="item.campusName"
        />
      </el-select>
      <el-input v-model="s_classroom_name" size="small" placeholder="请输入教室" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-plus" @click="handleShowAddDialog">
        添加教室
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
          {{ scope.row.campusName }}
        </template>
      </el-table-column>
      <el-table-column label="教室名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.classroomName }}
        </template>
      </el-table-column>
      <el-table-column label="教室容量" align="center">
        <template slot-scope="scope">
          {{ scope.row.classroomCount }}
        </template>
      </el-table-column>
      <el-table-column label="教室状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.classroomStatus }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" icon="el-icon-edit" @click="handleShowEditDialog(scope.row.classroomId)">编辑</el-button>
          <el-button type="text" size="mini" icon="el-icon-delete" @click="handleDelete(scope.row.classroomId)">删除</el-button>
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
        <el-form-item label="校区" prop="campusName">
          <el-select v-model="form.campusName" placeholder="请选择校区">
            <el-option
              v-for="item in campusList"
              :key="item.campusId"
              :label="item.campusName"
              :value="item.campusName"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="教室名称" prop="classroom_name">
          <el-input v-model="form.classroomName" />
        </el-form-item>
        <el-form-item label="教室容量" prop="count">
          <el-input v-model="form.classroomCount" />
        </el-form-item>
        <el-form-item label="教室状态">
          <el-select v-model="form.classroomStatus">
            <el-option label="空闲" value="空闲" />
            <el-option label="使用" value="使用" />
            <el-option label="维修" value="维修" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注信息">
          <el-input
            v-model="form.classroomDesc"
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
import { getList, removeClassroom, addClassroom, editClassroom, getClassroomById } from '@/api/classroom'
import { getList as getCampuses } from '@/api/campus'

export default {
  data () {
    return {
      list: [],
      listLoading: true,
      searchValue: '',
      // 绑定搜索框的下拉框/搜索框数据
      s_campus_id: '',
      s_campusList: [],
      s_classroom_name: '',
      // 弹出对话框中的下拉框数据
      campusList: [],
      // 分页数据
      pagenum: 1,
      pagesize: 10,
      total: 0,
      // 弹出框数据
      dialogTitle: '',
      dialogFormVisible: false,
      form: {
        campusName: '',
        classroomName: '',
        classroomCount: '',
        classroomStatus: '空闲',
        classroomDesc: ''
      },
      // rules
      rules: {
        campusName: [
          { required: true, message: '请选择校区', trigger: 'change' }
        ],
        classroomName: [
          { required: true, message: '请输入教室名称', trigger: 'blur' }
        ],
        classroomCount: [
          { required: true, message: '请输入教室容量', trigger: 'blur' }
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
        query: JSON.stringify({
          classroomName: this.s_classroom_name,
          campusName: this.s_campus_id
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
      this.dialogTitle = '添加教室'
    },
    // 点击编辑按钮
    async handleShowEditDialog (id) {
      this.dialogFormVisible = true
      this.dialogTitle = '修改教室'
      const { data } = await getClassroomById(id)
      this.form = data
    },
    // 弹出框的确定按钮
    async handleSure () {
      // 表单验证
      const valid = await this.$refs.ruleForm.validate()
      if (!valid) {
        return
      }

      if (this.dialogTitle === '添加教室') {
        await addClassroom(this.form)
      } else if (this.dialogTitle === '修改教室') {
        await editClassroom(this.form.classroomId, this.form)
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
      await this.$confirm('此操作将永久删除该教室, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await removeClassroom(id)
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
