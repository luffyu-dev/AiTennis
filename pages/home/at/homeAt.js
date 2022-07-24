// pages/homeAt/homeAt.js
var wxCharts = require('../../../utils/wxcharts');
var app = getApp();
var lineChart = null;
var startPos = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var windowWidth = 320;
    try {
        var res = wx.getSystemInfoSync();
        windowWidth = res.windowWidth;
    } catch (e) {
        console.error('getSystemInfoSync failed!');
    }
    
    var simulationData = this.createSimulationData();
    lineChart = new wxCharts({
        canvasId: 'lineCanvas',
        type: 'line',
        categories: simulationData.categories,
        animation: false,
        series: [{
            name: 'AT训练时间',
            data: simulationData.data,
            format: function (val, name) {
                return val.toFixed(1) + 'h';
            }
        }],
        xAxis: {
            disableGrid: true
        },
        yAxis: {
          // fontColor: '#1ab67b',
          gridColor:'#e9e9e9',
        },
  
        width: windowWidth,
        height: 180,
        dataLabel: true,
        dataPointShape: true,
        enableScroll: true,
        extra: {
            lineStyle: 'curve'
        }
    });
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
  touchHandler: function (e) {
      lineChart.scrollStart(e);
  },
  moveHandler: function (e) {
      lineChart.scroll(e);
  },
  touchEndHandler: function (e) {
      lineChart.scrollEnd(e);
      lineChart.showToolTip(e, {
          format: function (item, category) {
              return category + ' ' + item.name + ':' + item.data 
          }
      });        
  },
  createSimulationData: function () {
      var categories = [];
      var data = [];
      for (var i = 0; i < 7; i++) {
          categories.push('6-' + (i + 1));
          data.push( i%2 == 0 ? 1:1.5);
      }
      return {
          categories: categories,
          data: data
      }
  }
})