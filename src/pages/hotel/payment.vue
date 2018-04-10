<template lang="jade">
  view.payment-wrapper
    view.header
      view.title 商务大床房(含双早）
      view.date 入住 3月27日  离店 3月28日  1晚
      view.detail-header
        view.detail-1 大床 | 每间最多可住2人 | 双早
    view.payment-type
      view.title 支付方式
      view.types
        view.type.business 企业付款-免审
        view.type.wx 微信
    view.footer
      view.price
        view.nums
          em ￥
          text.num 450000
        view.detailed 明细
      view.submit(@tap="gopay") 去付款
</template>

<script>

import wepy from 'wepy';

export default class Index extends wepy.page {
  config = {
    navigationBarTitleText: '订单付款'
  };

  methods = {
    gopay() {
      console.log('pay');
    }
  }
}

</script>

<style lang="styl" src="../../css/pages/hotel/payment.styl"></style>