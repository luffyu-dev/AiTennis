import {isLogin,doLogin} from './login';



const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

module.exports = {
  formatTime,
  navigateBeforCheckLogin,
  redirectBeforCheckLogin,
  formatTimeTwo
}

function navigateBeforCheckLogin(goUrl){
  if(isLogin()){
    wx.navigateTo({
      url: goUrl,
    })
  } else {
    doLogin((res)=>{
      wx.navigateTo({
        url: goUrl,
      })
    });
  }
}



function redirectBeforCheckLogin(goUrl){
  if(isLogin()){
    wx.redirectTo({
      url: goUrl,
    })
  } else {
    doLogin((res)=>{
      wx.redirectTo({
        url: goUrl,
      })
    });
  }
}




/** 
 * 时间戳转化为年 月 日 时 分 秒 
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
*/
function formatTimeTwo(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber2(date.getMonth() + 1));
  returnArr.push(formatNumber2(date.getDate()));

  returnArr.push(formatNumber2(date.getHours()));
  returnArr.push(formatNumber2(date.getMinutes()));
  returnArr.push(formatNumber2(date.getSeconds()));

  for (var i in returnArr) {
      format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

function formatNumber2(n){
  n = n.toString()
  return n[1] ? n : '0' + n
}