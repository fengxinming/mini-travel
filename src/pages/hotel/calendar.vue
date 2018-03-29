<template lang="pug">
  calendar(:disabledDate='disabledDate')
</template>

<script>
import wepy from 'wepy';
import calendar from '@/components/calendar/index';
import moment from 'moment';

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
}
</script>

<style lang="stylus" src='./index.styl'>
</style>
