// pages/play/play.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      show:{
         addPlayer:false
      },
      userInfo: {},
      playInfo:{
         matchType: 1,//1表示单打 2表示双打
         redPlayInfo:{
            "redPartName":"小AA",
            "redPartAvatarUrl":"/image/home.jpeg",
         },
         bluePlayInfo:{
            // "blueName":"小B",
            // "blueAvatarUrl":"/image/home.jpeg",
            // "bluePartName":"小BB",
            // "bluePartAvatarUrl":"/image/home.jpeg",
         }
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.setData({
        userInfo:app.globalData.userInfo
     })
     console.info(this.data.userInfo)
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
  showAddPlayer(){
     this.setData({
        ['show.addPlayer'] : true
     })
  },
  hideAddPlayer(){
   this.setData({
      ['show.addPlayer'] : false
   })
}
})