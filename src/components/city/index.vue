<template lang="jade">
  view.city-component
    block(data-name="search-bar")
      view.search-wrapper
        view.search
          image.search-icon(src=travelConfig.imgUrlPrefix + "/images/hotel/search-icon.png" alt="搜索")
          input.input-search(placeholder="城市名/位置/地点" focus)
  view.city-content(wx:if="{{historyCity&&history.length || hotCity&&hotCity.length || letterCity&&letterCity.length}}")
    block(data-name="history-city")
      view.search-history
        view.title
          view.history-text 历史城市
          view.clear-history 清除历史
        view.list-wrapper
          repeat(for="{{historyCity}}" item="item")
            view.list(class="{{item.active?'active':''}}" @tap="selectCity({{item}}, '1')") {{item.abbr}}
    block(data-name="hot-city")
      view.search-history
        view.title
          view.history-text 热门城市
        view.list-wrapper
          repeat(for="{{hotCity}}" item="item")
            view.list(class="{{item.active?'active':''}}" @tap="selectCity({{item}}, '2')") {{item.abbr}}
    block(data-name="letter-city-list")
      view.letter-list
        repeat(for="{{letterCity}}" item="res")
          view.letter-wrapper(class="{{res.active?'active':''}}")
            text.letter-title(@tap="toggle({{res}})") {{res.firstLetter}}
            view.list-city-wrapper
              repeat(for="{{res.cityList}}" item="item")
                view.list-city(@tap="selectCity({{item}}, '3', {{res}})" class="{{item.active?'active':''}}") {{item.abbr}}
</template>

<script>
import wepy from 'wepy';

export default class Index extends wepy.component {
  props = {
    // 是否多选
    multiple: {
      type: [String, Boolean],
      default: false
    },
    // 已选城市
    checkedData: {
      type: Object,
      default: {}
    }
  };

  data = {
    imgUrlPrefix: '',
    historyCity: [],
    hotCity: [],
    letterCity: []
  };

  methods = {
    toggle(item) {
      this.letterCity.map(res => {
        if (item.firstLetter === res.firstLetter) {
          res.active = !res.active;
        }
        return res;
      });
    },
    selectCity(item, num, items) {
      if (num === '1') {
        this.historyCity.map(res => {
          if (res.cityID === item.cityID) {
            res.active = !res.active;
            res.active
              ? this.$emit('checked-city', item)
              : this.$emit('checked-city', '');
          }
          return res;
        });
      } else if (num === '2') {
        this.hotCity.map(res => {
          if (res.cityID === item.cityID) {
            res.active = !res.active;
            res.active
              ? this.$emit('checked-city', item)
              : this.$emit('checked-city', '');
          }
          return res;
        });
      } else {
        this.letterCity.map(res => {
          if (res.firstLetter === items.firstLetter) {
            res.cityList.map(data => {
              if (data.cityID === item.cityID) {
                data.active = !data.active;
                res.active
                  ? this.$emit('checked-city', item)
                  : this.$emit('checked-city', '');
              }
              return data;
            });
          }
        });
      }
    }
  };

  async onLoad() {
    const vm = this;
    await wepy
      .request({
        url: 'http://test.h5.ziztour.com/rest/hdocking/hotel/getCityList',
        header: {
          'x-auth-token': '1b7088ad-5eca-4426-a6b4-c27d925cced2',
          'content-type': 'application/json'
        },
        dataType: 'json',
        method: 'GET'
      })
      .then(res => {
        vm.historyCity = res.data.historyCities;
        vm.hotCity = res.data.hotCities;
        vm.letterCity = res.data.cities;
        vm.$apply();
      });
  }
}
</script>

<style lang="styl" src="./index.styl"></style>