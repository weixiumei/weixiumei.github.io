
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


/**
  * 部分提前还款计算（等额本息、月供不变）
  * 和同花顺app校验，节省利息多了1%，new_newFirstMonth多了约1%+
  * @param principal      贷款总额
  * @param months         贷款期限
  * @param aheadPrincipal 提前还款金额
  * @param payTimes       已还次数
  * @param rate           贷款利率
  * @return
  */
export function calculateEqualPrincipalAndInterestApart(principal, months, aheadPrincipal, payTimes, rate) {
  var ret = {};
  var monthRate = rate / 12;//月利率
  var preLoan = (principal * monthRate * Math.pow((1 + monthRate), months)) / (Math.pow((1 + monthRate), months) - 1);//每月还款金额
  var totalMoney = preLoan * months;//还款总额
  var interest = totalMoney - principal;//还款总利息
  var leftLoanBefore = principal * Math.pow(1 + monthRate, payTimes) - preLoan * (Math.pow(1 + monthRate, payTimes) - 1) / monthRate;//提前还款前欠银行的钱
  var leftLoan = principal * Math.pow(1 + monthRate, payTimes + 1) - preLoan * (Math.pow(1 + monthRate, payTimes + 1) - 1) / monthRate - aheadPrincipal;//提前还款后欠银行的钱
  var payLoan = principal - leftLoanBefore;//已还本金
  var payTotal = preLoan * payTimes;//已还总金额
  var payInterest = payTotal - payLoan;//已还利息
  var aheadTotalMoney = aheadPrincipal + preLoan;//提前还款总额(就是“当月还款”）
  //计算剩余还款期限
  var leftMonth = Math.floor(Math.log(preLoan / (preLoan - leftLoan * monthRate)) / Math.log(1 + monthRate));
  var newPreLoan = (leftLoan * monthRate * Math.pow((1 + monthRate), leftMonth)) / (Math.pow((1 + monthRate), leftMonth) - 1);//剩余贷款每月还款金额
  var leftTotalMoney = newPreLoan * leftMonth;//剩余还款总额
  var leftInterest = leftTotalMoney - (leftLoan - aheadPrincipal);
  var saveInterest = totalMoney - aheadTotalMoney - leftTotalMoney - payTotal;
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
  ret.remainingMonths = leftMonth;//剩余还款期限

  ret.new_saveInterest = saveInterest;//节省利息
  ret.new_firstMonth = preLoan;//原还首月还款金额
  ret.new_aheadTotalMoney = aheadTotalMoney;//提前还款总额(就是“当月还款”）
  ret.new_newFirstMonth = newPreLoan;//剩余首月还款金额
  ret.new_totalMoney = totalMoney - saveInterest;//还款总额
  ret.new_interest = interest - saveInterest;//支付利息
  ret.new_months = leftMonth + payTimes + 1; //新的还款期限; +1是累加上当月还款
  return ret;
}

/**
 * 一次性提前还款计算（等额本息）
 * 和同花顺校验，能直接核对的指标都通过了
 * @param principal 贷款总额
 * @param months    贷款期限
 * @param payTimes  已还次数
 * @param rate      贷款利率
 * @return
 */
export function onetimePayment_oncalculateEqualPrincipalAndInterest(principal, months, payTimes, rate) {
  var ret = {};
  var monthRate = rate / 12;//月利率
  var preLoan = (principal * monthRate * Math.pow((1 + monthRate), months)) / (Math.pow((1 + monthRate), months) - 1);//每月还款金额
  var totalMoney = preLoan * months;//还款总额
  var interest = totalMoney - principal;//还款总利息
  var leftLoan = principal * Math.pow(1 + monthRate, payTimes) - preLoan * (Math.pow(1 + monthRate, payTimes) - 1) / monthRate;//n个月后欠银行的钱
  var payLoan = principal - leftLoan;//已还本金
  var payTotal = preLoan * payTimes;//已还总金额
  var payInterest = payTotal - payLoan;//已还利息
  var totalPayAhead = leftLoan * (1 + monthRate);//剩余一次还清
  var saveInterest = totalMoney - payTotal - totalPayAhead;
  ret.totalMoney = totalMoney;//原还款总额
  ret.principal = principal;//贷款总额
  ret.interest = interest;//原还款总利息
  ret.preLoan = preLoan;//原还每月还款金额
  ret.payTotal = payTotal;//已还总金额
  ret.payLoan = payLoan;//已还本金
  ret.payInterest = payInterest;//已还利息
  ret.totalPayAhead = totalPayAhead;//一次还清支付金额
  ret.saveInterest = saveInterest;//节省利息
  ret.remainingMonths = 0;//剩余还款期限

  ret.new_saveInterest = saveInterest;//节省利息
  ret.new_firstMonth = preLoan;//原还首月还款金额
  ret.new_aheadTotalMoney = totalPayAhead;//提前还款总额(就是“当月还款”）
  ret.new_newFirstMonth = 0;//剩余首月还款金额
  ret.new_totalMoney = totalMoney - saveInterest;//还款总额
  ret.new_interest = interest - saveInterest;//支付利息
  ret.new_months = 1 + payTimes;//新的还款期限
  return ret;
}


