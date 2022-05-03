// pages/addMatch/addMatch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    matchInfo:{
      "matchName":"徐徐的网球球",
      "fieldName":"宝安公园网球场",
      "matchDate":"2021-07-07 11:30",
      "matchType":"1", //1表示单打 2表示双打
      "matchGameNum":"4",
      "matchBallType":"1", //1表示金球 2表示占先
      "isStrong":true,//1表示抢七 0表示不
      "userList":[
        {
          "avatarUrl":"/image/home.jpeg",
          "userName":""
        },
        {
          "avatarUrl":"/image/home.jpeg",
          "userName":""
        }
      ]
    }
  },

  onChange({ detail }) {
    this.setData({ checked: detail });
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  submitMatch: function(){
    wx.navigateTo({
      url: '/pages/matchInfo/matchInfo'
    })
  }
})