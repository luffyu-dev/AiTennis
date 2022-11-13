
// pages/user/user.js
import { doLogin, getLoginUser , outLogin, isLogin} from '../../../utils/login'; 

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
       this.queryUserAtCalendar();
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
    let _userData={
      ntrp: "3.5",
      tennisAge:{
        yearData:5,
        monthDate:3,
      },
      trainInfo:{
        totalHours:9999,
        weekHours:2
      },
      atData:{
        foreHand:8,
        backHand:7,
        hitOut:5,
        tennisFront:2,
        cutting:5,
      }
    };

      let radarDataValue = [];
      radarDataValue.push(_userData.atData.hitOut);
      radarDataValue.push(_userData.atData.foreHand);
      radarDataValue.push(_userData.atData.tennisFront);
      radarDataValue.push(_userData.atData.cutting);
      radarDataValue.push(_userData.atData.backHand);
      let _radarData = this.data.radarData;
      _radarData.data[0].value = radarDataValue;
      this.setData({
        radarData: _radarData,
        userAtData: _userData
      }),
      this.createUserRadar();
    },

    /**未登录的用户数据查询 */
    queryUnLoginAtData:function (params) {
      let _userData={
        ntrp: "-",
        tennisAge:{
          yearData:0,
          monthDate:0,
        },
        trainInfo:{
          totalHours:0,
          weekHours:0
        }
      };
      let radarDataValue = [0,0,0,0,0];
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
          spot :["2022/11/1","2022/11/10"]
        }
        this.setData({
          atCalendarInfo:_atCalendarInfo
        })
    }

  
})