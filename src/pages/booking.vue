
<template lang='pug'>
  view.container
    .banners
      | 广告位
    .search-panel
      ul.tabs
        li.tab 机票
        li.tab.active 酒店
      hotel-panel
</template>

<script>
import wepy from 'wepy';
import HotelPanel from '@/components/booking/hotel-panel';
// import testMixin from '../mixins/test';

export default class Index extends wepy.page {
  config = {
    navigationBarTitleText: '蜘蛛差旅'
  };
  components = {
    'hotel-panel': HotelPanel
  };

  // mixins = [testMixin];

  data = {
    userInfo: {
      nickName: '加载中...'
    }
  };

  computed = {};

  methods = {};

  events = {};

  onLoad() {
    let self = this;
    this.$parent.getUserInfo(function(userInfo) {
      if (userInfo) {
        // self.userInfo = userInfo;
        // self.$apply();
        self.setData({ userInfo: userInfo });
      }
    });
  }
}
</script>

<style lang="stylus" src="../css/pages/booking.styl"></style>
