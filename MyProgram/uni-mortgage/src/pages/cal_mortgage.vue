<template>
  <view class="mortgage_class">
    <!-- 还款tab -->
    <view class="bars">
      <block v-for="(item, index) in repaymentList" :key="index">
        <view 
          class="item" 
          @click="changeLoanType(item)"
          :class="selectTab == item.value ? 'active' : ''"
          >{{item.label}}</view>
      </block>
    </view>
    <!-- 每月还款 -->
		<view v-if="selectTab !== 'tiqian'" class="monthly_supply">
			<view>每月还款(元)</view>
			<view class="month_flex">
				<view class="mont_mount mount_color">0</view>
				<view class="detail focus_font_color" @click="go_detail()">月供详情 ></view>
			</view>
			<view class="monthly_detail">
				<view>每月递减<view class="mount_color">0</view></view>
				<view>支付利息<view class="mount_color">0</view></view>
				<view>还款总额<view class="mount_color">0</view></view>
			</view>
			<view class="line"></view>
		</view>
    <!-- 商业 -->
    <view class="shangye">
			<view class="loan_sum">
				<label class="label_tit">贷款总额</label>
				<view class="num">
          <input v-model="loanAmount" type="number" placeholder="0" /><span>万元</span>
        </view>
			</view>
			<div class="loan_years">
				<label class="label_tit">贷款期限</label>
        <slider
          style="width:50%;" 
          activeColor="#f8930f" 
          backgroundColor="#000000" 
          :value="loanYears" 
          @change="sliderChange" 
          min="1" max="30" show-value/> 年
			</div>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      repaymentList: [
        { label: '商业', value: 'shangye' },
        { label: '公积金', value: 'gongjijin' },
        { label: '组合', value: 'zuhe' },
        { label: '提前还贷', value: 'tiqian' },
      ],
      selectTab: 'shangye',
      loanAmount: 0,
      loanYears: 30
    }
  },
  methods: {
    changeLoanType(item) {
      // 还款方式tab变更
      this.selectTab = item.value
    },
    go_detail() {
      // 月供详情
      console.log('月供详情')
    },
    sliderChange(e) {
      this.loanYears = e.detail.value
    }
  }
}
</script> 
<style lang="scss" scoped>
.mortgage_class {
  margin: 8px;
  color: #989898;
  .label_tit{
    width: 22%;
  }
  // 还款tab
  .bars{
    display: flex;
    justify-content: space-around;
    padding: 2px;
    background-color: #161616;
    border-radius: 4px;
    margin: 6px 2px;
    .item {
      width: 25%;
      text-align: center;
      display: inline-block;
      color: #989898;
      padding: 6px;
      margin: 1px;
    }
    // border: 1px solid #000;
    // width: 100%;
    // box-shadow: 0px 2px 1px #444;
    .active{
      color: #f8930f;
      background-color: #242323;
      border-radius: 4px;
      transition-duration: 0.3s;
      transition-timing-function: linear;
      // border: 1px solid #000;
      // box-shadow: 0px 2px 1px #444;
    }
  }
  // 每月还款
  .monthly_supply{
    color: #989898;
    padding-top: 6px;
    background-color: #171717;
    text-align: center;
    .month_flex {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.5rem;
    }
    .detail{
      position: absolute;
      right: 6%;
      font-size: 1rem;
    }
    .mount_color{
        color: #fff;
    }
    .mont_mount{
      font-size: 1.5rem;
      margin: 0.5rem 0;
    }
    .monthly_detail{
      display: flex;
      justify-content: space-around;
    }
    // .monthly_detail > view{
    //   margin: .3rem 1rem;
    //   width: 25%;
    // }
    // .monthly_detail > view > view{
    //   margin-top: .3rem;
    // }
    .focus_font_color{
      color: #f8930f;
    }
  }
  .line{
    height: 10px;
    width: 100%;
    border: none;
    border: 1px solid #242323;
    background-color: #242323;
  }
  .shangye{
    .loan_sum, .loan_years{
      display: flex;
      align-items: center;
    }
    .num{
      display: flex;
      align-items: center;
      height: auto;
      background: #171717;
      padding: 0px 5px;
      text-align: right;
      box-shadow: 0px 1px 1px #444;
      border: 1px solid #000;
      border-radius: 4px;
      input{
        padding: 6px;
        color: #f8930f;
      }
    }
  }
}
</style>