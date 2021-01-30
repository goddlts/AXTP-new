<template>
  <div class="app-container">
    <!-- 表头 -->
    <div class="filter-container">
      <h2>翱翔校区 - S101</h2>

      <el-input v-model="searchValue" size="small" placeholder="请输入学生" class="filter-item" style="width: 200px;" @keyup.enter.native="handleFilter" />
      <el-date-picker
        v-model="dateValue"
        size="small"
        class="filter-item"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
      />
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
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
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          {{ scope.row.sex }}
        </template>
      </el-table-column>
      <el-table-column label="日期" align="center">
        <template slot-scope="scope">
          {{ scope.row.date }}
        </template>
      </el-table-column>
      <el-table-column label="时间" align="center">
        <template slot-scope="scope">
          <router-link :to="{ path: `/tc/student/${scope.row.id}/attendance` }">
            {{ scope.row.time }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="出勤" align="center">
        <template slot-scope="scope">
          {{ scope.row.attendance }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template>
          <el-button type="primary" size="small" plain icon="el-icon-edit">修改</el-button>
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
import { getStudentAttendanceInClass } from '@/api/student'

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
      // 日期选择:开始和结束日期
      dateValue: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  created () {
    this.cid = this.$route.params.id
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.listLoading = true
      getStudentAttendanceInClass(this.cid, {
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        query: this.searchValue
      }).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    // 搜索
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
    }
  }
}
</script>

<style>

</style>
