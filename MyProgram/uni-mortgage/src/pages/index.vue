<template>
  <view>
		<div class="container">
			<div class="row">
				<div class="grid">
					<a @click="goPage('cal_mortgage')" >
						<img src="/static/img/icon.png" alt="">
						<div class="cal_text">房贷计算器</div>
					</a>
				</div>
				<!-- <div class="grid">
					<a href="cal_science.html">
						<img src="/static/img/science.png" alt="">
						<div class="cal_text">科学计算器</div>
					</a>
				</div> -->
			</div>
			<!-- <div class="row">
					<div class="grid">
						<a href="cal_tax_rate.html">
							<img src="/static/img/rate.png" alt="">
							<div class="cal_text">税率计算器</div>
						</a>
					</div>
					<div class="grid">
						<a href="information.html">
							<img src="/static/img/information.png" alt="">
							<div class="cal_text">房产资讯</div>
						</a>
					</div>
				</div> -->
		</div>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: 'Mortgage',
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
html,body{
  margin: 0;
  padding: 0;
  background-color: #242323;
}
.container{
  margin: 20px 5px;
}
.container .row{
  display: flex;
}
.container .row .grid{
  width: 200px;
  padding: 10px;
  text-align: center;
  border: 1px solid #2e2d2d;
}
.cal_text{
  font-size: 20px;
  color: #989898;
}
a{
  text-decoration:none; 
  color:#333; 
}
img{
  width: 50px;
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
table{
  width: 96%;
  font-weight: lighter;
  margin: 3% 2%;
  border-radius: 8px;
  color: #a8a8a8;
}
table tr td:nth-child(2){
  color: #F8930F;
  text-align: center;
}
table .tit{
  background: #1d1b1b;
  font-weight: 500;
  color: #a8a8a8!important;
}
table td{
  border: 1px solid;
  padding: 3px;
  border-style: solid;
  border-color: #4b4848;
  border-top: 0;
  border-left: 0;
  border-right: 0;
}
// .content {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// }

</style>
