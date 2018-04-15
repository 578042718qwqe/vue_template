
<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="用户名" v-model="filter.userName">
      </el-input>
      <el-button class="filter-item">查询</el-button>
      <el-button @click="addOne()" class="filter-item">新增用户</el-button>
    </div>
    <div>
      <el-table :data="data.rows" v-loading="filter.loading" 
      border fit highlight-current-row style="width:100%">

        <el-table-column label="用户编码" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.user_code}}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户名称" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.user_name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户角色" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.user_role}}</span>
          </template>
        </el-table-column>
        <el-table-column label="编辑" align="center">
          <template slot-scope="scope">
            <span>
              <el-button @click="editOne(scope.row)">编辑</el-button>
              <el-button @click="deleteOne(scope.row)">删除</el-button>
              
            </span>
          </template>
        </el-table-column>
      </el-table> 

      <el-dialog :title="model.id?'新增':'编辑'" :visible.sync="editDlg.show" 
        :close-on-click-modal="false" >
        <el-form>
          <el-form-item label="用户账号" label-width="70px">
            <el-input v-model="model.user_code"></el-input>
          </el-form-item>
          <el-form-item label="用户名字" label-width="70px">
            <el-input v-model="model.user_name"></el-input>
          </el-form-item>
          <el-form-item label="密码" label-width="70px">
            <el-input type="password" v-model="model.user_pwd"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" label-width="70px">
            <el-input type="password" v-model="model.user_pwd2"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDlg.show=false">取消</el-button>
          <el-button @click="saveOne()">确定</el-button>
        </div>

      </el-dialog> 
    </div>
    
  </div>
</template>


<script>

import api from '@/api/auth/userManager'


  export default {
    data() {
      return {
        filter: {
          pageIndex: 1,
          pageSize: 10,
          loading: false,
          userName: ''
        },
        data: {
          rows: [{user_code:'code1',user_name:'name1',user_role:'1'}]
        },
        editDlg: {
          show: false
        },
        model: {
          
        }
      }
    },
    methods: {
      handleFilter() {
        
      },
      editOne(row) {
        
      },
      saveOne() {
        console.log(this.model)
        api.saveOne(this.model).then(data=>{
          console.log(data)
          // api.saveOne(data)
        })
      },
      deleteOne(row) {

      },
      addOne() {
        this.editDlg.show = true
        this.model = {}

      }
    }
  }
</script>
 
<style >

</style>





















