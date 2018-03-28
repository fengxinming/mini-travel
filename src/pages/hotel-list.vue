<template lang="pug">
  view.search-header.clearfix
    view.date
      view.left
        text 09-02
        text 09-02
      view.right 2晚
    view.search-bar
  view.hotel-list
    repeat(for="{{listData}}" item='item')
      view {{item.title}}
  view.footer
    repeat(for="{{footerData}}" item='item')
      text {{item}}
</template>

<script>
import wepy from 'wepy';

export default class Index extends wepy.page {
  data = {
    listData: [
      {
        id: 1,
        title: 'title1'
      }, {
        id: 2,
        title: 'title2'
      }
    ],
    footerData: ['智能排序', '智能排序', '价格星级', '筛选']
  };
}
</script>

<style lang="stylus" src="../css/pages/hotel-list.styl"></style>