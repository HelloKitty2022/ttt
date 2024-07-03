<template>
  <l-dialog 
    :hasBtns="false"
    theme="dark"
    title="图库"
    width="80%"
    
    :visible.sync="imgVisible"
    
    >
  <div class="l-block" style="padding-bottom:32px" v-loading="tableLoading" element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="l-block l-v-list" style="overflow: hidden auto;" >
        <div class="l-v-item" v-for="item in tableData" :key="item.f_Id" style="height:148px;padding:0;cursor: pointer;" >
            <el-image :fit="fit[categoryId]"
                :src="`${apiUrl}v1/api/img/${item.f_Id}${item.f_ExName}` "  @click="handleSetimg(`$BASE_URLv1/api/img/${item.f_Id}${item.f_ExName}`)" >
            </el-image>
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
  </l-dialog>
</template>

<script>
import { getPage } from '@/api/img';
export default {
  data () {
    return {
      imgVisible: false,
      type:'',

      categoryId: 'datav_bg',
      tableLoading:false,
      tableData:[],
      tableTotal:0,
      tablePageSize:20,
      tableCurrentPage:1,

      fit:{'datav_bg':'cover','datav_img':'scale-down','datav_imgk':'scale-down'}
    }
  },
  computed: {
  },
  methods: {
    openImg (item, type) {
      if(type !=this.type){
        this.categoryId = type;
        this.type = type;

        this.handleOpenedForm();
      }
      

      this.imgObj = item
      this.imgVisible = true;
    },
    handleSetimg (item) {
      this.imgVisible = false;
      this.$emit('change', item, this.imgObj);
    },


    handleOpenedForm(){
      this.tableCurrentPage = 1;
      this.loadTablePageData();
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
    }
  }
}
</script>

<style>
</style>