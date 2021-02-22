<template>
  <div class="app-container">
    <div class="filter-container">
      <h2>{{ campus_name }} - {{ class_name }}</h2>
      <el-row style="margin-bottom: 5px;">
        <el-col :span="14">
          日期：
          <el-date-picker
            v-model="dateValue"
            style="width: 200px"
            class="filter-item"
            size="mini"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          /><br>
          时间：
          <el-select v-model="timeValue" style="width: 200px" class="filter-item" size="mini" placeholder="请选择">
            <el-option
              label="上午"
              value="上午"
            />
            <el-option
              label="下午"
              value="下午"
            />
            <el-option
              label="晚自习"
              value="晚自习"
            />
          </el-select>
        </el-col>
        <el-col :span="10">
          班级总人数：{{ student_num }} <br>
          实到人数：{{ present }} <br>
          缺勤人数：{{ absence }} <br>
          出勤率：{{ attendance }} <br>
        </el-col>
      </el-row>
      <el-button size="mini" plain>通过 Excel 导入</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      stripe
      fit
      highlight-current-row
    >
      <el-table-column type="index" label="#" align="center" width="60" />
      <el-table-column label="点到" width="80" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.type === -1" plain size="mini" @click="handleClick(scope.row, 1)">点到</el-button>
          <i v-if="scope.row.type === 1" class="el-icon-check" />
        </template>
      </el-table-column>
      <el-table-column label="迟到" width="80">
        <template slot-scope="scope">
          <el-button v-if="scope.row.type === -1" plain size="mini" @click="handleClick(scope.row, 2)">迟到</el-button>
          <i v-if="scope.row.type === 2" class="el-icon-check" />
        </template>
      </el-table-column>
      <el-table-column label="请假" width="80">
        <template slot-scope="scope">
          <el-button v-if="scope.row.type === -1" plain size="mini" @click="handleClick(scope.row, 3)">请假</el-button>
          <i v-if="scope.row.type === 3" class="el-icon-check" />
        </template>
      </el-table-column>
      <el-table-column label="旷课" width="80">
        <template slot-scope="scope">
          <el-button v-if="scope.row.type === -1" type="danger" plain size="mini" @click="handleClick(scope.row, 4)">旷课</el-button>
          <i v-if="scope.row.type === 4" class="el-icon-check" />
        </template>
      </el-table-column>
      <el-table-column label="学生姓名" width="100">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="学生学号" width="100">
        <template slot-scope="scope">
          {{ scope.row.stu_no }}
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
import { getStudentsInClass, callTheRoll } from '@/api/student'

function getDefaultTimeValue () {
  const hour = new Date().getHours()
  let s = '晚自习'
  if (hour >= 8 && hour < 13) {
    s = '上午'
  } else if (hour >= 13 && hour <= 18) {
    s = '下午'
  }
  return s
}

export default {
  data () {
    return {
      list: [],
      cid: -1,
      listLoading: true,
      dialogFormVisible: false,
      // 日期选择
      dateValue: new Date(),
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      timeValue: getDefaultTimeValue(),
      campus_name: '',
      class_name: '',
      // 班级总人数
      student_num: 0,
      // 实到人数
      present: 0,
      // 缺勤人数
      absence: 0,
      // 出勤率
      attendance: '0%',
      // 分页数据
      pagenum: 1,
      pagesize: 10,
      total: 0
    }
  },
  created () {
    this.cid = this.$route.params.id

    this.fetchData()
  },
  methods: {
    fetchData (page) {
      this.listLoading = true
      getStudentsInClass(this.cid, {
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(response => {
        this.list = response.data.items
        if (!page) {
          this.campus_name = response.data.campus_name
          this.class_name = response.data.class_name
          this.student_num = response.data.student_num
          this.absence = this.student_num
          this.total = response.data.total
        }
        this.listLoading = false
        // 增加一个属性，记录学生是否点到
        this.list.forEach(item => {
          // -1 未点到，1 点到 2 迟到 3 请假 4 旷课
          this.$set(item, 'type', -1)
        })
      })
    },
    async handleClick (row, type) {
      await callTheRoll(row.id, {
        date: this.dateValue,
        time: this.timeValue,
        type: type
      })
      // eslint-disable-next-line require-atomic-updates
      row.type = type
      if (type === 1 || type === 2) {
        this.present++
        this.absence = this.student_num - this.present
        this.attendance = (this.present / this.student_num * 100).toFixed(2) + '%'
      } else if (type === 3 || type === 4) {
        this.absence--
      }
    },
    // 分页方法
    handleSizeChange (val) {
      this.pagesize = val
      this.pagenum = 1
      this.fetchData('page')
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.fetchData('page')
    }
  }
}
</script>

<style>

</style>