/**
 * 部分提前还款计算(等额本金、期限不变)
 * @param principal      贷款总额
 * @param months         贷款期限
 * @param aheadPrincipal 提前还款金额
 * @param payTimes       已还次数
 * @param rate           贷款利率
 * @return
 */
export function calculateEqualPrincipalApart2(principal, months, aheadPrincipal, payTimes, rate) {
  var ret = {};
  var monthRate = rate / 12;//月利率
  var prePrincipal = principal / months;//每月还款本金
  var firstMonth = prePrincipal + principal * monthRate;//第一个月还款金额
  var decreaseMonth = prePrincipal * monthRate;//每月利息递减
  var interest = (months + 1) * principal * monthRate / 2;//还款总利息
  var totalMoney = principal + interest;//还款总额
  var payLoan = prePrincipal * payTimes;//已还本金
  var payInterest = (principal * payTimes - prePrincipal * (payTimes - 1) * payTimes / 2) * monthRate;//已还利息
  var payTotal = payLoan + payInterest;//已还总额
  var aheadTotalMoney = (principal - payLoan) * monthRate + aheadPrincipal + prePrincipal;//提前还款金额
  var leftMonth = months - payTimes - 1;
  var leftLoan = principal - aheadPrincipal - payLoan - prePrincipal;
  var newPrePrincipal = leftLoan / leftMonth;//新的每月还款本金
  var newFirstMonth = newPrePrincipal + leftLoan * monthRate;//新的第一个月还款金额
  var newDecreaseMonth = newPrePrincipal * monthRate;//新的每月利息递减
  var leftInterest = (leftMonth + 1) * leftLoan * monthRate / 2;//还款总利息
  var leftTotalMoney = leftLoan + leftInterest;//还款总额
  var saveInterest = totalMoney - payTotal - aheadTotalMoney - leftTotalMoney;
  ret.totalMoney = totalMoney;//原还款总额
  ret.principal = principal;//贷款总额
  ret.interest = interest;//原还款总利息
  ret.decreaseMonth = decreaseMonth;//原每月递减利息
  ret.payTotal = payTotal;//已还总金额
  ret.payLoan = payLoan;//已还本金
  ret.payInterest = payInterest;//已还利息
  ret.leftTotalMoney = leftTotalMoney;//剩余还款总额
  ret.leftInterest = leftInterest;//剩余还款总利息
  ret.newDecreaseMonth = newDecreaseMonth;//剩余月递减利息

  ret.new_saveInterest = saveInterest;//节省利息
  ret.new_firstMonth = firstMonth;//原还首月还款金额
  ret.new_aheadTotalMoney = aheadTotalMoney;//提前还款总额(就是“当月还款”）
  ret.new_newFirstMonth = newFirstMonth;//剩余首月还款金额
  ret.new_totalMoney = totalMoney - saveInterest;//还款总额
  ret.new_interest = interest - saveInterest;//支付利息
  ret.new_months = months; //新的还款期限
  return ret;
}


/**
 *  部分提前还款计算(等额本金、月供不变)
 *  和同花顺校验，能直接核对的指标都通过了
 * @param principal      贷款总额
 * @param months         贷款期限
 * @param aheadPrincipal 提前还款金额
 * @param payTimes       已还次数
 * @param rate           贷款利率
 * @return
 */
