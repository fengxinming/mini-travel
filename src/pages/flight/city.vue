<template lang="jade">
  city
</template>

<script>
import wepy from 'wepy';
import city from '@/components/city/index';
// import { getStore } from 'wepy-redux';

// const store = getStore();

export default class Panel extends wepy.page {
  config = {
    navigationBarTitleText: '选择城市'
  };

  components = {
    city
  };

  onLoad() {
    // console.log(store.getState(), this);
  }

  events = {
    'checked-city': data => {
      wx.navigateTo({
        url: '../booking',
        success: res => {
          console.log(res);
        },
        fail: data => {
          console.log(data);
        }
      });
      wx.setStorage({
        key: 'city',
        data: data
      });
    }
  };
}
</script>