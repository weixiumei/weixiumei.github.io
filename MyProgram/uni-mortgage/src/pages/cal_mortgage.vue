<template>
  <view class="mortgage_class">
    <!-- 还款tab -->
    <view class="bars">
      <block v-for="(item, index) in repaymentList" :key="index">
        <view 
          class="item" 
          @click="changeTab(item)"
          :class="selectTab == item.value ? 'active' : ''"
          >{{item.label}}</view>
      </block>
    </view>
    <!-- 提前还贷 -->
    <block v-if="selectTab == 'tiqian'">
      <!-- 原每月还款 -->
      <view class="monthly_supply">
        <view>原来每月还款(元)</view>
        <view class="month_flex">
          <view class="mont_mount mount_color">{{ preLoan }}</view>
          <view class="detail focus_font_color" @click="go_detail()">月供详情 ></view>
        </view>
        <view class="monthly_detail">
          <view>节省利息<view class="mount_color">{{ decreaseMonth }}</view></view>
          <view>支付利息<view class="mount_color">{{ totalInterest }}</view></view>
          <view>还款总额<view class="mount_color">{{ totalMoney }}</view></view>
        </view>
        <view class="monthly_detail">
          <view>当月还款<view class="mount_color">{{ decreaseMonth }}</view></view>
          <view>次月起还款<view class="mount_color">{{ totalInterest }}</view></view>
          <view>还款截止日期<view class="mount_color">{{ totalMoney }}</view></view>
        </view>
      </view>
      <!-- 原贷款总额 -->
      <view class="loan_sum">
        <label class="label_tit">原贷款总额</label>
        <view class="num inputWidh">
          <input v-model="baseInput.loanAmount" type="number" placeholder="0" /><span>万元</span>
        </view>
      </view>
      <!-- 原贷款类型 -->
      <div class="loan_type">
        <label class="label_tit">原贷款类型</label>
        <view class="bars inputWidh">
          <block v-for="(item, index) in loanTypes" :key="index">
            <view 
              class="item" style="width: 50%;"
              @click="changeLoanType(item)"
              :class="baseInput.selectLoanType == item.value ? 'active' : ''"
              >{{item.label}}</view>
          </block>
        </view>
      </div>
      <!-- 原还款方式 -->
      <div class="loan_type">
        <label class="label_tit">原还款方式</label>
        <view class="bars inputWidh">
          <block v-for="(item, index) in types" :key="index">
            <view 
              class="item" style="width: 50%;"
              @click="changeRepaymentType(item)"
              :class="baseInput.selectRepaymentType == item.value ? 'active' : ''"
              >{{item.label}}</view>
          </block>
        </view>
      </div>
      <!-- 原贷款期限 -->
      <div class="loan_years">
        <label class="label_tit">原贷款期限</label>
        <slider
          class="inputWidh"
          activeColor="#f8930f" 
          style="margin-right: 0px;"
          backgroundColor="#000000" 
          block-size="20"
          :value="baseInput.loanYears" 
          @change="sliderChange" 
          min="1" max="30" show-value/> 年
      </div>
       <!-- 原贷款利率 -->
       <div class="loan_rate">
        <label class="label_tit">原贷款利率</label>
        <view class="num inputWidh">
          <input v-model="baseInput.loanRate" type="number" placeholder="请输入贷款利率" /><span>%</span>
        </view>
      </div>
      <!-- 首次还贷时间 -->
      <div class="loan_rate">
        <label class="label_tit">首次还贷时间</label>
        <view class="num inputWidh">
          <picker
            v-model="baseInput.firstRepayDate" class="date" mode="date"></picker>
            <picker mode="date" :value="baseInput.firstRepayDate" @change="bindDateChange">
              <view class="uni-input">{{date}}</view>
            </picker>
        </view>
      </div>
      <!-- 提前还贷时间 -->
      <div class="loan_rate">
        <label class="label_tit">提前还贷时间</label>
        <view class="num inputWidh">
          <input v-model="baseInput.endRepayDate" type="date" />
        </view>
      </div>
    </block>
    <block v-else>
      <!-- 每月还款 -->
      <view class="monthly_supply">
        <view v-if="shangYe.selectRepaymentType=='等额本息'">每月还款(元)</view>
        <view v-else>首月还款(元)</view>
        <view class="month_flex">
          <view v-if="shangYe.selectRepaymentType=='等额本息'" class="mont_mount mount_color">{{ preLoan }}</view>
          <view v-else class="mont_mount mount_color">{{ firstMonth }}</view>
          <view class="detail focus_font_color" @click="go_detail()">月供详情 ></view>
        </view>
        <view class="monthly_detail">
          <view>每月递减<view class="mount_color">{{ decreaseMonth }}</view></view>
          <view>支付利息<view class="mount_color">{{ totalInterest }}</view></view>
          <view>还款总额<view class="mount_color">{{ totalMoney }}</view></view>
        </view>
      </view>
      <!-- 贷款总额 -->
      <view v-if="selectTab == 'shangye'||selectTab == 'gongjijin'" class="loan_sum">
        <label class="label_tit">贷款总额</label>
        <view class="num inputWidh">
          <input v-model="baseInput.loanAmount" type="number" placeholder="0" /><span>万元</span>
        </view>
      </view>
      <view v-if="selectTab == 'zuhe'" class="loan_sum zuhe">
        <label class="label_tit">商业贷款</label>
        <view class="num inputWidh">
          <input v-model="baseInput.loanAmount" type="number" placeholder="0" /><span>万元</span>
        </view>
        <label class="label_tit" style="margin-left: 16px;">公积金贷款</label>
        <view class="num inputWidh">
          <input v-model="baseInput.loanAmount2" type="number" placeholder="0" /><span>万元</span>
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
          :value="baseInput.loanYears" 
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
              @click="changeRepaymentType(item)"
              :class="baseInput.selectRepaymentType == item.value ? 'active' : ''"
              >{{item.label}}</view>
          </block>
        </view>
      </div>
      <!-- 利率 -->
      <div class="loan_rate">
        <label class="label_tit">利率</label>
        <view class="num inputWidh">
          <input v-model="baseInput.loanRate" type="number" placeholder="请输入贷款利率" /><span>%</span>
        </view>
      </div>
      <div class="loan_rate" v-if="selectTab == 'zuhe'">
        <label class="label_tit">利率</label>
        <view class="num inputWidh">
          <input v-model="baseInput.loanRate2" type="number" placeholder="请输入贷款利率" /><span>%</span>
        </view>
      </div>
    </block>
  </view>
