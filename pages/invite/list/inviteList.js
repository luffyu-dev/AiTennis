// pages/invite/list/inviteList.js

import { queryUserInviteList} from '../../../utils/inviteHttp'; 


Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_active : 0,
    isLoading:false,
    active_tab_name : "0",
    nowSearchPage:1,
    searchValue:"",
    inviteList:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.queryInviteList(this.data.nowSearchPage,this.data.searchValue);
  },

   
  clickTabls:function(event){
    let _active_tab_name = event.detail.name;
    this.setData({
      searchValue : "",
      nowSearchPage:1,
      active_tab_name:_active_tab_name,
      inviteList:[]
    }),
    this.queryInviteList(this.data.nowSearchPage,this.data.searchValue);
  },

  startSearch:function(event){
    let _searchValue = event.detail;
    this.setData({
      searchValue : _searchValue,
      nowSearchPage:1,
      inviteList:[],
    })
    this.queryInviteList(this.data.nowSearchPage,this.data.searchValue);
  },



  queryInviteList:function(page,searchValue){
    let _this = this;
    let params = {};
    params.page = page ? page : 1;
    params.searchValue = searchValue? searchValue : "";
    params.searchType = _this.data.active_tab_name;

    let _inviteList = this.data.inviteList;

    _this.setData({
      isLoading : true
    });

    // 发起邀约请求
    queryUserInviteList(params,res=>{
      let result = res.data;
      if(result.code === "1000000"){
        let list = result.data.records;
        if (list) {
          // 如何直接导入list？
          for (let index = 0; index < list.length; index++) {
            let x = list[index];
            _inviteList.push(x);
          }
        };
        console.log(">>>>>>>list");
        console.log(_inviteList);
        _this.setData({
          inviteList : _inviteList,
          isLoading : false
        });
      }
    })
  }
})