<template>
<transition name="el-fade-in">
    <l-layout class="l-tab-page" v-show="!lr_loadPage" >
        <l-panel >
            <template #toolLeft >
                <div class="l-panel--item" >
                    <el-input placeholder="请输入账号/名称"  @keyup.enter.native="hanleSearch" v-model="searchWord" size="mini" >
                        <el-button @click="hanleSearch" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>
            </template>
            <template #toolRight >
                <el-button-group>
                    <el-button size="mini" icon="el-icon-refresh-left" @click="handleRefresh" ></el-button>
                </el-button-group>
                <el-button-group>
                    <el-button type="primary" size="mini" icon="el-icon-plus"
                        @click="handleAdd()"
                    >新增</el-button>
                </el-button-group>
            </template>
            <l-table 
              :columns="columns" 
              :loading="tableLoading"
              :dataSource="tableData" 
              row-key="f_UserId"
              :isPage="true"
              :pageTotal="tableTotal"

              @loadPageData="turnTablePage" >
                <el-table-column  label="操作" fixed="right" width="160" >
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="text"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="text"
                        @click="handleReset(scope.$index, scope.row)">重置密码</el-button>
                        <el-button
                        size="mini"
                        type="text"
                        style="color: #f56c6c;"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        
                    </template>
                </el-table-column>
            </l-table>
        </l-panel>

        <l-drawer 
            :title="formTitle"
            :visible.sync="formVisible"
            @ok="handleSave"
            @close="handleCloseForm"
            @opened="handleOpenedForm"
            >
            <user-form ref="form" ></user-form>       
        </l-drawer>
    </l-layout>
</transition>
</template>
<script>
import { getPage,addObj,updateObj,delObj,resetPassword } from '@/api/user'
import userForm from './form'
import md5 from 'js-md5';
export default {
    name:'user-index',
    inject: ["index"],
    components: {
        userForm
    },
    props: {
    },
    data () {
        return {
            //查询
            searchWord:'',
            
            columns: [
              {label:'账号',prop:'f_Account',width:'200'},
              {label:'姓名',prop:'f_RealName',minWidth:'150'}
            ],
            tableLoading:false,
            tableData:[],
            tableTotal:0,
            tablePageSize:50,
            tableCurrentPage:1,

            formVisible:false,
            formTitle:'',
            formEditRow:null,
            formEdit:false
        };
    },
    created () {
        this.loadTablePageData();
    },
    mounted () {
    },
    computed:{
    },
    methods:{        
        handleRefresh(){
            this.index.reload();
        },

        loadTablePageData(){
          this.tableLoading = true;
          let queryData = {
              rows:this.tablePageSize,
              page:this.tableCurrentPage,
              sidx:'F_CreateDate DESC',
              keyword:this.searchWord
          }
          getPage(queryData).then(res=>{
              const data = this.$deepClone(res.data.data);
              this.tableData = data.rows;
              this.tableTotal = data.records;

              this.tableLoading = false;

          }).catch(()=>{
              this.tableData = [];
              this.tableLoading = false;
          });
        },
        turnTablePage({rows,page}){
            this.tablePageSize = rows;
            this.tableCurrentPage = page;
            this.loadTablePageData();
        },
        hanleSearch(){
            this.loadTablePageData();
        },
        handleAdd(){
            this.formEdit = false;
            this.showForm('新增用户');
        },
        handleEdit($index,row){
            this.formEdit = true;
            this.formEditRow = row;
            this.showForm('编辑用户');
        },
        handleDelete($index,row){
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText:'取消',
                type: 'warning'
            }).then(() => {
                delObj(row.f_UserId).then(()=> {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.loadTablePageData();
                }).catch(() => {});
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        handleReset($index,row){
            this.$confirm('是否确认要【重置密码】?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText:'取消',
                type: 'warning'
            }).then(() => {
                resetPassword(row.f_UserId).then(()=> {
                    this.$message({
                        type: 'success',
                        message: '重置成功!'
                    });
                }).catch(() => {});
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消重置'
                });          
            });
        },
        handleSave(showLoading,hideLoading){
            this.$refs.form.validateForm(()=>{
                showLoading();
                const formData = this.$refs.form.getForm();
                if(this.formEdit){// 修改数据
                    updateObj(formData.f_UserId,formData).then(()=> {
                        hideLoading();
                        this.formVisible = false;
                        this.$message({
                            type: 'success',
                            message: '更新成功!'
                        });
                        this.loadTablePageData();
                    }).catch(() => {
                        hideLoading();
                    })
                }
                else{// 新增数据
                    formData.f_Password = md5(formData.f_Password);
                    addObj(formData).then(()=> {
                        hideLoading();
                        this.formVisible = false;
                        this.$message({
                            type: 'success',
                            message: '添加成功!'
                        });
                        this.loadTablePageData();
                    }).catch(() => {
                        hideLoading();
                    })
                }
            });
        },
        handleOpenedForm(){
          if(this.formEdit){// 修改数据
            this.formEditRow.f_Password = '******';
            this.$refs.form.setForm(this.formEditRow);
          }
        },
        handleCloseForm(){
            this.$refs.form.resetForm();
        },
        showForm(text){
            this.formTitle = text;
            this.formVisible = true;
        }
    }

}
</script>