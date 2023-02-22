<template>
    <div class="english">
      <div class="container1">
        <div class="left2">
          <left/>
        </div> 
        <div class="right2">
          <div class="top3">
            <top3/>
          </div>
          <div class="main3">
            
            <!--  主体部分开始 -->
  
            <div class="bread4">
              <el-breadcrumb separator="&gt;">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><a href="/">英文单词管理</a></el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <div class="main4">
  
              <div class="box-search">
                <div class="input5">
                  <el-input type="text" size="mini" v-model="searchInfo.searchKey" @keydown.native.enter="getEnglishList" @clear="getEnglishList" placeholder="英文/中文"></el-input>
                </div>
                <div class="button5">
                  <el-button @click="getEnglishList()" size="mini" type="primary" icon="el-icon-search">搜索</el-button>
                  <el-button @click="clkBtnAdd()" size="mini" type="warning" icon="el-icon-plus">新增</el-button>
                </div>
              </div>
  
              <div class="box-table5">
                <el-table :border="true" :data="englishPage.list" style="width: 100%"
                :header-cell-style="{'background-color':'#999','color':'#fff'}">
                  <el-table-column  type="index" label="序号" width="80">
                  </el-table-column>
                  <el-table-column  prop="world" label="英文单词" width="180">
                  </el-table-column>
                  <el-table-column  prop="chinese" label="中文解释" width="180">
                  </el-table-column>
                  <el-table-column label="操作" width="180">
                      <template slot-scope="scope">
                        <el-button type="warning" size="mini" @click="editInfo(scope.row)">修改</el-button>
                        <el-button type="primary" size="mini" @click="clkBtnDelete(scope.row)">删除</el-button>
                      </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="box-page5">
                <el-pagination
                        layout="prev, pager, next" @current-change = "chgPageNum"
                        :page-size="englishPage.pageSize" :total="englishPage.total">
                </el-pagination>
              </div>
  
              <el-dialog title="保存信息" :visible.sync="showAddEnglish">
                <el-form :model="english" label-width="120px">
                  <el-form-item label="英文单词">
                    <el-input v-model="english.world" size="mini" placeholder="请输入英文单词"></el-input>
                  </el-form-item>
                  <el-form-item label="中文解释">
                    <el-input v-model="english.chinese" size="mini" placeholder="请输入中文解释"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer">
                  <el-button type="primary" size="mini" @click="clkBtnSave">保存</el-button>
                  <el-button type="warning" size="mini" @click="showAddEnglish = false">取消</el-button>
                </span>
              </el-dialog>
  
            </div>
  
            <!--  主体部分结束 -->
  
          </div>
        </div>
  
      </div>
    </div>
  </template>
  
  <script>
  import Axios from 'axios';
  
  export default {
    name: 'english',
    data(){
      return {
        // page1: {pageSize: 5, total: 0, list: [] },
        showAddEnglish:false,
        english:{},
        englishPage:{pageNum:1, pageSize: 2, total: 0, list:[]},
        searchInfo:{searchKey:''}
      }
    },
    // vue 生命周期 
    mounted(){
      this.initData();
    },
    methods:{
      initData(){
        this.getEnglishList();
      },
      clkBtnAdd() {
        this.english = {noid:null};
        this.showAddEnglish = true;
      },
      clk1(){
        // Axios.post('/test3').then( (d1r)=>{
        //   this.page1  =  d1r.data;
        // } )
      },
      chgPageNum(pageNum) {
        this.englishPage.pageNum = pageNum;
        this.getEnglishList();
        
      },
      editInfo(row){
        this.showAddEnglish = true;
        this.english = JSON.parse(JSON.stringify(row));
      },
      getEnglishList() {
        Axios.post("/getEnglishList", {
          params:{
            info:{pageNum: this.englishPage.pageNum, pageSize: this.englishPage.pageSize, searchKey: this.searchInfo.searchKey}
          }
        }).then((res) => {
          this.englishPage = res.data;
        })
      },
      clkBtnSave() {
        Axios.post("/addEnglish", {
          params:{
            english:this.english
          }
        }).then((res) => {
          if (res.data == 0) {
            this.getEnglishList();
            this.showAddEnglish = false;
          }
        })
      },
      clkBtnDelete(row) {
        this.$confirm("您确信要删除吗？", "提示").then(() => {
          Axios.post("/deleteEnglish", {
            params:{
              english:row
            }
          }).then((res) => {
            if (res.data == 0) {
              this.getEnglishList();
              this.$message("删除成功~")
            }
          })
        }).catch(() => {
          this.$message("取消删除")
        })
  
      }
    }
  
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .english{
    height: 100%;
  }
  .container1{
    height: 100%;
    display: flex;
  }
  
  .container1 .left2{
    width: 210px;
    height: 100%;
    background-color: #304156;
  }
  
  .container1 .right2{
    flex: 1;
    display: flex;
    flex-flow: column;
  
  }
  .container1 .right2 .top3{
    height: 40px;
    background-color: #e3e3e3;
  }
  .container1 .right2 .main3{
    flex: 1;
  }
  
  .main4{
    padding-left:20px;
    padding-right:20px;
  
  }
  
  .main4 .box-search{
    display: flex;
    padding-top:10px;
    padding-bottom:10px;
    
  }
  .box-search .input5{
    padding-right:10px;  
  }
  
  
  .bread4{
    padding-top:10px;
    padding-bottom: 10px;
    padding-left: 20px;
    background-color: #eceeef;
  }
  
  
  </style>
  
  