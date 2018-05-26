import moment from 'moment';
import { handleActions } from 'redux-actions';
import {
  HOTEL_INIT_SEARCH_PARAMS,
  HOTEL_UPDATE_SEARCH_PARAMS,
  HOTEL_SEARCH_LIST_DATA
} from '../types';
import { storage } from '../../commons/storage';

export default handleActions({
  [HOTEL_INIT_SEARCH_PARAMS](state, action) {
    const searchParams = storage.hSearchParams || {};
    const curentDate = moment().format('YYYY-MM-DD');
    let startDate = searchParams.startDate;
    if (!startDate || !moment(startDate, 'YYYY-MM-DD', true).isValid() || moment(startDate).isBefore(curentDate)) {
      startDate = searchParams.startDate = curentDate;
    }
    const endDate = searchParams.endDate;
    if (!endDate || !moment(endDate, 'YYYY-MM-DD', true).isValid() || !moment(endDate).isAfter(startDate)) {
      searchParams.endDate = moment(startDate).add(1, 'days').format('YYYY-MM-DD');
    }
    return {
      ...state,
      searchParams
    };
  },
  [HOTEL_UPDATE_SEARCH_PARAMS](state, action) {
    const { params } = action;
    const searchParams = state.searchParams;
    Object.assign(searchParams, params);
    storage.hSearchParams = searchParams;
    return {
      ...state,
      searchParams
    };
  },
  [HOTEL_SEARCH_LIST_DATA](state, action) {
    const Data = action.payload.data;
    return {
      ...state,
      searchListData: Data.resultList
    };
  }
}, {
  test: 0,
  searchParams: {
    startDate: '',
    endDate: ''
  },
  searchListData: []
});
