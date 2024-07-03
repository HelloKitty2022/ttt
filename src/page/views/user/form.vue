<template>
    <div class="l-from-body" >
        <el-form :model="formData" :rules="rules" size="mini"  ref="form" label-width="100px" >
            <el-col :span="24">
                <el-form-item label="账号" prop="f_Account">
                    <el-input v-model="formData.f_Account"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="姓名" prop="f_RealName">
                    <el-input v-model="formData.f_RealName"></el-input>
                </el-form-item>
            </el-col>
             <el-col :span="24">
                <el-form-item label="密码" prop="f_Password">
                    <el-input v-model="formData.f_Password"></el-input>
                </el-form-item>
            </el-col>
        </el-form>
    </div>
</template>
<script>
import { existDbFiled} from '@/api/dbTable.js'

export default {
    name:'map-form',
    props:{
    },
    data(){
        return {
            formData:{
                f_Account:'',
                f_RealName:'',
                f_Password:''

            },
            rules: {
                f_Account: [
                    { required: true, message: '请输入账号' },
                    { validator: this.lr_existDbFiled,keyValue:() => { return this.formData.f_UserId },tableName:'lr_user',keyName:'f_UserId',trigger: 'blur'}
                ],
                f_RealName: [
                    { required: true, message: '请输入姓名' }
                ],
                f_Password: [
                    { required: true, message: '请输入密码' }
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