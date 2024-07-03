<template>
    <div class="l-from-body" >
        <el-form :model="formData" :rules="rules" size="mini"  ref="form" label-width="100px" >
            <el-col :span="24">
                <el-form-item label="大屏分类" prop="f_Category">
                    <l-tree-select
                        v-model="formData.f_Category"
                        :options="categoryData"
                        >
                    </l-tree-select>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="大屏名称" prop="f_Title">
                    <el-input v-model="formData.f_Title"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="发布状态" >
                        <el-switch
                        :active-value="1"
                        :inactive-value="0"
                        v-model="formData.f_Status"
                        >
                    </el-switch>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="密码" prop="f_Password">
                    <el-input 
                        :type="passwordType"
                        v-model="formData.f_Password"
                        auto-complete="off"
                        :placeholder="请输入密码"
                        >
                        <i class="el-icon-view el-input__icon"
                        slot="suffix"
                        @click="showPassword"></i>
                    </el-input>
                </el-form-item>
            </el-col>
        </el-form>
    </div>
</template>
<script>
import md5 from 'js-md5';
export default {
    name:'visual-form',
    props:{
        categoryData:{
            type:Array,
            default:()=>[]
        }
    },
    data(){
        return {
            formData:{
                f_Category:'',
                f_Title:'',
                f_Password:'',
                f_Status:1
            },
            rules: {
                f_Category: [
                    { required: true, message: '请选择分组',trigger: 'blur' }
                ],
                f_Title: [
                    { required: true, message: '请输入大屏名称' }
                ]
            },
            passwordType: "password",
        };
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
            //this.formData.oldpsw = this.formData.f_Password;
            this.formData.f_Password = '';
        },
        getForm(){
            let formData = this.$deepClone(this.formData);
            //console.log(formData);
            if(!this.$validatenull(formData.f_Password)){
               formData.f_Password =  md5(formData.f_Password);
            }
            /*else if(!this.$validatenull(formData.oldpsw)){
                formData.f_Password =formData.oldpsw;
                delete formData.oldpsw;
            }*/

            return formData;
        },

        showPassword() {
            this.passwordType == ""
            ? (this.passwordType = "password")
            : (this.passwordType = "");
        },
    }
}
</script>