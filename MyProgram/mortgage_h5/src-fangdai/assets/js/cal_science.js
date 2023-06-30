window.bridge = window.bridge || {};
// 原生点击返回调用
window.bridge.backButtonClick = function () {
  // 跳转，app拦截判断
  window.location.href = 'bridge://processBackButtonClicked?default_parameter=h5_has_bean_processed';
  window.location.href = 'index.html'
}

var display;
var result="";
var calresults;
display=document.getElementById("dispaly");
function calculator(){
  result+=event.srcElement.innerText;
  // alert(result);
  dispaly.innerText=result;

}
function resultscalcaulte(){
  var display=document.getElementById("dispaly");
  calresults=eval(result);
  if(!!calresults){
    display.innerText=calresults;
  }else{
    display.innerText='';
  }
}
function empty(){
  result="";
  dispaly.innerText=result;
}
function back(){
  if (result!="") {
    result=result.substring(0, result.length - 1);
    dispaly.innerText=result;
  }
}
