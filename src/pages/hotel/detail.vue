<template lang="jade">
  view.detail-wrapper
    view.header
      view.img-wrapper
        view.img
          image.img-banner(src="../../images/hotel/detail-banner.png" alt="酒店大图")
        view.hotel-title
          view.left
            text.title 深圳华侨城洲际大酒店
            text.span 四星/舒适
          view.right
            i 图（32）
            image.camera-icon(src="../../images/hotel/camera.png" alt="酒店图片合集")
      view.location
        view.info
          text.title 杨浦区佳木斯路777号(佳木斯路营交口)
          text.location-p 距离 延吉中路地铁站 440米
        view.map
          image.map-img(src="../../images/hotel/detail-banner.png" alt="酒店地图位置")
          image.map-location(src="../../images/hotel/map-location.png" alt="定位点")
    view.comment-detail
      view.tabs
        view.tab(class="{{tabIndex==1?'active':''}}")
          text(@tap="updateComment(1)") 住客评价
        view.tab(class="{{tabIndex==2?'active':''}}")
          text.no-border(@tap="updateComment(2)") 详情/设施
      view.tab-infos-1(wx:if="{{tabIndex==1}}")
        view.title
          text.comment 4.9分 棒极啦
          text.comment-nums 1380条点评
          image(src="../../images/hotel/turn-right.png" alt="").turn-right-icon
        view.p-cont
          text 这个酒店真挺不错的，这个价位也还可以！可是洗漱
      view.tab-infos-1.tab-infos-2(wx:if="{{tabIndex==2}}")
        view.title
          text.comment 2008年开业  2016年装修
          text.comment-nums 详情/设施
          image(src="../../images/hotel/turn-right.png" alt="").turn-right-icon
        view.p-cont
          view.list-1
            image.ss-icon(src="../../images/hotel/ss-1.png" alt="设施图片")
            text 健身房
    view.hotel-detail-list
      view.date
        view.left-time
          view.text-info 今天 入住
          view.day 11月22日
        view.days
          span.day-num
            | 共 
            i 2 
            | 晚
        view.right-time
          view.text-info 周四 离店
          view.day 11月22日
      view.list
        repeat(for="{{roomList}}")
          view.list-cont
            view.img-left
              image(src="../../images/hotel/detail-1.png" alt="房间缩略图").small-room-p
            view.cont-right
              view.title 高级商务大床房
              view.room-cont 25-28㎡  双床  1-5层  
              view.room-price
                | ￥450
                span.text-1 起
                image.jt-1(src="../../images/hotel/jt.png" alt="箭头")
    view.recommend
      view.h2-title
        image.recommend-icon(src="../../images/hotel/recommand.png" alt="点赞")
        span 附近同类型酒店(15家）
      view.list
        repeat(for="{{roomList}}" item='item')
          //- view {{item.title}}
          view.list-dl
            view.list-dt
              image.list-img(src="../../images/hotel/hotel-img.png" alt="酒店预览图" width="100%" height="100%")
            view.list-dd
              view.title 深圳静安寺和颐酒店
              view.comment 
                text 4.8分 
                text 棒极啦 
                | 132条评价
              p 距离 深圳北站 100米
              view.confirm
                view.btns
                  //- i.btn 差旅优选
                  //- i.btn 同事入住
                view.price
                  i.p ￥550
                  | 起
    view.nomore
      i.line
      text 没有更多了
</template>

<script>
import wepy from 'wepy';

export default class Index extends wepy.page {
  config = {
    navigationBarTitleText: '酒店详情'
  };

  data = {
    tabIndex: 1,
    roomList: [
      {
        id: 1,
        text: 'one'
      }
    ]
  };

  computed = {};

  methods = {
    updateComment(index) {
      this.tabIndex = index;
      // this.$apply();
    }
  };
}
</script>

<style lang="styl" src="../../css/pages/hotel/detail.styl"></style>