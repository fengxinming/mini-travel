<template lang="jade">
  calendar(
    :disabledDate='disabledDate',
    :value='selectedDays',
    :multiple="multiple",
    :dateType="dateType",
    startLabel="去程",
    endLabel="返程",
    @select.user="selectDate"
  )
</template>

<script>
import wepy from 'wepy';
import calendar from '@/components/calendar/index';
import { FLIGHT_UPDATE_SEARCH_PARAMS } from '@/store/types';
import { connect, getStore } from 'wepy-redux';
import moment from 'moment';

const store = getStore();

@connect({
  selectedDays(state) {
    const searchParams = state.flight.searchParams;
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
  data = {
    multiple: false, // 机票日期选择器一次只能选择一个日期
    dateType: '' // 选择日期类型 1：出发  2：到达
  };
  disabledDate(date) {
    const datebefore = moment().format('YYYY-MM-DD');
    const dateafter = moment()
      .add(3, 'month')
      .format('YYYY-MM-DD');
    return moment(date).isBefore(datebefore) || moment(date).isAfter(dateafter);
  };
  onLoad(options) {
    this.dateType = parseInt(options.type);
  };
  methods = {
    selectDate(arr) {
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        });
        if (this.dateType === 1) {
          store.dispatch({
            type: FLIGHT_UPDATE_SEARCH_PARAMS,
            params: {
              startDate: arr[0]
            }
          });
        } else {
          store.dispatch({
            type: FLIGHT_UPDATE_SEARCH_PARAMS,
            params: {
              endDate: arr[0]
            }
          });
        }
        this.$com.calendar.deleteDays();
      }, 200);
    }
  };
}
</script>

<style lang="styl" src='./index.styl'>

</style>
