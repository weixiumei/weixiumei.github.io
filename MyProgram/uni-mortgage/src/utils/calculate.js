
/**
* 计算等额本息还款
*
* @param {*} principal 贷款总额
* @param {*} months 贷款月数
* @param {*} rate 贷款年利率
*/
export function calculateEqualPrincipalAndInterest(principal, months, rate) {
  // var months = years * 12;
  var monthRate = rate / 12;//月利率

  let ret = {};
  //每月还款金额
  ret.preLoan = (principal * monthRate * Math.pow((1 + monthRate), months)) / (Math.pow((1 + monthRate), months) - 1);
  //还款总额
  ret.totalMoney = ret.preLoan * months;
  //还款总利息
  ret.interest = ret.totalMoney - principal;
  //每月利息递减
  ret.decreaseMonth = 0;

  return ret;
}


/**
 * 计算等额本金还款
 * 
 * @param {*} principal 贷款总额
 * @param {*} months 贷款月数
 * @param {*} rate 贷款年利率
 */
export function calculateEqualPrincipal(principal, months, rate) {
  // var months = years * 12;
  var monthRate = rate / 12;//月利率
  let ret = {};

  //每月还款本金
  var everyMonthPrincipal = principal / months;
  ret.everyMonthPrincipal = everyMonthPrincipal;

  //第一个月还款金额
  ret.firstMonth = everyMonthPrincipal + principal * monthRate;
  //每月利息递减
  ret.decreaseMonth = everyMonthPrincipal * monthRate;
  //还款总利息
  ret.totalInterest = (months + 1) * principal * monthRate / 2;
  //还款总额
  ret.totalMoney = principal + ret.totalInterest;

  return ret;
};

/**
 * 部分提前还款计算（等额本息、期限不变）
 * @param principal      贷款总额
 * @param months         贷款期限
 * @param aheadPrincipal 提前还款金额
 * @param payTimes       已还次数
 * @param rate           贷款利率
 * @return
 */
export function calculateEqualPrincipalAndInterestApart2(principal, months, aheadPrincipal, payTimes, rate) {
  var ret = {};
  var monthRate = rate / 12;//月利率
  var preLoan = (principal * monthRate * Math.pow((1 + monthRate), months)) / (Math.pow((1 + monthRate), months) - 1);//每月还款金额
  var totalMoney = preLoan * months;//还款总额
  var interest = totalMoney - principal;//还款总利息
  var leftLoanBefore = principal * Math.pow(1 + monthRate, payTimes) - preLoan * (Math.pow(1 + monthRate, payTimes) - 1) / monthRate;//提前还款前欠银行的钱
  var leftLoan = principal * Math.pow(1 + monthRate, payTimes + 1) - preLoan * (Math.pow(1 + monthRate, payTimes + 1) - 1) / monthRate;//提前还款后银行的钱
  var payLoan = principal - leftLoanBefore;//已还本金
  var payTotal = preLoan * payTimes;//已还总金额
  var payInterest = payTotal - payLoan;//已还利息
  var aheadTotalMoney = preLoan + aheadPrincipal;//下个月还款金额
  var newPreLoan = ((leftLoan - aheadPrincipal) * monthRate * Math.pow((1 + monthRate), months - payTimes - 1)) / (Math.pow((1 + monthRate), months - payTimes - 1) - 1);//下个月起每月还款金额
  var leftTotalMoney = newPreLoan * (months - payTimes - 1);
  var leftInterest = leftTotalMoney - (leftLoan - aheadPrincipal);
  var saveInterest = totalMoney - payTotal - aheadTotalMoney - leftTotalMoney;
  ret.totalMoney = totalMoney;//原还款总额
  ret.principal = principal;//贷款总额
  ret.interest = interest;//原还款总利息
  ret.preLoan = preLoan;//原还每月还款金额
  ret.payTotal = payTotal;//已还总金额
  ret.payLoan = payLoan;//已还本金
  ret.payInterest = payInterest;//已还利息
  ret.aheadTotalMoney = aheadTotalMoney;//提前还款总额(就是“当月还款”）
  ret.leftTotalMoney = leftTotalMoney;//剩余还款总额
  ret.leftInterest = leftInterest;//剩余还款总利息
  ret.newPreLoan = newPreLoan;//剩余每月还款金额
  ret.saveInterest = saveInterest;//节省利息

  ret.new_saveInterest = saveInterest;//节省利息
  ret.new_firstMonth = preLoan;//原还首月还款金额
  ret.new_aheadTotalMoney = aheadTotalMoney;//提前还款总额(就是“当月还款”）
  ret.new_newFirstMonth = newPreLoan;//剩余首月还款金额
  ret.new_totalMoney = totalMoney - saveInterest;//还款总额
  ret.new_interest = interest - saveInterest;//支付利息
  ret.new_months = months; //新的还款期限
  return ret;
}