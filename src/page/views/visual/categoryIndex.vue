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
            row-key="f_Id"
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
        :height="200"
        width="480px"
        @close="handleCloseForm"
        @ok="handleSave"
        @opened="handleOpenedForm"
        >
        <div class="l-from-body" > 
            <el-form :model="formData" size="mini" :rules="rules"  ref="form" label-width="60px"  >
                <el-form-item label="名称" prop="f_Key">
                    <el-input v-model="formData.f_Key"></el-input>
                </el-form-item>
                <el-form-item label="值" prop="f_Value">
                    <el-input v-model="formData.f_Value"></el-input>
                </el-form-item>
            </el-form>
        </div>
    </l-dialog>

</l-layout>
</template>

<script>

import { getList,addObj,updateObj,delObj } from '@/api/category'
export default {
  name:'category-index',
  props: {
    refreshData:Function
  },
  data () {
    return {
        searchWord:'',

        columns: [
            {label:'名称',prop:'f_Key',minWidth:'100'},
            {label:'值',prop:'f_Value',minWidth:'100'}
        ],
        tableLoading:false,
        tableData: [],
        tableShowData:[],

        formTitle:'',
        formVisible:false,
        formEditRow:null,
        formEdit:false,

        formData:{
            f_Key: null,
            f_Value: null
        },
        rules: {
            f_Key: [
                { required: true, message: '请输入名称' },
            ],
            f_Value: [
                { required: true, message: '请输入值' }
            ]
        }
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
            this.tableShowData = this.tableData.filter(item => item.f_Key.indexOf(this.searchWord) >-1);;
        }
        else{
            this.tableShowData = this.tableData;
        }
    },

    tableDataInit(){
        this.tableLoading = true;
        getList().then(res =>{
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
        this.formData = {
            f_Key: null,
            f_Value: null
        };
        this.showForm('新增分类');
    },
    handleEdit($index,row){  
        this.formEdit = true;
        this.formEditRow = this.$deepClone(row);
        this.showForm('编辑分类');
    },
    handleDelete($index,row){
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            delObj(row.f_Id).then(()=> {
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
                    updateObj(formData.f_Id,formData).then(()=> {
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
                    addObj(formData).then(()=> {
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
    }
  }

}
</script>