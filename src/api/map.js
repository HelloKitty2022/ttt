import { apiUrl } from '@/config';
import request from '../axios'
export const getList = () => request({
  url: apiUrl + 'v1/api/vmaps',
  method: 'get'
});

export const getObj = (id) => request({
  url: apiUrl + `v1/api/vmap/${id}`,
  method: 'get'
});

export const addObj = (data) => request({
  url: apiUrl + 'v1/api/vmap',
  method: 'post',
  data: data
});
export const updateObj = (id,data) => request({
  url: apiUrl +`v1/api/vmap/${id}`,
  method: 'put',
  data: data
});
export const delObj = (id) => request({
  url: apiUrl +`v1/api/vmap/${id}`,
  method: 'delete'
});