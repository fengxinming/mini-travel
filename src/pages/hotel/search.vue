<template lang="view">
  block(data-name="search-bar")
    view.search-wrapper
      view.search
        image.search-icon(src=travelConfig.imagePrefix+"/images/hotel/search-icon.png" alt="搜索")
        input.input-search(placeholder="酒店名/位置区域/地点")
      view.confirm 确定
  block(data-name="search-history")
    view.search-history
      view.title
        view.history-text 搜索历史
        view.clear-history 清楚历史
      view.list-wrapper
        repeat(for="{{listData}}" item="item")
          view.list(class="{{1==item.id?'active':''}}") {{item.text}}
  block(data-name="ari-train")
    view.search-history
      view.title
        view.history-text 机场车站
      view.list-wrapper
        repeat(for="{{listData}}" item="item")
          view.list(class="{{1==item.id?'active':''}}") {{item.text}}
  block(data-name="business")
    view.search-history
      view.title
        view.history-text 商圈
      view.list-wrapper
        repeat(for="{{listData}}" item="item")
          view.list(class="{{1==item.id?'active':''}}") {{item.text}}
</template>

<script>
import wepy from 'wepy';

export default class Index extends wepy.page {
  config = {
    navigationBarTitleText: '关键词'
  };

  data = {
    imagePrefix: '',
    listData: [
      {
        id: 1,
        text: 'one'
      },
      {
        id: 2,
        text: 'two'
      },
      {
        id: 3,
        text: 'three'
      },
      {
        id: 4,
        text: 'one'
      },
      {
        id: 5,
        text: 'two'
      },
      {
        id: 6,
        text: 'three'
      }
    ]
  };
  onLoad() {
    this.imagePrefix = global.travelConfig.imagePrefix;
  }
}
</script>

<style lang="styl" src="../../css/pages/hotel/search.styl"></style>