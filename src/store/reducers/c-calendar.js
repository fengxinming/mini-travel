import { handleActions } from 'redux-actions';
import { CALE_INIT_DAYS, CALE_SELECT_DAYS } from '../types/c-calendar';
import moment from 'moment';

export default handleActions({
  [CALE_INIT_DAYS](state, action) {
    const { params } = action;
    const calendars = [];
    const disabledFn = params.disabledDate;
    const initMoment = moment();
    const todayStr = initMoment.format('YYYY-MM-DD');
    for (let count = 0, duration = +params.duration; count < duration; count++) {
      const now = initMoment.add(count, 'months').date(1);
      let month = now.month();
      const days = [];
      let day = now.days();
      for (let i = 0; i < day; i++) {
        days[i] = { disabled: true };
      }
      for (let i = 1, max = now.daysInMonth(); i <= max; i++, day++) {
        now.date(i);
        const currentDate = now.format('YYYY-MM-DD');
        days[day] = {
          date: todayStr === currentDate ? '今天' : i,
          datetime: currentDate,
          disabled: disabledFn(currentDate)
        };
      }
      month = month > 11 ? 0 : month;
      calendars[count] = {
        month,
        days
      };
    }
    return {
      ...state,
      days: calendars
    };
  },
  [CALE_SELECT_DAYS](state, action) {
    let { selectedDays, rangedDays } = state;
    const { params } = action;
    const {
      item
    } = params;
    const datetime = item.datetime;
    rangedDays = {};
    switch (selectedDays.length) {
      case 0:
        selectedDays[0] = datetime;
        break;
      case 1:
        if (datetime === selectedDays[0]) {
          selectedDays.length = 0;
        } else {
          let cMo = moment(datetime);
          let diffDays = 0;
          if (cMo.isBefore(selectedDays[0])) {
            selectedDays[1] = selectedDays[0];
            selectedDays[0] = datetime;
          } else {
            selectedDays[1] = datetime;
          }
          cMo = moment(selectedDays[0]);
          diffDays = -cMo.diff(selectedDays[1], 'days');
          for (let i = 0, j = diffDays - 1; i < j; i++) {
            let tmp = cMo.add(1, 'days').format('YYYY-MM-DD');
            rangedDays[tmp] = tmp;
          }
        }
        break;
      case 2:
        selectedDays = [datetime];
        break;
    }
    return {
      ...state,
      selectedDays,
      rangedDays
    };
  }
}, {
  days: [],
  rangedDays: {},
  selectedDays: []
});
