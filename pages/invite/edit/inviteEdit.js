import {wxDoUploadImage,wxDoDeleteUploadImage} from '../../../utils/wxHttp'; 
import {formatTimeTwo} from '../../../utils/util'; 
// pages/inviteShare/inviteShare.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_time: false,
    initShowTime:{
      minDate: new Date().getTime(), //最小时间
      currentDate: new Date().getTime(), //默认时间
    },
    initTextareaSize:{
      "minHeight" : 100 
    },
    create_invite_steps: [
      {desc: '基本信息'},
      {desc: '预览'},
      {desc: '分享邀请'}
    ],
    invite_steps_active:0,
    edit_train_data:{
        trainTitle:"默认标题",
        trainStartTime:"2022-01-02 18:00",
        trainAddress:"宝安公园",
        trainPlayer:0,
        trainExplain:"说明",
        trainPicList:[],
    }
  },

  // 展示时间
  onDisplay() {
    this.setData({ show_time: true });
  },
  // 关闭时间
  onCloseTime(){
    this.setData({ show_time: false });
  },
  // 确认的按钮
  onConfirmTime(res){
    let selectTime = res.detail;
    let timeStr = formatTimeTwo(selectTime,'Y/M/D h:m')
    let _edit_train_data = this.data.edit_train_data;
    _edit_train_data.trainStartTime = timeStr;
    this.setData({
      edit_train_data: _edit_train_data
    })
    this.onCloseTime();
  },

  // 图片删除
  deletUpdateImage(res){
    console.log(res);
    let detail = res.detail;
    let _edit_train_data = this.data.edit_train_data;
    _edit_train_data.trainPicList.splice(detail.index,1);
    this.setData({
      edit_train_data: _edit_train_data
    })
    wxDoDeleteUploadImage(detail.file.url);
  },

  // 图片上传
  addUploadImage(event){
    let _this = this;
    let _edit_train_data = this.data.edit_train_data;
    wxDoUploadImage(event,
      (res)=>{
        let updateImageInfo={};
        updateImageInfo.url = res.fileID;
        _edit_train_data.trainPicList.push(updateImageInfo);
        _this.setData({
          edit_train_data: _edit_train_data
        })
      }
    );
  },



  // 保存并创建邀约信息
  saveAndCreateInvite(){
    wx.navigateTo({
      url: '/pages/invite/share/inviteShare',
    })
  }


})