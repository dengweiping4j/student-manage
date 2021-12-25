import request from '../utils/request';

export const fetchData = query => {
  return request({
    url: 'system/user/findAll',
    method: query.method ? query.method : 'get',
    params: query
  });
};

export const requestGet = (url,params) => {
  return request({
    url: url,
    method: 'get',
    params: params
  });
};

export const requestPost = (url,query,params) => {
  return request({
    url: url,
    method: 'post',
    params: params,
    data: query
  });
};
