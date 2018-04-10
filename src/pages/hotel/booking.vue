<template lang="jade">
  view.booking-wrapper
    view.header
      view.title 商务大床房(含双早）
      view.date 入住 3月27日  离店 3月28日  1晚
      view.detail-header
        view.detail-1 大床 | 每间最多可住2人 | 双早
        view.detail-2 房型详情
      view.order-info
        view.info-1
          text.text-icon-1 立即确认
          text 预订此房型后，酒店可以立即确认订单！
        view.info-2 订单确认后不可取消或修改
    view.toggle-pay
      view.to-business.active
        text 因公出差
      view.to-personal
        text 个人出行
    view.pay-type.form
      view.pay-type-title.title 付款方式
      view.chooise-type.chooise 企业付款-免审
    view.rooms  
      view.form.noMargin.hasBorder
        view.title 房间数
        view.chooise-type.chooise 1间
      view.form.noMargin
        view.title 房间1
        view.chooise-type
          span.person-name 每间房至少填写1位入住人
          view.add-persons.position
    view.form
      view.title 超标原因
      view.chooise-type 未超出出差标准
    view.form
      view.title 手机号
      view.chooise-type
        input(type="text" placeholder="用于接收预订通知")
        view.position.same-check-in 同入住人
    view.form(wx:if="{{upDown}}")
      view.title 住宿偏好
      view.chooise-type.chooise.tips-text 告诉酒店你的偏好
    view.form(wx:if="{{upDown}}")
      view.title 发票
      view.chooise-type 企业付款的发票每月统一寄给贵司
    view.toggle-up-down
      block(wx:if="{{!upDown}}")
        text.txt(@tap="toggle") 展开更多
      block(wx:else)
        text.txt(@tap="toggle") 收起更多
      i.icon(class="{{upDown?'up':'down'}}")
    view.footer
      view.price
        view.nums
          em ￥
          text.num 450000
        view.detailed 明细
      view.submit(@tap="submit") 提交订单
</template>

<script>
import wepy from 'wepy';

export default class Index extends wepy.page {
  config = {
    navigationBarTitleText: '国内酒店'
  };

  data = {
    upDown: false
  };

  methods = {
    toggle() {
      this.upDown = !this.upDown;
    },
    submit() {
      console.log('submit order');
    }
  };

  onLoad() {
    console.log(this.global);
  }
}
</script>

<style lang="styl" src="../../css/pages/hotel/booking.styl"></style>