import request from '@/axios';
import { apiUrl } from '@/config';
export const login = (account, password) => request({
    url: apiUrl + 'v1/api/login',
    method: 'post',
    meta: {
        isToken: false
    },
    data: {
        account,
        password
    }
});

export const loginone = (token) => request({
    url: apiUrl + 'v1/api/loginone',
    method: 'get',
    meta: {
        isToken: false
    },
    params: {
        token
    }
});

export const getUserInfo = () => request({
    url: apiUrl + 'v1/api/user/info',
    method: 'get'
});


export const getPage = (params) => request({
    url: apiUrl + 'v1/api/user/page',
    method: 'get',
    params:params
});


export const addObj = (data) => request({
    url: apiUrl + 'v1/api/user',
    method: 'post',
    data: data
});
export const updateObj = (id,data) => request({
    url: apiUrl +`v1/api/user/${id}`,
    method: 'put',
    data: data
});
export const delObj = (id) => request({
    url: apiUrl +`v1/api/user/${id}`,
    method: 'delete'
});

export const resetPassword = (id) => request({
    url: apiUrl +`v1/api/user/resetpsw/${id}`,
    method: 'put'
});



