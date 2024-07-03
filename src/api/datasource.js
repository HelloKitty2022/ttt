import { apiUrl } from '@/config';
import request from '../axios'

export const getDbsourceList = () => request({
    url: apiUrl + `v1/api/dbsources`,
    method: 'get'
});

export const getDbsource = (code) => request({
    url: apiUrl + `v1/api/dbsource/${code}`,
    method: 'get'
});

export const getColNameList = (code) => request({
    url: apiUrl + `v1/api/dbsource/${code}/colnames`,
    method: 'get'
});

export const getDataList = (code,params) => request({
    url: apiUrl + `v1/api/dbsource/${code}/list`,
    method: 'get',
    params,
    meta:{
        isToken:false
    }
});

export const getDataPageList = (code,pagination) => request({
    url: apiUrl + `v1/api/dbsource/${code}/page`,
    method: 'get',
    params:pagination
});

export const addDbsource = (req) => request({
    url: apiUrl + `v1/api/dbsource`,
    method: 'post',
    data:req
});

export const updateDbsource = (req) => request({
    url: apiUrl + `v1/api/dbsource/${req.id}`,
    method: 'put',
    data:req.formData
});

export const deleteDbsource = (req) => request({
    url: apiUrl + `v1/api/dbsource/${req}`,
    method: 'delete'
});
