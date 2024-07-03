<!-- 表格配置 -->
<template>
  <div>
    <el-form-item label="开启滚动">
      <el-switch v-model="main.activeOption.scroll">
      </el-switch>
    </el-form-item>
    <el-form-item label="开启显隐">
      <el-switch v-model="main.activeOption.columnShow">
      </el-switch>
    </el-form-item>
    <template v-if="main.activeOption.scroll">
      <el-form-item label="滚动时间">
        <el-input-number v-model="main.activeOption.scrollTime" controls-position="right">
        </el-input-number>
      </el-form-item>
      <el-form-item label="滚动行数">
        <el-input-number v-model="main.activeOption.scrollCount" controls-position="right">
        </el-input-number>
      </el-form-item>
    </template>
    <el-form-item label="开启排名">
      <el-switch v-model="main.activeOption.index"></el-switch>
    </el-form-item>
    <el-collapse accordion>
      <el-collapse-item title="表头设置">
        <el-form-item label="背景">
          <l-input-color type="textarea"
                            v-model="main.activeOption.headerBackground"></l-input-color>
        </el-form-item>
        <el-form-item label="字体颜色">
          <l-input-color type="textarea"
                            v-model="main.activeOption.headerColor"></l-input-color>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="表格设置">
        <el-form-item label="字体大小">
          <el-input-number v-model="main.activeOption.fontSize" controls-position="right">
          </el-input-number>
        </el-form-item>
        <el-form-item label="显示行数">
          <el-input-number v-model="main.activeOption.count" controls-position="right">
          </el-input-number>
        </el-form-item>
        <el-form-item label="文字颜色">
          <l-input-color type="textarea"
                            v-model="main.activeOption.bodyColor"></l-input-color>
        </el-form-item>
        <el-form-item label="奇行颜色">
          <l-input-color type="textarea"
                            v-model="main.activeOption.nthColor"></l-input-color>
        </el-form-item>
        <el-form-item label="偶行颜色">
          <l-input-color type="textarea"
                            v-model="main.activeOption.othColor"></l-input-color>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="表格列设置">
         <div class="l-block" style="min-height:200px;padding:0 16px;margin-bottom:16px;" >
            <l-edit-table 
              :dataSource="main.activeOption.column"
              :isShowNum="false" 
              @addRow="handleAdd" 
              @deleteRow="rowDel" >
              <el-table-column
                prop="label"
                label="名称"
                minWidth="80">
                <template slot-scope="scope">
                  <el-input size="mini" v-model="scope.row.label"></el-input>
                </template>
                </el-table-column>
                <el-table-column
                prop="prop"
                label="key值"
                minWidth="80">
                <template slot-scope="scope">
                  <el-input size="mini" v-model="scope.row.prop"></el-input>
                </template>
                </el-table-column>
                <el-table-column
                  prop="width"
                  label="宽度"
                  width="80">
                <template slot-scope="scope">
                  <el-input-number size="mini" v-model="scope.row.width" controls-position="right" >
                  </el-input-number>
                </template>
                </el-table-column>
            </l-edit-table>
          </div>
        <!--<avue-crud :option="tableOption"
                   :data="main.activeOption.column"
                   @row-save="rowSave"
                   @row-del="rowDel"
                   @row-update="rowUpdate"></avue-crud>-->
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { tableOption, dicOption } from '@/option/config'

export default {
  data () {
    return {
      dicOption: dicOption,
      tableOption: tableOption
    }
  },
  inject: ["main"],
  methods: {
    handleAdd(){
      this.main.activeOption.column.push({
        label:'',
        prop:'',
        width:80,
      });
    },
    rowDel ({index,row}) {
      this.main.activeOption.column.splice(index, 1);
    },
  }
}
</script>

<style>
</style>