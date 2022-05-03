// pages/matchGame/matchGame.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active1:[],
    matchInfo:{
      "matchId":1,
      "matchName":"徐徐网球群年终比赛",
      "matchLabel":"",
      "matchTime":"2021年09月07日 18:00",
      "matchStatus":1,//0表示未开始 1表示进行中 2表示已结束
      "rule":{
        "matchType":'1', //1表示单打 2表示双打
        "matchSetType":'1', //1表示单盘 3表示3盘2胜  5表示5盘3胜
        "matchBallType":'1', //1表示金球 2表示占先
        "strongType":'1',//1表示抢七 0表示不
        "matchGameType":'4',//表示打6局
      },
      "redUserId":"u001",
      "redPartId":"u004",
      "redUserName":"小A",
      "redPartName":"小AA",
      "redAvatarUrl":"/image/home.jpeg",
      "blueUserId":"u002",
      "bluePartId":"u003",
      "blueUserName":"小B",
      "bluePartName":"小BB",
      "blueAvatarUrl":"/image/home.jpeg",
      "redWinSetNum":0,
      "blueWinSetNum":0,
      "matchSetList":[
        {
            "nowGameSetNum":1, //当前是第几盘
            "gameSetStatus":1,// 0表示未开始 1表示进行中 2表示已经结束
            "redWinGameNum":0,
            "blueWinGameNum":0,
            "gameWaterList":[
              // {
              //   "nowGameNum":"1", //当前是第几局
              //   "redWinGameNum":"1", 
              //   "blueWinGameNum":"0",
              //   "redWinScore":"45",
              //   "blueWinScore":"15",
              // },
            ]
        }
      ]
    },
    activeMatchInfo:{
        "nowStartSet":1,
        "redWinGameNum":0,
        "blueWinGameNum":0,
        "nowGameNum":0,
        "redWinScoreNum":0,
        "blueWinScoreNum":0,
    },
    //保存上一步的数据
    preActiveMatchInfo:{},
    scoreArray:[0,15,30,40,'AD',45],
  },


  onChange(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({
      [key]: event.detail,
    });
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
  addRedScore:function(){
    var activeMatchInfo = this.data.activeMatchInfo;
    this.doRecordPreData();
    let nowRedScore =activeMatchInfo.redWinScoreNum;
    let nowBlueScore =activeMatchInfo.blueWinScoreNum;
    if(nowRedScore >= 3){
        if(this.data.matchInfo.rule.matchBallType == 1){
            //金球 表示红方获胜利
            console.info('金球 表示红方获胜利');
            nowRedScore = 5;
        }else{
          //表示占先模式
          if(nowBlueScore == 3){
            //表示红方占先
            nowRedScore += 1;
          }else if (nowBlueScore == 4){
              nowBlueScore = 3;
          }else{
            nowRedScore = 5;
          }
        }
    }else{
      nowRedScore += 1;
    }
    activeMatchInfo.redWinScoreNum = nowRedScore;
    activeMatchInfo.blueWinScoreNum = nowBlueScore;
    this.setData({
      activeMatchInfo: activeMatchInfo
    })
    this.doCheckGameEnd();
  },

  addBlueScore:function(){
    this.doRecordPreData();
    let activeMatchInfo = this.data.activeMatchInfo;
    let nowBlueScore =activeMatchInfo.blueWinScoreNum;
    let nowRedScore =activeMatchInfo.redWinScoreNum;

    if(nowBlueScore >= 3){
        if(this.data.matchInfo.rule.matchBallType == 1){
            //金球 表示红方获胜利
            nowBlueScore = 5;
        }else{
          //表示占先模式
          if(nowRedScore == 3){
            //表示红方占先
            nowBlueScore += 1;
          }else if (nowRedScore == 4){
             nowRedScore = 3;
          }else{
            nowBlueScore = 5;
          }
        }
    }else{
      nowBlueScore += 1;
    }
    activeMatchInfo.redWinScoreNum = nowRedScore;
    activeMatchInfo.blueWinScoreNum = nowBlueScore;
    this.setData({
      activeMatchInfo: activeMatchInfo
    })
    this.doCheckGameEnd();
  },


  /**
   * 判断当前一局是否已经结束
   */
  doCheckGameEnd:function(){
        let activeMatchInfo = this.data.activeMatchInfo;
        if(activeMatchInfo.redWinScoreNum == 5 || activeMatchInfo.blueWinScoreNum == 5){
            if(activeMatchInfo.redWinScoreNum == 5){
               activeMatchInfo.redWinGameNum += 1;
            }else{
               activeMatchInfo.blueWinGameNum += 1;
            }
            console.info('当前局结束>>>>' +  activeMatchInfo.redWinGameNum + ">" + activeMatchInfo.blueWinGameNum);
            //当前盘为  activeMatchInfo.
          let gameSet = this.findGameSetBySetNum(activeMatchInfo.nowStartSet);
          gameSet.gameWaterList.push(this.copyData(activeMatchInfo));
          gameSet.redWinGameNum = activeMatchInfo.redWinGameNum;
          gameSet.blueWinGameNum = activeMatchInfo.blueWinGameNum;

          //需要添加到db
          activeMatchInfo.redWinScoreNum = 0;
          activeMatchInfo.blueWinScoreNum = 0;
          activeMatchInfo.nowGameNum +=1
          this.setData({
              activeMatchInfo:activeMatchInfo,
              matchInfo:this.data.matchInfo
            }
          )
            //添加局数变化
          this.doCheckGameSetEnd();
        }
  },

  /**
   * 判断当前盘是否结束 
   */
  doCheckGameSetEnd(){
      let activeMatchInfo = this.data.activeMatchInfo;
      let rule = this.data.matchInfo.rule;
      let maxWinGame = Math.max(activeMatchInfo.redWinGameNum,activeMatchInfo.blueWinGameNum);
      let mixWinGame = Math.min(activeMatchInfo.redWinGameNum,activeMatchInfo.blueWinGameNum);
      //表示已经有人先到 得分处
      if(maxWinGame >= rule.matchGameType ){
          if(rule.strongType == 0){
            //表示不抢七 单盘获胜，开始下一盘
            this.doBeginNextGameSet();
          }else{
            //表示抢七，
            if(maxWinGame - mixWinGame >= 2){
                //表示获胜，开始下一盘
                this.doBeginNextGameSet();
            }else if(mixWinGame - rule.matchGameType >= 1){
                //表示获胜
                this.doBeginNextGameSet();
            }else if(mixWinGame == rule.matchGameType){
                //抢七局

            }
          }
      }
  },
  /**
   * 开始下一盘
   */
  doBeginNextGameSet(){
      console.info("开始进行下一盘");
      let activeMatchInfo = this.data.activeMatchInfo;
      let oldGameSet = this.findGameSetBySetNum(activeMatchInfo.nowStartSet);
      oldGameSet.gameSetStatus = 2;
      let matchInfo = this.data.matchInfo;
      if(activeMatchInfo.redWinGameNum > activeMatchInfo.blueWinGameNum){
        matchInfo.redWinSetNum += 1;
      }else{
        matchInfo.blueWinSetNum += 1;
      }
      this.setData({
        matchInfo:this.data.matchInfo
      })
      
      console.info("当前盘数<<<" + matchInfo.redWinSetNum + ">>" +matchInfo.blueWinSetNum)

      if(!this.isCheckMatchEnd()){
        console.info("当前盘数<<<" + matchInfo.redWinSetNum + ">>" +matchInfo.blueWinSetNum)
        activeMatchInfo.nowStartSet = activeMatchInfo.nowStartSet + 1;
        activeMatchInfo.redWinGameNum = 0;
        activeMatchInfo.blueWinGameNum = 0;
        activeMatchInfo.nowGameNum = 1;
        activeMatchInfo.redWinScoreNum = 0;
        activeMatchInfo.blueWinScoreNum = 0;
        this.setData({
          activeMatchInfo : this.data.activeMatchInfo
        })
        this.findGameSetBySetNum(activeMatchInfo.nowStartSet);
      }
  },

  /**
   * 检测是否已经结束
   */
  isCheckMatchEnd(){
    let matchInfo = this.data.matchInfo;
    let rule = matchInfo.rule;
    console.info("检测是否已经结束》》》"+ rule.matchSetType)
    if(rule.matchSetType == 1){
        if(matchInfo.redWinSetNum - matchInfo.blueWinSetNum != 0){
          matchInfo.matchStatus = 2;
        }
    }else if(rule.matchSetType == 3){ 
        let maxSetNum = Math.max(matchInfo.redWinSetNum,matchInfo.blueWinSetNum);
        if(maxSetNum >= 2){
          matchInfo.matchStatus = 2;
        }
    }else if(rule.matchSetType == 5){ 
      let maxSetNum = Math.max(matchInfo.redWinSetNum,matchInfo.blueWinSetNum);
      if(maxSetNum >= 3){
        matchInfo.matchStatus = 2;
      }
    }
    if(matchInfo.matchStatus == 2){
        this.setData({
          matchInfo: this.data.matchInfo
        })
        return true;
    }
    return false;

  },

  /**
   * 通过当前盘数 查询相关信息
   * @param {*} gameSetNum  当前盘数
   */
  findGameSetBySetNum:function(gameSetNum){
      var matchSetList = this.data.matchInfo.matchSetList;
      for(var i in matchSetList){
          var gameSetInfo = matchSetList[i];
          if(gameSetInfo.nowGameSetNum == gameSetNum){
             return  gameSetInfo;
          }
      }
      //表示没有找到
      var nowGameSet = {};
      nowGameSet.nowGameSetNum = gameSetNum; //当前是第几盘
      nowGameSet.gameSetStatus = 1;// 0表示未开始 1表示进行中 2表示已经结束
      nowGameSet.redWinGameNum = 0;
      nowGameSet.blueWinGameNum = 0;
      nowGameSet.gameWaterList = [];
      matchSetList.push(nowGameSet);
      this.setData({
                matchInfo:this.data.matchInfo
              }
        )
      return this.findGameSetBySetNum(gameSetNum);
  },

  /**
   * 记录上一个盘点的数据
   */
  doRecordPreData:function(){
    var preActiveMatchInfo = this.copyData(this.data.activeMatchInfo);
    this.setData({
      preActiveMatchInfo:preActiveMatchInfo
    }
  )
    
  },

  /**
   * 撤销到上一步
   */
  backScore:function(){
    let preActiveMatchInfo = this.copyData(this.data.preActiveMatchInfo);
    if(preActiveMatchInfo != '{}'){
      this.setData({
        activeMatchInfo: preActiveMatchInfo
      })
    }
  },

  /**
   * 复制一个新到对象
   * @param {s} a 
   */
  copyData:function(a){
    var c={};
    c=JSON.parse(JSON.stringify(a));
    return c;
  }


})