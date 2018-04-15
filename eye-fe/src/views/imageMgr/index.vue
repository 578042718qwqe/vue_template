<template>
  <div class="app-container calendar-list-container">

    <el-button @click="query()">查询</el-button>
    <el-table :data="list" border v-loading="listLoading">
        <el-table-column align="center" label="图片" >
          <template slot-scope="scope">
            <!-- <span><img :src="scope.row.fileName" width="20" height="20"/></span> -->
            <span>{{scope.row.fileName}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" >
          <template slot-scope="scope">
            <span>
              <el-button @click="showImg(scope.row)">查看</el-button>
            </span>
          </template>
        </el-table-column>

    </el-table>

    <el-dialog title="影像查看" :visible.sync="imgDlgShow" width="60%">
      <div>
        <img :src="src"/>
      
      </div>   
    </el-dialog>




  </div>
</template>

<script>

import {fetchList} from '@/api/imageMgr'

  export default {
    data() {
      return {
        listLoading: false,
        list: null,
        imgDlgShow: false ,
        src: 'https://www.baidu.com/img/bd_logo1.png'
      }
    },
    methods: {
      query() {
        var out = fetchList()  
        out.then(res => {
          var data1 = res.data
          this.list = data1.rows
        })
      },
      showImg(row) {
        
        this.imgDlgShow = true
        this.src = 'http://localhost:8080/admin/mgr/getImage?fileName=' + row.fileName
        
      }
    }
  }
</script>


<style lang="scss">

</style>








