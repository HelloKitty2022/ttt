import { apiUrl } from '@/config';
import request from '../axios'

export const getDbList = () => request({
    url: apiUrl + `v1/api/dbs`,
    method: 'get'
});

export const addDb = (req) => request({
    url: apiUrl + `v1/api/db`,
    method: 'post',
    data:req
});

export const updateDb = (req) => request({
    url: apiUrl + `v1/api/db/${req.id}`,
    method: 'put',
    data:req.formData
});

export const deleteDb = (req) => request({
    url: apiUrl + `v1/api/db/${req}`,
    method: 'delete',
});

export const testDb = (req) => request({
    url: apiUrl + `v1/api/db/test`,
    method: 'get',
    params:req
});