export function calculateEqualPrincipalApart(principal, months, aheadPrincipal, payTimes, rate) {
  var ret = {};
  var monthRate = rate / 12;//月利率
  var prePrincipal = principal / months;//每月还款本金
  var firstMonth = prePrincipal + principal * monthRate;//第一个月还款金额
  var decreaseMonth = prePrincipal * monthRate;//每月利息递减
  var interest = (months + 1) * principal * monthRate / 2;//还款总利息
  var totalMoney = principal + interest;//还款总额
  var payLoan = prePrincipal * payTimes;//已还本金
  var payInterest = (principal * payTimes - prePrincipal * (payTimes - 1) * payTimes / 2) * monthRate;//已还利息
  var payTotal = payLoan + payInterest;//已还总额
  var aheadTotalMoney = (principal - payLoan) * monthRate + aheadPrincipal + prePrincipal;//提前还款金额
  var leftLoan = principal - aheadPrincipal - payLoan - prePrincipal;//剩余金额
  var leftMonth = Math.floor(leftLoan / prePrincipal);
  var newPrePrincipal = leftLoan / leftMonth;//新的每月还款本金
  var newFirstMonth = newPrePrincipal + leftLoan * monthRate;//新的第一个月还款金额
  var newDecreaseMonth = newPrePrincipal * monthRate;//新的每月利息递减
  var leftInterest = (leftMonth + 1) * leftLoan * monthRate / 2;//还款总利息
  var leftTotalMoney = leftLoan + leftInterest;//还款总额
  var saveInterest = totalMoney - payTotal - aheadTotalMoney - leftTotalMoney;
  ret.totalMoney = totalMoney;//原还款总额
  ret.principal = principal;//贷款总额
  ret.interest = interest;//原还款总利息
  ret.firstMonth = firstMonth;//原还首月还款金额
  ret.decreaseMonth = decreaseMonth;//原每月递减利息
  ret.payTotal = payTotal;//已还总金额
  ret.payLoan = payLoan;//已还本金
  ret.payInterest = payInterest;//已还利息
  ret.aheadTotalMoney = aheadTotalMoney;//提前还款总额(就是“当月还款”）
  ret.leftTotalMoney = leftTotalMoney;//剩余还款总额
  ret.leftInterest = leftInterest;//剩余还款总利息
  ret.newFirstMonth = newFirstMonth;//剩余首月还款金额
  ret.newDecreaseMonth = newDecreaseMonth;//剩余月递减利息
  ret.saveInterest = saveInterest;//节省利息
  ret.remainingMonths = leftMonth;//剩余还款期限

  ret.new_saveInterest = saveInterest;//节省利息
  ret.new_firstMonth = firstMonth;//原还首月还款金额
  ret.new_aheadTotalMoney = aheadTotalMoney;//提前还款总额(就是“当月还款”）
  ret.new_newFirstMonth = newFirstMonth;//剩余首月还款金额
  ret.new_totalMoney = totalMoney - saveInterest;//还款总额
  ret.new_interest = interest - saveInterest;//支付利息
  ret.new_months = leftMonth + payTimes + 1;//新的还款期限; +1是累加上当月还款
  return ret;
}
// calculateEqualPrincipalApart( 1000000, 10*12, 400000, 12, 4.9);

/**
 * 一次性提前还款计算(等额本金)
 * 和同花顺校验，能直接核对的指标都通过了
 * @param principal 贷款总额
 * @param months    贷款期限
 * @param payTimes  已还次数
 * @param rate      贷款利率
 * @return
 */
export function onetimePayment_calculateEqualPrincipal(principal, months, payTimes, rate) {
  var ret = {};
  var monthRate = rate / 12;//月利率
  var prePrincipal = principal / months;//每月还款本金
  var firstMonth = prePrincipal + principal * monthRate;//第一个月还款金额
  var decreaseMonth = prePrincipal * monthRate;//每月利息递减
  var interest = (months + 1) * principal * monthRate / 2;//还款总利息
  var totalMoney = principal + interest;//还款总额
  var payLoan = prePrincipal * payTimes;//已还本金
  var payInterest = (principal * payTimes - prePrincipal * (payTimes - 1) * payTimes / 2) * monthRate;//已还利息
  var payTotal = payLoan + payInterest;//已还总额
  var totalPayAhead = (principal - payLoan) * (1 + monthRate);//提前还款金额（剩余本金加上剩余本金当月利息）
  var saveInterest = totalMoney - payTotal - totalPayAhead;
  ret.totalMoney = totalMoney;//原还款总额
  ret.principal = principal;//贷款总额
  ret.interest = interest;//原还款总利息
  ret.firstMonth = firstMonth;//原首月还款金额
  ret.decreaseMonth = decreaseMonth;//原每月递减利息
  ret.payTotal = payTotal;//已还总金额
  ret.payLoan = payLoan;//已还本金
  ret.payInterest = payInterest;//已还利息
  ret.totalPayAhead = totalPayAhead;//一次还清支付金额
  ret.saveInterest = saveInterest;//节省利息
  ret.remainingMonths = 0;//剩余还款期限

  ret.new_saveInterest = saveInterest;//节省利息
  ret.new_firstMonth = firstMonth;//原还首月还款金额
  ret.new_aheadTotalMoney = totalPayAhead;//提前还款总额(就是“当月还款”）
  ret.new_newFirstMonth = 0;//剩余首月还款金额
  ret.new_totalMoney = totalMoney - saveInterest;//还款总额
  ret.new_interest = interest - saveInterest;//支付利息
  ret.new_months = 1 + payTimes;//新的还款期限

  return ret;
}
// calculateEqualPrincipal( 1000000, 10*12, 12, 4.9);


