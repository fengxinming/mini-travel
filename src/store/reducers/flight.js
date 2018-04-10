import moment from 'moment';
import { handleActions } from 'redux-actions';
import {
  FLIGHT_INIT_SEARCH_PARAMS,
  FLIGHT_UPDATE_SEARCH_PARAMS
} from '../types';
import { storage } from '../../commons/storage';

export default handleActions({
  [FLIGHT_INIT_SEARCH_PARAMS](state, action) {
    const searchParams = storage.fSearchParams || {};
    const curentDate = moment().format('YYYY-MM-DD');
    let startDate = searchParams.startDate;
    if (!startDate || !moment(startDate, 'YYYY-MM-DD', true).isValid() || moment(startDate).isBefore(curentDate)) {
      startDate = searchParams.startDate = curentDate;
    }
    return {
      ...state,
      searchParams
    };
  },
  [FLIGHT_UPDATE_SEARCH_PARAMS](state, action) {
    const { params } = action;
    const searchParams = state.searchParams;
    Object.assign(searchParams, params);
    storage.fSearchParams = searchParams;
    return {
      ...state,
      searchParams
    };
  }
}, {
  searchParams: {
    startDate: '',
    endDate: ''
  }
});
