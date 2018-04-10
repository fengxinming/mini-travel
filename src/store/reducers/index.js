import { combineReducers } from 'redux';
import cCalendar from './c-calendar';
import hotel from './hotel';
import flight from './flight';

export default combineReducers({
  cCalendar,
  hotel,
  flight
});