/**
 * 计算等额本息还款分天数据
 * @param {*} principal 贷款总额
 * @param {*} months 贷款月数
 * @param {*} rate 贷款年利率
 * @returns 
 * 二维数组，每一行分别是期次、偿还本息、偿还本金、支付利息、剩余本金
 */
export function calculateEqualPrincipalAndInterestArray(principal, months, rate) {
  var result = calculateEqualPrincipalAndInterest(principal, months, rate);
  // var months = years * 12;
  var monthRate = rate / 12;//月利率

  var ret = new Array();
  var remainingPrincipal = principal;
  var firstMonthInterest = result.firstMonth - result.everyMonthPrincipal;
  for (var i = 0; i < months; i++) {
      ret[i] = new Array();
      // 期次
      ret[i][0] = i + 1;
      // 偿还本息
      ret[i][1] = result.preLoan;

      // 支付利息
      var interest = remainingPrincipal * monthRate;
      ret[i][3] = interest;

      // 偿还本金
      ret[i][2] = ret[i][1] - ret[i][3];

      // 剩余本金
      remainingPrincipal = remainingPrincipal - ret[i][2];
      ret[i][4] = remainingPrincipal;
  }
  ret[months - 1][4] = 0;
  return ret;
}
// calculateEqualPrincipalAndInterestArray(10000,10,0.049);


/**
 * 计算等额本金还款分天数据
 * @param {*} principal 贷款总额
 * @param {*} months 贷款月数
 * @param {*} rate 贷款年利率
 * @returns 
 * 二维数组，每一行分别是期次、偿还本息、偿还本金、支付利息、剩余本金
 */
export function calculateEqualPrincipalArray(principal, months, rate) {
  var result = calculateEqualPrincipal(principal, months, rate);
  // var months = years * 12;
  var monthRate = rate / 12;//月利率
  var ret = new Array();
  var firstMonthInterest = result.firstMonth - result.everyMonthPrincipal;
  for (var i = 0; i < months; i++) {
      ret[i] = new Array();
      // 期次
      ret[i][0] = i + 1;
      // 偿还本金
      ret[i][2] = result.everyMonthPrincipal;
      // 支付利息
      var interest = firstMonthInterest - i * result.decreaseMonth;
      ret[i][3] = interest > 0 ? interest : 0;
      // 偿还本息
      ret[i][1] = ret[i][2] + ret[i][3];
      // 剩余本金
      ret[i][4] = principal - (i + 1) * result.everyMonthPrincipal;
  }
  ret[months - 1][4] = 0;
  return ret;
}


/**
 * 一次性提前还款计算（等额本息），生成分天数据
 * 和同花顺校验，能直接核对的指标都通过了
 * @param principal 贷款总额
 * @param months    贷款期限
 * @param payTimes  已还次数
 * @param rate      贷款利率
 * @return
 * 二维数组，每一行分别是期次、偿还本息、偿还本金、支付利息、剩余本金
 */
