
<template lang='jade'>
  view.container
  view.userinfo(@tap='handleViewTap')
    image.userinfo-avatar(src='{{ userInfo.avatarUrl }}', background-size='cover')
      view.userinfo-nickname {{ userInfo.nickName }}
  view
    | hello world

</template>

<script>
import wepy from 'wepy';
// import testMixin from '../mixins/test';

export default class Index extends wepy.page {
  config = {
    navigationBarTitleText: '订单'
  };
  components = {};

  // mixins = [testMixin];

  data = {
    userInfo: {
      nickName: '加载中...'
    }
  };

  computed = {};

  methods = {};

  events = {};

  onLoad() {
    let self = this;
    this.$parent.getUserInfo(function(userInfo) {
      if (userInfo) {
        // self.userInfo = userInfo;
        // self.$apply();
        self.setData({ userInfo: userInfo });
      }
    });
  }
}
</script>

<style lang="styl">
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}
</style>
