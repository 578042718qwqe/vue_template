

<template>
  <div class="app-container calendar-list-container">
    
    <button @click="func1()">click1</button>
    <el-table :data="list" border v-loading="listLoading">
        <el-table-column align="center" label="id" >
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="code" >
          <template slot-scope="scope">
            <span>{{scope.row.code}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="图片" >
          <template slot-scope="scope">
            <span><img :src="scope.row.img" width="20" height="20"/></span>
          </template>
        </el-table-column>

    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination background @size-change="handleCurrentChange" @current-change="handleCurrentChange" :current-page.sync="page"
        :page-sizes="[10,20,30, 50]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
  


</template>

<script>
  

import {fetchList} from '@/api/test2'



  export default {

    data() {
      return {
        list: null,
        listLoading: false,
        page: 1,
        limit: 10,
        total: 1110,
        m1: 1
      }
    },
    methods : {
      func1() {
        console.log(1111)
        this.listLoading = true
        var out = fetchList()
        out.then(res => {
          this.listLoading = false
          console.log(res.data)

          // var data1 = eval('(' + res.data + ')')
          var data1 = res.data
          this.list = data1.rows
          console.log(data1)
        })
        // console.log(out)


      },
      handleCurrentChange() {
        this.func1()
        console.log(1123)
      }
    },
    computed: {
      test1() {
        console.log('test1')
      }
    }
  }
</script>




























