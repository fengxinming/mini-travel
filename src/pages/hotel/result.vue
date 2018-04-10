<template lang="jade">
  view.result-wrapper
    view.title 付款成功
    view.text 正向酒店确认房间，确认结果将发送至联系人手机
    //- view.text 请重新支付，以便向酒店确认房间，超时订单将取消
    view.btns
      view.go-detail.btn 查看订单详情
      view.go-booking.btn 继续预订
</template>

<script>
  
import wepy from 'wepy';

export default class Index extends wepy.page {
    config = {
      navigationBarTitleText: '付款结果'
    };
}

</script>

<style lang="styl" src="../../css/pages/hotel/result.styl"></style>