
const app = getApp();

export function getLoginWxUserInfo(){
   console.log("getUserInfo");
   var wxUserInfo = app.globalData.userInfo;
   if (wxUserInfo != undefined){
      return wxUserInfo;
   }
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserInfo({
      withCredentials:true,
      success: (res) => {
        console.log(res);
        app.globalData.userInfo = res.userInfo
        return app.globalData.userInfo
      }
    })
}