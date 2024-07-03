import { apiUrl } from '@/config';
import request from '../axios'


export const existDbFiled = (params) => request({
    url: apiUrl + `v1/api/dbtable/exist/filed`,
    method: 'get',
    params:params
});