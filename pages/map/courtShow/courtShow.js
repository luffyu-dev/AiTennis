// pages/map/courtShow/courtShow.js

import { getCourtInfo } from '../../../utils/mapHttp'; 



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
  }
})