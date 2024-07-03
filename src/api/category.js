import { apiUrl } from '@/config';
import request from '../axios'
export const getList = () => request({
  url: `${apiUrl}v1/api/vcategorys`,
  method: 'get'
});

export const addObj = (data) => request({
  url: `${apiUrl}v1/api/vcategory`,
  method: 'post',
  data: data
});
export const updateObj = (id,data) => request({
  url: `${apiUrl}v1/api/vcategory/${id}`,
  method: 'put',
  data: data
});



export const delObj = (id) => request({
  url: `${apiUrl}v1/api/vcategory/${id}`,
  method: 'delete'
});