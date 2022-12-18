import {doPost} from './http/wxHttp-pre'; 
// import {doPost} from './http/wxHttp-prod'; 

import {isLogin,doLogin} from './login';


var QQMapWX = require('./../components/qqmapjs/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
  key: 'DBXBZ-UNOCX-AOC4E-TLBFC-2LO5S-MRB34'
});

// 搜索球场信息
export function searchByRegion(params,succEvent){
    doPost(
      "at-map-api",
      "/at-api/tennis-court/region/search",
      params,
      succEvent
    )
}

// 搜索球场信息
export function getCourtInfo(params,succEvent){
  doPost(
    "at-map-api",
    "/at-api/tennis-court/info",
    params,
    succEvent
  )
}


// 收藏场地
export function collect(params,succEvent){
  console.log("collect>>>>>"+isLogin);
  if (isLogin()) {
    doPost(
      "at-map-api",
      "/at-api/tennis-court/collect",
      params,
      succEvent
    )
  }else{
    doLogin(res=>{
      doPost(
        "at-map-api",
        "/at-api/tennis-court/collect",
        params,
        succEvent
      )
    })
  }
}


// 取消收藏场地
export function uncollect(params,succEvent){
  if (isLogin()) {
    doPost(
      "at-map-api",
      "/at-api/tennis-court/uncollect",
      params,
      succEvent
    )
  }else{
      doLogin(res=>{
        doPost(
          "at-map-api",
          "/at-api/tennis-court/uncollect",
          params,
          succEvent
        )
      })
  }

}


// 提交球场数据
export function applyTennisCourt(params,succEvent){
  doPost(
    "at-map-api",
    "/at-api/tennis-court/submit/report",
    params,
    succEvent
  )
}
export function getNowUserLocation(readCache,successEvent){
  let _userLocation =  getStorage('userLocationInfo',10);
  if( readCache && _userLocation  && _userLocation.isSucc ){
      console.log("从缓存获取用户的地理位置成功》》》》");
      successEvent(_userLocation);
  }else{
    console.log("实时查询用户位置");
    getUserLocation(successEvent);
  }
}


export function getUserLocation(successEvent){
  let _userLocation = {};
  wx.getLocation({
      success:(res)=>{
        if(res.errMsg == "getLocation:ok"){
          console.log(1);
          _userLocation.latitude = res.latitude;
          _userLocation.longitude = res.longitude;
          qqmapsdk.reverseGeocoder({
            location: _userLocation,
            success: (res)=>{
                let ad_info = res.result.ad_info;
                _userLocation.province = ad_info.province;
                _userLocation.city = ad_info.city;
                _userLocation.district = ad_info.district;
                _userLocation.address = res.result.address;
                _userLocation.isSucc = true;
                setStorage('userLocationInfo', _userLocation);
                console.log(2);
                successEvent(_userLocation);
                console.log(3);
            },
            fail: (res)=>{
              console.log("qqmapsdk.search error");
              console.log(res);
            }
          })
        }
      }
  })
}

export const setStorage = (key,value) => {
  const params = {
    date: new Date().getTime(),
    value
  };
  wx.setStorageSync(key, JSON.stringify(params));
}


// 超时时间 单位为分钟
export const getStorage = (key,timout = 10) => {
  let obj = wx.getStorageSync(key);
  if (!obj) return null;
  obj = JSON.parse(obj);
  const date = new Date().getTime();
  if (date - obj.date > 60000 * timout) return null;
  return obj.value;
}




export  function chooseLocationMap(defaultLBS) {
  if(defaultLBS == undefined){
    defaultLBS = {
      latitude: 22.586598,
      longitude: 113.903341
    }
  }
  const key = 'V2LBZ-OFS6W-RDQRL-RIFGS-Y7HFF-OUFI3'; // 使用在腾讯位置服务申请的key
  const referer = 'AT网关'; //调用插件的app的名称
  const location = JSON.stringify(defaultLBS);
  const category = '网球场';

  wx.navigateTo({
    url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location + '&category=' + category,
    success: function(res) {
      // 通过 eventChannel 向被打开页面传送数据
      console.log("navigateTo");
      console.log(res);
    }
  });
}


export  function openLocationMap(lbs) {
  let latitude = Number(lbs.latitude);
  let longitude = Number(lbs.longitude);
  wx.openLocation({
    latitude,
    longitude,
    scale: 14
  })
}