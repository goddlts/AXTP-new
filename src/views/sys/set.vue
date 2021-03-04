<template>
  <div class="app-container">
    <!-- 表头 -->
    <div class="filter-container">
      <el-select v-model="campusId" style="width: 140px" size="small" class="filter-item" placeholder="请选择校区" @change="handleFilter">
        <el-option label="请选择校区" :value="-1" />
        <el-option
          v-for="item in campusList"
          :key="item.id"
          :label="item.campusName"
          :value="item.id"
        />
      </el-select>
      <el-select v-model="departId" style="width: 140px" size="small" class="filter-item" placeholder="请选择部门" @change="handleFilter">
        <el-option label="请选择部门" :value="-1" />
        <el-option
          v-for="item in departList"
          :key="item.id"
          :label="item.departName"
          :value="item.id"
        />
      </el-select>
      <el-input v-model="realname" size="small" placeholder="请输入员工姓名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    </div>
    <div class="filter-container">
      <el-select v-model="roleId" style="width: 140px" size="small" class="filter-item" placeholder="请选择角色">
        <el-option label="请选择角色" :value="-1" />
        <el-option
          v-for="item in roleList"
          :key="item.id"
          :label="item.roleName"
          :value="item.id"
        />
      </el-select>
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-check" @click="handleSetRole">
        设置员工角色
      </el-button>
    </div>
    <!-- 表格 -->
    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      stripe
      fit
      highlight-current-row
    >
      <el-table-column
        type="selection"
        width="55"
      />
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
      <el-table-column label="员工姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.realname }}
        </template>
      </el-table-column>
      <el-table-column label="角色" align="center">
        <template slot-scope="scope">
          {{ scope.row.Role && scope.row.Role.roleName }}
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
  </div>
</template>

<script>
import { getList } from '@/api/user'
import { getList as getCampuses } from '@/api/campus'
import { getList as getDepartments } from '@/api/depart'
import { getList as getRoles, setRoleForUsers } from '@/api/role'

export default {
  filters: {
    getAge (birthDay) {
      return new Date().getFullYear() - new Date(birthDay).getFullYear()
    }
  },
  data () {
    return {
      list: [],
      listLoading: true,
      // 绑定下拉框/搜索框数据
      campusId: '',
      departId: '',
      realname: '',
      roleId: -1,
      campusList: [],
      departList: [],
      roleList: [],
      // 分页数据
      pagenum: 1,
      pagesize: 8,
      total: 0
    }
  },
  created () {
    this.fetchData()
    this.loadSelect()
  },
  methods: {
    fetchData () {
      this.listLoading = true
      getList({
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        query: JSON.stringify({
          campusId: this.campusId,
          departId: this.departId,
          realname: this.realname
        })
      }).then(response => {
        this.list = response.data.items
        this.listLoading = false
        this.total = response.data.total
      })
    },
    // 绑定下拉框数据
    async loadSelect () {
      // 绑定下拉框的数据，使用的接口处理不太好，使用的是支持分页的接口
      // 绑定校区
      const { data: data1 } = await getCampuses({
        pagenum: 1,
        pagesize: 1000
      })
      this.campusList = data1.items
      // 绑定部门
      const { data: data2 } = await getDepartments({
        pagenum: 1,
        pagesize: 1000
      })
      this.departList = data2.items
      // 绑定角色
      const { data: data3 } = await getRoles({
        pagenum: 1,
        pagesize: 1000
      })
      this.roleList = data3.items
    },
    handleFilter () {
      this.pagenum = 1
      this.fetchData()
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
    // 设置员工角色
    async handleSetRole () {
      // 角色id
      // this.role_id
      // 用户ids，获取表格中选择行的id
      // setRoleForUsers
      if (this.roleId === -1) {
        this.$message({
          type: 'warning',
          message: '请选择要设置的角色'
        })
        return
      }
      // 获取选中行绑定的数据
      const selUsers = this.$refs.multipleTable.selection
      if (selUsers.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择要设置的用户'
        })
        return
      }

      const uids = selUsers.map(u => u.id)
      await setRoleForUsers(this.roleId, uids.join(','))
      this.fetchData()
      this.$message({
        type: 'success',
        message: '权限设置成功'
      })
    }
  }
}
</script>

<style>
</style>
