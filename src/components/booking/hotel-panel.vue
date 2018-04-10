<template lang="jade">
  view(hidden="{{tabIndex!=1}}")
    form(onsubmit='return false;').conditions
      view.condition-row.row-01
        .location(@tap="chooiseCity") {{cityData&&cityData.abbr}}
        .location-handler 我的位置
      view.condition-row.row-02
        .date(@tap="chooiseDate")
          p.sub-desc 今天 入住
          em.datetime {{startTimer}}
        .between
          span.desc
            | 共 
            em.day {{days}}
            |  晚
        .date.right(@tap="chooiseDate")
          p.sub-desc 周四 离店
          em.datetime {{endTimer}}
      .condition-row.row-03
        .keyword(@tap="searchArea" wx:if="{{keyword&&!keyword.area}}") 搜索酒店名、地标、位置 
        .keyword.hasValue(@tap="searchArea" wx:else) {{keyword.area}} 
      button.search-button(@tap="searchHotel") 酒店查询{{aPlus.abbr}}
</template>

<script>
import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import moment from 'moment';
import { HOTEL_INIT_SEARCH_PARAMS } from '@/store/types';

const store = getStore();

@connect({
  startTimer(state) {
    const date = state.hotel.searchParams.startDate;
    return moment(date).format('MM月DD日');
  },
  endTimer(state) {
    const date = state.hotel.searchParams.endDate;
    return moment(date).format('MM月DD日');
  },
  days(state) {
    const { startDate, endDate } = state.hotel.searchParams;
    return moment(endDate).diff(startDate, 'days');
  }
})
export default class Panel extends wepy.component {
  props = {
    tabIndex: [Number, String]
  };

  data = {
    cityData: {
      abbr: '深圳',
      city: '深圳市',
      cityID: '440300',
      code: '0755',
      firstSpell: 'szs',
      isSecond: 0,
      latitude: 22.546054,
      longitude: 114.025974,
      spell: 'shenzhenshi'
    },
    keyword: {}
  };

  onLoad() {
    // console.log(this.tabIndex, this);
    // console.log(options.router);
    // console.log(this.selectedDays);
    const vm = this;
    store.dispatch({
      type: HOTEL_INIT_SEARCH_PARAMS
    });
    vm.uploadCity();
    vm.uploadKeyword();
  }

  uploadCity() {
    const vm = this;
    wx.getStorage({
      key: 'city',
      success: function(res) {
        vm.cityData = res.data;
        vm.$apply();
      }
    });
  }

  uploadKeyword() {
    const vm = this;
    wx.getStorage({
      key: 'key-word',
      success: function(res) {
        vm.keyword = res.data;
        vm.$apply();
      }
    });
  }

  watch = {
    cityData(newVal, oldVal) {
      console.log(newVal);
    }
  };

  methods = {
    searchHotel() {
      wx.navigateTo({
        url: '../../hotel/list'
      });
    },
    chooiseCity() {
      wx.navigateTo({
        url: '../../hotel/city'
      });
    },
    searchArea() {
      wx.navigateTo({
        url: '../../hotel/search'
      });
    },
    chooiseDate() {
      wx.navigateTo({
        url: '../../hotel/calendar'
      });
    }
  };
}
</script>