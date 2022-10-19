// 线上环境
let env = 'prod-2g8hvztb6dd50477';

// 线上环境
// http://api.luffyu.cn/at-api/rank/atp/search
let host = 'http://api.luffyu.cn';





// get请求
export function  doGet(serverName,url,data,event) {
  let loginUserInfo = wx.getStorageSync('loginUserInfo') 

  wx.request({
    url: host + url, //仅为示例，并非真实的接口地址
    data: data,
    header: {
      'Content-Type': 'application/json',
      'Cookie': wx.getStorageSync('login-Cookie')
    },
    success (res) {
      console.log('>>>>>>>>>>>doMOCKLGet success')
      console.log(res),
      event(res);
    }
  })
}

// post请求
export function  doPost(serverName,url,data,event) {
  wx.request({
    url: host + url, //仅为示例，并非真实的接口地址
    data: data,
    method: 'POST',
    header: {
      'Content-Type': 'application/json',
      'Cookie': wx.getStorageSync('login-Cookie')
    },
    success (res) {
      console.log('>>>>>>>>>>>doMOCKLGet success')
      console.log(res)
      if (res.data && res.data.code == '1000000') {
        event(res);
      }else{
        wx.showToast({
          title: '系统繁忙,请重试',
        })
      }
    }
  })
}



// 图片上传
export function wxDoUploadImage(updateEvent,succeEvent){
  const { file } = updateEvent.detail;
  let imageName = file.url.substr(file.url.lastIndexOf("/") + 1)
  let cloudPath = 'image/at/'+imageName;
  wx.cloud.uploadFile({
    cloudPath: cloudPath, // 对象存储路径，根路径直接填文件名，文件夹例子 test/文件名，不要 / 开头
    filePath: file.url, // 微信本地文件，通过选择图片，聊天文件等接口获取
    config: {
      env: env // 需要替换成自己的微信云托管环境ID
    },
    success: res => {
      console.log(res);
      succeEvent(res)
    }
  })
}

// 图片删除
export function wxDoDeleteUploadImage(fileId){
  let fileIds = [];
  fileIds.push(fileId);
  wx.cloud.deleteFile({
    fileList: fileIds, // 对象存储文件ID列表，最多50个，从上传文件接口或者控制台获取
    config: {
      env: env // 需要替换成自己的微信云托管环境ID
    },
    success: res => {
      console.log("wxDoDeleteUploadImage success");
      console.log(res);
    }
  })
  
}

