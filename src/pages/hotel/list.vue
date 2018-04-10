<template lang="jade">
  view.search-header.clearfix
    view.date
      view.left
        text 09-02
        text 09-02
      view.right 2晚
    view.search-bar
      image.search-img(src=travelConfig.imgUrlPrefix + "/images/hotel/search-icon.png" alt="")
      text.input(@tap="goSearch") 酒店名、地标、位置
  view.hotel-list(wx:if="{{searchListData&&searchListData.length}}")
    repeat(for="{{searchListData}}" item='item')
      //- view {{item.title}}
      view.list-dl
        view.list-dt
          image.list-img(src="{{item.pic}}" alt="酒店预览图" width="100%" height="100%")
        view.list-dd
          view.title {{item.name}}
          view.comment 
            text 4.8分 
            text 棒极啦 
            | 132条评价
          p 距离 深圳北站 100米
          view.confirm
            view.btns
              i.btn(wx:if="{{item.travelPriority}}") 差旅优选
              i.btn(wx:if="{{item.recordType === 2}}") 同事入住
            view.price
              i.p ￥{{item.price}}
              | 起
    view.nomore
      i.line
      text 没有更多了
  view.noData(wx:else)
    view.tiptext 抱歉，没有找到符合搜索条件的酒店
    view.tiptext 换个条件查询
    view.search-items
      repeat(for="{{listData}}" item="item")
        view.item {{item.title}}
          view.del(@tap="delItem")
  view.footer
    repeat(for="{{footerData}}" item='item')
      text(class="{{num==index?'active':''}}") {{item.text}}
</template>

<script>
import wepy from 'wepy';
import { connect } from 'wepy-redux';
// import { HOTEL_SEARCH_LIST_DATA } from '@/store/types';
import actions from '@/store/actions';

// const store = getStore();

@connect(
  {
    searchListData(state) {
      return state.hotel.searchListData;
    }
  }
  // {
  //   searchList: actions.hotel.searchList
  // }
)
export default class Index extends wepy.page {
  config = {
    navigationBarTitleText: '深圳'
  };
  data = {
    listData: [
      {
        id: 1,
        title: 'title1'
      },
      {
        id: 2,
        title: 'title2'
      }
    ],
    footerData: [
      { id: 1, text: '智能排序' },
      { id: 2, text: '位置区域' },
      {
        id: 3,
        text: '价格星级'
      },
      { id: 4, text: '筛选' }
    ],
    num: 1,
    params: {}
  };

  methods = {
    goSearch() {
      wx.navigateTo({
        url: './search'
      });
    },
    delItem() {
      console.log('删除搜索条件');
    }
  };

  onLoad() {
    this.params = {
      cityId: '440300',
      startDate: '2018-04-09',
      endDate: '2018-04-010'
    };
    actions.hotel.searchList(this.params);
  }
}
</script>

<style lang="styl" src="../../css/pages/hotel/list.styl"></style>