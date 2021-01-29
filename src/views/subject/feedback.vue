<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="course_id" style="width: 160px" size="small" class="filter-item" placeholder="请选择学科" @change="loadBooks(course_id)">
        <el-option
          v-for="item in courseList"
          :key="item.id"
          :label="item.course_name"
          :value="item.id"
        />
      </el-select>
      <el-select v-model="book_id" style="width: 250px" size="small" class="filter-item" placeholder="请选择书籍" @change="fetchData()">
        <el-option
          v-for="item in bookList"
          :key="item.id"
          :label="item.book_name"
          :value="item.id"
        />
      </el-select>
    </div>
    <!-- 显示内容 -->
    <el-row :gutter="20">
      <el-col :span="12">
        <el-table
          :data="chapters"
          highlight-current-row
          row-class-name="row"
          empty-text="请选择书籍"
          style="width: 100%"
          @current-change="handleRowClick"
          @row-dblclick="handleDbClick"
        >
          <el-table-column
            prop="text"
            label="章"
          />
        </el-table>
      </el-col>
      <el-col :span="12">
        <el-table
          :data="feeditems"
          empty-text="请选择书籍中的章"
          style="width: 100%"
        >
          <el-table-column
            prop="feedback_item"
            label="反馈条目"
          />
          <el-table-column align="center" width="80">
            <template slot-scope="scope">
              <el-button type="text" size="mini" icon="el-icon-delete" @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 弹出框 -->
    <el-dialog label-width="10px" :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form
        label-width="100px"
      >
        <el-form-item label="反馈条目">
          <el-input
            v-model="feeditemsText"
            type="textarea"
            :rows="6"
            placeholder="请输入反馈条目，各占一行"
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
import { getList as getCourses } from '@/api/course'
import { getList as getBooks } from '@/api/book'
import { getList, getFeedbacksByChapterId } from '@/api/chapter'

export default {
  data () {
    return {
      course_id: '',
      courseList: [],
      book_id: '',
      bookList: [],
      chapters: [],
      feeditems: [],
      // 弹出框使用的数据
      book_name: '',
      chapter_name: '',
      chapter_id: '',
      dialogFormVisible: false,
      dialogTitle: '',
      feeditemsText: '',
      feeditemArray: []
    }
  },
  created () {
    this.loadCourses()
  },
  methods: {
    async loadCourses () {
      const { data } = await getCourses({
        pagenum: 1,
        pagesize: 1000
      })

      this.courseList = data.items
    },
    async loadBooks (course_id) {
      const { data } = await getBooks({
        pagenum: 1,
        pagesize: 1000,
        query: JSON.stringify({
          course_id: course_id
        })
      })

      this.bookList = data.items
    },
    async fetchData () {
      const { data } = await getList({
        pagenum: 1,
        pagesize: 100,
        query: JSON.stringify({
          course_id: this.course_id,
          book_id: this.book_id
        })
      })
      this.chapters = data.items
    },
    async loadFeedbacks (chapter_id) {
      const { data } = await getFeedbacksByChapterId(chapter_id)
      this.feeditems = data.items
    },
    handleRowClick (currentRow) {
      if (currentRow) {
        this.loadFeedbacks(currentRow.id)
      } else {
        this.feeditems = []
      }
    },
    handleDbClick (row) {
      this.dialogFormVisible = true
      // 记录书/章/章id，弹出框使用
      this.book_name = row.book_name_version
      this.chapter_name = row.text
      this.chapter_id = row.id

      this.dialogTitle = this.book_name + ' - ' + this.chapter_name
    },
    handleSure () {
      this.dialogFormVisible = false
      // 发送请求给当前章添加所有反馈条目
      // 重新加载当前章的反馈条目
      // 只是新增反馈条目，之前的反馈条目还在
    },
    handleDelete () {
    }
  }
}
</script>

<style>
.row {
  cursor: pointer;
  user-select:none;
}
</style>
