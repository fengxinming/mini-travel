<script>
import wepy from 'wepy';
import 'wepy-async-function';

import { setStore } from 'wepy-redux';
import configStore from './store';

const store = configStore();
setStore(store);

export default class extends wepy.app {
  config = {
    pages: [
      // 首页
      // 'pages/hotel/list',
      'pages/booking',
      'pages/hotel/list',
      // 机票
      'pages/flight/calendar',
      'pages/flight/airline',
      'pages/flight/cabin',
      'pages/flight/city',
      // 酒店
      'pages/hotel/city',
      'pages/hotel/search',
      'pages/hotel/detail',
      'pages/hotel/calendar',
      // 预订下单
      'pages/hotel/result',
      'pages/hotel/booking',
      'pages/hotel/payment',
      // 订单列表
      'pages/order/orders'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      backgroundColor: '#F2F5FA'
    }
    // tabBar: {
    //   color: '#BFC3CD',
    //   selectedColor: '#0CC071',
    //   borderStyle: 'white',
    //   backgroundColor: '#fff',
    //   list: [
    //     {
    //       pagePath: 'pages/booking',
    //       iconPath: 'images/icon-booking.png',
    //       selectedIconPath: 'images/icon-booking2.png',
    //       text: '预订'
    //     },
    //     {
    //       pagePath: 'pages/order/orders',
    //       iconPath: 'images/icon-orders.png',
    //       selectedIconPath: 'images/icon-orders2.png',
    //       text: '订单'
    //     }
    //   ]
    // }
  };

  globalData = {
    userInfo: null
  };

  constructor() {
    super();
    this.use('requestfix');
    this.use('promisify'); // request将支持promise
    // // 拦截request请求
    // this.intercept('request', {
    //   // 发出请求时的回调函数
    //   config(options) {
    //     // 对所有request请求中的OBJECT参数对象统一附加时间戳属性
    //     options.timestamp = +new Date();
    //     let url = options.url;
    //     // 简化类型设置
    //     const headers = (options.header = options.header || {});
    //     if (options.json === false) {
    //       headers['content-type'] =
    //         'application/x-www-form-urlencoded; charset=UTF-8';
    //       delete options.json;
    //     }
    //     // 调用测试API
    //     if (options.testApi) {
    //       url = `${TEST_PATH}${url}.json`;
    //       delete options.testApi;
    //     } else {
    //       url = REST_PATH + url;
    //     }
    //     options.url = url;
    //     options.header = headers;
    //     return options;
    //   }

    //   // // 请求成功后的回调函数
    //   // success(res) {
    //   //   return res;
    //   // }

    //   // // 请求失败后的回调函数
    //   // fail(p) {
    //   //   console.log('request fail: ', p);
    //   //   // 必须返回响应数据对象，否则后续无法对响应数据进行处理
    //   //   return p;
    //   // },

    //   // // 请求完成时的回调函数(请求成功或失败都会被执行)
    //   // complete(options) {
    //   //   if (options.mask) {
    //   //     gloading.stop();
    //   //   }
    //   //   return options;
    //   // }
    // });
  }

  getUserInfo(cb) {
    const that = this;
    if (this.globalData.userInfo) {
      return this.globalData.userInfo;
    }
    wepy.getUserInfo({
      success(res) {
        that.globalData.userInfo = res.userInfo;
        cb && cb(res.userInfo);
      }
    });
  }
}
</script>
<style lang="styl" src="./css/app.styl"></style>