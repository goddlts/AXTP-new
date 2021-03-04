<template>
  <div class="app-container">
    <!-- 表头 -->
    <div class="filter-container">
      <el-input v-model="searchValue" size="small" placeholder="请输入菜单" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button size="small" style="margin-left: 10px;" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button size="small" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="handleShowAddDialog">
        添加菜单
      </el-button>
    </div>
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      row-key="id"
      :tree-props="{children: 'children'}"
      border
      stripe
      fit
      highlight-current-row
    >
      <el-table-column label="名称" align="center" width="150">
        <template slot-scope="scope">
          {{ scope.row.menuName }}
        </template>
      </el-table-column>
      <el-table-column label="图标" align="center">
        <template slot-scope="scope">
          <i :class="scope.row.icon" />
        </template>
      </el-table-column>
      <el-table-column label="组件" align="center">
        <template slot-scope="scope">
          {{ scope.row.component }}
        </template>
      </el-table-column>
      <el-table-column label="路径" align="center">
        <template slot-scope="scope">
          {{ scope.row.path }}
        </template>
      </el-table-column>
      <el-table-column label="是否隐藏" align="center">
        <template slot-scope="scope">
          {{ scope.row.hidden }}
        </template>
      </el-table-column>
      <el-table-column label="排序" align="center">
        <template slot-scope="scope">
          {{ scope.row.order }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="mini" icon="el-icon-edit" @click="handleShowEditDialog(scope.row)">编辑</el-button>
          <el-button type="text" size="mini" icon="el-icon-delete" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出框 -->
    <el-dialog label-width="10px" :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form
        :key="form_key"
        ref="ruleForm"
        :rules="rules"
        :model="form"
        label-width="100px"
      >
        <el-form-item label="类型">
          <el-radio-group v-model="type" @change="handleRadioChange">
            <el-radio label="目录">目录</el-radio>
            <el-radio label="菜单">菜单</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="'名称'" prop="menuName">
          <el-input v-model="form.menuName" />
        </el-form-item>
        <el-form-item
          v-if="type === '菜单'"
          label="上级菜单"
          prop="parentId"
        >
          <!-- 下拉框 -->
          <el-select v-model="selectedValue" placeholder="请选择父级目录">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.menuName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="type === '菜单'"
          label="组件"
          prop="component"
        >
          <el-input v-model="form.component" />
        </el-form-item>
        <el-form-item :label="'路由地址'" prop="path">
          <el-input v-model="form.path" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.order" :min="0" :max="100" controls-position="right" />
        </el-form-item>
        <el-form-item v-if="type === '菜单'" label="是否隐藏">
          <el-input v-model="form.hidden" />
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="form.icon" />
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
import { getList, removeMenu, addMenu, editMenu, getMenuSelect } from '@/api/menu'

export default {
  data () {
    return {
      list: [],
      listLoading: true,
      searchValue: '',
      // 弹出框数据
      dialogTitle: '',
      dialogFormVisible: false,
      // 给form 设置一个唯一key，当点击radio的时候重新设置
      form_key: Math.random(),
      form: {
        parentId: 0,
        menuName: '',
        icon: '',
        component: '',
        path: '',
        hidden: false,
        order: 0
      },
      type: '目录',
      // 下拉框绑定的数据
      options: [],
      selectedValue: '',
      rules: {
        menuName: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' }
        ],
        parentId: [
          { required: true, message: '请选择父菜单', trigger: 'change' }
        ],
        component: [
          { required: true, message: '请输入组件', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '请输入URL', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.listLoading = true
      getList({
        query: {
          menuName: this.searchValue
        }
      }).then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    // 获取下拉框中的数据
    loadMenuSelect (level) {
      getMenuSelect(level)
        .then(res => {
          this.options = res.data
        })
    },
    // 单选框改变
    handleRadioChange (value) {
      this.form_key = Math.random()
      let level = -1
      if (value === '菜单') {
        level = 1
        this.loadMenuSelect(level)
      } else if (value === '按钮') {
        level = 2
        this.loadMenuSelect(level)
      }
    },
    // 搜索
    handleFilter () {
      this.pagenum = 1
      this.fetchData()
    },
    // 点击打开添加对话框
    handleShowAddDialog () {
      this.dialogFormVisible = true
      this.dialogTitle = '添加菜单'
    },
    // 点击编辑按钮
    async handleShowEditDialog (menu) {
      this.dialogFormVisible = true
      this.dialogTitle = '修改菜单'

      this.form = menu

      let level = -1
      if (this.type === '菜单') {
        level = 1
        this.selectedValue = this.form.parentId
        this.loadMenuSelect(level)
      }
    },
    // 弹出框的确定按钮
    async handleSure () {
      // 表单验证
      let valid = false
      await this.$refs.ruleForm.validate(v => {
        valid = v
      })
      if (!valid) {
        // 验证未通过返回
        return false
      }

      // 根据 type 判断，当前添加的是 目录/菜单/按钮，对数据处理
      switch (this.type) {
        case '目录':
          this.form.parentId = 0
          this.form.component = 'layout'
          break
        case '菜单':
          this.form.parentId = this.selectedValue
          break
        default:
          break
      }

      if (this.dialogTitle === '添加菜单') {
        delete this.form.id
        await addMenu(this.form)
      } else if (this.dialogTitle === '修改菜单') {
        await editMenu(this.form.id, this.form)
      }
      this.fetchData()
      this.$message({
        type: 'success',
        message: '操作成功'
      })
      this.dialogFormVisible = false
      this.$refs.ruleForm.resetFields()
    },
    // 删除
    async handleDelete (id) {
      await this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await removeMenu(id)
      this.$message({
        type: 'success',
        message: '删除成功'
      })
      this.fetchData()
    }
  }
}
</script>

<style>

</style>
