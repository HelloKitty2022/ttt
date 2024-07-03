<template>
<l-layout >
    <l-panel style="padding:0;" >
        <template #toolLeft >
            <div class="l-panel--item" >
                <el-input :placeholder="'请输入名称'"  @keyup.enter.native="hanleSearch" v-model="searchWord" size="mini" >
                    <el-button @click="hanleSearch" slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
        </template>
        <template #toolRight >
            <el-button-group>
                <el-button size="mini" icon="el-icon-refresh-left" @click="handleRefresh"></el-button>
            </el-button-group>
            <el-button-group>
                <el-button type="primary" size="mini" icon="el-icon-plus"
                    @click="handleAdd()"
                >新增</el-button>
            </el-button-group>
        </template>
        <l-table 
            ref="table"
            :loading="tableLoading"
            :columns="columns" 
            :dataSource="tableShowData" 
            row-key="f_DatabaseLinkId"
            >
            <el-table-column label="操作" fixed="right" width="90" >
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="text"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-divider direction="vertical"></el-divider>
                    <el-button
                    size="mini"
                    type="text"
                    style="color: #f56c6c;"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </l-table>
    </l-panel>

    <l-dialog
        :title="formTitle"
        :visible.sync="formVisible"
        :height="360"
        width="560px"
        @close="handleCloseForm"
        @ok="handleSave"
        @opened="handleOpenedForm"
        >
        <div class="l-from-body" > 
            <el-form :model="formData" size="mini" :rules="rules"  ref="form" label-width="80px"  >
                <el-col :span="24">
                    <el-form-item label="编码" prop="f_DBName">
                        <el-input v-model="formData.f_DBName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="名称" prop="f_DBAlias">
                        <el-input v-model="formData.f_DBAlias"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="类型" prop="f_DbType">
                        <l-radio :options="options" v-model="formData.f_DbType" ></l-radio>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="连接串" prop="f_DbConnection">
                        <el-input v-model="formData.f_DbConnection">
                            <el-button slot="append" @click="handleTest" :loading="testLoading" >测试连接</el-button>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="说明" prop="f_Description">
                        <el-input type="textarea" v-model="formData.f_Description"></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
        </div>
    </l-dialog>

</l-layout>
</template>

<script>

