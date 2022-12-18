
// pages/user/user.js
import { doLogin, getLoginUser , outLogin, isLogin} from '../../../utils/login'; 
import {navigateBeforCheckLogin} from '../../../utils/util'; 
import {queryUserTennisInfo,queryUserTennisDate} from '../../../utils/userTennis'; 

Page({
 

  /**
   * 页面的初始数据
   */
  data: {
      atCalendarInfo:{
        spot: []
      },
      todayStr:"",
      loginUserInfo: {},
      getDataInfo:{},
      userAtData:{},
      radarData:{
        data: [{ name: "iPhone", value: [0, 0, 0, 0, 0], color: "#68CB8D" }],
        xLabel: ['发球', '正手', '网前', '切削', '反手'],
        chartRatio: 0.8,
        style: 'radar',
        showLabel: false,
        animation: true,
        showTooltip: true,
        area: true,
      }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let loginInfo = getLoginUser();
    if(loginInfo != null){
       this.setData({
          loginUserInfo: loginInfo
       });
       this.queryLoginUserAtData();
    }else{
       this.queryUnLoginAtData();
    }
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  // 登录接口
  inLogin: function(){
    let _this = this;
    doLogin((res)=>{
      _this.setData({
          loginUserInfo:res
      });
      this.queryLoginUserAtData();
    });
  },

  

  //退出登录
  outLogin : function(){
    let _this = this;
    outLogin((res)=>{
      _this.setData({
          loginUserInfo:{}
      });
      this.queryUnLoginAtData();
    })
  },


  // 登录的用户数据查询
  queryLoginUserAtData: function() {
    let params = {};
    let _this = this;
    queryUserTennisInfo(params,res=>{
      let _tennisInfo = res.data.data;
      // 能力矩阵图
      let _levelMatrix = _tennisInfo.levelMatrix;
      let radarDataValue = [];
      radarDataValue.push(_levelMatrix.serve);
      radarDataValue.push(_levelMatrix.foreHand);
      radarDataValue.push(_levelMatrix.netFront);
      radarDataValue.push(_levelMatrix.cutting);
      radarDataValue.push(_levelMatrix.backHand);
      let _radarData = this.data.radarData;
      _radarData.data[0].value = radarDataValue;

      // 网球日历
      let _atCalendarInfo = {
        spot : _tennisInfo.tennisDate
      }
      _this.setData({
        radarData: _radarData,
        userAtData: _tennisInfo,
        atCalendarInfo:_atCalendarInfo
      })
      _this.createUserRadar();
    });
    
    },

    /**未登录的用户数据查询 */
    queryUnLoginAtData:function (params) {
      let _userData={
        ntrp: "-",
        yearData:0,
        monthDate:0,
        userTrainInfo:{
          allHours:0,
          weekHours:0
        }
      };
      let radarDataValue = [0,1,0,0,0];
      let _radarData = this.data.radarData;
      _radarData.data[0].value = radarDataValue;
      this.setData({
        radarData: _radarData,
        userAtData: _userData
      }),
      this.createUserRadar();
    },

    // 绘制雷达图
    createUserRadar:function() {
      this.roseComp = this.selectComponent('#radar');
      this.roseComp.setOptions(this.data.radarData);
      this.roseComp.initChart(180, 150);
    },


    queryUserAtCalendar:function () {
        let _atCalendarInfo = {
          spot :[]
        }
        this.setData({
          atCalendarInfo:_atCalendarInfo
        })
    },

    // 跳转方法
  navigateToCheckLogin: function(goUrl){
    navigateBeforCheckLogin(goUrl.currentTarget.dataset.src);
  },

  dateChange:function(event) {
    let _detail = event.detail;
    let _date = _detail.year + "/0" + (_detail.month + 1);
    if ((_detail.month + 1) >= 10) {
      _date = _detail.year + "/" + (_detail.month + 1);
    }
     let  param={};
     param.recordDate = _date
     queryUserTennisDate(param,res=>{
        let _dateList = res.data.data ? res.data.data:[];
        let _atCalendarInfo = {
          spot : _dateList
        }
        console.log(_atCalendarInfo)
        this.setData({
          atCalendarInfo:_atCalendarInfo
        })
     })
  }
  
})