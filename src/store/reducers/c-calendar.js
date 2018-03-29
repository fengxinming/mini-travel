import { handleActions } from 'redux-actions';
import { CALE_INIT_DAYS } from '../types/c-calendar';
import moment from 'moment';

export default handleActions({
  [CALE_INIT_DAYS](state, action) {
    const { params } = action;
    const calendars = [];
    const disabledFn = params.disabledDate;
    for (let count = 0, duration = +params.duration; count < duration; count++) {
      const now = moment().add(count, 'months').date(1);
      let month = now.month();
      const days = [];
      let day = now.days();
      for (let i = 0; i < day; i++) {
        days[i] = { disabled: true, selected: false };
      }
      for (let i = 1, max = now.daysInMonth(); i <= max; i++, day++) {
        now.date(i);
        const currentDate = now.format('YYYY-MM-DD');
        days[day] = {
          date: i,
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
  }
}, {
  days: []
});
