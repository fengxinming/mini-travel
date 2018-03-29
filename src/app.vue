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
      'pages/hotel/calendar',
      'pages/booking',
      'pages/order/orders',
      'pages/hotel/list'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '蜘蛛差旅',
      navigationBarTextStyle: 'black',
      backgroundColor: '#F2F5FA'
    },
    tabBar: {
      color: '#BFC3CD',
      selectedColor: '#0CC071',
      borderStyle: 'white',
      backgroundColor: '#fff',
      list: [
        {
          pagePath: 'pages/booking',
          iconPath: 'images/icon-booking.png',
          selectedIconPath: 'images/icon-booking2.png',
          text: '预订'
        },
        {
          pagePath: 'pages/order/orders',
          iconPath: 'images/icon-orders.png',
          selectedIconPath: 'images/icon-orders2.png',
          text: '订单'
        }
      ]
    }
  };

  globalData = {
    imagePathPrefix: 'images',
    userInfo: null
  };

  constructor() {
    super();
    this.use('requestfix');
  }

  onLaunch() {}

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

<style lang="stylus" src="./css/app.styl"></style>
