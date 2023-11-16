<template>
  <view v-if="showDetail" class="detailInfoView">
    <view class="head">
      <view @click="showDetail=false" class="close"> 关闭详情 </view>
      <view class="bars">
        <block v-for="(item, index) in types" :key="index">
          <view 
            class="item" style="width: 50%;"
            @click="changeDetailRepaymentType(item)"
            :class="baseInput.selectRepaymentType == item.value ? 'active' : ''"
            >{{item.label}}</view>
        </block>
      </view>
    </view>
    
    <!-- 组合 -->
    <view v-if="selectTab === 'zuhe'" class="uni-container">
      <uni-table ref="table" :loading="detailInfo.loading" stripe emptyText="暂无更多数据">
        <uni-tr>
          <uni-th align="center">还款时间</uni-th>
          <uni-th align="center">还款金额</uni-th>
          <uni-th align="center">商业贷款</uni-th>
          <uni-th align="center">公积金贷款</uni-th>
        </uni-tr>
        <uni-tr v-for="(item, index) in detailInfo.tableData" :key="index">
          <uni-td>{{ item.year_month }}</uni-td>
          <uni-td>{{ item.item1 }}</uni-td>
          <uni-td>{{ item.item2 }}</uni-td>
          <uni-td>{{ item.item3 }}</uni-td>
        </uni-tr>
      </uni-table>
      <view class="uni-pagination-box">
        <uni-pagination 
          show-icon 
          :page-size="detailInfo.pageSize" 
          :current="detailInfo.pageCurrent" 
          :total="detailInfo.total" 
          @change="sizeChange" />
      </view>
      <!-- <table class="table1">
        <thead><tr><td>还款时间</td> <td>还款金额</td> <td>商业贷款</td> <td>公积金贷款</td></tr></thead>
      </table>
      <table class="table2">
        <thead><tr><td>还款时间</td> <td>还款金额</td> <td>商业贷款</td> <td>公积金贷款</td></tr></thead>
        <tbody>
        <tr v-for="item in detailInfo.tableData">
          <td>{{item.year_month}}</td>
          <td>{{item.item1}}</td>
          <td>{{item.item2}}</td>
          <td>{{item.item3}}</td>
        </tr>
      </tbody>
      </table> -->
    </view>

    <!-- 商业、公积金、提前 -->
    <view v-else class="uni-container">
      <uni-table ref="table" :loading="detailInfo.loading" stripe emptyText="暂无更多数据">
        <uni-tr>
          <uni-th align="center">还款时间</uni-th>
          <uni-th align="center">偿还本息</uni-th>
          <uni-th align="center">偿还本金</uni-th>
          <uni-th align="center">支付利息</uni-th>
          <uni-th align="center">剩余本金</uni-th>
        </uni-tr>
        <uni-tr v-for="(item, index) in detailInfo.tableData" :key="index">
          <uni-td>{{ item.year_month }}</uni-td>
          <uni-td>{{ item.item1 }}</uni-td>
          <uni-td>{{ item.item2 }}</uni-td>
          <uni-td>{{ item.item3 }}</uni-td>
          <uni-td>{{ item.item4 }}</uni-td>
        </uni-tr>
      </uni-table>
      <view class="uni-pagination-box">
        <uni-pagination 
          show-icon 
          :page-size="detailInfo.pageSize" 
          :current="detailInfo.pageCurrent" 
          :total="detailInfo.total" 
          @change="sizeChange" />
      </view>
      <!-- <table class="table1">
        <thead><tr><td>还款时间</td> <td>偿还本息</td> <td>偿还本金</td> <td>支付利息</td><td>剩余本金</td></tr></thead>
      </table>
      <table class="table2">
        <thead><tr><td>还款时间</td> <td>偿还本息</td> <td>偿还本金</td> <td>支付利息</td><td>剩余本金</td></tr></thead>
        <tbody style="height: 400px;">
          <tr v-for="item in detailInfo.tableData">
            <td>{{item.year_month}}</td>
            <td>{{item.item1}}</td>
            <td>{{item.item2}}</td>
            <td>{{item.item3}}</td>
            <td>{{item.item4}}</td>
          </tr>
        </tbody>
      </table> -->
    </view>
  </view>
  <view v-else class="mortgage_class">
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
    <view v-if="selectTab == 'tiqian'" class="tiqian">
      <!-- 原每月还款 -->
      <view class="monthly_supply">
        <view>原来每月还款(元)</view>
        <view class="month_flex">
          <view class="mont_mount mount_color">{{ preLoan }}</view>
          <view class="detail focus_font_color" @click="go_detail()">月供详情<icon type="search" size="20" color="#f8930f"/></view>
        </view>
        <view class="monthly_detail">
          <view>节省利息<view class="mount_color">{{ saveInterest }}</view></view>
          <view>支付利息<view class="mount_color">{{ totalInterest }}</view></view>
          <view>还款总额<view class="mount_color">{{ totalMoney }}</view></view>
        </view>
        <view class="monthly_detail">
          <view>当月还款<view class="mount_color">{{ new_aheadTotalMoney }}</view></view>
          <view>次月起还款<view class="mount_color">{{ new_newFirstMonth }}</view></view>
          <view>还款截止日期<view class="mount_color">{{ baseInput.endRepayDate }}</view></view>
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
       <div class="item_base">
        <label class="label_tit">原贷款利率</label>
        <view class="num inputWidh">
          <input v-model="baseInput.loanRate" type="number" placeholder="请输入贷款利率" /><span>%</span>
        </view>
      </div>
      <!-- 首次还贷时间 -->
      <div class="item_base">
        <label class="label_tit">首次还贷时间</label>
        <view class="num inputWidh">
          <picker style="width: 100%;" mode="date" :value="baseInput.firstRepayDate" @change="bindDateChange">
            <view class="uni-input">{{baseInput.firstRepayDate}}</view>
          </picker>
        </view>
      </div>
      <!-- 提前还贷时间 -->
      <div class="item_base">
        <label class="label_tit">提前还贷时间</label>
        <view class="num inputWidh">
          <picker style="width: 100%;" mode="date" :value="baseInput.endRepayDate" @change="(e)=>baseInput.endRepayDate=e.detail.value">
            <view class="uni-input">{{baseInput.endRepayDate}}</view>
          </picker>
        </view>
      </div>
      <!-- 提前还贷方式 -->
      <view class="item_base">
        <label class="label_tit">提前还贷方式</label>
        <view class="uni-form-item uni-column">
          <radio-group @change="radio1Change">
            <label>
              <radio color="#f8930f" style="transform:scale(0.7)" value="1" :checked="'1' === baseInput.tiqianRepaymentMethodSelected" />
              一次性还清
            </label>
            <label>
              <radio color="#f8930f" style="transform:scale(0.7)" value="2" :checked="'2' === baseInput.tiqianRepaymentMethodSelected" />
              部分提前还贷
              <view v-if="'2' === baseInput.tiqianRepaymentMethodSelected" class="num" style="width: 100px;">
                <input v-model="baseInput.partAmount" type="number" placeholder="0" /><span>万元</span>
              </view>
            </label>
          </radio-group>
        </view>
      </view>
      <!-- 还款处理方式 -->
      <view class="item_base" v-if="'2' === baseInput.tiqianRepaymentMethodSelected">
        <label class="label_tit">还款处理方式</label>
        <view class="uni-form-item uni-column">
          <radio-group @change="radio2Change">
            <label>
              <radio color="#f8930f" style="transform:scale(0.7)" value="1" :checked="'1' === baseInput.repaymentProcessingMethodSelected" />
              还款时间不变
            </label>
            <label>
              <radio color="#f8930f" style="transform:scale(0.7)" value="2" :checked="'2' === baseInput.repaymentProcessingMethodSelected" />
              月供不变
            </label>
          </radio-group>
        </view>
      </view>
    </view>
    <block v-else>
      <!-- 每月还款 -->
      <view class="monthly_supply">
        <view v-if="shangYe.selectRepaymentType=='等额本息'">每月还款(元)</view>
        <view v-else>首月还款(元)</view>
        <view class="month_flex">
          <view v-if="shangYe.selectRepaymentType=='等额本息'" class="mont_mount mount_color">{{ preLoan }}</view>
          <view v-else class="mont_mount mount_color">{{ firstMonth }}</view>
          <view class="detail focus_font_color" @click="go_detail()">月供详情<icon type="search" size="20" color="#f8930f"/></view>
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
import uniTable from "@/uni_modules/uni-table/components/uni-table/uni-table"
// import { uniTable } from '@dcloudio/uni-ui'
import {
  calculateEqualPrincipalAndInterest,
  calculateEqualPrincipal,
  calculateEqualPrincipalAndInterestApart,
  calculateEqualPrincipalAndInterestApart2,
  onetimePayment_oncalculateEqualPrincipalAndInterest,
  onetimePayment_calculateEqualPrincipal,
  calculateEqualPrincipalApart2,
  calculateEqualPrincipalApart,
  calculateEqualPrincipalAndInterestArray,
  calculateEqualPrincipalArray,
  onetimePayment_createArray_calculateEqualPrincipalAndInterest,
  createArray_calculateEqualPrincipalAndInterestApart2,
  createArray_calculateEqualPrincipalAndInterestApart,
  onetimePayment_createArray_calculateEqualPrincipal,
  createArray_calculateEqualPrincipalApart2,
  createArray_calculateEqualPrincipalApart
} from '../utils/calculate.js'
export default {
  data() {
    return {
      showDetail: false,
      repaymentList: [
        { label: '商业', value: 'shangye' },
        { label: '公积金', value: 'gongjijin' },
        { label: '组合', value: 'zuhe' },
        { label: '提前还贷', value: 'tiqian' },
      ],
      selectTab: 'shangye',

      preLoan: 0, // 每月还款 / 原每月还款
      decreaseMonth: 0, // 每月递减
      totalInterest: 0, // 支付利息
      totalMoney: 0, // 还款总额
      firstMonth: 0, // 首月还款(元)

      saveInterest: 0,// 节省利息
      new_aheadTotalMoney: 0,// 当月还款
      new_newFirstMonth: 0,// 次月起还款
        
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
        payTimes: 0, // 已还次数
        loanAmount2: 50, // 公积金利率贷款
        loanRate2: 3.1, // 公积金利率
        firstRepayDate: '',// 首次还贷时间
        endRepayDate: '',// 提前还贷时间
        tiqianRepaymentMethodSelected: '', // 提前还贷方式
        partAmount: 0, // 部分提前还贷时
        repaymentProcessingMethodSelected: '' // 还款处理方式
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
        payTimes: 0, // 已还次数
        firstRepayDate: this.getDate(),// 首次还贷时间
        endRepayDate:  this.getDate('end'),// 提前还贷时间
        tiqianRepaymentMethodSelected: '1', // 提前还贷方式
        partAmount: 0, // 部分提前还贷时
        repaymentProcessingMethodSelected: '1' // 还款处理方式
      },
      detailInfo: {
        selectRepaymentType: '等额本息',
        tableData: [],
        // 每页数据量
        pageSize: 12,
        // 当前页
        pageCurrent: 1,
        // 数据总量
        total: 0,
        loading: false
      }
    }
  },
  components: {  
    uniTable  
  },
  mounted() {
    this.baseInput = { ...this.shangYe }
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
        } else if (this.selectTab == 'tiqian') {
          this.tiqian = {
            selectLoanType: this.baseInput.selectLoanType, // 贷款类型
            selectRepaymentType: this.baseInput.selectRepaymentType,
            loanAmount: this.baseInput.loanAmount,
            loanYears: this.baseInput.loanYears,
            loanRate: this.baseInput.loanRate,
            firstRepayDate: this.baseInput.firstRepayDate,// 首次还贷时间
            endRepayDate: this.baseInput.endRepayDate,// 提前还贷时间
            tiqianRepaymentMethodSelected: this.baseInput.tiqianRepaymentMethodSelected, // 提前还贷方式
            partAmount: this.baseInput.partAmount, // 部分提前还贷时
            repaymentProcessingMethodSelected: this.baseInput.repaymentProcessingMethodSelected // 还款处理方式
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
      } else if (this.selectTab == 'tiqian') {
        this.baseInput = { ...this.tiqian }
      }
      this.getData()
    },
    radio1Change(e) {
      this.baseInput.tiqianRepaymentMethodSelected = e.detail.value
    },
    radio2Change(e) {
      this.baseInput.repaymentProcessingMethodSelected = e.detail.value
    },
    bindDateChange(e) {
      this.baseInput.firstRepayDate = e.detail.value
    },
    changeLoanType(item) {
      // 原贷款方式tab变更
      this.baseInput.selectLoanType = item.value
    },
    changeRepaymentType(item) {
      // 还款方式tab变更
      this.baseInput.selectRepaymentType = item.value
    },
    changeDetailRepaymentType(item) {
      // 详情还款方式tab变更
      this.baseInput.selectRepaymentType = item.value
      this.go_detail()
    },
    // 分页触发
		sizeChange(e) {
			this.$refs.table.clearSelection()
      this.go_detail(e.current)
		},
    go_detail(pageCurrent) {
      this.detailInfo.pageCurrent = pageCurrent ? pageCurrent : 1
      this.showDetail = true
      this.detailInfo.tableData = []
      // this.detailInfo.selectRepaymentType = this.baseInput.selectRepaymentType
      // 月供详情
      if (this.selectTab === 'shangye' || this.selectTab === 'gongjijin') {
        this.calculate_normal_detail()
      } else if (this.selectTab === 'zuhe'){
        this.calculate_normal_zuhe()
      } else if(this.selectTab === 'tiqian'){
        this.calculate_advance_detail()
      }
    },

    // 商业公积金详情显示
    calculate_normal_detail() {
      let principal = this.baseInput.loanAmount * 10000;
      let months = this.baseInput.loanYears * 12
      let rate = (this.baseInput.loanRate / 100).toFixed(4) * 1 || 0
      
      let result;
      if (this.baseInput.selectRepaymentType == '等额本息') {
        result = calculateEqualPrincipalAndInterestArray(principal, months, rate);
      } else {
        result = calculateEqualPrincipalArray(principal, months, rate);
      }
      var now = new Date();
      var now_year = now.getFullYear();
      var now_month = now.getMonth();
      var month = now_month + 1, year = now_year + this.detailInfo.pageCurrent - 1;
      
      this.detailInfo.total = result.length
      let start = this.detailInfo.pageCurrent === 1 ? 0: (this.detailInfo.pageCurrent - 1) * this.detailInfo.pageSize
      for (var i = start; i < start + this.detailInfo.pageSize; i++) {
        var item = result[i];
        month = now_month + 1 + i;
        if (month > 12) {
          month = month % 12 == 0 ? 12 : month % 12;
        }
        if (month % 12 == 1) {
          year += 1;
        }
        if (month < 10) {
          month = '0' + month;
        }
        var year_month = year + '.' + month;
        this.detailInfo.totalData = 
        this.detailInfo.tableData.push({
          year_month: year_month,
          item1: Math.round(item[1]).toLocaleString(),
          item2: Math.round(item[2]).toLocaleString(),
          item3: Math.round(item[3]).toLocaleString(),
          item4: Math.round(item[4]).toLocaleString(),
        })
      }
    },
    // 组合详情显示
    calculate_normal_zuhe() {
      let principal1 = this.baseInput.loanAmount * 10000;
      let principal2 = this.baseInput.loanAmount2 * 10000;
      let months = this.baseInput.loanYears * 12
      let rate1 = (this.baseInput.loanRate / 100).toFixed(4) * 1 || 0
      let rate2 = (this.baseInput.loanRate2 / 100).toFixed(4) * 1 || 0
      
      var result1, result2;
      if (this.baseInput.selectRepaymentType == '等额本息') {
          result1 = calculateEqualPrincipalAndInterestArray(principal1, months, rate1);
          result2 = calculateEqualPrincipalAndInterestArray(principal2, months, rate2);
      } else {
          result1 = calculateEqualPrincipalArray(principal1, months, rate1);
          result2 = calculateEqualPrincipalArray(principal2, months, rate2);
      }

      var now = new Date();
      var now_year = now.getFullYear();
      var now_month = now.getMonth();
      var month = now_month + 1, year = now_year + this.detailInfo.pageCurrent - 1;
      
      this.detailInfo.total = result1.length
      let start = this.detailInfo.pageCurrent === 1 ? 0: (this.detailInfo.pageCurrent - 1) * this.detailInfo.pageSize
      for (var i = start; i < start + this.detailInfo.pageSize; i++) {
        month = now_month + 1 + i;
        if (month > 12) {
          month = month % 12 == 0 ? 12 : month % 12;
        }
        if (month % 12 == 1) {
          year += 1;
        }
        if (month < 10) {
          month = '0' + month;
        }
        var year_month = year + '.' + month;
        this.detailInfo.tableData.push({
          year_month: year_month,
          item1: Math.round(result1[i][1] + result2[i][1]).toLocaleString(),
          item2: Math.round(result1[i][1]).toLocaleString(),
          item3: Math.round(result2[i][1]).toLocaleString(),
        })
      }
    },
    // 提前
    calculate_advance_detail() {
      let principal = this.baseInput.loanAmount * 10000;
      let months = this.baseInput.loanYears * 12
      var payTimes = this.baseInput.payTimes * 1;
      let rate = (this.baseInput.loanRate / 100).toFixed(4) * 1 || 0

      var prepayment_method = this.baseInput.tiqianRepaymentMethodSelected;
      var processing_method = this.baseInput.repaymentProcessingMethodSelected;
      var aheadPrincipal = this.baseInput.partAmount * 1;
      var ret;
      if (this.baseInput.selectRepaymentType == '等额本息') {
        if(prepayment_method == '1'){
          // '1':一次性还清
          // 一次性提前还款计算（等额本息）
          ret = onetimePayment_createArray_calculateEqualPrincipalAndInterest(principal, months, payTimes, rate);
        }else if(prepayment_method == '2'){
          // '2':部分提前还清
          if(processing_method == '1'){
            // '1':还款时间不变
            // 部分提前还款计算（等额本息、期限不变）
            ret = createArray_calculateEqualPrincipalAndInterestApart2(principal, months, aheadPrincipal, payTimes, rate);
          }else if (processing_method == '2'){
            // '2':月供不变
            // 部分提前还款计算（等额本息、月供不变）
            ret = createArray_calculateEqualPrincipalAndInterestApart(principal, months, aheadPrincipal, payTimes, rate);
          }
        };
      }else if(this.baseInput.selectRepaymentType == '等额本金'){
        if(prepayment_method == '1'){
          // '1':一次性还清
          // 一次性提前还款计算(等额本金)
          ret = onetimePayment_createArray_calculateEqualPrincipal(principal, months, payTimes, rate);
        }else if(prepayment_method == '2'){
          // '2':部分提前还清
          if(processing_method == '1'){
            // '1':还款时间不变
            // 部分提前还款计算(等额本金、期限不变)
            ret = createArray_calculateEqualPrincipalApart2(principal, months, aheadPrincipal, payTimes, rate);
          }else if (processing_method == '2'){
            // '2':月供不变
            // 部分提前还款计算(等额本金、月供不变)
            ret = createArray_calculateEqualPrincipalApart(principal, months, aheadPrincipal, payTimes, rate);
          }
        }
      }
      var now = new Date();
      var now_year = now.getFullYear();
      var now_month = now.getMonth();

      var month = now_month + 1, year = now_year + this.detailInfo.pageCurrent - 1;
      
      this.detailInfo.total = ret.length
      let start = this.detailInfo.pageCurrent === 1 ? 0: (this.detailInfo.pageCurrent - 1) * this.detailInfo.pageSize
      for (var i = start; i < start + this.detailInfo.pageSize; i++) {
        var item = ret[i];
        month = now_month + 1 + i;
        if (month > 12) {
          month = month % 12 == 0 ? 12 : month % 12;
        }
        if (month % 12 == 1) {
          year += 1;
        }
        if (month < 10) {
          month = '0' + month;
        }
        var year_month = year + '.' + month;
        this.detailInfo.tableData.push({
          year_month: year_month,
          item1: Math.round(item[1]).toLocaleString(),
          item2: Math.round(item[2]).toLocaleString(),
          item3: Math.round(item[3]).toLocaleString(),
          item4: Math.round(item[4]).toLocaleString(),
        })
      }
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
          year = year + 1;
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
      let aheadPrincipal = 0
      if (this.selectTab == 'tiqian') {
        // 提前还款金额
        aheadPrincipal = this.baseInput.partAmount
        // 已还次数
        var first_repay_year = this.baseInput.firstRepayDate.substring(0,4);
        var first_repay_month = this.baseInput.firstRepayDate.substring(5,7);
        var end_repay_year = this.baseInput.endRepayDate.substring(0,4);
        var end_repay_month = this.baseInput.endRepayDate.substring(5,7);
        var payTimes = (end_repay_year - first_repay_year) * 12 + (end_repay_month - first_repay_month);
        this.baseInput.payTimes = payTimes
      }
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
          } else if (this.selectTab == 'tiqian') { // 提前还贷
            if(this.baseInput.tiqianRepaymentMethodSelected == '1'){
              // '1':一次性还清
              // 一次性提前还款计算（等额本息）
              ret = onetimePayment_oncalculateEqualPrincipalAndInterest(principal, months, payTimes, loanRate);
            }else if(this.baseInput.tiqianRepaymentMethodSelected == '2'){
              // '2':部分提前还清
              if(this.baseInput.repaymentProcessingMethodSelected == '1'){
                // '1':还款时间不变
                // 部分提前还款计算（等额本息、期限不变）
                ret = calculateEqualPrincipalAndInterestApart2(principal, months, aheadPrincipal, payTimes, loanRate);
              }else if (this.baseInput.repaymentProcessingMethodSelected == '2'){
                // '2':月供不变
                // 部分提前还款计算（等额本息、月供不变）
                ret = calculateEqualPrincipalAndInterestApart(principal, months, aheadPrincipal, payTimes, loanRate);
              }
            }
            // 原每月还款
            this.preLoan = this.num_format(ret.preLoan);
            // 节省利息
            this.saveInterest = this.num_format(ret.saveInterest / 10000, 2) + "万";
            // 支付利息
            this.totalInterest = this.num_format(ret.new_interest / 10000, 2) + "万";
            // 还款总额
            this.totalMoney = this.num_format(ret.new_totalMoney / 10000, 2) + "万";
            // 当月还款
            this.new_aheadTotalMoney = this.num_format(ret.new_aheadTotalMoney / 10000, 2) + "万";
            // 次月起还款
            this.new_newFirstMonth = this.num_format(ret.new_newFirstMonth);

            // // 还款期限
            // var payDate;
            // var new_months = ret.new_months - 1;
            // var first_repay_year = $('.tiqian .first_repay')[0].value.substring(0,4);
            // var first_repay_month = $('.tiqian .first_repay')[0].value.substring(5,7);
            // var payMonth = first_repay_month * 1 + new_months % 12;
            // if(payMonth > 12){
            //     payDate = (first_repay_year * 1 + Math.floor(new_months/12) + 1) + '年' + ((payMonth % 12)>=10 ? (payMonth % 12) : ('0'+(payMonth % 12))) + '月';
            // }else{
            //     payDate = (first_repay_year * 1 + Math.floor(new_months/12)) + '年' + (payMonth>=10 ? payMonth : ('0'+payMonth)) + '月';                        
            // }
            // $('#mount2_6')[0].innerText = payDate;
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
          } else if (this.selectTab == 'tiqian') { // 提前还贷
            if(this.baseInput.tiqianRepaymentMethodSelected == '1'){
              // '1':一次性还清
              // 一次性提前还款计算(等额本金)
              ret = onetimePayment_calculateEqualPrincipal(principal, months, payTimes, loanRate);
            }else if(this.baseInput.tiqianRepaymentMethodSelected == '2'){
              // '2':部分提前还清
              if(this.baseInput.repaymentProcessingMethodSelected == '1'){
                // '1':还款时间不变
                // 部分提前还款计算(等额本金、期限不变)
                ret = calculateEqualPrincipalApart2(principal, months, aheadPrincipal, payTimes, loanRate);
              }else if (this.baseInput.repaymentProcessingMethodSelected == '2'){
                // '2':月供不变
                // 部分提前还款计算(等额本金、月供不变)
                ret = calculateEqualPrincipalApart(principal, months, aheadPrincipal, payTimes, loanRate);
              }
            }
            // 原每月还款
            this.preLoan = this.num_format(ret.new_firstMonth);
            // 节省利息
            this.saveInterest = this.num_format(ret.new_saveInterest / 10000, 2) + "万";
            // 支付利息
            this.totalInterest = this.num_format(ret.new_interest / 10000, 2) + "万";
            // 还款总额
            this.totalMoney = this.num_format(ret.new_totalMoney / 10000, 2) + "万";
            // 当月还款
            this.new_aheadTotalMoney = this.num_format(ret.new_aheadTotalMoney / 10000, 2) + "万";
            // 次月起还款
            this.new_newFirstMonth = this.num_format(ret.new_newFirstMonth);

            // // 还款期限
            // var payDate;
            // var new_months = ret.new_months - 1;
            // var first_repay_year = $('.tiqian .first_repay')[0].value.substring(0,4);
            // var first_repay_month = $('.tiqian .first_repay')[0].value.substring(5,7);
            // var payMonth = first_repay_month * 1 + new_months % 12;
            // if(payMonth > 12){
            //     payDate = (first_repay_year * 1 + Math.floor(new_months/12) + 1) + '年' + ((payMonth % 12)>=10 ? (payMonth % 12) : ('0'+(payMonth % 12))) + '月';
            // }else{
            //     payDate = (first_repay_year * 1 + Math.floor(new_months/12)) + '年' + (payMonth>=10 ? payMonth : ('0'+payMonth)) + '月';                        
            // }
            // $('#mount2_6')[0].innerText = payDate;
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

// #ifdef MP-WEIXIN
radio-group label {
  display: flex;
  align-items: center;
}
// #endif

// #ifdef H5
.uni-label-pointer {
  display: flex;
  align-items: center;
}
// #endif
.uni-radio-input {
  width: 18px;
  height: 18px;
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
    background-color: #393939;
    border-radius: 4px;
    transition-duration: 0.3s;
    transition-timing-function: linear;
    // border: 1px solid #000;
    // box-shadow: 0px 2px 1px #444;
  }
}
.mortgage_class {
  padding: 8px 18px;
  color: #989898;
  background: #242323;
  height: 100vh;
  overflow: scroll;
  .label_tit{
    width: 22%;
  }
  .tiqian {
    margin-bottom: 20px;
  }
  .tiqian .label_tit{
    width: 30%;
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
        font-size: 16px;
    }
    .mont_mount{
      font-size: 1.7rem;
      margin: 0.5rem 0;
    }
    .monthly_detail{
      display: flex;
      justify-content: space-around;
      margin: 15px 0;
      view:nth-child(n) {
        width: 110px;
        text-align: center;
      }
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
      background: #171717;
      display: flex;
      padding: 20px 0;
      icon{
        margin-left: 10px;
      }
    }
  }
  // .line{
  //   height: 10px;
  //   width: 100%;
  //   border: none;
  //   border: 1px solid #242323;
  //   background-color: #242323;
  // }
    .loan_sum, .loan_years, .loan_type, .loan_rate, .item_base{
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
      height: 32px;
      width: 100%;
      color: #f8930f;
      font-size: 16px;
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
        font-size: 16px;
      }
      span{
        text-wrap: nowrap;
      }
    }
}

.detailInfoView {
  width: 96%;
  margin: 2%;
  background: #fff;
  padding: 1px;
  height: 90vh;
  overflow: auto;
  .uni-container {
    margin-top: 100px;
  }
  .head{
    position: fixed;
    width: 96vw;
    background: #fff;
    z-index: 1;
  }
  // tbody{
  //   height: 400px;
  //   // overflow: auto;
  // }
  // .table1{
  //   position: fixed;
  //   width: 96vw;
  //   margin-top: 0px;
  //   background: #fff;
  // }
  // .table2{
  //   margin-top: 90px;
  //   thead{
  //     opacity: 0;
  //   }
  // }
  table{
    width: 100%;
    // overflow: auto;
    border-collapse: collapse;
    text-align: center;
    border: none;
    tr{
      height: 36px;
    }
    tr:nth-child(2n) {
      background: rgb(240, 240, 240);
    }
  }
  .close{
    text-align: right;
    margin: 10px;
    color: #f8930f;
    // border: 1px solid #f8930f;
  }
}
</style>