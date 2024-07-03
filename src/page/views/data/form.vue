<template>
    <div class="l-from-body" >
        <el-form :model="formData" :rules="rules" size="mini"  ref="form" label-width="100px" >
            <el-col :span="24">
                <el-form-item label="名称" prop="f_Name">
                    <el-input v-model="formData.f_Name"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="编码" prop="f_Code">
                    <el-input v-model="formData.f_Code"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                 <el-form-item label="数据库" prop="f_DbId">
                    <el-select v-model="formData.f_DbId" placeholder="请选择">
                        <el-option-group
                        v-for="group in dbTree"
                        :key="group.id"
                        :label="group.label">
                        <el-option
                            v-for="item in group.children"
                            :key="item.id"
                            :label="item.label"
                            :value="item.id">
                        </el-option>
                        </el-option-group>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="SQL语句" prop="f_Sql">
                    <el-input type="textarea" v-model="formData.f_Sql" rows="8"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="备注" prop="f_Description">
                    <el-input type="textarea" v-model="formData.f_Description"></el-input>
                </el-form-item>
            </el-col>
        </el-form>
    </div>
</template>
<script>
import { existDbFiled} from '@/api/dbTable.js'
export default {
    name:'dbsource-form',
    props:{
        dbTree:{
            type:Array,
            default:()=>[]
        }
    },
    data(){
        return {
            formData:{
                f_Name:'',
                f_Code:'',
                f_DbId:'',
                f_Sql:'',
                f_Description:''
            },
            rules: {
                f_Name: [
                    { required: true, message: '请输入名称' }
                ],
                f_Code: [
                    { required: true, message: '请输入编码' },
                    { validator: this.lr_existDbFiled,keyValue:() => { return this.formData.f_Id },tableName:'lr_datasource',keyName:'f_Id',trigger: 'blur'}
                ],
                f_DbId: [
                    { required: true, message: '请选择数据库' }
                ],
                f_Sql: [
                    { required: true, message: '请输入SQL语句' }
                ]
                
            }
        };
    },
    computed:{
    },
    created () {
    },
    methods:{
        resetForm(){
            this.$refs.form && this.$refs.form.resetFields();
        },
        // 校验表单
        validateForm(callback){
            this.$refs.form.validate((valid) => {
                if(valid){
                    callback();
                }
            });
        },
        setForm(data){
            this.formData = this.$deepClone(data);
        },
        getForm(){
            return this.$deepClone(this.formData);
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
        }
    }
}
</script>