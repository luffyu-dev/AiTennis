// pages/atp/player/player.js


import { searchWtaPlayer, searchAtpPlayer} from '../../../utils/atpHttp'; 


Page({

  /**
   * 页面的初始数据
   */
  data: {
      // 选中的table
      tab_active : 0,
      active_tab_name : "atp",
      nowSearchPage:1,
      searchValue:"",
      playerList:[],

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.queryPlayerList(this.data.nowSearchPage,this.data.searchValue);
  },
 

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      let _nowSearchPage = this.data.nowSearchPage + 1;
      this.queryPlayerList(_nowSearchPage,this.data.searchValue);
      this.setData({
        nowSearchPage:_nowSearchPage
      })
  },



  startSearch:function(event){
    let _searchValue = event.detail;
    this.setData({
      searchValue : _searchValue,
      nowSearchPage:1,
      playerList:[],
    })
    this.queryPlayerList(this.data.nowSearchPage,this.data.searchValue);
  },

  
  clickTabls:function(event){
    let _active_tab_name = event.detail.name;
    this.setData({
      searchValue : "",
      nowSearchPage:1,
      active_tab_name:_active_tab_name,
      playerList:[]
    })
   this.queryPlayerList(this.data.nowSearchPage,this.data.searchValue);
  },


  queryPlayerList:function(page,searchValue){
    let _this = this;
    let params = {};
    params.page = page ? page : 1;
    params.searchValue = searchValue? searchValue : "";
    let _playerList = this.data.playerList;
    let _active_tab_name = this.data.active_tab_name;
    _this.setData({
      isLoading : true
    })
    if(_active_tab_name === 'wta'){
      searchWtaPlayer(params,(res)=>{
        let result = res.data;
        if(result.code === "1000000"){
          let list = result.data.records;
          for (let index = 0; index < list.length; index++) {
              let x = list[index];
              this.createAge(x);
              this.initTags(x);
              _playerList.push(x);
          };
          _this.setData({
            playerList : _playerList,
            isLoading : false
          })
        }
      });
    }else{
      searchAtpPlayer(params,(res)=>{
            let result = res.data;
            if(result.code === "1000000"){
              let list = result.data.records;
              for (let index = 0; index < list.length; index++) {
                let x = list[index];
                this.createAge(x);
                this.initTags(x);
                _playerList.push(x);
              };
              console.log(">>>>>>>>>>>_playerList");
              console.log(_playerList);
              _this.setData({
                playerList : _playerList,
                isLoading : false,
              })
            }
        });
    }
},
  initTags: function (playerInfo) {
      if(playerInfo.tags && playerInfo.tags != undefined){
        playerInfo.tagArray = playerInfo.tags.split(",");
      }
  },

  createAge:function (playerInfo){
    var today= new Date();
    var todayYear=today.getFullYear();
    var todayMonth=today.getMonth()+1;
    var todayDay=today.getDate();

    var birthdayDate = playerInfo.birthday.split("-");
    var age = todayYear - birthdayDate[0] - 1;
    if(age < 0){
      return 0;
    }
    if(todayMonth > birthdayDate[1]){
      age++;
    }else if(todayMonth == birthdayDate[1] && todayDay >= birthdayDate[2]){
      age++;
    }
    playerInfo.birthdayStr = birthdayDate[0]+"/"+birthdayDate[1]+"/"+birthdayDate[2];
    playerInfo.age = age;
    playerInfo.isBirthday = (todayMonth == birthdayDate[1] && todayDay == birthdayDate[2])
  }


})