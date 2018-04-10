import { handleActions } from 'redux-actions';
import { CITY_LIST_DATA } from '../types/c-city';

export default handleActions({
  [CITY_LIST_DATA](state, action) {
    let citys = [];
    wx.request({
      url: 'http://test.h5.ziztour.com/rest/hdocking/hotel/getCityList',
      header: {
        'x-auth-token': '4ef084c1-7737-4d11-8ae4-c3a9bc89609a',
        'content-type': 'application/json'
      },
      dataType: 'json',
      method: 'GET',
      success: function (data) {
        citys = citys.concat(data);
      }
    });
    return {
      ...state,
      citys
    }
  }
}, {
  citys: []
})
