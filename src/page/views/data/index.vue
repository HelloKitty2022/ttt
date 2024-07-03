<template>
<transition name="el-fade-in">
    <l-layout class="l-tab-page" v-show="!lr_loadPage" >
        <template #left>
            <l-panel style="padding-right:0;" >
                <template #title>
                    数据库
                    <div class="tree-setting-btn" >
                        <el-tooltip effect="dark" content="数据库管理" placement="top">
                            <i @click="handleSettingClick" class="el-icon-setting" ></i>
                        </el-tooltip>
                    </div>
                </template>
                <div class="l-rblock" style="padding-bottom:32px" >
                    <div class="l-rblock" style="overflow: hidden auto;" >
                        <el-tree v-loading="treeLoading" :data="treeShowData" :default-expand-all="true" :expand-on-click-node="false"  @node-click="handleNodeClick">
                            <span class="lr-tree-node"  slot-scope="{ node,data }">
                                <i v-if="data.icon" :class="data.icon"></i>
                                {{ node.label }}
                            </span>
                        </el-tree>  
                    </div>
                    <div class="l-bottom" >
                        <el-input placeholder="请输入名称"  @keyup.enter.native="hanleSearchDb" v-model="searchDbWord" size="mini" >
                            <el-button @click="hanleSearchDb" slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </div>
                </div>
            </l-panel>
        </template>
        <l-panel style="padding-left:0;" >
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
                <template v-slot:f_CreateDate="scope" >
                    {{$formatDate(scope.row.f_CreateDate,'yyyy-MM-dd hh:mm:ss')}}
                </template>
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
            title="数据库管理"
            :visible.sync="dbVisible"
            :showOk="false"
            size="800px"
            >
            <db-index  :refreshData="refreshDb"></db-index>
        </l-drawer>
        <l-drawer 
            :title="formTitle"
            :visible.sync="formVisible"
            @ok="handleSave"
            @close="handleCloseForm"
            @opened="handleOpenedForm"
            >
            <dbsource-form ref="form" :dbTree="toDbTree(treeData)" ></dbsource-form>       
        </l-drawer>
    </l-layout>
</transition>
</template>
<script>

import { getDbList } from '@/api/dblink'
import { getDbsourceList,addDbsource,updateDbsource,deleteDbsource,getDbsource } from '@/api/datasource'
import dbIndex from './dbIndex'
import dbsourceForm from './form'
export default {
    name:'data-index',
    inject: ["index"],
    components: {
        dbIndex,
        dbsourceForm
    },
    props: {
    },
    data () {
        return {
            //查询
            searchWord:'',
            searchTableData:null,

            treeLoading:false,
            treeData:[],
            treeShowData:[],
            searchDbWord:'',
            dbVisible:false,


            dbCode:'',


            tableLoading:false,
            columns: [
                {label:'编码',prop:'f_Code',minWidth:'150'},
                {label:'名称',prop:'f_Name',minWidth:'150'},
                {label:'数据库',prop:'f_DbId',width:'200'},
                {label:'创建用户',prop:'f_CreateUserName',width:'100'},
                {label:'创建时间',prop:'f_CreateDate',width:'150'}
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
        this.loadDb();
        this.refreshTable();
    },
    mounted () {
    },
    computed:{
    },
    methods:{
        refreshDb(data){
            this.searchDbWord = '';
            this.treeData = data;
            this.treeShowData = this.toDbTree(this.treeData);
        },
        toDbTree(dbList){
            let list = dbList;
            let res = [];
            let map = {};
            list.forEach(item =>{
                let point = {};
                if(!map[item.f_ServerAddress]){
                    point.id = item.f_ServerAddress;
                    point.label = item.f_ServerAddress;

                    map[item.f_ServerAddress] = [];
                    point.children = map[item.f_ServerAddress];
                    res.push(point);
                }

                let cpoint = {
                    id:item.f_DBName,
                    label:'('+ item.f_DBName +')'+item.f_DBAlias,
                    icon:'el-icon-coin'
                };

                map[item.f_ServerAddress].push(cpoint);
            })
            return res;
        },
        loadDb(){
            this.treeLoading = true;
            getDbList().then(res =>{
                this.treeData = res.data.data;
                this.treeShowData = this.toDbTree(this.treeData);
                this.treeLoading = false;
            }).catch(()=>{
                this.treeData = [];
                this.treeShowData = [];
                this.treeLoading = false;
            })
        },
        hanleSearchDb(){
            if(this.searchDbWord){
                this.treeShowData = this.toDbTree(this.treeData.filter(item => item.f_DBName.indexOf(this.searchDbWord) >-1 || item.f_DBAlias.indexOf(this.searchDbWord) >-1));
            }
            else{
                this.treeShowData = this.toDbTree(this.treeData);
            }
        },
        handleSettingClick(){
            this.dbVisible = true;
        },
        
        handleRefresh(){
            this.index.reload();
        },
        handleNodeClick(data) {            
            this.dbCode = data.id;
            this.tableShowData = this.tableData.filter(t=>t.f_DbId == this.dbCode);
        },
        refreshTable(){
            this.searchWord = '';
            this.tableLoading = true;
            getDbsourceList().then(res=>{
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
        handleAdd(){
            this.formEdit = false;
            this.showForm('新增数据源');
        },
        handleEdit($index,row){
            this.formEdit = true;
            this.formEditRow = row;
            this.showForm('编辑数据源');
        },
        handleDelete($index,row){
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText:'取消',
                type: 'warning'
            }).then(() => {
                deleteDbsource(row.f_Id).then(()=> {
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
                    updateDbsource({id:formData.f_Id,formData:formData}).then(()=> {
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
                    addDbsource(formData).then(()=> {
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
                getDbsource(this.formEditRow.f_Code).then((res)=> {
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
<style lang="scss">
.l-bottom{
    position: absolute;
    height: 32px;
    width: 100%;
    bottom: 0;
    left: 0;
    padding: 0px 4px;
    box-sizing: border-box;
}
</style>