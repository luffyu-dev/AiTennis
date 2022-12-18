import {doPost} from './http/wxHttp-pre'; 
// import {doPost} from './http/wxHttp-prod'; 

// 封装的微信登录的方法
export function doLogin(successEvent){
  // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  wx.getUserProfile({
    lang: "zh_CN",
    desc: '用于完善用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    success: (res) => {
      console.info("授权成功");
      wx.login({
        timeout: 3000,
        success: (loginRes)=>{
          let loginUserInfo = {};
          loginUserInfo.nickName = res.userInfo.nickName;
          loginUserInfo.avatarUrl = res.userInfo.avatarUrl;
          loginUserInfo.userNick = res.userInfo.nickName;
          loginUserInfo.userAvatar = res.userInfo.avatarUrl;
          loginUserInfo.thirdAccountKey = loginRes.code;
          loginUserInfo.accountType = 4;
          loginUserInfo.isLogin = true;
          console.log(">>>>>>>>>>>>>loginUserInfo-inir");
          wx.showLoading({
            title: '登录中',
            duration: 10000
          });
          doAtLogin(
            loginUserInfo,
            (res => {
                let result = res.data;
                console.info(">>>>>>loginsuccess" )
                console.info(res )
                if(result.code === "1000000"){
                  let data = result.data;
                  loginUserInfo.uid = data.uid;
                  loginUserInfo.sessionKey = data.sessionKey;
                  wx.setStorageSync('loginUserInfo', loginUserInfo);
                  wx.setStorageSync('login-Cookie', 'Login-Token=' + loginUserInfo.sessionKey);

                  wx.hideLoading();
                  wx.showToast({
                    title:'登录成功' ,
                  });
                  successEvent(loginUserInfo);
                }
            })
          );
        },
        fail:(loginRes)=>{

        }
      })
    },
    fail: (res) => {
      console.info("授权失败")
    }
  })
}

// 获取登录信息的方法
export function getLoginUser(){
  console.log("查询登录的状态》》》》》》》");
  return wx.getStorageSync('loginUserInfo');
}

// 判断当前应用是否登录
export function isLogin(){
  let loginUser = getLoginUser()
  return loginUser && loginUser.isLogin;
}

// 退出登录
export function outLogin(successEvent){
   wx.setStorageSync('loginUserInfo', null);
   wx.setStorageSync('login-Cookie', null);
   wx.showToast({
    title:'已退出登录' ,
    duration: 500//持续的时间
  });
   successEvent();
}



export function doAtLogin(data,event){
  doPost(
    "rubber-user",
    "/user-api/user/login",
    data,
    event);
}
