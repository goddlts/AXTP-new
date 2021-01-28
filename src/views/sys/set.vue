<template>
  <div class="app-container">
    <!-- 表头 -->
    <div class="filter-container">
      <el-select v-model="campus_id" style="width: 140px" size="small" class="filter-item" placeholder="请选择校区" @change="handleFilter">
        <el-option label="请选择校区" :value="-1" />
        <el-option
          v-for="item in campusList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-select v-model="depart_id" style="width: 140px" size="small" class="filter-item" placeholder="请选择部门" @change="handleFilter">
        <el-option label="请选择部门" :value="-1" />
        <el-option
          v-for="item in departList"
          :key="item.id"
          :label="item.depart_name"
          :value="item.id"
        />
      </el-select>
      <el-input v-model="fullname" size="small" placeholder="请输入员工姓名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    </div>
    <div class="filter-container">
      <el-select v-model="role_id" style="width: 140px" size="small" class="filter-item" placeholder="请选择校区">
        <el-option label="请选择角色" :value="-1" />
        <el-option
          v-for="item in roleList"
          :key="item.id"
          :label="item.role_name"
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
          {{ scope.row.campus_name }}
        </template>
      </el-table-column>
      <el-table-column label="部门" align="center">
        <template slot-scope="scope">
          {{ scope.row.depart_name }}
        </template>
      </el-table-column>
      <el-table-column label="员工姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.fullname }}
        </template>
      </el-table-column>
      <el-table-column label="角色" align="center">
        <template slot-scope="scope">
          {{ scope.row.role_name }}
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
  </div>
</template>

<script>
import { getList } from '@/api/user'
import { getList as getCampuses } from '@/api/campus'
import { getList as getDepartments } from '@/api/department'
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
      campus_id: -1,
      depart_id: -1,
      fullname: '',
      role_id: -1,
      campusList: [],
      departList: [],
      roleList: [],
      // 分页数据
      pagenum: 1,
      pagesize: 10,
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
          campus_id: this.campus_id,
          depart_id: this.depart_id,
          fullname: this.fullname
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
      if (this.role_id === -1) {
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
      await setRoleForUsers(this.role_id, uids.join(','))
      this.$message({
        type: 'success',
        message: '权限设置成功'
      })
    }
  }
}
</script>

<style scoped>
.filter-item {
  margin-right: 15px;
}
</style>
