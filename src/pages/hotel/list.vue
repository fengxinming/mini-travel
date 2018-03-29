<template lang="pug">
  view.search-header.clearfix
    view.date
      view.left
        text 09-02
        text 09-02
      view.right 2晚
    view.search-bar
      image(src="../images/hotel/search-icon.png" alt="")
      input(placeholder="酒店名、地标、位置")
  view.hotel-list
    repeat(for="{{listData}}" item='item')
      //- view {{item.title}}
      dl
        dt
          image(src="../images/hotel/hotel-img.png" alt="酒店预览图")
        dd
          view.title 深圳静安寺和颐酒店
          span.comment 4.8分 棒极啦 132条评价
          p 距离深圳北站100米
          view.confirm
            view.btns
              i.btn 高档型
              i.btn 差旅优选
              i.btn 同事入住
            view.price
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
    footerData: [{id: 1, text: '智能排序'}, {id: 2, text: '位置区域'}, {
      id: 3, text: '价格星级'}, {id: 4, text: '筛选'}],
    num: 1
  };
}
</script>

<style lang="stylus" src="../css/pages/hotel/list.styl"></style>