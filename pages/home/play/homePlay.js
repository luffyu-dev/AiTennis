import {navigateBeforCheckLogin} from '../../../utils/util'; 
import { searchByRegion,getNowUserLocation } from '../../../utils/mapHttp'; 


// pages/match/match.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperData: ['/image/avator/user-1.jpeg', '/image/home.jpeg', '/image/home2.jpeg'],
    // 用户的比赛信息
    userMatchInfo:{},
    // 用户邀约信息
    userInviteList: [],
    // 网球场地信息
    tennisCourtList: [],
    // 用户当前的位置
    userLocation:{ },
    // 地图搜索的loading
    isCourtLoading: false
  },
  // 跳转方法
  navigateToCheckLogin: function(goUrl){
    navigateBeforCheckLogin(goUrl.currentTarget.dataset.src);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
    // this.queryUserMatch();
    this.getCacheUserLocation();
  },
  onLoad: function () {
      // 实例化API核心类
      // qqmapsdk = new QQMapWX({
      //   key: 'DBXBZ-UNOCX-AOC4E-TLBFC-2LO5S-MRB34'
      // });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 查询附近的网球球场
  // queryTennisCourt(){
  //   // todo 发起请求
  //   let oneTennisCourt = {
  //       "courtName":"深圳宝安公园网球场",
  //       "courtAddressName":"宝安区上川路12号",
  //       "courtRate":4,
  //       "courtImgs":['/image/home/court_home.jpg', '/image/home/court_home.jpeg']
  //   };
  //   let tennisCourtList= [];
  //   for(let i=0;i<10;i++){
  //     tennisCourtList.push(oneTennisCourt);
  //   }
  //   this.setData({
  //     tennisCourtList : tennisCourtList
  //   })
  // },

  // 查询用户的比赛信息
  queryUserMatch(){
    let oneUserMatch = {
        "matchId":"比赛id",
        "matchName":"徐徐的网球年终比赛",
        "matchLabel":"8进4",
        "matchTime":"09月07日18:00",
        "matchType":1, //1表示单打 2表示双打
        "matchSetType":1, //1表示单局 3表示3局2胜  5表示5局3胜
        "matchStatus":1,//0表示未开始 1表示进行中 2表示已结束
        "redUserId":"u001",
        "redPartId":"u004",
        "redUserName":"小余",
        "redPartName":"小胡",
        "redAvatarUrl":"/image/avator/user-1.jpeg",
        "blueUserId":"u002",
        "bluePartId":"u003",
        "blueUserName":"jason",
        "bluePartName":"小激动",
        "blueAvatarUrl":"/image/avator/user-2.png",
        "redWinSetNum":"1",
        "blueWinSetNum":"0",
        "setList":[
            {
              "setId":"1",
              "setStatus":"完成",
              "redWinGameNum":"6",
              "blueWinGameNum":"2",
              "gameWaterList":[
                  {
                      "setId":"",
                      "gameId":"1",
                      "gameName":"16进8 第1局",
                      "gameStatus":"1",
                      "redWinSourceNum":"45",
                      "blueWinSourceNum":"15",
                  }
              ]
            }
        ]
    }
    let userMatchInfo = {
      "uid":"u001",
      "userNick":"小余",
    };
    let userMatchList= [];
    for(let i=0;i<2;i++){
      userMatchList.push(oneUserMatch);
    }
    userMatchInfo.matchList = userMatchList;
    this.setData({
      userMatchInfo : userMatchInfo
    })

  },

  // 查询用户的邀约信息
  queryUserInvite(){

  },

  // 查询附近的网球球场
  queryTennisCourt(params){
    let _this = this;
    _this.setData({
      isCourtLoading : true
    })
    params['district']='';
    params.page = 1;
    params.size = 5;
    searchByRegion(params,(res)=>{
      console.log("queryTennisCourt success");
        console.log(res);
        let result = res.data;
        if(result.code === "1000000"){
          let list = result.data;
          _this.setData({
            tennisCourtList : list,
            isCourtLoading : false
          })
        }
    })
  },

  /**
   * 获取的地址是有缓存的
   */
  getCacheUserLocation(){
    console.log("getCacheUserLocation");
    let _this = this;
    _this.setData({
      isCourtLoading : true
    })


    getNowUserLocation(true,(res)=>{
      console.log("getCacheUserLocation");
      console.log(res);
        _this.setData({
          userLocation : res,
        })
        this.queryTennisCourt(res);
    });
  },

  /**
   * 获取实时的地址
   */
  getUserLocation(){
    console.log("getUserLocation");
    let _this = this;
    getNowUserLocation(false,(res)=>{
      console.log("getUserLocation");
      console.log(res);
      _this.setData({
        userLocation : res
      }),
      this.queryTennisCourt(res);
    });
 }
})