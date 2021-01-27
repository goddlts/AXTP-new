<template>
  <div class="app-container">
    <!-- 表头 -->
    <div class="filter-container">
      <el-input v-model="searchValue" size="small" placeholder="请输入角色" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button size="small" style="margin-left: 10px;" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button size="small" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="handleShowAddDialog">
        添加角色
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
      <el-table-column label="角色名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.role_name }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.created_time }}
        </template>
      </el-table-column>
      <el-table-column label="描述" align="center">
        <template slot-scope="scope">
          {{ scope.row.desc }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" icon="el-icon-edit" @click="handleShowEditDialog(scope.row.id)">编辑</el-button>
          <el-button type="text" size="mini" icon="el-icon-delete" @click="handleDelete(scope.row.id)">删除</el-button>
          <el-button type="text" size="mini" icon="el-icon-setting" @click="setRightDialogFormVisible = true">权限配置</el-button>
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
      <el-form :model="form" label-width="100px">
        <el-form-item label="角色名称">
          <el-input v-model="form.role_name" />
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
    <!-- 分配权限 -->
    <el-dialog label-width="10px" title="分配角色" :visible.sync="setRightDialogFormVisible">
      <el-tree
        ref="tree"
        :data="menuData"
        node-key="id"
        show-checkbox
        accordion
        :default-checked-keys="checkedIds"
        :props="defaultProps"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRightDialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, removeRole, addRole, editRole, getRoleById } from '@/api/role'
import { getRoutes } from '@/api/menu'

export default {
  data () {
    return {
      list: null,
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
        role_name: '',
        desc: ''
      },
      // 分配权限数据
      setRightDialogFormVisible: false,
      menuData: [],
      checkedIds: [],
      defaultProps: {
        // 配置树的节点显示的属性
        label: function (data) {
          return data.meta.title
        },
        // 配置子节点显示的属性
        children: 'children'
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
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        query: this.searchValue
      }).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
      // 获取权限菜单
      getRoutes().then(response => {
        this.menuData = response.data
      })
    },
    // 搜索
    handleFilter () {
      this.pagenum = 1
      this.fetchData()
    },
    // 点击打开添加对话框
    handleShowAddDialog () {
      this.dialogFormVisible = true
      this.dialogTitle = '添加角色'
    },
    // 点击编辑按钮
    async handleShowEditDialog (id) {
      this.dialogFormVisible = true
      this.dialogTitle = '修改角色'
      const { data } = await getRoleById(id)
      this.form = data
    },
    // 弹出框的确定按钮
    async handleSure () {
      if (this.dialogTitle === '添加角色') {
        await addRole(this.form)
      } else if (this.dialogTitle === '修改角色') {
        await editRole(this.form.id, this.form)
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
      await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await removeRole(id)
      this.$message({
        type: 'success',
        message: '删除成功'
      })
      // 处理最后一页只有一条数据的问题
      if (this.pagenum > 1 && this.list.count === 1) {
        this.pagenum--
      }
      this.fetchData()
    }
  }
}
</script>

<style>

</style>