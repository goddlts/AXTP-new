/* eslint-disable require-atomic-updates */
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
          @row-dblclick="handleFeedbackDbClick"
        >
          <el-table-column
            prop="feedback_item"
            label="反馈条目"
          >
            <template slot-scope="scope">
              <span v-if="!scope.row.isEdit">
                {{ scope.row.feedback_item }}
              </span>
              <el-input
                v-else
                :ref="'myInput' + scope.row.id"
                v-model="form.text"
                @blur="handleBlur(scope.row)"
                @keyup.esc.native="handleKeyupESC(scope.row)"
                @keyup.enter.native="handleKeyupEnter(scope.row)"
              />
            </template>
          </el-table-column>
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
            v-model="text"
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
import { getList, getFeedbacksByChapterId, addFeedbackItems, removeFeedback, editFeedback } from '@/api/chapter'

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
      feeditemArray: [],
      // 绑定文本框的值
      text: '',
      // 表单
      form: {
        text: ''
      }
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
      this.feeditems.forEach(item => {
        this.$set(item, 'isEdit', false)
      })
    },
    handleRowClick (currentRow) {
      if (currentRow) {
        this.loadFeedbacks(currentRow.id)
      } else {
        this.feeditems = []
      }
    },
    // 双击行，弹出添加对话框
    handleDbClick (row) {
      this.dialogFormVisible = true
      // 记录书/章/章id，弹出框使用
      this.book_name = row.book_name_version
      this.chapter_name = row.text
      this.chapter_id = row.id
      this.dialogTitle = this.book_name + ' - ' + this.chapter_name
    },
    async handleSure () {
      this.dialogFormVisible = false
      // 发送请求给当前章添加所有反馈条目
      // 重新加载当前章的反馈条目
      // 只是新增反馈条目，之前的反馈条目还在
      this.form.text = this.text.split('\n').filter(item => item && item.trim())
      await addFeedbackItems(this.chapter_id, this.form)

      this.loadFeedbacks(this.chapter_id)
      this.$message({
        type: 'success',
        message: '操作成功'
      })
      this.dialogFormVisible = false
    },
    // 删除反馈条目
    async handleDelete (id) {
      await this.$confirm('此操作将永久删除该反馈条目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await removeFeedback(id)
      this.$message({
        type: 'success',
        message: '删除成功'
      })
      this.loadFeedbacks(this.chapter_id)
    },
    // 双击反馈项列表，弹出修改对话框
    handleFeedbackDbClick (currentRow) {
      currentRow.isEdit = !currentRow.isEdit
      // 记录当前的反馈项
      this.form.id = currentRow.id
      this.form.text = currentRow.feedback_item

      this.$nextTick(() => {
        const id = 'myInput' + this.form.id
        this.$refs[id].focus()
      })
    },
    // 文本框失去焦点
    handleBlur (row) {
      row.isEdit = false
    },
    handleKeyupESC (row) {
      row.isEdit = false
    },
    async handleKeyupEnter (row) {
      // console.log(row)
      if (row.feedback_item.length === 0) {
        return this.$message({
          type: 'warning',
          message: '请输入反馈条目内容'
        })
      }

      await editFeedback(this.form.id, this.form)
      // eslint-disable-next-line require-atomic-updates
      row.isEdit = false
      // eslint-disable-next-line require-atomic-updates
      row.feedback_item = this.form.text

      this.$message({
        type: 'success',
        message: '操作成功'
      })
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
