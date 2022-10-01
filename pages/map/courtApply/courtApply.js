// pages/map/courtApply/courtApply.js
import {wxDoUploadImage,wxDoDeleteUploadImage} from '../../../utils/imageHttp'; 
const chooseLocation = requirePlugin('chooseLocation');
import { applyTennisCourt } from '../../../utils/mapHttp'; 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    courtTypeColumns: [
      { text: '全部商品', value: 0 },
      { text: '新款商品', value: 1 },
      { text: '活动商品', value: 2 }
    ],
    apply_form:{
      "courtName":"网球场",
      "courtType":10,
      "courtNum":2,
      "openHours":"7:00 - 22:00",
      "envScore":4,
      "reserveDiff":1,
      "homeImageList":[],
      "envImageList":[],
      "priceImageList":[]
    },
    applyLoading: false

  },
  // 数据绑定
  onChange(event) {
    const { key } = event.currentTarget.dataset;
    console.info(key)
    this.setData({
      [key]: event.detail,
    });
  },
  onShow: function () {
    const location = chooseLocation.getLocation(); 
    this.setRegoin(location);
  },


  setRegoin:function (location) {
    if(location == null || location == undefined){
      return;
    }
    let _apply_form = this.data.apply_form;
    _apply_form.province = location.province;
    _apply_form.city = location.city;
    _apply_form.district = location.district;
    _apply_form.address = location.address;
    _apply_form.address = _apply_form.address.replace(location.province,'');
    _apply_form.address = _apply_form.address.replace(location.city,'');
    _apply_form.address = _apply_form.address.replace(location.district,'');

    _apply_form.latitude = location.latitude;
    _apply_form.longitude = location.longitude;
    _apply_form.region = location.address;
    console.log("setRegoin");
    console.log(_apply_form);
    this.setData({
      apply_form: _apply_form
    })

  },


  // 图片上传
  addHomeImageList(event){
    let _this = this;
    let _apply_form = this.data.apply_form;
    wxDoUploadImage(event,
      (res)=>{
        let updateImageInfo={};
        updateImageInfo.url = res.fileID;
        _apply_form.homeImageList.push(updateImageInfo);
        _this.setData({
          apply_form: _apply_form
        })
      }
    );
  },
  deletHomeImageList(res){
    console.log(res);
    let detail = res.detail;
    let _apply_form = this.data.apply_form;
    _apply_form.homeImageList.splice(detail.index,1);
    this.setData({
      apply_form: _apply_form
    })
    wxDoDeleteUploadImage(detail.file.url);
  },


  // 图片上传
  addPriceImageList(event){
    let _this = this;
    let _apply_form = this.data.apply_form;
    wxDoUploadImage(event,
      (res)=>{
        let updateImageInfo={};
        updateImageInfo.url = res.fileID;
        _apply_form.priceImageList.push(updateImageInfo);
        _this.setData({
          apply_form: _apply_form
        })
      }
    );
  },
  deletPriceImageList(res){
    console.log(res);
    let detail = res.detail;
    let _apply_form = this.data.apply_form;
    _apply_form.priceImageList.splice(detail.index,1);
    this.setData({
      apply_form: _apply_form
    })
    wxDoDeleteUploadImage(detail.file.url);
  },


  addEnvImageList(event){
    let _this = this;
    let _apply_form = this.data.apply_form;
    wxDoUploadImage(event,
      (res)=>{
        let updateImageInfo={};
        updateImageInfo.url = res.fileID;
        _apply_form.envImageList.push(updateImageInfo);
        _this.setData({
          apply_form: _apply_form
        })
      }
    );
  },

  // 图片删除
  deletEnvImageList(res){
    console.log(res);
    let detail = res.detail;
    let _apply_form = this.data.apply_form;
    _apply_form.envImageList.splice(detail.index,1);
    this.setData({
      apply_form: _apply_form
    })
    wxDoDeleteUploadImage(detail.file.url);
  },


  chooseLocationMap: function () {
    const key = 'V2LBZ-OFS6W-RDQRL-RIFGS-Y7HFF-OUFI3'; // 使用在腾讯位置服务申请的key
    const referer = 'AT网关'; //调用插件的app的名称
    const location = JSON.stringify({
      latitude: 22.586598,
      longitude: 113.903341
    });
    const category = '网球场';
  
    wx.navigateTo({
      url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location + '&category=' + category,
      success: function(res) {
        // 通过 eventChannel 向被打开页面传送数据
        console.log("navigateTo");
        console.log(res);
      }
    });
  },

  /**
   * 保存地图
   */
  applyCourtMap:function () {
    let _this = this;
    let _apply_form = this.data.apply_form;
    if(_apply_form.courtName === undefined){
      wx.showToast({
        title: '请填写场地名称',
        icon: 'error',
        duration: 1000
      });
      return;
    }
    if(_apply_form.region === undefined){
      wx.showToast({
        title: '请添加位置',
        icon: 'error',
        duration: 1000
      });
      return;
    }
    if(_apply_form.homeImageList.length <= 0){
      wx.showToast({
        title: '请添加主背景图',
        icon: 'error',
        duration: 1000
      });
      return;
  }
  _apply_form.homeImage = _apply_form.homeImageList[0].url;
  if(_apply_form.envImageList.length >= 0){
    let envImage = [];
    for (let index = 0; index < _apply_form.envImageList.length; index++) {
        envImage.push(_apply_form.envImageList[index].url);
    }
    _apply_form.envImage = envImage.join(",");
  }
  if(_apply_form.priceImageList.length >= 0){
    _apply_form.priceImage = _apply_form.priceImageList[0].url;
  }

  _this.setData({
    applyLoading : true
  });
    console.log(_apply_form);
    applyTennisCourt(_apply_form,(res)=>{
      if(res.data.code === "1000000"){
        _this.setData({
          applyLoading : false
        })
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 1000
        })
         // 调整成功
         wx.navigateTo({
           url: '/pages/map/tennisMap/tennisMap',
         })
      }
    });
  }

})