<template lang="jade">
  block(data-name="search-bar")
    view.search-wrapper
      view.search
        image.search-icon(src=travelConfig.imgUrlPrefix + "/images/hotel/search-icon.png" alt="搜索")
        input.input-search(placeholder="酒店名/位置区域/地点" focus)
      view.confirm 确定
  block(data-name="search-history" wx:if="{{searchHistory.length}}")
    view.search-history
      view.title
        view.history-text 搜索历史
        view.clear-history(@tap="clearHistory") 清楚历史
      view.list-wrapper
        repeat(for="{{searchHistory}}" item="item")
          view.list(class="{{1==item.id?'active':''}}" @tap="checked({{item}})") {{item.name}}
  block(data-name="ari-train" wx:if="{{ariTrain.length}}")
    view.search-history.clearfix
      view.title
        view.history-text 机场车站
      view.list-wrapper.clearfix(class="{{ariTrain.length>6&&!showTranA?'stop':'open'}}")
        repeat(for="{{ariTrain}}" item="item" index="index")
          view.list.toggle-btn(wx:if="{{index===5 && !showTranA}}" @tap="showAll(1)")
          view.list(class="{{1==item.id?'active':''}}" wx:else @tap="checked({{item}})") {{item.area}}
        view.list.toggle-btn.toggle-btn-stop(wx:if="{{showTranA}}" @tap="showAll(1)")
  block(data-name="business" wx:if="{{areaData.length}}")
    view.search-history.clearfix
      view.title
        view.history-text 商圈
      view.list-wrapper.clearfix(class="{{ariTrain.length>6&&!showAreaA?'stop':'open'}}")
        repeat(for="{{areaData}}" item="item" index="index")
          view.list.toggle-btn(wx:if="{{index===5 && !showAreaA}}" @tap="showAll(2)")
          view.list(class="{{1==item.id?'active':''}}" wx:else @tap="checked({{item}})") {{item.area}}
        view.list.toggle-btn.toggle-btn-stop(wx:if="{{showAreaA}}" @tap="showAll(2)")
</template>

<script>
import wepy from 'wepy';
// import http from '@/javascript/http';

export default class Index extends wepy.page {
  config = {
    navigationBarTitleText: '关键词'
  };

  data = {
    imgUrlPrefix: '',
    areaData: [],
    searchHistory: [],
    ariTrain: [],
    showTranA: false,
    showAreaA: false
  };
  methods = {
    clearHistory() {
      wepy
        .request({
          url:
            'http://test.h5.ziztour.com/rest/hdocking/hotel/clearHistorySearch',
          header: {
            'x-auth-token': '1b7088ad-5eca-4426-a6b4-c27d925cced2',
            'content-type': 'application/json'
          },
          dataType: 'json',
          method: 'GET'
        })
        .then(res => {
          this.searchHistory = [];
        });
    },
    showAll(e, toggle) {
      if (e === '1') {
        this.showTranA = !this.showTranA;
      } else if (e === '2') {
        this.showAreaA = !this.showAreaA;
      }
    },
    checked(item) {
      wx.setStorage({
        key: 'key-word',
        data: item
      });
      wx.navigateTo({
        url: '../booking',
        success: res => {
          console.log(res);
        },
        fail: data => {
          console.log(data);
        }
      });
    }
  };
  async onLoad() {
    const vm = this;
    try {
      const value = wx.getStorageSync('city');
      if (value) {
        vm.cityData = value;
      }
    } catch (e) {
      // Do something when catch error
    }
    // http.get({
    //   url: '/hdocking/hotel/getHistorySearch'
    // }).then(res => {
    //   console.log(res);
    // });
    await wepy
      .request({
        url: 'http://test.h5.ziztour.com/rest/hdocking/hotel/getHistorySearch',
        data: {
          cityId: vm.cityData.cityID
        },
        header: {
          'x-auth-token': 'a614e454-3d4d-4870-8f48-2c550feb9594',
          'content-type': 'application/json'
        },
        dataType: 'json',
        method: 'GET'
      })
      .then(res => {
        console.log(res);
        vm.searchHistory = res.data.resultList;
      });
    await wepy
      .request({
        url: 'http://test.h5.ziztour.com/rest/generic/addr/area',
        data: {
          cityId: vm.cityData.cityID,
          type: 2
        },
        header: {
          'x-auth-token': 'a614e454-3d4d-4870-8f48-2c550feb9594',
          'content-type': 'application/json'
        },
        dataType: 'json',
        method: 'GET'
      })
      .then(res => {
        console.log(res);
        vm.areaData = res.data;
      });
    await wepy
      .request({
        url: 'http://test.h5.ziztour.com/rest/generic/addr/area',
        data: {
          cityId: vm.cityData.cityID,
          type: 4
        },
        header: {
          'x-auth-token': 'a614e454-3d4d-4870-8f48-2c550feb9594',
          'content-type': 'application/json'
        },
        dataType: 'json',
        method: 'GET'
      })
      .then(res => {
        console.log(res);
        vm.ariTrain = res.data;
      });
    vm.$apply();
  }
}
</script>

<style lang="styl" src="../../css/pages/hotel/search.styl"></style>