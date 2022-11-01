import {queryInvite, applyClose, joinInvite , cancelJoin} from '../../../utils/inviteHttp'; 
import { searchAtpRank, searchWtaRank} from '../../../utils/atpHttp'; 
import {isLogin,doLogin,getLoginUser} from '../../../utils/login';
import {openLocationMap} from '../../../utils/mapHttp'
import {redirectBeforCheckLogin} from '../../../utils/util'; 

// pages/invite/show/inviteShow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    create_invite_steps: [
      {desc: '基本信息'},
      {desc: '邀约预览'},
      {desc: '分享邀请'}
    ],
    // 是否是发起人
    is_sponsor_user:false,
    // 是否是参与人
    is_join_user:false,
    invite_steps_active:1,
    submit_loading:false,
    queryParam:{
     
    },
    inviteInfo:{

    },
    wtaRankInfo:{},
    atpRankInfo:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      console.log("onLoad");
      this.setData({
        queryParam: options
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    console.log("onReady");
    this.queryInviteInfo();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log("onShow");
    this.queryAtpRank("atp");
    this.queryAtpRank("wta");
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
      let _inviteCode = this.data.queryParam.inviteCode;
      let _inviteInfo = this.data.inviteInfo;
      return {
          title: _inviteInfo.inviteTitle,
          path:"/pages/invite/show/inviteShow?inviteCode="+_inviteCode,
          imageUrl:"",
      }
  },

  // 查询详情
  queryInviteInfo(){
    wx.showLoading({
      title: '加载中',
    });
    let _this = this;
    let _queryParam = this.data.queryParam
    let _loginUser = getLoginUser();
    let loiginUid = _loginUser ? _loginUser.uid : -1;
    queryInvite(
      _queryParam,
      (res) => {
          let _inviteInfo = res.data.data;
          let _is_sponsor_user = _inviteInfo.sponsorInfo.uid === loiginUid;
          let _is_join_user = false;
          if(_inviteInfo.joinUserList){
            for (let index = 0; index < _inviteInfo.joinUserList.length; index++) {
              const element = _inviteInfo.joinUserList[index];
              if(loiginUid === element.uid){
                _is_join_user = true;
                break;
              }
            }
          }
            
          if (_inviteInfo.joinDeadline) {
            let now = new Date().getTime();
            _inviteInfo.joinDeadlineCountTime = new Date(_inviteInfo.joinDeadline).getTime() - now;
          }
          _this.setData({
            inviteInfo: _inviteInfo,
            is_sponsor_user: _is_sponsor_user,
            is_join_user:_is_join_user
          });
          wx.hideLoading();

          console.log(">>>>");
          console.log(this.data);
        }
      );
  },

  // 报名参加活动
  joinInviteInfoCheckLogin(){
    this.setData({
      submit_loading:true
    })
    if(isLogin()){
      this.joinInviteInfo();
    }else{
      doLogin(res=>{
        this.joinInviteInfo();
      })
    }
  },
  joinInviteInfo(){
    let _queryParam = this.data.queryParam
    let _this = this;
    joinInvite(
      _queryParam,
      (res) => {
        _this.setData({
          submit_loading:false
        })
          this.queryInviteInfo()
        }
      );
  },

  // 取消参加
  consalJoinInviteInfoChecKLogin(){
      this.setData({
        submit_loading:true
      })
      if(isLogin){
        this.consalJoinInviteInfo();
      }else{
        doLogin(res=>{
          this.consalJoinInviteInfo();
        })
      }
  },
  consalJoinInviteInfo(){
    let _queryParam = this.data.queryParam
    let _this = this;
    cancelJoin(
      _queryParam,
      (res) => {
          _this.setData({
            submit_loading:false
          })
          this.queryInviteInfo()
        }
      );
  },

  // 取消活动
  closeInviteInfo(){
    let _queryParam = this.data.queryParam
    applyClose(
      _queryParam,
      (res) => {
          this.queryInviteInfo
        }
      );
  },


  // 查询排名
  queryAtpRank:function(_active_tab_name){
    let _this = this;
    let params = {};
    params.page = 1;
    params.size = 3;
    params.searchValue =  "";
    _this.setData({
      isLoading : true
    })
    if(_active_tab_name === 'wta'){
      searchWtaRank(params,(res)=>{
        let result = res.data;
        if(result.code === "1000000"){
          _this.setData({
            wtaRankInfo : result.data,
          })
        }
      });
    }else{
        searchAtpRank(params,(res)=>{
            let result = res.data;
            if(result.code === "1000000"){
              _this.setData({
                atpRankInfo : result.data,
              })
            }
        });
    }
  },

    // 选择地图
    chooseMap(){
      let _inviteInfo = this.data.inviteInfo; 
      if (_inviteInfo.courtLatitude && _inviteInfo.courtLongitude) {
        let defaultLBS = {};
        defaultLBS.latitude = _inviteInfo.courtLatitude;
        defaultLBS.longitude = _inviteInfo.courtLongitude;
        openLocationMap(defaultLBS);
      }
    },

    backForEdit(){
      let _inviteInfo = this.data.inviteInfo; 
      redirectBeforCheckLogin("/pages/invite/edit/inviteEdit?inviteCode="+_inviteInfo.inviteCode);
    }


})