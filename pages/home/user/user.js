
// pages/user/user.js
import { doLogin, getLoginUser , outLogin, isLogin} from '../../../utils/login'; 



Page({
 

  /**
   * 页面的初始数据
   */
  data: {
      loginUserInfo: {},
      getDataInfo:{}
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let loginInfo = getLoginUser();
    if(loginInfo != null){
       this.setData({
          loginUserInfo: loginInfo
       })
    };
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let loginInfo = getLoginUser();
    if(loginInfo != null){
       this.setData({
          loginUserInfo: loginInfo
       })
    };
  },


  // 登录接口
  inLogin: function(){
    let _this = this;
    doLogin((res)=>{
      _this.setData({
          loginUserInfo:res
      })
    });
  },

  

  //退出登录
  outLogin : function(){
    let _this = this;
    outLogin((res)=>{
      _this.setData({
          loginUserInfo:{}
      })
    })
  }

  
})