import { url,apiUrl} from '@/config';
import request from '../axios'

export const getPage = (params) => request({
  url: apiUrl + `v1/api/vconfig/page`,
  method: 'get',
  params: params
});

export const getObj = (id) => request({
  url: apiUrl + `v1/api/vconfig/${id}`,
  method: 'get',
  meta:{
    isToken:false
  }
});

export const addObj = (data) => request({
  url: apiUrl + 'v1/api/vconfig',
  method: 'post',
  data: {
    visual: {
      f_Password: data.f_Password,
      f_Category: data.f_Category,
      f_Title: data.f_Title,
      f_Status:data.f_Status
    },
    config: {
      f_Detail: JSON.stringify({
        name: data.f_Title,
        width: 1920,
        height:1080,
        scale: 1,
        backgroundImage: '/img/bg/bg1.png',
        url: '',
        mark: {},
        gradeShow: false,
        gradeLen: 30,
      }),
      f_Component: '[]'
    },
  }
});

export const updateObj = (id,data) => request({
  url: apiUrl + `v1/api/vconfig/${id}`,
  method: 'put',
  data: {
    visual: data
  }
});


export const copyObj = (id) => request({
  url: apiUrl + `v1/api/vconfig/copy/${id}`,
  method: 'put'
});


export const delObj = (id) => request({
  url: apiUrl + `v1/api/vconfig/${id}`,
  method: 'delete'
});

export const updateComponent = (id,data) => request({
  url: apiUrl + `v1/api/vconfig/${id}`,
  method: 'put',
  data: data
});


export const uploadImg = (file) => request({
  url: url + '/visual/put-file',
  method: 'post',
  data: 'file=' + file,
  headers: { "Content-Type": "multipart/form-data" }
});