import { getDbList,testDb,addDb,updateDb,deleteDb } from '@/api/dblink'
import { existDbFiled} from '@/api/dbTable.js'
export default {
  name:'db-index',
  props: {
    refreshData:Function
  },
  data () {
    return {
        searchWord:'',

        columns: [
            {label:'名称',prop:'f_DBAlias',minWidth:'150'},
            {label:'编码',prop:'f_DBName',minWidth:'150'},
            {label:'类型',prop:'f_DbType',width:'80',align:'center'},
            {label:'数据库地址',prop:'f_ServerAddress',width:'200'}
        ],
        tableLoading:false,
        tableData: [],
        tableShowData:[],

        formTitle:'',
        formVisible:false,
        formEditRow:null,
        formEdit:false,

        formData:{
            f_DBName:'',
            f_DBAlias:'',
            f_DbType:'MySql',
            f_DbConnection:'',
            f_Description:''
        },
        rules: {
            f_DBName: [
                { required: true, message: '请输入编码' },
                { validator: this.lr_existDbFiled,keyValue:() => { return this.formData.f_DatabaseLinkId },tableName:'lr_databaselink',keyName:'f_DatabaseLinkId',trigger: 'blur'}
            ],
            f_DBAlias: [
                { required: true, message: '请输入名称' }
            ],
            f_DbConnection: [
                { required: true, message: '请输入数据库链接串' }
            ]
        },
        options:[
            {value:'MySql',label:'MySql'},
            {value:'SqlServer',label:'SqlServer'},
            {value:'Oracle',label:'Oracle'}
        ],
        testLoading:false
    };
  },
  created () {
    this.tableDataInit();
  },
  mounted () {
  },
  computed:{
  },
  methods:{
    handleRefresh(){
        this.tableDataInit();
    },
    hanleSearch(){
        if(this.searchWord){
            this.tableShowData = this.tableData.filter(item => item.f_DBAlias.indexOf(this.searchWord) >-1 || item.f_DBName.indexOf(this.searchWord) >-1);;
        }
        else{
            this.tableShowData = this.tableData;
        }
    },

    tableDataInit(){
        this.tableLoading = true;
        getDbList().then(res =>{
            this.tableData = res.data.data;
            this.tableShowData = this.tableData;
            this.tableLoading = false;
            this.refreshData && this.refreshData(this.tableData);
        }).catch(()=>{
            this.tableData = [];
            this.tableShowData = [];
            this.tableLoading = false;
            this.refreshData && this.refreshData(this.tableData);
        })
    },

    handleAdd(){
        this.formEdit = false;
        this.showForm('新增数据库');
    },
    handleEdit($index,row){  
        this.formEdit = true;
        this.formEditRow = this.$deepClone(row);
        this.showForm('编辑数据库');
    },
    handleDelete($index,row){
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            deleteDb(row.f_DatabaseLinkId).then(()=> {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.handleRefresh();
            }).catch(() => {
            })


        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    handleSave(showLoading,hideLoading){
        this.$refs.form.validate((valid)=>{
            if(valid){
                showLoading();
                const formData = this.$deepClone(this.formData);
                if(this.formEdit){// 修改数据
                    updateDb({id:formData.f_DatabaseLinkId,formData:formData}).then(()=> {
                        hideLoading();
                        this.formVisible = false;
                        this.handleRefresh();
                        this.$message({
                            type: 'success',
                            message: '更新成功!'
                        });
                    }).catch(() => {
                        hideLoading();
                    })
                }
                else{// 新增数据
                    addDb(formData).then(()=> {
                        hideLoading();
                        this.formVisible = false;
                        this.handleRefresh();
                        this.$message({
                            type: 'success',
                            message: '新增成功!'
                        });

                    }).catch(() => {
                        hideLoading();
                    })
                }
            }
        });
    },
    handleOpenedForm(){
        if(this.formEdit){
            this.formData = this.formEditRow;
        }
    },
    handleCloseForm(){
        this.$refs.form && this.$refs.form.resetFields();
    },
    showForm(text){
        this.formTitle = text;
        this.formVisible = true;
    },
    // 表单校验
    lr_existDbFiled(rule, value, callback){
        const params = {};
        if(typeof rule.keyValue == 'function'){
            params.keyValue= rule.keyValue();
        }
        else{
            params.keyValue= this.formData[rule.keyName];
        }
        params.tableName= rule.tableName;
        params.keyName = rule.keyName;

        const fileds = {}
        fileds[rule.field] = value;
        params.filedsJson = JSON.stringify(fileds);

        
        existDbFiled(params).then(res => {
            if(res.data.code == 200){
                if(res.data.data){
                    callback();
                }
                else{
                    callback(new Error('数值重复'));
                }
            }
            else{
                callback(new Error(`检测接口异常-${res.data.info}`));
            }
            
        });
    },
    handleTest(){
        const req = {
            connection:this.formData.f_DbConnection,
            dbType:this.formData.f_DbType,
            id:this.formData.f_DatabaseLinkId
        }
        if(!req.connection){
            this.$message({
                type: 'error',
                message: '请填写连接串!'
            });
            return;
        }
        this.testLoading= true;
        testDb(req).then(res=>{
            if(res.data.data){
                this.$message({
                    type: 'success',
                    message: '测试成功!'
                });
            }
            else{
                this.$message({
                    type: 'error',
                    message: res.data.info
                });
            }
            
            this.testLoading= false;
        }).catch(()=>{
            this.testLoading= false;
        })
    }
  }

}
</script>