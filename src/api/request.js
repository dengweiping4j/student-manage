import request from '../utils/request';

export const fetchData = (url, query) => {
  return request({
    url,
    method: query.method ? query.method : 'get',
    params: query
  });
};

export const requestGet = (url, params) => {
  return request({
    url,
    method: 'get',
    params: params
  });
};

export const requestPost = (url, data, params) => {
  return request({
    url,
    method: 'post',
    params: params,
    data: data || {}
  });
};

export const requestDelete = (url, query, params) => {
  return request({
    url,
    method: 'delete',
    params: params,
    data: query
  });
};

export const requestPut = (url, data, params) => {
  return request({
    url: url,
    method: 'put',
    params: params,
    data: data|| {}
  });
};
