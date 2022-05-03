// index.js
// 获取应用实例
const app = getApp()

Page({
  data:{
    canIUseGetUserProfile: false,
  },
  onLoad: function (options) {
    this.toGoProfile();
  },
  toGoProfile(){
    this.setData({
        canIUseGetUserProfile: true
    })
  },
  getUserProfile() {
    console.log("getUserProfile");
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      lang: "zh_CN",
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        app.globalData.userInfo = res.userInfo
        wx.switchTab({
            url: '../index/index'
        })
      }
    })
  },


  getUserInfo() {
    var that = this;
    console.log("getUserInfo");
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserInfo({
      withCredentials:true,
      success: (res) => {
        console.log(res);
        app.globalData.userInfo = res.userInfo
        wx.switchTab({
            url: '../index/index'
        })
      }
    })
    
  },
})


