<template>
    <div class="l-block" style="padding:16px;overflow: hidden auto;" >
        <el-upload
            lazy
            multiple
            ref="upload"
            class="upload-demo"
            accept="image/*"
            :action="`${apiUrl}v1/api/img/${type}`"
            :before-remove="handleRemove"
            :on-success="handleSuccess"
            list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传图片文件</div>
        </el-upload>
    </div>
</template>
<script>
import { deleteFile } from '@/api/img';
export default {
    name:'img-form',
    props:{
        type:String,
        callback:Function
    },
    data(){
        return {
        };
    },
    computed:{
    },
    created () {
    },
    methods:{
        resetForm(){
            this.$refs.upload.clearFiles();
        },
        handleRemove(file) {
            return deleteFile(file.response.data);
        },
        handleSuccess(){
            this.callback && this.callback();
        }
    }
}
</script>