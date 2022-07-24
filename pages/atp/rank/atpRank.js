// pages/atpRank/atpRank.js
// pages/user/user.js
import { searchAtpRank, searchWtaRank} from '../../../utils/atpHttp'; 

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
    isLoading : false,
    atpRankList:[],
    rank_modify_str:""
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.queryAtpRank(this.data.nowSearchPage,this.data.searchValue);
  },

  clickTabls:function(event){
    let _active_tab_name = event.detail.name;
    this.setData({
      searchValue : "",
      nowSearchPage:1,
      active_tab_name:_active_tab_name,
      atpRankList:[]
    })
   this.queryAtpRank(this.data.nowSearchPage,this.data.searchValue);
  },

  startSearch:function(event){
    let _searchValue = event.detail;
    this.setData({
      searchValue : _searchValue,
      nowSearchPage:1,
      atpRankList:[],
      rank_modify_str:""
    })
    this.queryAtpRank(this.data.nowSearchPage,this.data.searchValue);
  },



   /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      let _nowSearchPage = this.data.nowSearchPage + 1;
      this.queryAtpRank(_nowSearchPage,this.data.searchValue);
      this.setData({
        nowSearchPage:_nowSearchPage
      })
  },

  queryAtpRank:function(page,searchValue){
      let _this = this;
      let params = {};
      params.page = page ? page : 1;
      params.searchValue = searchValue? searchValue : "";
      let _atpRankList = this.data.atpRankList;
      let _active_tab_name = this.data.active_tab_name;
      _this.setData({
        isLoading : true
      })
      if(_active_tab_name === 'wta'){
        searchWtaRank(params,(res)=>{
          let result = res.data;
          if(result.code === "1000000"){
            let list = result.data.records;
            for (let index = 0; index < list.length; index++) {
                _atpRankList.push(list[index]);
            };
            console.log("result.modifyTimeStr");
            console.log(result.modifyTimeStr);
            _this.setData({
              atpRankList : _atpRankList,
              isLoading : false,
              rank_modify_str: result.data.modifyTimeStr
            })
          }
        });
      }else{
          searchAtpRank(params,(res)=>{
              let result = res.data;
              if(result.code === "1000000"){
                let list = result.data.records;
                for (let index = 0; index < list.length; index++) {
                    _atpRankList.push(list[index]);
                };
                _this.setData({
                  atpRankList : _atpRankList,
                  isLoading : false,
                  rank_modify_str: result.data.modifyTimeStr
                })
              }
          });
      }
  }




})