export default ({ HOTEL_SEARCH_LIST_DATA, http, store }) => {
  return {
    SEARCH_LIST(e) {
      return http({
        url: '/hdocking/hotel-search/list',
        mask: true,
        data: e,
        method: 'POST'
      }).then(res => {
        store.dispatch({
          type: HOTEL_SEARCH_LIST_DATA,
          payload: res
        });
        // return res;
      });
    }
  };
};
