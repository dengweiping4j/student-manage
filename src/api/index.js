import request from '../utils/request';

export const fetchData = query => {
  return request({
    url: './table.json',
    method: query.method ? query.method : 'get',
    params: query
  });
};
