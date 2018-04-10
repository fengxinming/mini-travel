<template lang="jade">
  view#cabin
    airline-info
    airline-info
</template>

<script>
import wepy from 'wepy';
import AirlineInfo from '@/pages/flight/components/airline-info';

export default class Index extends wepy.page {
  config = {
    navigationBarTitleText: '北京-上海'
  };
  components = {
    'airline-info': AirlineInfo
  };
  data = {
  };
  onLoad() {
    wepy
      .request({
        url: '/bflight/flight/queryFlight',
        method: 'POST',
        mask: true
      })
      .then(res => {
        console.log(res);
      });
  }
  methods = {
  };
}
</script>

<style lang="styl" src="../../css/pages/flight/list.styl"></style>