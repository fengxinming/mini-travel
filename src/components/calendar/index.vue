<template lang="jade">
  - var dayLabels = ['一', '二', '三', '四', '五'];

  view.calendar
    view.calendar-header
      text.calendar-week-label.weekend 日
      each dayLabel in dayLabels
        text.calendar-week-label= dayLabel
      text.calendar-week-label.weekend 六
    view.calendar-body
      repeat(for="{{days}}", key="index", index="index", item="item")
        text.calendar-month {{MONTH_LABELS[item.month]}}月
        view.calendar-grids
          repeat(for="{{item.days}}", key="index2", index="index2", item="item2")
            view.calendar-grid(
              class="{{item2.disabled?'calendar-grid-disabled':''}}{{!item2.disabled && selectedDays[0] == item2.datetime?' calendar-grid-start': ''}}{{!item2.disabled && selectedDays[1] == item2.datetime?' calendar-grid-end': ''}}{{!!rangedDays[item2.datetime] ? ' calendar-grid-range':''}}",
              @tap="selectDate({{item2}})"
            )
              text.calendar-day {{item2.date}}
              text.calendar-day-note {{!item2.disabled && selectedDays[0] == item2.datetime ? startLabel : !item2.disabled && selectedDays[1] == item2.datetime ? endLabel : ''}}
</template>

<script>
import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import { CALE_INIT_DAYS, CALE_SELECT_DAYS } from '../../store/types/c-calendar';

const store = getStore();

@connect({
  days(state) {
    return state.cCalendar.days;
  },
  selectedDays(state) {
    return state.cCalendar.selectedDays;
  },
  rangedDays(state) {
    return state.cCalendar.rangedDays;
  }
})
export default class Panel extends wepy.component {
  props = {
    // 是否多选
    multiple: {
      type: [String, Boolean],
      default: true
    },
    // 一次渲染几个月
    duration: {
      type: [String, Number],
      default: 3
    },
    // 禁用哪个时间段的回调函数
    disabledDate: {
      type: Function,
      default: () => {}
    },
    value: {
      type: Array,
      default: () => []
    },

    startLabel: {
      type: String,
      default: '入住'
    },

    endLabel: {
      type: String,
      default: '离店'
    }
  };
  computed = {
    MONTH_LABELS() {
      return [
        '一',
        '二',
        '三',
        '四',
        '五',
        '六',
        '七',
        '八',
        '九',
        '十',
        '十一',
        '十二'
      ];
    }
  };
  data = {};
  methods = {
    selectDate(item) {
      if (!item.disabled) {
        store.dispatch({
          type: CALE_SELECT_DAYS,
          params: {
            item
          }
        });
      }
    }
  };
  watch = {
    value(newVal, oldVal) {
      console.log(newVal);
    }
  };
  onLoad() {
    store.dispatch({
      type: CALE_INIT_DAYS,
      params: {
        duration: this.duration,
        disabledDate: this.disabledDate
      }
    });
  }
}
</script>

<style lang="styl" src='./index.styl'></style>
