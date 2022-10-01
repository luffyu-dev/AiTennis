
// 线上环境
let env = 'prod-2g8hvztb6dd50477';


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

