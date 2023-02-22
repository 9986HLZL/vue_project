<template>
  <div>
    <div style="margin:5px">
      <el-button type="primary" icon="el-icon-plus" @click.native="addData">添加</el-button>
    </div>
    <el-table :data="tasklist"
    :header-cell-style="{background:'#f2f5fc',color:'#555'}"
    border
    >
      <el-table-column prop="任务编号" label="任务编号" width="180">
      </el-table-column>
      <el-table-column prop="任务名称" label="任务名称" width="140">
      </el-table-column>
      <el-table-column prop="任务描述" label="任务描述" width="100">
      </el-table-column>
      <el-table-column prop="执行人" label="执行人" width="60">
      </el-table-column>
      <el-table-column prop="任务状态" label="任务状态" width="120">
      </el-table-column>
      <el-table-column prop="operate" label="操作" width="300">
        <template slot-scope="scope">
          <el-button style="margin-right:5px" icon="el-icon-edit" @click="handleEdit(scope.row)" size="small" type="text">编辑</el-button>
          <el-button icon="el-icon-delete" @click="handleDelete(scope.row)" size="small" type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="任务"
      :visible.sync="centerDialogVisible"
      width="25%"
      center>
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="任务编号" prop="任务编号">
          <el-col :span="20">
            <el-input v-model="form.任务编号"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="任务名称" prop="任务名称">
          <el-col :span="20">
            <el-input v-model="form.任务名称"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="任务描述" prop="任务描述">
          <el-col :span="20">
            <el-input v-model="form.任务描述"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="执行人" prop="执行人">
          <el-col :span="20">
            <el-input v-model="form.执行人"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="任务状态" prop="任务状态">
          <el-col :span="20">
            <el-select v-model="form.任务状态">
              <el-option label="未执行" value="未执行"></el-option>
              <el-option label="进行中" value="进行中"></el-option>
              <el-option label="待验收" value="待验收"></el-option>
              <el-option label="已验收" value="已验收"></el-option>
            </el-select>
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
      name:'TaskList',
      data(){
        return{
          tasklist:[],
          isEdit:false,
          centerDialogVisible:false,
          form:{
            任务编号:'',
            任务名称:'',
            任务描述:'',
            执行人:'',
            任务状态:''
          },
          rules: {
            任务编号: [
              { required: true, message: '任务编号不能为空', trigger: 'blur' },
            ],
            任务名称: [
              { required: true, message: '任务名称不能为空', trigger: 'blur' },
            ],
            任务描述: [
              { required: true, message: '任务描述不能为空', trigger: 'blur' },
            ],
            执行人: [
              { required: true, message: '请输入执行人', trigger: 'blur' },
            ],
            任务状态: [
              { required: true, message: '任务状态不能为空', trigger: 'blur' },
            ],
          },
        }
      },
      methods:{
        //添加
        addData(){
          this.centerDialogVisible=true
          //resetForm 重置表单
          this.form={}
        },
        //获得tasklist表的数据
        get(){
          this.$axios.get('http://127.0.0.1/tasklist/get').then(res=>{
            this.tasklist=res.data
          }).catch(err=>{
          console.log('获取数据失败' + err);
          })
        },
        // 编辑
        handleEdit(row){
          this.isEdit=true
          this.centerDialogVisible=true,
          this.form=row
        },
        handleDelete(row){
          this.$confirm("您确信要删除吗？", "提示").then(()=>{
            this.$axios.get("http://127.0.0.1/tasklist/del",{params:{任务编号:row.任务编号}}).then(res=>{
            if(res.data.status==200){
              this.$message.success('删除成功')
              this.get()
              // this.postMockList()
            }
          })
        }).catch(()=>{
          this.$message('取消删除')
        })
        },
        // 保存
        saveData(){
          this.$axios.get(this.isEdit?"http://127.0.0.1/tasklist/update":"http://127.0.0.1/tasklist/add",{
            params:{form:this.form}
          }).then(res=>{
            if(res.data.status==200){
              this.get()
              // this.postMockList()
              this.$message.success('操作成功')
              this.centerDialogVisible=false
              this.isEdit=false
              //重置表单
              // this.form={}
              // Object.keys(this.form).forEach(key => (this.form[key] = ''));
            }
          })
        }
      },
      beforeMount(){
        //调用get
        this.get()
      }
    }
</script>
<style>

</style>