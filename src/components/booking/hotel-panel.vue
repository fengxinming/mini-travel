<template lang="pug">
  view(hidden="{{tabIndex!=1}}")
    form(onsubmit='return false;').conditions
      view.condition-row.row-01
        .location 深圳
        .location-handler 我的位置
      view.condition-row.row-02
        .date
          p.sub-desc 今天 入住
          em.datetime 11月22日
        .between
          span.desc
            | 共 
            em.day 2
            |  晚
        .date.right
          p.sub-desc 周四 离店
          em.datetime 11月24日
      .condition-row.row-03
        .keyword 搜索酒店名、地标、位置 
      button.search-button(@tap="searchHotel") 酒店查询
</template>

<script>
import wepy from 'wepy';

export default class Panel extends wepy.component {
  props = {
    tabIndex: [Number, String]
  };
  onLoad() {
    console.log(this.tabIndex);
  }
  methods = {
    searchHotel() {
      wx.redirectTo({
        url: './hotel-list'
      });
    }
  };
}
</script>