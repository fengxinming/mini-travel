import wepy from 'wepy';
import Loading from './gloading';
const gloading = new Loading({
  sync: true
});

function request(options) {
  return new Promise((resolve, reject) => {
    // 遮罩，默认不显示菊花
    if (options.mask) {
      // 这里写菊花转
      gloading.start();
      // delete options.mask;
    }
    const headers = (options.header = options.header || {});
    // 是否要设置token
    if (options.token !== false) {
      // headers['x-auth-token'] = '69df6954-30d0-4393-8fb6-a47658e1282d';
      headers['x-auth-token'] = 'ad5e2a84-9151-4524-a86e-0cf0bc8513ac';
      delete options.token;
    }
    options.header = headers;
    wepy
      .request(options).then((res) => {
        if (options.mask) {
          gloading.stop();
        }
        if (res.statusCode === 200) {
          resolve(res);
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.message,
            duration: 3000
          });
          // switch (res.data.code) {
          //   case 1003:
          //     // 跳转至登录页面
          //     break;
          //   default:
          //     wx.showToast({
          //       icon: 'none',
          //       title: res.data.message,
          //       duration: 3000
          //     });
          // }
          reject(res);
        }
      }).catch((err) => {
        if (options.mask) {
          gloading.stop();
        }
        err.data = err;
        err.statusCode = -1;
        reject(err);
      });
  });
};

export default request;
