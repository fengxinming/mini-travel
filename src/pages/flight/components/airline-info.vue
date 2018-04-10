<template lang="jade">
  view#airline-info
    view.info
      view.t-r
        view.ads 上海
        view.date 16:00
        view.airport 上海
      view
      view.t-l
        view.ads 上海
        view.date 16:00
        view.airport 上海
    view.service
      text 03月14日 明天 | 上航FM9331 | 333(大)
</template>

<script>
import wepy from 'wepy';

export default class Panel extends wepy.component {
  props = {
    airLineInfo: Object
  };
  data = {
  };
  onLoad() {
  }
}
</script>

<style lang="styl" src="./airline-info.styl"></style>