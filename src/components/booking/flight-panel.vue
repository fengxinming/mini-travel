<template lang="pug">
  view(hidden="{{tabIndex!=0}}")
    form(@submit='return false;').conditions
      view.condition-row.row-02
        view.date
          text.sub-desc 出发
          text.datetime 深圳
        view.between
          image.exchange(src='{{imagePrefix}}/images/booking/exchange.png')
        view.date.right
          text.sub-desc 到达
          text.datetime 北京
      view.condition-row.row-02
        view.date
          text.sub-desc 去程
          text.datetime 11月22日
        view.date.right
          text.sub-desc 返程
          text.datetime 11月24日
      button.search-button 机票查询
</template>

<script>
import wepy from 'wepy';

export default class Panel extends wepy.component {
  props = {
    tabIndex: [Number, String]
  };
  data = {
    imagePrefix: ''
  };
  onLoad() {
    this.imagePrefix = this.$root.$parent.globalData.travelConfig.imagePrefix;
  }
}
</script>