<template lang="jade">
  calendar(:disabledDate='disabledDate', :value='selectedDays', @select.user="selectDate")
</template>

<script>
import wepy from 'wepy';
import calendar from '@/components/calendar/index';
import { HOTEL_UPDATE_SEARCH_PARAMS } from '@/store/types';
import { connect, getStore } from 'wepy-redux';
import moment from 'moment';

const store = getStore();

@connect({
  selectedDays(state) {
    const searchParams = state.hotel.searchParams;
    return [searchParams.startDate, searchParams.endDate];
  }
})
export default class Panel extends wepy.page {
  config = {
    navigationBarTitleText: '选择日期'
  };
  components = {
    calendar
  };
  disabledDate(date) {
    const datebefore = moment().format('YYYY-MM-DD');
    const dateafter = moment()
      .add(1, 'month')
      .format('YYYY-MM-DD');
    return moment(date).isBefore(datebefore) || moment(date).isAfter(dateafter);
  }
  onLoad() {
    // console.log(store.getState(), this);
  }
  methods = {
    selectDate(arr) {
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        });
        store.dispatch({
          type: HOTEL_UPDATE_SEARCH_PARAMS,
          params: {
            startDate: arr[0],
            endDate: arr[1]
          }
        });
        this.$com.calendar.deleteDays();
      }, 200);
    }
  };
}
</script>

<style lang="styl" src='./index.styl'>

</style>
