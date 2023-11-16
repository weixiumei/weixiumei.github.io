<template>
  <view>
    <view class="container">
      <view class="row">
        <view class="grid">
          <navigator url="javaScript" mode="widthFix">
            <view class="cal_text">javaScript</view>
          </navigator>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      title: 'Study'
    }
  },
  onLoad () {},
  methods: {
    // goPage (url) {
    //   uni.navigateTo({
    //     url: url
    //   })
    // }
  }
}
</script>

<style lang="scss">
.container {
  margin: 20px 5px;
}
.container .row {
  display: flex;
}
.container .row .grid {
  // width: 200px;
  // height: 200px;
  padding: 10px;
  text-align: center;
  border-radius: 4px;
  border: 1px solid #656464;
}
.cal_text {
  font-size: 16px;
  color: #989898;
}
a {
  text-decoration: none;
  color: #333;
}
image {
  width: 50px;
  height: 50px;
}
.head {
  padding: 5px 10px;
  background: #0c0b0b;
  color: #d3d3d3;
  margin-top: 16px;
}
.title {
  margin: 5px 10px;
  font-weight: 500;
  color: #d3d3d3;
}
.content {
  padding: 5px 10px;
  font-size: 14px;
  color: #989898;
}
.hr {
  border-top: 1px solid #4b4848;
  margin-top: 10px;
}
</style>
