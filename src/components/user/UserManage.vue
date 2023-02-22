<template>
    <div>
        <el-table :data="dataList"
        :header-cell-style="{background:'#f2f5fc',color:'#555'}"
        border
        >
          <el-table-column prop="name" label="账号" width="140">
          </el-table-column>
          <el-table-column prop="name" label="状态" width="100">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.name === activeUser[0] ? 'primary' : 'success'"
                disable-transitions>{{(scope.row.name===activeUser[0]?'当前用户':'离线')}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="operate" label="操作">
            <template slot-scope="scope">
              <el-popover
                placement="right"
                width="400"
                height="100"
                trigger="click">
                <el-table :data="popover">
                  <el-table-column width="100"  property="name" label="账号"></el-table-column>
                  <el-table-column width="150" property="phone" label="电话"></el-table-column>
                  <el-table-column width="200" property="province" label="居住地"></el-table-column>
                  <el-table-column width="200" property="address" label="联系地址"></el-table-column>
                </el-table>
                <el-button slot="reference" @click="view(scope.row)" icon="el-icon-edit" size="large" type="text" circle>查看</el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change = "handleCurrentChange"
          :current-page="dataPage.pageNum"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="dataPage.pageSize" 
          :total="dataPage.total">
        </el-pagination> -->
    </div>
</template>
  
  <script>
  export default {
      name:"UserManage",
      data(){
        return{
            dataList:[],
            dataPage:{pageNum:1, pageSize: 10, total: 5},
            activeUser:[],
            popover:[]
        }
      },
      methods:{
        get(){
            this.$axios.get('http://127.0.0.1/user/userGet').then(res=>{
                this.dataList=res.data
            }).catch(err=>{
            console.log('获取数据失败' + err);
            })
        },
        view(row){
          this.popover.splice(0,1)
          for(let i = 0; i < this.dataList.length; i++){
            if(this.dataList[i].name==row.name){
              this.popover.push(this.dataList[i])
            }
          }
        }
      },
      //生命周期
      beforeMount(){
        this.get()
        //获得会话存储空间的当前用户信息
        this.activeUser=JSON.parse(sessionStorage.getItem('ActiveUser'))
        this.activeUser=Object.values(this.activeUser[0])
      }
  }
  </script>
  
  <style>
  
  </style>