// pages/map/courtShow/courtShow.js

import { getCourtInfo } from '../../../utils/mapHttp'; 
import {openLocationMap,collect,uncollect} from '../../../utils/mapHttp'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryInfo:{
     
    },
    courtInfoDetail:{
      courtName:"-"
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log("onLoad");
    this.setData({
      queryInfo: options
    })
    this.getLoadCourtInfo(options);
  },


  getLoadCourtInfo(params){
    wx.showLoading({
      title: '加载中',
    });
    let _this = this;
    getCourtInfo(params,(res)=>{
      let result = res.data;
      if(result.code === "1000000"){
        _this.setData({
            courtInfoDetail: result.data
        });
        wx.hideLoading();
      }
    })
  },

   // 选择地图
   chooseMap(){
    console.log(">>>>>>>>>>>>>>>>>>")
    let _courtInfoDetail = this.data.courtInfoDetail; 
    console.log(_courtInfoDetail);
    if (_courtInfoDetail.latitude && _courtInfoDetail.longitude) {
      let defaultLBS = {};
      defaultLBS.latitude = Number(_courtInfoDetail.latitude);
      defaultLBS.longitude = Number(_courtInfoDetail.longitude);
      openLocationMap(defaultLBS);
    }
  },

  /**
    * 收藏球场
    * @param {*} detail 
    */
   collectCourt(){
    let params = {
      courtCode: this.data.courtInfoDetail.courtCode
    }
    let _queryInfo = this.data.queryInfo;
    collect(params,res=>{
      if (res.data.code === "1000000") {
        this.getLoadCourtInfo(_queryInfo);
      }
    })
  },

  /**
   * 不收藏球场
   * @param {*} detail 
   */
  uncollectCourt(){
    let params = {
      courtCode: this.data.courtInfoDetail.courtCode
    }
    let _queryInfo = this.data.queryInfo;
    uncollect(params,res=>{
      if (res.data.code === "1000000") {
        this.getLoadCourtInfo(_queryInfo);
      }
    })
  }

})