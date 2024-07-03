<template>
<transition name="el-fade-in">
    <l-layout class="l-tab-page" v-show="!lr_loadPage" >
        <template #left>
            <l-panel style="padding-right:0;" >
                <template #title>
                    大屏分类
                    <div class="tree-setting-btn" >
                        <el-tooltip effect="dark" content="分类管理" placement="top">
                            <i @click="handleSettingClick" class="el-icon-setting" ></i>
                        </el-tooltip>
                    </div>
                </template>
                <div class="l-rblock" style="padding-bottom:32px" >
                    <div class="l-rblock" style="overflow: hidden auto;" >
                        <el-tree v-loading="treeLoading" :data="treeShowData" :expand-on-click-node="false"  @node-click="handleNodeClick">
                            <span class="lr-tree-node"  slot-scope="{ node }">
                                <i class="el-icon-notebook-2"></i>
                                {{ node.label }}
                            </span>
                        </el-tree>  
                    </div>
                    <div class="l-bottom" >
                        <el-input placeholder="请输入名称"  @keyup.enter.native="hanleSearchCategory" v-model="searchCategoryWord" size="mini" >
                            <el-button @click="hanleSearchCategory" slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </div>
                </div>
            </l-panel>
        </template>
        <l-panel style="padding-left:0;" class="nobg" >
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
                    >新建大屏</el-button>
                </el-button-group>
            </template>
            <div class="l-block" style="padding-bottom:32px" v-loading="tableLoading">
                <div class="l-block l-v-list" style="overflow: hidden auto;" >
                    <div class="l-v-item" v-for="item in tableData" :key="item.f_Id">
                        <el-image v-if="item.f_Background"
                            :src="`${apiUrl}v1/api/img/${item.f_Background}`" >
                        </el-image>
                        <div class="content__btn"
                                @click="handleDesign(item)">
                                设计
                        </div>
                        <div class="content__main" >
                            <span class="content__name">{{item.f_Title}}</span>
                            <div class="content__menulist">
                                <div class="content__view">
                                    <el-tooltip content="删除">
                                    <i class="el-icon-delete"
                                        @click="handleDelete(item,index)"></i>
                                    </el-tooltip>
                                    <el-tooltip content="编辑">
                                        <i class="el-icon-edit"
                                            @click="handleEdit(item,index)"></i>
                                    </el-tooltip>
                                    <el-tooltip content="预览">
                                    <i class="el-icon-view"
                                        @click="handleViews(item,index)"></i>
                                    </el-tooltip>
                                    <el-tooltip content="复制">
                                    <i class="el-icon-copy-document"
                                        @click="handleCopy(item,index)"></i>
                                    </el-tooltip>
                                </div>
                                <span class="content__status"
                                        :class="{'content__status--active':item.f_Status}">
                                    {{item.f_Status?'已发布':'未发布'}}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="l-table--pagination" style="border: 0;" >
                    <el-pagination layout="total, sizes, prev, pager, next, jumper"
                       background
                       small
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :page-size="tablePageSize"
                       :current-page.sync="tableCurrentPage"
                       :total="tableTotal">
                    </el-pagination>
                </div>
            </div>
        </l-panel>

        <l-drawer 
            title="大屏分类管理"
            :visible.sync="categoryVisible"
            :showOk="false"
            size="800px"
           
            >
            <category-index  :refreshData="refreshCategory"></category-index>
        </l-drawer>
        <l-drawer 
            :title="formTitle"
            :visible.sync="formVisible"
            @ok="handleSave"
            @close="handleCloseForm"
            @opened="handleOpenedForm"
            >
            <visual-form ref="form" :categoryData="treeData" ></visual-form>       
        </l-drawer>
    </l-layout>
</transition>
</template>

<script>

