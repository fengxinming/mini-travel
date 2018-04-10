<template lang="jade">
  view.search-header.clearfix
    view.yesterday
      image.left-icon(src=travelConfig.imgUrlPrefix+'/images/flight/left.png')
      span 前一天
    view.today(@tap="goCalendar(1)")
      image.calendar-icon(src=travelConfig.imgUrlPrefix+'/images/flight/icon-calendar.png')
      text 2018-04-08
      text 周四
    view.tomorrow
      span 后一天
      image.right-icon(src=travelConfig.imgUrlPrefix + "/images/flight/right.png" alt="")
  view.flight-list
    repeat(for="{{listData}}" item='item', v-if="listData&&listData.length")
      //- view {{item.title}}
      view.list-dl(@tap="goCabin({{item}})")
        view.list-dd
          view.start
            view.date 12:00
            view 宝安
          view.middle(class="{{index%2!=0?'mt-10':'mt-90'}}")
            image.middle-icon(wx:if="{{index%2==0}}", src=travelConfig.imgUrlPrefix + "/images/flight/one-way.png" alt="")
            view.middle-stop(wx:else)
              p 经停
              image.middle-icon(src=travelConfig.imgUrlPrefix + "/images/flight/stopover.png" alt="")
              p 景德镇
          view.end
            view.date 12:00
            view 宝安
          view.t-r
            view.price 
              i ￥
              text 1200
            view 票少
        view.list-dd.flight-desc
          view.flight-no
            view 海航HU7702 | 330(大)
          view.t-r
            text.price-min(wx:if="{{index%2==0}}") 低价
    view.nomore(wx:if="{{!listData||!listData.length}}")
      i.line
      view.text
        text 抱歉，没有找到符合搜索条件的航班
      view.btn
        text 换个条件查询
  view.footer
    repeat(for="{{footerData}}" item='item')
      view(class="{{num==item.id?'active':''}}", @tap="selectFilter", data-item="{{item}}")
        image.icon(src=travelConfig.imgUrlPrefix+"{{'/images/flight/'+(num==item.id?item.gimg:item.img)+'.png'}}" alt="")
        text {{item.text}}
  flight-filter(:showFilter.sync='showFilter', @confirm.user="confirmFilter", @clear.user="clearFilter")
</template>

<script>
import wepy from 'wepy';
import FlightFilter from '@/pages/flight/components/flight-filter';

export default class Index extends wepy.page {
  config = {
    navigationBarTitleText: '北京-上海'
  };
  components = {
    'flight-filter': FlightFilter
  };
  data = {
    listData: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    footerData: [
      { id: 1, text: '早-晚', img: 'time_ico_a', gimg: 'time_ico_a_g' },
      { id: 2, text: '从高到低', img: 'price_ico_a', gimg: 'price_ico_a_g' },
      { id: 3, text: '筛选', img: 'screening_ico_a', gimg: 'screening_ico_a_g' }
    ],
    num: 1,
    showFilter: 0
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
    selectFilter(event) {
      this.num = event.currentTarget.dataset.item.id;
      if (this.num === 3) {
        this.showFilter = 1;
      }
    },
    confirmFilter() {
      this.showFilter = 0;
    },
    clearFilter() {
      this.showFilter = 0;
    },
    goCabin(item) {
      console.log(item);
      wx.navigateTo({
        url: '../flight/cabin?id=' + item
      });
    },
    goCalendar(type) {
      wx.navigateTo({
        url: '../flight/calendar?type=' + type
      });
    }
  };
}
</script>

<style lang="styl" src="../../css/pages/flight/list.styl"></style>