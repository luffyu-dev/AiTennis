import {wxDoUploadImage,wxDoDeleteUploadImage} from '../../../utils/imageHttp'; 
import {formatTimeTwo,navigateBeforCheckLogin} from '../../../utils/util'; 

import {applyInvite} from '../../../utils/inviteHttp'; 
const chooseLocation = requirePlugin('chooseLocation');

import {chooseLocationMap} from '../../../utils/mapHttp'

// pages/inviteShare/inviteShare.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_time: false,
    initShowTime:{
      setFieldName:'edit_train_data.startTime', // 设置的字段
      minDate: new Date().getTime(), //最小时间
      defaultData: new Date().getTime()
    },
    initTextareaTitleSize:{
      "minHeight" : 50 
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
    advanced_setting:['1'],
    joinDeadlineInfo:{
      showSelect:false,
      selectDetail:{ name: '一天之后' ,type:'2'},
      selectData:[
        { name: '今天12点前',type:'1'},
        { name: '一天之后' ,type:'2'},
        { name: '三天之后' ,type:'3'},
        { name: '一周之后' ,type:'4'},
        { name: '自定义' ,type:'5'},
      ]
    },

    edit_train_data:{
        "inviteNumber": 4,
        "homePicList":[]
    },

    datetime_picker_filter(type,options){
      if (type === 'minute') {
        return options.filter((option) => option % 30 === 0);
      }
      return options;
    }
  },

  // 展示时间
  onDisplay(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({ 
      show_time: true,
      ['initShowTime.setFieldName']:key
    });
  },
  // 关闭时间
  onCloseTime(){
    this.setData({ show_time: false });
  },
  onShow: function () {
    const location = chooseLocation.getLocation(); 
    this.setRegoin(location);
    this.doSelectJoinDeadlineInfo(this.data.joinDeadlineInfo.selectDetail);
  },
  // 确认的按钮
  onConfirmTime(res){
    let key = this.data.initShowTime.setFieldName;
    let selectTime = res.detail;
    let timeStr = formatTimeTwo(selectTime,'Y-M-D h:m:s')
    this.setData({
      [key]: timeStr,
      ['initShowTime.defaultData']: selectTime
    });
    // 设置默认结束时间
    let _edit_train_data = this.data.edit_train_data;
    if(key == 'edit_train_data.startTime' && _edit_train_data.endTime === undefined){
      //  默认为2小时之后
      let endTime = selectTime + 7200000;
      let endStr = formatTimeTwo(endTime,'Y-M-D h:m:s');
      this.setData({
        ['edit_train_data.endTime']: endStr,
        ['initShowTime.defaultData']: endTime
      });
    }
    
    this.onCloseTime();
  },

  // 图片删除
  deletUpdateImage(res){
    console.log(res);
    let detail = res.detail;
    let _edit_train_data = this.data.edit_train_data;
    _edit_train_data.homePicList.splice(detail.index,1);
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
        console.log(">>>>>");
        let updateImageInfo={};
        updateImageInfo.url = res.fileID;
        _edit_train_data.homePicList.push(updateImageInfo);
        console.log(">>>>>");
        console.log(_edit_train_data);
        _this.setData({
          edit_train_data: _edit_train_data
        })
      }
    );
  },


  // 保存并创建邀约信息
  saveAndCreateInvite(){
    let _apply_form  = this.data.edit_train_data;
    if(_apply_form.inviteTitle === undefined || _apply_form.inviteTitle === ''){
      wx.showToast({
        title: '请填写标题',
        icon: 'error',
        duration: 1000
      });
      return;
    }
    if(_apply_form.inviteNumber === undefined || _apply_form.inviteNumber <= 0) {
      wx.showToast({
        title: '请填写最大人数',
        icon: 'error',
        duration: 1000
      });
      return;
    }
    if(_apply_form.homePicList.length <= 0){
      wx.showToast({
        title: '请至少上传一张照片',
        icon: 'error',
        duration: 1000
      });
      return;
    }
    _apply_form.inviteHomeImg = _apply_form.homePicList[0].url;
    //navigateBeforCheckLogin("/pages/invite/show/inviteShow?inviteCode=ICnnm_Qlvtw1D7YEP8");
    applyInvite(
      _apply_form,
      (result)=>{
        // 跳转到详情页
        let code = result.data.data.inviteCode;
        //navigateBeforCheckLogin("/pages/invite/edit/inviteShow");
        navigateBeforCheckLogin("/pages/invite/show/inviteShow?inviteCode="+code);
      }
    )
  },
  // 选择地图
  chooseMap(){
    chooseLocationMap()
  },

  // 数据绑定
  onChange(event) {
    console.log("onChange>>>>>>>>>>>>>");
    const { key } = event.currentTarget.dataset;
    console.info(key)
    this.setData({
      [key]: event.detail,
    });
  },

  /**
   * 设置区域
   * @param  location 
   */
  setRegoin:function (location) {
    if(location == null || location == undefined){
      return;
    }
    let _apply_form = this.data.edit_train_data;
    _apply_form.courtProvince = location.province;
    _apply_form.courtCity = location.city;
    _apply_form.courtDistrict = location.district;
    _apply_form.courtAddress = location.address;

    _apply_form.courtAddress = _apply_form.courtAddress.replace(location.province,'');
    _apply_form.courtAddress = _apply_form.courtAddress.replace(location.city,'');
    _apply_form.courtAddress = _apply_form.courtAddress.replace(location.district,'');

    _apply_form.courtLatitude = location.latitude;
    _apply_form.courtLongitude = location.longitude;

    _apply_form.region = location.address;
    this.setData({
      edit_train_data: _apply_form
    })

  },

  // 截止时间选择
  openJoinDeadlineInfo(params) {
    let _joinInfo = this.data.joinDeadlineInfo;
    console.log(">>>>>>>>>"+_joinInfo);
    _joinInfo.showSelect = true;
    this.setData({
      joinDeadlineInfo:_joinInfo
    })
  },
  closeJoinDeadlineInfo(params) {
    console.log(">>>>>>>>>>closeJoinDeadlineInfo");
    console.log(params);
    let _joinInfo = this.data.joinDeadlineInfo;
    console.log(_joinInfo);
    _joinInfo.showSelect = false;
    this.setData({
      joinDeadlineInfo:_joinInfo
    })
  },
  selectJoinDeadlineInfo(params) {
    this.doSelectJoinDeadlineInfo(params.detail);
  },
  doSelectJoinDeadlineInfo(selectDetail) {
    console.log(">>>>>>>>>>selectJoinDeadlineInfo");
    console.log(selectDetail);
    let _joinInfo = this.data.joinDeadlineInfo;
    _joinInfo.selectDetail = selectDetail;

    let now = new Date().getTime();
    let timeStr = formatTimeTwo(now,'Y-M-D 23:59:59');
    let joinDeadlineTime = new Date(timeStr).getTime();
    // 设置截止日期
    if(selectDetail.type == '1'){
      joinDeadlineTime += 0
    }
    if(selectDetail.type == '2'){
      joinDeadlineTime += (86400000 * 1)
    }
    if(selectDetail.type == '3'){
      joinDeadlineTime += (86400000 * 3)
    }
    if(selectDetail.type == '4'){
      joinDeadlineTime += (86400000 * 7)
    }
    this.setData({
      joinDeadlineInfo:_joinInfo,
      ['edit_train_data.joinDeadline']: formatTimeTwo(joinDeadlineTime,'Y-M-D 23:59:59')
    })
  },



  
  // 更多专业设置
  openAdvancedSetting(event){
    this.setData({
      advanced_setting: event.detail,
    });
  }
  


})