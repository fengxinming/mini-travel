
<template lang='pug'>
  view.container
    view.banners
      text 广告位
    view.search-panel
      view.tabs
        view.tab(class="{{ tabIndex == 0 ? 'active' : '' }}", @tap="switchTab(0)") 机票
        view.tab(class="{{ tabIndex == 1 ? 'active' : '' }}", @tap="switchTab(1)") 酒店
      flight-panel(:tabIndex.sync='tabIndex')
      hotel-panel(:tabIndex.sync='tabIndex')
</template>

<script>
import wepy from 'wepy';
import FlightPanel from '@/components/booking/flight-panel';
import HotelPanel from '@/components/booking/hotel-panel';
// import testMixin from '../mixins/test';

export default class Index extends wepy.page {
  config = {
    navigationBarTitleText: '蜘蛛差旅'
  };
  components = {
    'flight-panel': FlightPanel,
    'hotel-panel': HotelPanel
  };

  // mixins = [testMixin];

  data = {
    tabIndex: 1
  };

  computed = {};

  methods = {
    switchTab(tabIndex) {
      this.tabIndex = tabIndex;
      this.$apply();
    }
  };

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

<style lang="styl" src="../css/pages/booking.styl"></style>
