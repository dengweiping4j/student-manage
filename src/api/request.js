import request from '../utils/request';

export const fetchData = query => {
  return request({
    url: 'system/user/findAll',
    method: query.method ? query.method : 'get',
    params: query
  });
};

export const requestGet = query => {
  return request({
    url: 'system/user/findAll',
    method: 'get',
    params: query
  });
};

export const requestPost = (params,query) => {
  return request({
    url: 'system/user/findAll',
    method: 'post',
    params: params,
    data: query
  });
};
