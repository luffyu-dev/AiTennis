// pages/matchInfo/matchInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    marchSetInfo:{
      "matchId":"比赛id",
      "matchName":"徐徐的网球年终比赛",
      "matchLabel":"8进4",
      "matchTime":"2021年09月07日 18:00",
      "matchList":[
          {
            "matchId":"比赛id",
            "matchName":"徐徐的网球年终比赛",
            "matchLabel":"8进4",
            "matchTime":"2021年09月07日 18:00",
            "matchType":1, //1表示单打 2表示双打
            "matchSetType":1, //1表示单局 3表示3局2胜  5表示5局3胜
            "matchStatus":1,//0表示未开始 1表示进行中 2表示已结束
            "redUserId":"u001",
            "redPartId":"u004",
            "redUserName":"小余",
            "redPartName":"小胡",
            "redAvatarUrl":"/image/home.jpeg",
            "blueUserId":"u002",
            "bluePartId":"u003",
            "blueUserName":"jason",
            "bluePartName":"小激动",
            "blueAvatarUrl":"/image/home.jpeg",
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
            "matchTime":"2021年09月07日 18:00",
            "matchType":2, //1表示单打 2表示双打
            "matchSetType":1, //1表示单局 3表示3局2胜  5表示5局3胜
            "matchStatus":2,//0表示未开始 1表示进行中 2表示已结束
            "redUserId":"u001",
            "redPartId":"u004",
            "redUserName":"小余",
            "redPartName":"jason",
            "redAvatarUrl":"/image/home.jpeg",
            "blueUserId":"u002",
            "bluePartId":"u003",
            "blueUserName":"小胡",
            "bluePartName":"小激动",
            "blueAvatarUrl":"/image/home.jpeg",
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
            "matchTime":"2021年09月07日 18:00",
            "matchType":2, //1表示单打 2表示双打
            "matchSetType":1, //1表示单局 3表示3局2胜  5表示5局3胜
            "matchStatus":2,//0表示未开始 1表示进行中 2表示已结束
            "redUserId":"u001",
            "redPartId":"u004",
            "redUserName":"小余",
            "redPartName":"jason",
            "redAvatarUrl":"/image/home.jpeg",
            "blueUserId":"u002",
            "bluePartId":"u003",
            "blueUserName":"小胡",
            "bluePartName":"小激动",
            "blueAvatarUrl":"/image/home.jpeg",
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
          }, {
            "matchId":"比赛id",
            "matchName":"徐徐的网球年终比赛",
            "matchLabel":"16进8",
            "matchTime":"2021年09月07日 18:00",
            "matchType":2, //1表示单打 2表示双打
            "matchSetType":1, //1表示单局 3表示3局2胜  5表示5局3胜
            "matchStatus":2,//0表示未开始 1表示进行中 2表示已结束
            "redUserId":"u001",
            "redPartId":"u004",
            "redUserName":"小余",
            "redPartName":"jason",
            "redAvatarUrl":"/image/home.jpeg",
            "blueUserId":"u002",
            "bluePartId":"u003",
            "blueUserName":"小胡",
            "bluePartName":"小激动",
            "blueAvatarUrl":"/image/home.jpeg",
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
          }, {
            "matchId":"比赛id",
            "matchName":"徐徐的网球年终比赛",
            "matchLabel":"16进8",
            "matchTime":"2021年09月07日 18:00",
            "matchType":2, //1表示单打 2表示双打
            "matchSetType":1, //1表示单局 3表示3局2胜  5表示5局3胜
            "matchStatus":2,//0表示未开始 1表示进行中 2表示已结束
            "redUserId":"u001",
            "redPartId":"u004",
            "redUserName":"小余",
            "redPartName":"jason",
            "redAvatarUrl":"/image/home.jpeg",
            "blueUserId":"u002",
            "bluePartId":"u003",
            "blueUserName":"小胡",
            "bluePartName":"小激动",
            "blueAvatarUrl":"/image/home.jpeg",
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
          }, {
            "matchId":"比赛id",
            "matchName":"徐徐的网球年终比赛",
            "matchLabel":"16进8",
            "matchTime":"2021年09月07日 18:00",
            "matchType":2, //1表示单打 2表示双打
            "matchSetType":1, //1表示单局 3表示3局2胜  5表示5局3胜
            "matchStatus":2,//0表示未开始 1表示进行中 2表示已结束
            "redUserId":"u001",
            "redPartId":"u004",
            "redUserName":"小余",
            "redPartName":"jason",
            "redAvatarUrl":"/image/home.jpeg",
            "blueUserId":"u002",
            "bluePartId":"u003",
            "blueUserName":"小胡",
            "bluePartName":"小激动",
            "blueAvatarUrl":"/image/home.jpeg",
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
          }, {
            "matchId":"比赛id",
            "matchName":"徐徐的网球年终比赛",
            "matchLabel":"16进8",
            "matchTime":"2021年09月07日 18:00",
            "matchType":2, //1表示单打 2表示双打
            "matchSetType":1, //1表示单局 3表示3局2胜  5表示5局3胜
            "matchStatus":2,//0表示未开始 1表示进行中 2表示已结束
            "redUserId":"u001",
            "redPartId":"u004",
            "redUserName":"小余",
            "redPartName":"jason",
            "redAvatarUrl":"/image/home.jpeg",
            "blueUserId":"u002",
            "bluePartId":"u003",
            "blueUserName":"小胡",
            "bluePartName":"小激动",
            "blueAvatarUrl":"/image/home.jpeg",
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
          }, {
            "matchId":"比赛id",
            "matchName":"徐徐的网球年终比赛",
            "matchLabel":"16进8",
            "matchTime":"2021年09月07日 18:00",
            "matchType":2, //1表示单打 2表示双打
            "matchSetType":1, //1表示单局 3表示3局2胜  5表示5局3胜
            "matchStatus":2,//0表示未开始 1表示进行中 2表示已结束
            "redUserId":"u001",
            "redPartId":"u004",
            "redUserName":"小余",
            "redPartName":"jason",
            "redAvatarUrl":"/image/home.jpeg",
            "blueUserId":"u002",
            "bluePartId":"u003",
            "blueUserName":"小胡",
            "bluePartName":"小激动",
            "blueAvatarUrl":"/image/home.jpeg",
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
          }, {
            "matchId":"比赛id",
            "matchName":"徐徐的网球年终比赛",
            "matchLabel":"16进8",
            "matchTime":"2021年09月07日 18:00",
            "matchType":2, //1表示单打 2表示双打
            "matchSetType":1, //1表示单局 3表示3局2胜  5表示5局3胜
            "matchStatus":2,//0表示未开始 1表示进行中 2表示已结束
            "redUserId":"u001",
            "redPartId":"u004",
            "redUserName":"小余",
            "redPartName":"jason",
            "redAvatarUrl":"/image/home.jpeg",
            "blueUserId":"u002",
            "bluePartId":"u003",
            "blueUserName":"小胡",
            "bluePartName":"小激动",
            "blueAvatarUrl":"/image/home.jpeg",
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
          }, {
            "matchId":"比赛id",
            "matchName":"徐徐的网球年终比赛",
            "matchLabel":"16进8",
            "matchTime":"2021年09月07日 18:00",
            "matchType":2, //1表示单打 2表示双打
            "matchSetType":1, //1表示单局 3表示3局2胜  5表示5局3胜
            "matchStatus":2,//0表示未开始 1表示进行中 2表示已结束
            "redUserId":"u001",
            "redPartId":"u004",
            "redUserName":"小余",
            "redPartName":"jason",
            "redAvatarUrl":"/image/home.jpeg",
            "blueUserId":"u002",
            "bluePartId":"u003",
            "blueUserName":"小胡",
            "bluePartName":"小激动",
            "blueAvatarUrl":"/image/home.jpeg",
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
      console.log(">>>>>>..onReachBottom");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})