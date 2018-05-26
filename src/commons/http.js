import request from 'wepy-better-request';

import { REST_PATH, TEST_PATH } from '../travel.config';

const request2 = request.create({
  baseURL: REST_PATH,
  testURL: TEST_PATH
});

function http(options) {
  return request2(options).then((res) => {
    // statusCode === 200 的逻辑
    console.log(res);
    return res;
  }).catch((err) => {
    // statusCode非200，或者其他错误处理
    console.log(err);
    throw err;
  });
};

export default http;
