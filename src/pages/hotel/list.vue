<template lang="pug">
  view.search-header.clearfix
    view.date
      view.left
        text 09-02
        text 09-02
      view.right 2晚
    view.search-bar
      image.search-img(src="../../images/hotel/search-icon.png" alt="")
      text.input(@tap="goSearch") 酒店名、地标、位置
  view.hotel-list
    repeat(for="{{listData}}" item='item')
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
              i.btn 差旅优选
              i.btn 同事入住
            view.price
              i.p ￥550
              | 起
    view.nomore
      i.line
      text 没有更多了
  view.footer
    repeat(for="{{footerData}}" item='item')
      text(class="{{num==index?'active':''}}") {{item.text}}
</template>

<script>
import wepy from 'wepy';

export default class Index extends wepy.page {
  data = {
    listData: [
      {
        id: 1,
        title: 'title1'
      },
      {
        id: 2,
        title: 'title2'
      }
    ],
    footerData: [
      { id: 1, text: '智能排序' },
      { id: 2, text: '位置区域' },
      {
        id: 3,
        text: '价格星级'
      },
      { id: 4, text: '筛选' }
    ],
    num: 1
  };

  methods = {
    goSearch() {
      wx.navigateTo({
        url: './search'
      });
    }
  }
}
</script>

<style lang="styl" src="../../css/pages/hotel/list.styl"></style>
