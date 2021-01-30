<template>
  <div class="app-container">
    <!-- 表头 -->
    <div class="filter-container">
      <el-select v-model="campus_id" style="width: 140px" size="small" class="filter-item" placeholder="请选择校区" @change="handleFilter">
        <el-option
          v-for="item in campusList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-select v-model="grade" style="width: 140px" size="small" class="filter-item" placeholder="请选择年级" @change="handleFilter">
        <el-option label="S1" value="S1" />
        <el-option label="S2" value="S2" />
        <el-option label="Y2" value="Y2" />
      </el-select>
      <el-input v-model="searchValue" size="small" class="filter-item" placeholder="请输入班级名称/班主任" style="width: 200px;" @keyup.enter.native="handleFilter" />
      <el-date-picker
        v-model="tiemspan"
        size="small"
        type="daterange"
        align="right"
        unlink-panels
        class="filter-item"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
      />
      <el-button size="small" type="primary" class="filter-item" icon="el-icon-search" @click="handleFilter">
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
      <el-table-column label="校区" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.campus_name }}
        </template>
      </el-table-column>
      <el-table-column label="班级名称" align="center" show-overflow-tooltip>
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
      <el-table-column label="班级状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column label="出勤率" align="center">
        <template slot-scope="scope">
          <router-link :to="{ path: `/tc/${scope.row.id}/attendance` }">{{ scope.row.attendance_rate }}</router-link>
        </template>
      </el-table-column>
      <el-table-column label="考试合格率" align="center">
        <template slot-scope="scope">
          {{ scope.row.pass_rate }}
        </template>
      </el-table-column>
      <el-table-column label="作业提交率" align="center">
        <template slot-scope="scope">
          {{ scope.row.submission_rate }}
        </template>
      </el-table-column>
      <el-table-column label="答辩通过率" align="center">
        <template slot-scope="scope">
          {{ scope.row.defense_pass_rate }}
        </template>
      </el-table-column>
      <el-table-column width="260" align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="$router.push(`/tcenter/${scope.row.id}/calltheroll`)">点名</el-button>
          <el-button type="text" size="mini" @click="$router.push(`/tcenter/${scope.row.id}/submission`)">作业提交</el-button>
          <el-button type="text" size="mini" @click="$router.push(`/tcenter/${scope.row.id}/details`)">详情</el-button>
          <el-button type="text" size="mini">导出</el-button>
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
import { getClassData } from '@/api/class'
import { getList as getCampuses } from '@/api/campus'

export default {
  data () {
    return {
      list: null,
      listLoading: true,
      // 搜索框数据
      campus_id: '',
      campusList: [],
      grade: '',
      searchValue: '',
      // 日期选择:开始和结束日期
      tiemspan: [],
      // 分页数据
      pagenum: 1,
      pagesize: 10,
      total: 0,
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
    // 日期选择默认显示最近一周
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
    this.tiemspan = [start, end]
    this.fetchData()
    this.loadSelect()
  },
  methods: {
    fetchData () {
      this.listLoading = true
      getClassData({
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        query: JSON.stringify({
          campus_id: this.campus_id,
          grade: this.grade,
          tiemspan: this.tiemspan
        })
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
    },
    // 绑定搜索下拉框
    async loadSelect () {
      const { data: data1 } = await getCampuses()
      this.campusList = data1.items
    }
  }
}
</script>

<style>

</style>
