<template>
  <div>
    <div style="margin:5px">
      <el-input v-model="searchInfo.searchKey" @keyup.enter.native="searchName" placeholder="请输入姓名" suffix-icon="el-icon-search" style="width:200px"></el-input>
      <el-select v-model="searchInfo.isMale" placeholder="请选择性别" style="margin-left:5px">
        <el-option v-for="item in sexs" :key="item.value" :label="item.label" :value="item.value">
          
        </el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click.native="searchName" style="margin-left:5px">查询</el-button>
      <el-button type="success" icon="el-icon-refresh-right" @click.native="resetParams">重置</el-button>
      <el-button type="warning" icon="el-icon-plus" @click.native="addData">新增</el-button>
    </div>
  <el-table :data="dataPage.list"
  :header-cell-style="{background:'#f2f5fc',color:'#555'}"
  border
  >
        <el-table-column prop="id" label="ID" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="140">
        </el-table-column>
        <el-table-column prop="nickName" label="昵称" width="100">
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="60">
        </el-table-column>
        <el-table-column prop="isMale" label="性别" width="60">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.isMale == true ? 'primary' : 'success'"
              disable-transitions>{{(scope.row.isMale==true?'男':'女')}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="电话" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
        <el-table-column prop="operate" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" size="small" type="success">编辑</el-button>
            <el-button @click="handleDelete(scope.row)" size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
    </el-table>
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change = "handleCurrentChange"
      :current-page="dataPage.pageNum"
      :page-sizes="[2, 5, 10, 20]"
      :page-size="dataPage.pageSize" 
      :total="dataPage.total">
    </el-pagination>
    <el-dialog
      title="添加用户信息"
      :visible.sync="centerDialogVisible"
      width="25%"
      center>
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="ID" prop="id">
          <el-col :span="20">
            <el-input v-model="form.id"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="名字" prop="name">
          <el-col :span="20">
            <el-input v-model="form.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-col :span="20">
            <el-input v-model="form.nickName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-col :span="20">
            <el-input v-model="form.age"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.isMale">
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-col :span="20">
            <el-input v-model="form.phone"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-col :span="20">
            <el-input v-model="form.address "></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="saveData">保 存</el-button>
      </span>
    </el-dialog> 
  </div>
</template>

<script>

export default {
    name:'Main',
    data() {
      return {
        dataList:[],
        isEdit:false,
        dataPage:{pageNum:1, pageSize: 10, total: 5, list:[]},
        searchInfo:{isMale:'',searchKey:''},
        centerDialogVisible:false,
        form:{
          id:'',
          name:'',
          nickName:'',
          phone:'',
          age:'',
          address:'',
          isMale:''
        },
        rules: {
          id: [
            { required: true, message: '请输入ID', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '请输入名字', trigger: 'blur' },
            { min: 2, max: 8, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          nickName: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
          ],
          age: [
            { required: true, message: '请输入年龄', trigger: 'blur' },
            { min: 1, max: 3, message: '长度在 1 到 3 个字符', trigger: 'blur' },
            {pattern:/^([1-9][0-9]*){1,3}$/,message:'年龄必须为正整数字',trigger:'blur'},
          ],
          phone: [
            { required: true, message: '手机号不能为空', trigger: 'blur' },
            { pattern:/^1[3|4|5|6|7|8|9][0-9]\d{8}$/,message:'请输入正确的手机号码',trigger:'blur' }
          ],
          address: [
            { required: true, message: '请输入地址', trigger: 'blur' },
          ],
        },
        sexs:[{
                value: '1',
                label: '男'
              }, {
                value: '0',
                label: '女'
              },
        ],
      }
    },
    methods:{
      //添加
      addData(){
        this.centerDialogVisible=true
        //resetForm 重置表单
        this.form={}
        
      },
      //保存
      saveData(){
        this.$axios.post("/api/handleSave",{
            editData:{form:this.form,isEdit:this.isEdit}
          }).then(res=>{
            if(res.data==0){
              this.postMockList()
              this.$message.success('操作成功')
              this.centerDialogVisible=false
              this.isEdit=false
              //重置表单
              // this.form={}
              // Object.keys(this.form).forEach(key => (this.form[key] = ''));
            }
          })
      },
      //删除
      handleDelete(row){
          this.$confirm("您确信要删除吗？", "提示").then(()=>{
            this.$axios.post("/api/handleDelete",{
            data:{row}
          }).then(res=>{
            if(res.data==0)
            this.postMockList()
            this.$message.success('删除成功')
          })
        }).catch(()=>{
          this.$message('取消删除')
        })
      },
      //编辑
      handleEdit(row){
        this.isEdit=true
        this.centerDialogVisible=true,
        this.form=row
        //将isMale转换成字符串数值
        this.form.isMale=Number(this.form.isMale) + ''
      },
      handleSizeChange(pageSize) {
        // this.dataPage.pageNum=1
        this.dataPage.pageSize=pageSize
        this.postMockList()
      },

      //更改当前页
      handleCurrentChange(pageNum) {
        this.dataPage.pageNum=pageNum
        this.postMockList()
      },
      //查询
      searchName(){
        this.postMockList()
        this.searchInfo.searchKey='',
        this.searchInfo.isMale=''
      },
      //初始化获得数据
      getMockList(){
        // this.$axios.get('/api/messages').then(res=>{
        //   let resData=res.data
        //   if(resData.code==200)
        //   this.dataPage.list=resData.data
        //   this.dataList=resData.data
        //   console.log('初始化获得数据',resData);
        // })
        this.$axios.get('http://127.0.0.1/list/all').then(res=>{
          this.dataPage.list=res.data
        }).catch(err=>{
          console.log('获取数据失败' + err);
        })
      },
      //重置
      resetParams(){
        this.searchInfo.searchKey='',
        this.searchInfo.isMale='',
        this.postMockList()
      },
      //更新页面
      postMockList(){
        this.$axios.post("/api/messagesPage",{
          params:{
            info:{
              dataList:this.dataList,
              pageNum: this.dataPage.pageNum,
              pageSize: this.dataPage.pageSize,
              searchKey: this.searchInfo.searchKey,
              isMale:this.searchInfo.isMale,
              form:this.form
            }
          },
          
        }).then(res=>{
          this.dataPage.pageSize=res.data.pageSize
          this.dataPage.pageNum=res.data.pageNum
          this.dataPage.total=res.data.total
          this.dataPage.list=res.data.list
        })
      }
    },
    //生命周期：挂载前
    beforeMount(){
      this.getMockList()
      // setTimeout(()=>{
      //   this.postMockList()
      // },100)
      
    }
}
</script>

<style>

</style>