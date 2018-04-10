<template lang="jade">
  view(hidden="{{tabIndex!=0}}")
    form(@submit='return false;').conditions
      view.condition-row.row-02
        view.date(@tap="chooiseCity")
          text.sub-desc 出发
          text.datetime {{startAds}}
        view.between(@tap="tigger")
          image.exchange(src=travelConfig.imgUrlPrefix + '/images/booking/exchange.png')
        view.date.right(@tap="chooiseCity")
          text.sub-desc 到达
          text.datetime {{endAds}}
      view.condition-row.row-02
        view.date
          text.sub-desc 去程
          text.datetime(@tap="goCalendar(1)") {{startDate}}
        view.date.right
          image.close-icon(wx:if="{{endDate}}", @tap="clearEndDate", src=travelConfig.imgUrlPrefix + '/images/booking/close_search.png')
          text.sub-desc 返程
          text.datetime(@tap="goCalendar(2)",:class="{gray:!endDate}") {{endDate||'返程日期'}}
      button.search-button(@tap="searchFlight") 机票查询
</template>

<script>
import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import moment from 'moment';
import {
  FLIGHT_INIT_SEARCH_PARAMS,
  FLIGHT_UPDATE_SEARCH_PARAMS
} from '@/store/types';

const store = getStore();

@connect({
  startDate(state) {
    const date = state.flight.searchParams.startDate;
    return date ? moment(date).format('MM月DD日') : '';
  },
  endDate(state) {
    const date = state.flight.searchParams.endDate;
    return date ? moment(date).format('MM月DD日') : '';
  }
})
export default class Panel extends wepy.component {
  props = {
    tabIndex: [Number, String]
  };
  data = {
    imgUrlPrefix: '',
    startAds: '深圳',
    endAds: '北京'
  };
  onLoad() {
    store.dispatch({
      type: FLIGHT_INIT_SEARCH_PARAMS
    });
  }
  methods = {
    // 清除到达时间
    clearEndDate() {
      store.dispatch({
        type: FLIGHT_UPDATE_SEARCH_PARAMS,
        params: {
          endDate: ''
        }
      });
    },
    goCalendar(type) {
      wx.navigateTo({
        url: `../../flight/calendar?type=${type}`
      });
    },
    // 切换出发到达
    tigger() {
      let temp = this.startAds;
      this.startAds = this.endAds;
      this.endAds = temp;
    },
    // 搜索机票
    searchFlight() {
      wx.navigateTo({
        url: '../../flight/list'
      });
    },
    chooiseCity() {
      wx.navigateTo({
        url: '../../flight/city'
      });
    }
  };
}
</script>