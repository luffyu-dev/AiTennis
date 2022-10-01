// import {doPost} from './wxHttp'; 

import {doPost} from './http/wxHttp-pre'; 



var QQMapWX = require('./../components/qqmapjs/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
  key: 'DBXBZ-UNOCX-AOC4E-TLBFC-2LO5S-MRB34'
});

// atp的排名信息搜索
export function searchByRegion(params,succEvent){
    doPost(
      "at-map-api",
      "/at-api/tennis-court/region/search",
      params,
      succEvent
    )
}


// atp的排名信息搜索
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