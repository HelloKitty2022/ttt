<template>
    <div class="l-from-body" >
        <el-form :model="formData" :rules="rules" size="mini"  ref="form" label-width="100px" >
            <el-col :span="24">
                <el-form-item label="地图名称" prop="f_Name">
                    <el-input v-model="formData.f_Name"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="地图数据" prop="f_Data">
                    <el-input type="textarea" v-model="formData.f_Data" rows="24"></el-input>
                </el-form-item>
            </el-col>
        </el-form>
    </div>
</template>
<script>
export default {
    name:'map-form',
    props:{
    },
    data(){
        return {
            formData:{
                f_Name:'',
                f_Data:''
            },
            rules: {
                f_Name: [
                    { required: true, message: '请输入地图名称' }
                ],
                f_Data: [
                    { required: true, message: '请输入地图数据' }
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
        }
    }
}
</script>