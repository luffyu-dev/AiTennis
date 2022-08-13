
// 线上环境
let env = 'prod-2gxjsh9eca9883f0';
// 测试服务
let wx_cloud_server_name = 'test';

let openMock = true;

export function doAtLogin(data,event){
  doPost(
    "rubber-user",
    "/user-api/user/login",
    data,
    event);
}



export function doGet(serverName,url,data,event){
  if(openMock){
    doGetMock(serverName,url,data,event)
    return;
  }

  wx.cloud.callContainer({
    config: {
      env: env, // 微信云托管的环境ID
    },
    path: url, // 填入业务自定义路径和参数，根目录，就是 / 
    method: 'GET', // 按照自己的业务开发，选择对应的方法
    header: {
      'X-WX-SERVICE': serverName, // xxx中填入服务名称（微信云托管 - 服务管理 - 服务列表 - 服务名称）
      'Content-Type': 'application/json'
    },
    data: data,
    success(res){
      console.log('>>>>>>>>>>>doGet success')
      console.log(res),
      event(res);
    }
  });
}



export function doPost(serverName,url,data,event){
  if(openMock){
    doGetMock(serverName,url,data,event)
    return;
  }
  console.log('>>>>>>>>>>>doPost')
  wx.cloud.callContainer({
    config: {
      env: env, // 微信云托管的环境ID
    },
    path: url, // 填入业务自定义路径和参数，根目录，就是 / 
    method: 'POST', // 按照自己的业务开发，选择对应的方法
    header: {
      'X-WX-SERVICE': serverName, // xxx中填入服务名称（微信云托管 - 服务管理 - 服务列表 - 服务名称）
      'Content-Type': 'application/json'
    },
    data: data,
    success(res){
      console.log('>>>>>>>>>>>doPost success')
      console.log(res),
      event(res);
    },
    fail(res){
      console.log('>>>>>>>>>>>doPost fail')
      wx.showToast({
        title: '请求异常',
        icon: 'error',
        duration: 1000//持续的时间
      })
    }
  });
}



// 图片上传组件
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




export function  doGetMock(serverName,url,data,event) {
  console.log('>>>>>>>>>>>doMOCKLGet start')
  wx.request({
    url: 'https://console-mock.apipost.cn/app/mock/project/edefc4ea-1d5a-408e-e869-c709cd1275e1' + url, //仅为示例，并非真实的接口地址
    data: data,
    header: {
      'Content-Type': 'application/json'
    },
    success (res) {
      console.log('>>>>>>>>>>>doMOCKLGet success')
      console.log(res),
      event(res);
    }
  })
}