export function onetimePayment_createArray_calculateEqualPrincipalAndInterest(principal, months, payTimes, rate) {
  var array = calculateEqualPrincipalAndInterestArray(principal, months, rate);
  var ret = new Array();
  for (var i = 0; i < payTimes; i++) {
      ret[i] = array[i];
  }
  var json = onetimePayment_oncalculateEqualPrincipalAndInterest(principal, months, payTimes, rate);
  ret[payTimes] = new Array();
  ret[payTimes][0] = payTimes + 1;
  ret[payTimes][1] = json.new_aheadTotalMoney;
  ret[payTimes][2] = principal - json.payLoan;
  ret[payTimes][3] = ret[payTimes][1] - ret[payTimes][2];
  ret[payTimes][4] = 0;
  return ret;
}
// onetimePayment_createArray_calculateEqualPrincipalAndInterest(1000000, 10*12, 12, 0.049);


/**
 * 计算分天数据，和同花顺app校验，完全一致 
 * 部分提前还款计算（等额本息、期限不变）
 * @param principal      贷款总额
 * @param months         贷款期限
 * @param aheadPrincipal 提前还款金额
 * @param payTimes       已还次数
 * @param rate           贷款利率
 * @return
 * 二维数组，每一行分别是期次、偿还本息、偿还本金、支付利息、剩余本金
 */
export function createArray_calculateEqualPrincipalAndInterestApart2(principal, months, aheadPrincipal, payTimes, rate) {
  var array = calculateEqualPrincipalAndInterestArray(principal, months, rate);
  var ret = new Array();
  for (var i = 0; i < payTimes; i++) {
      ret[i] = array[i];
  }
  var json = calculateEqualPrincipalAndInterestApart2(principal, months, aheadPrincipal, payTimes, rate);
  ret[payTimes] = new Array();
  ret[payTimes][0] = payTimes + 1;
  //偿还本息
  ret[payTimes][1] = json.new_aheadTotalMoney;
  //偿还利息
  ret[payTimes][3] = array[payTimes][3];
  //偿还本金
  ret[payTimes][2] = ret[payTimes][1] - ret[payTimes][3];
  //剩余本金
  ret[payTimes][4] = principal - json.payLoan - ret[payTimes][2];

  var array_2 = calculateEqualPrincipalAndInterestArray(ret[payTimes][4], months - payTimes - 1, rate);
  for (var i = 0, j = payTimes + 1; i < array_2.length; i++ , j++) {
      ret[j] = array_2[i];
      ret[j][0] = j + 1;
  }
  return ret;
}
// createArray_calculateEqualPrincipalAndInterestApart2(1000000, 10*12, 400000, 12, 0.049);


/**
 * 计算分天数据
 *
 * 部分提前还款计算（等额本息、月供不变）
 * 和同花顺app校验，节省利息多了1%，new_newFirstMonth多了约1%+
 * @param principal      贷款总额
 * @param months         贷款期限
 * @param aheadPrincipal 提前还款金额
 * @param payTimes       已还次数
 * @param rate           贷款利率
 * @return
 * 二维数组，每一行分别是期次、偿还本息、偿还本金、支付利息、剩余本金
 */
export function createArray_calculateEqualPrincipalAndInterestApart(principal, months, aheadPrincipal, payTimes, rate) {
  var array = calculateEqualPrincipalAndInterestArray(principal, months, rate);
  var ret = new Array();
  for (var i = 0; i < payTimes; i++) {
      ret[i] = array[i];
  }
  var json = calculateEqualPrincipalAndInterestApart(principal, months, aheadPrincipal, payTimes, rate);
  ret[payTimes] = new Array();
  ret[payTimes][0] = payTimes + 1;
  //偿还本息
  ret[payTimes][1] = json.new_aheadTotalMoney;
  //偿还利息
  ret[payTimes][3] = array[payTimes][3];
  //偿还本金
  ret[payTimes][2] = ret[payTimes][1] - ret[payTimes][3];
  //剩余本金
  ret[payTimes][4] = principal - json.payLoan - ret[payTimes][2];

  var array_2 = calculateEqualPrincipalAndInterestArray(ret[payTimes][4], json.remainingMonths, rate);
  for (var i = 0, j = payTimes + 1; i < array_2.length; i++ , j++) {
      ret[j] = array_2[i];
      ret[j][0] = j + 1;
  }
  return ret;
}
// createArray_calculateEqualPrincipalAndInterestApart(1000000, 10*12, 400000, 12, 0.049);


/**
 * 一次性提前还款计算(等额本金),计算分天数据
 * 和同花顺校验，能直接核对的指标都通过了
 * @param principal 贷款总额
 * @param months    贷款期限
 * @param payTimes  已还次数
 * @param rate      贷款利率
 * @return
 * 二维数组，每一行分别是期次、偿还本息、偿还本金、支付利息、剩余本金
 */