</template>
<script>
import { calculateEqualPrincipalAndInterest, calculateEqualPrincipal } from '../utils/calculate.js'
export default {
  data() {
    const currentDate = this.getDate({
      format: true
    })
    return {
      repaymentList: [
        { label: '商业', value: 'shangye' },
        { label: '公积金', value: 'gongjijin' },
        { label: '组合', value: 'zuhe' },
        { label: '提前还贷', value: 'tiqian' },
      ],
      selectTab: 'shangye',

      // 每月还款
      preLoan: 0,
      decreaseMonth: 0,
      totalInterest: 0,
      totalMoney: 0,
      firstMonth: 0,

      types: [
        { label: '等额本息', value: '等额本息' },
        { label: '等额本金', value: '等额本金' },
      ],
      loanTypes: [
        { label: '商业贷款', value: '商业贷款' },
        { label: '公积金贷款', value: '公积金贷款' },
      ],

      baseInput: {
        selectLoanType: '', // 贷款类型
        selectRepaymentType: '', // 还款方式
        loanAmount: 0,
        loanYears: 0,
        loanRate: 0,
        loanAmount2: 50, // 公积金利率贷款
        loanRate2: 3.1, // 公积金利率
        firstRepayDate: '',// 首次还贷时间
        endRepayDate: '',// 提前还贷时间
      },
      shangYe: {
        selectRepaymentType: '等额本息',
        loanAmount: 100,
        loanYears: 30,
        loanRate: 4.2
      },
      gongjijin: {
        selectRepaymentType: '等额本息',
        loanAmount: 50,
        loanYears: 30,
        loanRate: 3.1
      },
      zuhe: {
        selectRepaymentType: '等额本息',
        loanAmount: 100,
        loanAmount2: 50, // 公积金利率贷款
        loanYears: 30,
        loanRate: 4.2,
        loanRate2: 3.1 // 公积金利率
      },
      tiqian: {
        selectLoanType: '商业贷款', // 贷款类型
        selectRepaymentType: '等额本息',
        loanAmount: 100,
        loanYears: 30,
        loanRate: 4.2,
        firstRepayDate: currentDate,// 首次还贷时间
        endRepayDate:  this.getDate('end'),// 提前还贷时间
      }
    }
  },
  mounted() {
    this.baseInput = { ...this.shangYe }
  },
  watch: {

  },
  watch: {
    baseInput: {
      handler: function () {
        this.getData()
        if (this.selectTab == 'shangye') {
          this.shangYe = {
            selectRepaymentType: this.baseInput.selectRepaymentType,
            loanAmount: this.baseInput.loanAmount,
            loanYears: this.baseInput.loanYears,
            loanRate: this.baseInput.loanRate
          }
        } else if (this.selectTab == 'gongjijin') {
          this.gongjijin = {
            selectRepaymentType: this.baseInput.selectRepaymentType,
            loanAmount: this.baseInput.loanAmount,
            loanYears: this.baseInput.loanYears,
            loanRate: this.baseInput.loanRate
          }
        } else if (this.selectTab == 'zuhe') {
          this.zuhe = {
            selectRepaymentType: this.baseInput.selectRepaymentType,
            loanAmount: this.baseInput.loanAmount,
            loanAmount2: this.baseInput.loanAmount2,
            loanYears: this.baseInput.loanYears,
            loanRate: this.baseInput.loanRate,
            loanRate2: this.baseInput.loanRate2
          }
        }
      },
      deep: true
    }
  },
  methods: {
    changeTab(item) {
      // 还款tab变更
      this.selectTab = item.value
      if (this.selectTab == 'shangye') {
        this.baseInput = { ...this.shangYe }
      } else if (this.selectTab == 'gongjijin') {
        this.baseInput = { ...this.gongjijin }
      } else if (this.selectTab == 'zuhe') {
        this.baseInput = { ...this.zuhe }
      }
      this.getData()
    },
    bindDateChange() {
      console.log('bindDateChange')
    },
    changeLoanType(item) {
      // 原贷款方式tab变更
      this.baseInput.selectLoanType = item.value
    },
    changeRepaymentType(item) {
      // 还款方式tab变更
      this.baseInput.selectRepaymentType = item.value
    },
    go_detail() {
      // 月供详情
      console.log('月供详情')
    },
    sliderChange(e) {
      this.baseInput.loanYears = e.detail.value
    },
    getDate(type) {
        const date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (type === 'start') {
            year = year - 60;
        } else if (type === 'end') {
            year = year + 2;
        }
        month = month > 9 ? month : '0' + month;
        day = day > 9 ? day : '0' + day;
        return `${year}-${month}-${day}`;
    },
    getData() {
      let principal = this.baseInput.loanAmount * 10000;
      let months = this.baseInput.loanYears * 12
      let loanRate = (this.baseInput.loanRate/ 100).toFixed(4) * 1 || 0
      let { selectRepaymentType } = this.baseInput
      if (principal > 0) {
        var ret = {}, ret1 = {}, ret2 = {};
        if (selectRepaymentType == '等额本息') {
          if (this.selectTab == 'shangye' || this.selectTab == 'gongjijin') { // 商业或公积金
            ret = calculateEqualPrincipalAndInterest(principal, months, loanRate);
            this.preLoan = this.num_format(ret.preLoan || 0);
            this.decreaseMonth = this.num_format(ret.decreaseMonth || 0);
            this.totalInterest = this.num_format((ret.interest || 0) / 10000, 2) + "万";
            this.totalMoney = this.num_format((ret.totalMoney || 0) / 10000, 2) + "万";
          } else if (this.selectTab == 'zuhe') { // 组合
            let principal2 = this.baseInput.loanAmount2 * 10000;
            let loanRate2 = (this.baseInput.loanRate2/ 100).toFixed(4) * 1 || 0
            ret1 = calculateEqualPrincipalAndInterest(principal, months, loanRate);
            ret2 = calculateEqualPrincipalAndInterest(principal2, months, loanRate2);
            this.preLoan = this.num_format((ret1.preLoan + ret2.preLoan) || 0);
            this.decreaseMonth = this.num_format((ret1.decreaseMonth + ret2.decreaseMonth) || 0);
            this.totalInterest = this.num_format(((ret1.interest + ret2.interest) || 0) / 10000, 2) + "万";
            this.totalMoney = this.num_format(((ret1.totalMoney + ret2.totalMoney) || 0) / 10000, 2) + "万";
          }
        } else if (selectRepaymentType == '等额本金') {
          if (this.selectTab == 'shangye' || this.selectTab == 'gongjijin') { // 商业或公积金
            ret = calculateEqualPrincipal(principal, months, loanRate);
            this.firstMonth = this.num_format(ret.firstMonth || 0);
            this.decreaseMonth = this.num_format(ret.decreaseMonth || 0);
            this.totalInterest = this.num_format((ret.totalInterest || 0) / 10000, 2) + "万";
            this.totalMoney = this.num_format((ret.totalMoney || 0) / 10000, 2) + "万";
          } else if (this.selectTab == 'zuhe') { // 组合
            let principal2 = this.baseInput.loanAmount2 * 10000;
            let loanRate2 = (this.baseInput.loanRate2/ 100).toFixed(4) * 1 || 0
            ret1 = calculateEqualPrincipal(principal, months, loanRate);
            ret2 = calculateEqualPrincipal(principal2, months, loanRate2);
            this.firstMonth = this.num_format((ret1.firstMonth + ret2.firstMonth) || 0);
            this.decreaseMonth = this.num_format((ret1.decreaseMonth + ret2.decreaseMonth) || 0);
            this.totalInterest = this.num_format(((ret1.totalInterest + ret2.totalInterest) || 0) / 10000, 2) + "万";
            this.totalMoney = this.num_format(((ret1.totalMoney + ret2.totalMoney) || 0) / 10000, 2) + "万";
          }
        }
      }
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
    padding-bottom: 10px;
    margin-bottom: 15px;
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
  // .line{
  //   height: 10px;
  //   width: 100%;
  //   border: none;
  //   border: 1px solid #242323;
  //   background-color: #242323;
  // }
    .loan_sum, .loan_years, .loan_type, .loan_rate{
      display: flex;
      align-items: center;
      width: 100%;
      margin-top: 10px;
    }
    .inputWidh {
      width: 76%;
    }
    .zuhe{
      .inputWidh {
        width: 30%;
      }
    }
    .uni-input{
      height: 25px;
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
      span{
        text-wrap: nowrap;
      }
    }
}
</style>