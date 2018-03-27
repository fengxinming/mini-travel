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
      'pages/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '差旅',
      navigationBarTextStyle: 'black'
    },
    // tabBar: {
    //   color: '#8a8a8a',
    //   selectedColor: '#1F9948',
    //   borderStyle: 'white',
    //   backgroundColor: '#fff',
    //   list: [{
    //     pagePath: 'pages/home',
    //     iconPath: 'images/icon-home.png',
    //     selectedIconPath: 'images/icon-home-select.png',
    //     text: '首页'
    //   }, {
    //     pagePath: 'pages/classify',
    //     iconPath: 'images/icon-classify.png',
    //     selectedIconPath: 'images/icon-classify-select.png',
    //     text: '分类'
    //   }, {
    //     pagePath: 'pages/shoppingCart',
    //     iconPath: 'images/icon-shopcart.png',
    //     selectedIconPath: 'images/icon-shopcart-select.png',
    //     text: '购物车'
    //   }, {
    //     pagePath: 'pages/my',
    //     iconPath: 'images/icon-my.png',
    //     selectedIconPath: 'images/icon-my-select.png',
    //     text: '我的'
    //   }]
    // }
  };

  globalData = {
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
<style lang="stylus">
@require './styles/weui.css';
page{
  background-color: #f2f2f2;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}
</style>