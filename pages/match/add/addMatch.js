import {wxDoUploadImage,wxDoDeleteUploadImage} from '../../../utils/wxHttp'; 
import {formatTimeTwo} from '../../../utils/util'; 

// pages/addMatch/addMatch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    create_match_steps: [
      {desc: '基本信息'},
      {desc: '邀请球员'},
      {desc: '生成签表'},
      {desc: '比赛大盘'}
    ],
    match_steps_active:0,
    show_time: false,
    initShowTime:{
      minDate: new Date().getTime(), //最小时间
      currentDate: new Date().getTime(), //默认时间
    },
    initTextareaSize:{
      "minHeight" : 100 
    },

    matchInfo:{
      "matchName":"徐徐的网球球",
      "matchCourtName":"宝安公园网球场",
      "matchStarteDate":"2021-07-07 11:30",
      "matchRequirement":"比赛要求",
      "matchPlayer":"18",
      "matchRule":{
        "matchType":"1", //1表示单打 2表示双打
        "matchGameNum":"4",
        "matchBallType":"1", //1表示金球 2表示占先
        "isStrong":true,//1表示抢七 0表示不
      },
      "matchPicList":[]
    }
  },

  onChange({ detail }) {
    this.setData({ checked: detail });
  },
  

  submitMatch: function(){
    wx.navigateTo({
      url: '/pages/matchInfo/matchInfo'
    })
  },


    // 展示时间
    onDisplay() {
      this.setData({ show_time: true });
    },
    // 关闭时间
    onCloseTime(){
      this.setData({ show_time: false });
    },
    // 确认的按钮
    onConfirmTime(res){
      let selectTime = res.detail;
      let timeStr = formatTimeTwo(selectTime,'Y/M/D h:m')
      let _matchInfo = this.data.matchInfo;
      _matchInfo.matchStarteDate = timeStr;
      this.setData({
        matchInfo: _matchInfo
      })
      this.onCloseTime();
    },


  // 图片删除
  deletUpdateImage(res){
    console.log(res);
    let detail = res.detail;
    let _matchInfo = this.data.matchInfo;
    _matchInfo.matchPicList.splice(detail.index,1);
    this.setData({
      matchInfo: _matchInfo
    })
    wxDoDeleteUploadImage(detail.file.url);
  },

  // 图片上传
  addUploadImage(event){
    let _this = this;
    let _matchInfo = this.data.matchInfo;
    wxDoUploadImage(event,
      (res)=>{
        let updateImageInfo={};
        updateImageInfo.url = res.fileID;
        _matchInfo.matchPicList.push(updateImageInfo);
        _this.setData({
          matchInfo: _matchInfo
        })
      }
    );
  },

  // 保存并创建邀约信息
  saveAndCreateMatch(){
    wx.navigateTo({
      url: '/pages/match/share/shareMatch',
    })
  }

})