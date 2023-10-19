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
		<view class="monthly_supply">
			<view v-if="shangYe.selectLoanType=='等额本息'">每月还款(元)</view>
			<view v-else>首月还款(元)</view>
			<view class="month_flex">
				<view v-if="shangYe.selectLoanType=='等额本息'" class="mont_mount mount_color">{{ preLoan }}</view>
				<view v-else class="mont_mount mount_color">{{ firstMonth }}</view>
				<view class="detail focus_font_color" @click="go_detail()">月供详情 ></view>
			</view>
			<view class="monthly_detail">
				<view>每月递减<view class="mount_color">{{ decreaseMonth }}</view></view>
				<view>支付利息<view class="mount_color">{{ totalInterest }}</view></view>
				<view>还款总额<view class="mount_color">{{ totalMoney }}</view></view>
			</view>
			<view class="line"></view>
		</view>

    <!-- 贷款总额 -->
    <view class="loan_sum">
      <label class="label_tit">贷款总额</label>
      <view class="num inputWidh">
        <input v-model="shangYe.loanAmount" type="number" placeholder="0" /><span>万元</span>
      </view>
    </view>
    <!-- 贷款期限 -->
    <div class="loan_years">
      <label class="label_tit">贷款期限</label>
      <slider
        class="inputWidh"
        activeColor="#f8930f" 
        style="margin-right: 0px;"
        backgroundColor="#000000" 
        block-size="20"
        :value="shangYe.loanYears" 
        @change="sliderChange" 
        min="1" max="30" show-value/> 年
    </div>
    <!-- 还款方式 -->
    <div class="loan_type">
      <label class="label_tit">还款方式</label>
      <view class="bars inputWidh">
        <block v-for="(item, index) in types" :key="index">
          <view 
            class="item" 
            style="width: 50%;"
            @click="changeRepaymentype(item)"
            :class="shangYe.selectLoanType == item.value ? 'active' : ''"
            >{{item.label}}</view>
        </block>
      </view>
    </div>
    <!-- 利率 -->
    <div class="loan_rate">
      <label class="label_tit">利率</label>
      <view class="num inputWidh">
        <input v-model="shangYe.loanRate" type="number" placeholder="请输入贷款利率" /><span>%</span>
      </view>
    </div>
  </view>
</template>
<script>
import { calculateEqualPrincipalAndInterest, calculateEqualPrincipal } from '../utils/calculate.js'
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

      preLoan: 0,
      decreaseMonth: 0,
      totalInterest: 0,
      totalMoney: 0,
      firstMonth: 0,

      types: [

        { label: '等额本息', value: '等额本息' },
        { label: '等额本金', value: '等额本金' },
      ],
      shangYe: {
        selectLoanType: '等额本息',
        loanAmount: 0,
        loanYears: 30,
        loanRate: 4.35
      }
    }
  },
  watch: {
    shangYe: {
      handler: function () {
        let principal = this.shangYe.loanAmount * 10000;
        let months = this.shangYe.loanYears * 12
        let loanRate = (this.shangYe.loanRate/ 100).toFixed(4) * 1 || 0
        let { selectLoanType } = this.shangYe
        if (principal > 0) {
          var ret = {}, ret1 = {}, ret2 = {};
          if (selectLoanType == '等额本息') {
            if (this.selectTab == 'shangye' || this.selectTab == 'gongjijin') { // 商业或公积金
              // console.log('--', principal, months, loanRate)
              ret = calculateEqualPrincipalAndInterest(principal, months, loanRate);
              console.log('==', ret)
              this.preLoan = this.num_format(ret.preLoan || 0);
              this.decreaseMonth = this.num_format(ret.decreaseMonth || 0);
              this.totalInterest = this.num_format((ret.interest || 0) / 10000, 2) + "万";
              this.totalMoney = this.num_format((ret.totalMoney || 0) / 10000, 2) + "万";
            }
          } else if (selectLoanType == '等额本金') {
            if (this.selectTab == 'shangye' || this.selectTab == 'gongjijin') { // 商业或公积金
              ret = calculateEqualPrincipal(principal, months, loanRate);
              console.log('==', ret)
              this.firstMonth = this.num_format(ret.firstMonth || 0);
              this.decreaseMonth = this.num_format(ret.decreaseMonth || 0);
              this.totalInterest = this.num_format((ret.totalInterest || 0) / 10000, 2) + "万";
              this.totalMoney = this.num_format((ret.totalMoney || 0) / 10000, 2) + "万";
            }
          }
        }
      },
      deep: true
    },
  },
  
  methods: {
    changeLoanType(item) {
      // 还款tab变更
      this.selectTab = item.value
    },
    changeRepaymentype(item) {
      // 还款方式tab变更
      this.shangYe.selectLoanType = item.value
    },
    go_detail() {
      // 月供详情
      console.log('月供详情')
    },
    sliderChange(e) {
      this.shangYe.loanYears = e.detail.value
    },
    num_format(num, decimal) {
      decimal = decimal || 0;
      return (num.toFixed(decimal) * 1).toLocaleString();
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
    .loan_sum, .loan_years, .loan_type, .loan_rate{
      display: flex;
      align-items: center;
      width: 100%;
      margin-top: 10px;
    }
    .inputWidh {
      width: 76%;
    }
    .num {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: auto;
      background: #171717;
      padding: 0px 2px;
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
</style>