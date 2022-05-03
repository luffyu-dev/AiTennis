// pages/match/match.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperData: ['/image/avator/user-1.jpeg', '/image/home.jpeg', '/image/home2.jpeg'],
    userMarchInfo:{
        "uid":"u001",
        "userNick":"小余",
        "matchList":[
            {
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
            },
            {
              "matchId":"比赛id",
              "matchName":"徐徐的网球年终比赛",
              "matchLabel":"16进8",
              "matchTime":"09月07日18:00",
              "matchType":2, //1表示单打 2表示双打
              "matchSetType":1, //1表示单局 3表示3局2胜  5表示5局3胜
              "matchStatus":2,//0表示未开始 1表示进行中 2表示已结束
              "redUserId":"u001",
              "redPartId":"u004",
              "redUserName":"小余",
              "redPartName":"jason",
              "redAvatarUrl":"/image/avator/user-2.png",
              "blueUserId":"u002",
              "bluePartId":"u003",
              "blueUserName":"小胡",
              "bluePartName":"小激动",
              "blueAvatarUrl":"/image/avator/user-1.jpeg",
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
            },
            {
              "matchId":"比赛id",
              "matchName":"徐徐的网球年终比赛",
              "matchLabel":"16进8",
              "matchTime":"09月07日18:00",
              "matchType":2, //1表示单打 2表示双打
              "matchSetType":1, //1表示单局 3表示3局2胜  5表示5局3胜
              "matchStatus":2,//0表示未开始 1表示进行中 2表示已结束
              "redUserId":"u001",
              "redPartId":"u004",
              "redUserName":"小余",
              "redPartName":"jason",
              "redAvatarUrl":"/image/avator/user-1.jpeg",
              "blueUserId":"u002",
              "bluePartId":"u003",
              "blueUserName":"小胡",
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
            },
        ]
    },
    fieldMapInfo:{
        "province":"广东",
        "city":"城市",
        "fielMapList":[
            {
              "fieldName":"深圳宝安公园网球场",
              "fieldAddress":"宝安区上川路12号",
              "rate":4,
              "imgUrls":['/image/home/court_home.jpg', '/image/home/court_home.jpeg']
            },
            {
              "fieldName":"深圳曦城网球场",
              "fieldAddress":"宝安区上川路12号",
              "rate":3,
              "imgUrls":['/image/home/court_home.jpeg', '/image/home/court_home.jpeg']
            },
            {
              "fieldName":"宝安体育中心网球场",
              "fieldAddress":"宝安区上川路12号",
              "rate":3,
              "imgUrls":['/image/avator/court_home.jpeg', '/image/home/court_home.jpeg']
            },
            {
              "fieldName":"西乡体育中心网球场",
              "fieldAddress":"宝安区上川路12号",
              "rate":2,
              "imgUrls":['/image/avator/court_home.jpeg', '/image/home/court_home.jpeg']
            },
            {
              "fieldName":"大沙河网球场",
              "fieldAddress":"宝安区上川路12号",
              "rate":4,
              "imgUrls":['/image/avator/court_home.jpeg', '/image/home/court_home.jpeg']
            },
            {
              "fieldName":"光明体育中心网球场",
              "fieldAddress":"宝安区上川路12号",
              "rate":4, 
              "imgUrls":['/image/avator/court_home.jpeg', '/image/home/court_home.jpeg']
            }
        ]

    }

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

})