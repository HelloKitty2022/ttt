<template>
<transition name="el-fade-in">
    <l-layout class="l-tab-page" v-show="!lr_loadPage" >
        <l-panel >
            <template #toolLeft >
                <div class="l-panel--item" >
                    <el-input placeholder="请输入编码/名称"  @keyup.enter.native="hanleSearch" v-model="searchWord" size="mini" >
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
            <l-table :columns="columns" :dataSource="tableShowData" :loading="tableLoading" >
                <el-table-column  label="操作" fixed="right" width="90" >
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="text"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
            <map-form ref="form" ></map-form>       
        </l-drawer>
    </l-layout>
</transition>
</template>
<script>

import { getList,getObj,addObj,updateObj,delObj } from '@/api/map'
import mapForm from './form'
export default {
    name:'map-index',
    inject: ["index"],
    components: {
        mapForm
    },
    props: {
    },
    data () {
        return {
            //查询
            searchWord:'',
            tableLoading:false,
            columns: [
                {label:'地图名称',prop:'f_Name',minWidth:'150'},
            ],
            tableData:[],
            tableShowData:[],

           

            formVisible:false,
            formTitle:'',
            formEditRow:null,
            formEdit:false
        };
    },
    created () {
        this.refreshTable();
    },
    mounted () {
    },
    computed:{
    },
    methods:{        
        handleRefresh(){
            this.index.reload();
        },
        refreshTable(){
            this.searchWord = '';
            this.tableLoading = true;
            getList().then(res=>{
                this.tableData = res.data.data;
                this.tableShowData = this.tableData;
                this.tableLoading = false;
            }).catch(()=>{
                this.tableLoading = false;
            });
        },
        hanleSearch(){
            if(this.searchWord){
                this.tableShowData = this.tableData.filter(item => item.f_Code.indexOf(this.searchWord) >-1 || item.f_Name.indexOf(this.searchWord)>-1);
            }
            else{
                this.tableShowData = this.tableData;
            }
        },
        handleEnableChange(row){
            updateDataItemDetail(row.f_ItemDetailId,this.$deepClone(row)).then(()=> {
                this.$message({
                    type: 'success',
                    message: '更新成功!'
                });
            }).catch(() => {
            })
        },
        handleAdd(){
            this.formEdit = false;
            this.showForm('新增地图数据');
        },
        handleEdit($index,row){
            this.formEdit = true;
            this.formEditRow = row;
            this.showForm('编辑地图数据');
        },
        handleDelete($index,row){
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText:'取消',
                type: 'warning'
            }).then(() => {
                delObj(row.f_Id).then(()=> {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.refreshTable();
                }).catch(() => {});
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        handleSave(showLoading,hideLoading){
            this.$refs.form.validateForm(()=>{
                showLoading();
                const formData = this.$refs.form.getForm();
                if(this.formEdit){// 修改数据
                    updateObj(formData.f_Id,formData).then(()=> {
                        hideLoading();
                        this.formVisible = false;
                        this.$message({
                            type: 'success',
                            message: '更新成功!'
                        });
                        this.refreshTable();
                    }).catch(() => {
                        hideLoading();
                    })
                }
                else{// 新增数据
                    addObj(formData).then(()=> {
                        hideLoading();
                        this.formVisible = false;
                        this.$message({
                            type: 'success',
                            message: '添加成功!'
                        });
                        this.refreshTable();
                    }).catch(() => {
                        hideLoading();
                    })
                }
            });
        },
        handleOpenedForm(showLoading,hideLoading){
            if(this.formEdit){
                showLoading('加载数据中...');
                getObj(this.formEditRow.f_Id).then((res)=> {
                    this.$refs.form.setForm(res.data.data);
                    hideLoading();
                }).catch(()=>{
                    this.$message({
                        type: 'warning',
                        message: '获取编辑数据失败!'
                    });
                    hideLoading();
                    this.formVisible = false;
                });   
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