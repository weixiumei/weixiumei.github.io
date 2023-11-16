<template>
  <view>
		<view class="container">
			<view class="row">
				<view class="grid">
          <navigator
            url="/page/FE/home" 
            @click="goPage('FE/home')" 
            hover-class="navigator-hover">前端面试题</navigator>
          <!-- <navigator
            url="/page/FE/home" 
            @click="goPage('FE/home')" 
            hover-class="navigator-hover">英语学习</navigator> -->
				</view>
			</view>
		</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: 'Study',
    }
  },
  onLoad() {},
  methods: {
    goPage(url) {
      uni.navigateTo({
			  url: url
			});
    }
  },
}
</script>

<style lang="scss">
.container{
  margin: 20px 5px;
}
.container .row{
  display: flex;
}
.container .row .grid{
  // width: 200px;
  // height: 200px;
  padding: 10px;
  text-align: center;
  border-radius: 4px;
  border: 1px solid #656464;
}
.cal_text{
  font-size: 16px;
  color: #989898;
}
a{
  text-decoration:none; 
  color:#333; 
}
image{
  width: 50px;
  height: 50px;
}
.head{
  padding: 5px 10px;
  background: #0c0b0b;
  color: #d3d3d3;
  margin-top: 16px;
}
.title{
  margin: 5px 10px;
  font-weight: 500;
  color: #d3d3d3;
}
.content{
  padding: 5px 10px;
  font-size: 14px;
  color: #989898;
}
.hr{
  border-top: 1px solid #4b4848;
  margin-top: 10px;
}
// table{
//   width: 96%;
//   font-weight: lighter;
//   margin: 3% 2%;
//   border-radius: 8px;
//   color: #a8a8a8;
// }
// table tr td:nth-child(2){
//   color: #F8930F;
//   text-align: center;
// }
// table .tit{
//   background: #1d1b1b;
//   font-weight: 500;
//   color: #a8a8a8!important;
// }
// table td{
//   border: 1px solid;
//   padding: 3px;
//   border-style: solid;
//   border-color: #4b4848;
//   border-top: 0;
//   border-left: 0;
//   border-right: 0;
// }
// .content {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// }

</style>
