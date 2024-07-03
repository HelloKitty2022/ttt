<template>
<transition name="el-fade-in">
    <l-layout class="l-tab-page" v-show="!lr_loadPage" >
        <template #left>
            <l-panel style="padding-right:0;" >
                <template #title>
                    图片分类
                </template>
                <div class="l-rblock" style="overflow: hidden auto;" >
                    <el-tree :data="treeData" :expand-on-click-node="false" node-key="value" ref="tree" @node-click="handleNodeClick">
                        <span class="lr-tree-node"  slot-scope="{ node }">
                            <i class="el-icon-notebook-2"></i>
                            {{ node.label }}
                        </span>
                    </el-tree>
                </div>
            </l-panel>
        </template>
        <l-panel style="padding-left:0;" class="nobg" >
            <template #toolLeft >
                <div class="l-panel--item" >
                    <el-input placeholder="请输入图片名称"  @keyup.enter.native="hanleSearch" v-model="searchWord" size="mini" >
                        <el-button @click="hanleSearch" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>
            </template>
            <template #toolRight >
                <el-button-group>
                    <el-button size="mini" icon="el-icon-refresh-left" @click="handleRefresh" ></el-button>
                </el-button-group>
                <el-button-group>
                    <el-button type="primary" size="mini" icon="el-icon-upload"
                        @click="handleAdd()"
                    >上传图片</el-button>
                </el-button-group>
            </template>
            <div class="l-block" style="padding-bottom:32px" v-loading="tableLoading">
                <div class="l-block l-v-list" style="overflow: hidden auto;" >
                    <div class="l-v-item" v-for="item in tableData" :key="item.f_Id">
                        <el-image :fit="fit[categoryId]"
                            :src="`${apiUrl}v1/api/img/${item.f_Id}${item.f_ExName}` " >
                        </el-image>
                        <!--<div class="content__btn"
                                @click="handleDesign(item)">
                                设计
                        </div>-->
                        <div class="content__main" >
                            <span class="content__name">{{item.f_Name}}</span>
                            <div class="content__menulist">
                                <div class="content__view">
                                    <el-tooltip content="删除">
                                    <i class="el-icon-delete"
                                        @click="handleDelete(item,index)"></i>
                                    </el-tooltip>
                                </div>
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
            :title="formTitle"
            :visible.sync="formVisible"
            :showOk="false"
            @close="handleCloseForm"
            >
            <img-form ref="form" :type="categoryId" :callback="loadTablePageData" ></img-form>       
        </l-drawer>
    </l-layout>
</transition>
</template>

<script>

import { getPage,deleteFile } from '@/api/img';
import imgForm from './form'
export default {
    name:'img-index',
    inject: ["index"],
    components: {
        imgForm
    },
    props: {
    },
    data () {
        return {
            //查询
            searchWord:'',

            treeData:[{value:'datav_bg',label:'大屏背景'},{value:'datav_img',label:'图片组件'},{value:'datav_imgk',label:'图片框组件'}],
            categoryId: 'datav_bg',
            categoryName:'大屏背景',

            tableLoading:false,
            tableData:[],
            tableTotal:0,
            tablePageSize:20,
            tableCurrentPage:1,

            formVisible:false,
            formTitle:'',

            fit:{'datav_bg':'cover','datav_img':'scale-down','datav_imgk':'scale-down'}
        };
    },
    created () {
        this.loadTablePageData();
    },
    mounted () {
        this.$nextTick(()=>{
            this.$refs.tree.setCurrentKey(this.categoryId);
        })
    },
    computed:{
    },
    methods:{
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
              sidx:'F_Name',
              keyword:this.searchWord,
              type:this.categoryId
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


        handleNodeClick(data) {            
            this.categoryId = data.value;
            this.categoryName = data.label;
            this.loadTablePageData();
        },

        hanleSearch(){
            this.loadTablePageData();
        },
        handleAdd(){
            this.showForm(`上传图片-${this.categoryName}`);
        },
        handleDelete(row){
            this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteFile(row.f_Id).then(()=> {
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