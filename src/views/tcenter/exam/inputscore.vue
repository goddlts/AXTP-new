<template>
  <div class="app-container">
    <!-- 表头 -->
    <div class="filter-container">
      <el-row>
        <el-col :span="12">
          校区：翱翔校区 <br>
          班级：xxx <br>
          班主任：xxxx <br>
        </el-col>
        <el-col :span="12">
          班级人数：45 <br>
          考试类型：阶段考试 <br>
          考试内容：xxxxxxx <br>
        </el-col>
      </el-row>
    </div>
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="#" width="50" type="index" />
    </el-table>
  </div>
</template>

<script>
import { } from '@/api/class'
export default {
  data () {
    return {
      list: [],
      listLoading: true,
      classId: -1,
      examId: -1
    }
  },
  created () {
    this.examId = this.$route.params.examid
    this.classId = this.$route.params.classid
    console.log(this.classId)
    console.log(this.examId)
  }
}
</script>

<style>

</style>