import { getList } from '@/api/category'
import {getPage,addObj,updateObj,delObj,copyObj } from '@/api/visual'
import visualForm from './form'
import categoryIndex from './categoryIndex'
export default {
    name:'visual-index',
    inject: ["index"],
    components: {
        categoryIndex,
        visualForm
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
            searchCategoryWord:'',
            categoryVisible:false,
            categoryId: '',

            tableLoading:false,
            tableData:[],
            tableTotal:0,
            tablePageSize:10,
            tableCurrentPage:1,
           

            formVisible:false,
            formTitle:'',
            formEditRow:null,
            formEdit:false
        };
    },
    created () {
        this.loadCategory();
        this.loadTablePageData();
    },
    mounted () {
    },
    computed:{
    },
    methods:{
        refreshCategory(data){
            this.searchCategoryWord = '';
            this.treeData = [];
            data.forEach(item =>{
                this.treeData.push({value:item.f_Value,label:item.f_Key});
            })
            this.treeShowData = this.treeData;
        },
        loadCategory(){
            this.treeLoading = true;
            getList().then(res =>{
                this.treeData = [];
                res.data.data.forEach(item =>{
                    this.treeData.push({value:item.f_Value,label:item.f_Key});
                })
                this.treeShowData = this.treeData;
                this.treeLoading = false;
            }).catch(()=>{
                this.treeData = [];
                this.treeShowData = [];
                this.treeLoading = false;
            })
        },
        hanleSearchCategory(){
            if(this.searchCategoryWord){
                this.treeShowData = this.treeData.filter(item => item.label.indexOf(this.searchCategoryWord) >-1);
            }
            else{
                this.treeShowData = this.treeData;
            }
        },
        handleSettingClick(){
            this.categoryVisible = true;
        },


        handleRefresh(){
            this.index.reload();
        },
        handleCurrentChange (val) {
            this.tableCurrentPage = val;
            this.loadTablePageData();
        },
        handleSizeChange (val) {
            this.tablePageSize = val;
            this.loadTablePageData();
        },
        loadTablePageData(){
          this.tableLoading = true;
          let queryData = {
              rows:this.tablePageSize,
              page:this.tableCurrentPage,
              sidx:'F_CreateDate DESC',
              keyword:this.searchWord,
              category:this.categoryId
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


        handleNodeClick(data) {            
            this.categoryId = data.value;
            this.loadTablePageData();
        },

        refreshTable(){
            this.searchWord = '';
            this.searchTableData = null;
            this.lr_updateDataItemDetails(this.classifyCode,'tableLoading').then(res=>{
                this.tableData = res;
            });
        },

        hanleSearch(){
            this.loadTablePageData();
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
        handleDesign(item) {
            let routeUrl = this.$router.resolve({
                path: '/build/' + item.f_Id
            })
            window.open(routeUrl.href, '_blank');
        },

        handleAdd(){
            this.formEdit = false;
            this.showForm('新建大屏');
        },
        handleEdit (item) {
            this.formEdit = true;
            this.formEditRow = item;
            this.showForm('编辑大屏');
        },
        handleDelete(row){
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delObj(row.f_Id).then(()=> {
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
        handleCopy(item){
            this.$confirm('确认复制当前大屏?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                copyObj(item.f_Id).then(()=> {
                    this.$message({
                        type: 'success',
                        message: '复制成功!'
                    });
                    this.loadTablePageData();
                }).catch(() => {});
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消复制'
                });          
            });
        },
        handleViews (item) {
            let routeUrl = this.$router.resolve({
                path: '/view/' + item.f_Id
            })
            window.open(routeUrl.href, '_blank');
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
                        this.loadTablePageData();
                    }).catch(() => {
                        hideLoading();
                    })
                }
                else{// 新增数据
                    addObj(formData).then((res)=> {
                        hideLoading();
                        this.formVisible = false;
                        this.$message({
                            type: 'success',
                            message: '添加成功!'
                        });
                        this.loadTablePageData();
                        this.$nextTick(() => {
                            let routeUrl = this.$router.resolve({
                                path: '/build/' + res.data.data
                            })
                            window.open(routeUrl.href, '_blank');
                        });
                    }).catch(() => {
                        hideLoading();
                    })
                }
            });
        },
        handleOpenedForm(){
            if(this.formEdit){
                this.$refs.form.setForm(this.formEditRow); 
            }
        },
        handleCloseForm(){
            this.$refs.form.resetForm();
        },
        showForm(text){
            this.formTitle = text;
            this.formVisible = true;
        },

        
    }

}
</script>