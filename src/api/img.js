
import { apiUrl } from '@/config';
import request from '../axios'

export const deleteFile = (fileId) => request({
    url: apiUrl + `v1/api/img/${fileId}`,
    method: 'delete'
});

export const getPage = (params) => request({
    url: apiUrl + `v1/api/img/page`,
    method: 'get',
    params: params
});