export function onetimePayment_createArray_calculateEqualPrincipal(principal, months, payTimes, rate) {
  var array = calculateEqualPrincipalArray(principal, months, rate);
  var ret = new Array();
  for (var i = 0; i < payTimes; i++) {
      ret[i] = array[i];
  }
  var json = onetimePayment_calculateEqualPrincipal(principal, months, payTimes, rate);
  ret[payTimes] = new Array();
  ret[payTimes][0] = payTimes + 1;
  ret[payTimes][1] = json.new_aheadTotalMoney;
  ret[payTimes][2] = principal - json.payLoan;
  ret[payTimes][3] = ret[payTimes][1] - ret[payTimes][2];
  ret[payTimes][4] = 0;
  return ret;
}
// onetimePayment_createArray_calculateEqualPrincipal(1000000, 10*12, 12, 0.049);


/**
 * 计算分天数据，和同花顺app校验，完全一致 
 * 部分提前还款计算(等额本金、期限不变)
 * @param principal      贷款总额
 * @param months         贷款期限
 * @param aheadPrincipal 提前还款金额
 * @param payTimes       已还次数
 * @param rate           贷款利率
 * @return 
 * 二维数组，每一行分别是期次、偿还本息、偿还本金、支付利息、剩余本金
 */
export function createArray_calculateEqualPrincipalApart2(principal, months, aheadPrincipal, payTimes, rate) {
  var array = calculateEqualPrincipalArray(principal, months, rate);
  var ret = new Array();
  for (var i = 0; i < payTimes; i++) {
      ret[i] = array[i];
  }
  var json = calculateEqualPrincipalApart2(principal, months, aheadPrincipal, payTimes, rate);
  ret[payTimes] = new Array();
  ret[payTimes][0] = payTimes + 1;
  //偿还本息
  ret[payTimes][1] = json.new_aheadTotalMoney;
  //偿还利息
  ret[payTimes][3] = array[payTimes][3];
  //偿还本金
  ret[payTimes][2] = ret[payTimes][1] - ret[payTimes][3];
  //剩余本金
  ret[payTimes][4] = principal - json.payLoan - ret[payTimes][2];

  var array_2 = calculateEqualPrincipalArray(ret[payTimes][4], months - payTimes - 1, rate);
  for (var i = 0, j = payTimes + 1; i < array_2.length; i++ , j++) {
      ret[j] = array_2[i];
      ret[j][0] = j + 1;
  }
  return ret;
}

// createArray_calculateEqualPrincipalApart2(1000000, 10*12, 400000, 12, 0.049);



/**
 * 计算分天数据，和同花顺app校验，完全一致 
 * 部分提前还款计算(等额本金、月供不变)
 *  和同花顺校验，能直接核对的指标都通过了
 * @param principal      贷款总额
 * @param months         贷款期限
 * @param aheadPrincipal 提前还款金额
 * @param payTimes       已还次数
 * @param rate           贷款利率
 * @return
 * 二维数组，每一行分别是期次、偿还本息、偿还本金、支付利息、剩余本金
 */
export function createArray_calculateEqualPrincipalApart(principal, months, aheadPrincipal, payTimes, rate) {
  var array = calculateEqualPrincipalArray(principal, months, rate);
  var ret = new Array();
  for (var i = 0; i < payTimes; i++) {
      ret[i] = array[i];
  }
  var json = calculateEqualPrincipalApart(principal, months, aheadPrincipal, payTimes, rate);
  ret[payTimes] = new Array();
  ret[payTimes][0] = payTimes + 1;
  //偿还本息
  ret[payTimes][1] = json.new_aheadTotalMoney;
  //偿还利息
  ret[payTimes][3] = array[payTimes][3];
  //偿还本金
  ret[payTimes][2] = ret[payTimes][1] - ret[payTimes][3];
  //剩余本金
  ret[payTimes][4] = principal - json.payLoan - ret[payTimes][2];

  var array_2 = calculateEqualPrincipalArray(ret[payTimes][4], json.remainingMonths, rate);
  for (var i = 0, j = payTimes + 1; i < array_2.length; i++ , j++) {
      ret[j] = array_2[i];
      ret[j][0] = j + 1;
  }
  return ret;
}
// createArray_calculateEqualPrincipalApart(1000000, 10*12, 400000, 12, 0.049);
