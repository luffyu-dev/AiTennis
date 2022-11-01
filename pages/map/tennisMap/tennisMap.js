// pages/map/courtShow/index.js
import { searchByRegion,getNowUserLocation } from '../../../utils/mapHttp'; 


const img = '/image/logo/location.png'
const img_user = '/image/logo/location2.png'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户当前的位置
    userLocation:{},
    // 当前点击的地址
    onLocation:{
      latitude: 22.586598,
      longitude: 113.903341,
     },
    // 附近的场地信息
    tennisCourtList: [],
    // 地图搜索的loading
    isCourtLoading: false,

    search_choice:{
        default_region:'宝安区',
        default_court_type:0,
        region:[
          { text: '宝安区', value: '宝安区' },
          { text: '南山区', value: '南山区' },
          { text: '福田区', value: '福田区' }
        ],
        court_type:[
          { text: '全部场地', value: 0 },
          { text: '室外硬地', value: 10 },
          { text: '风雨棚', value: 20 },
          { text: '室内硬地', value: 30 },
          { text: '红土', value: 40 },
          { text: '草地', value: 50 }
        ]
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.mapCtx = wx.createMapContext('tennis_map_id')

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // 获取用户的地址信息
    this.getCacheUserLocation();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
        title: "AT网球-附近网球场",
        path:"/pages/map/tennisMap/tennisMap",
        imageUrl:"",
    }
  },

  /**
   * 获取的地址是有缓存的
   */
  getCacheUserLocation(){
    let _this = this;
    getNowUserLocation(true,(res)=>{
        _this.setData({
          userLocation : res,
          onLocation: res
        });
        this.queryTennisCourt(res);
        this.addUserMark(res);
    });
  },

  /**
   * 获取实时的地址
   */
  getUserLocation(){
    let _this = this;
    getNowUserLocation(false,(res)=>{
      _this.setData({
        userLocation : res,
        onLocation: res,
        tennisCourtList: []
      })
      this.queryTennisCourt(res);
    });
  },

  // 数据变化的操作
  change_search_choice:function (params) {
      console.log("change_search_choice");
      console.log(params);
  },

  // 查询附近的网球球场
  queryTennisCourt(params){
    wx.showLoading({
      title: '加载中',
    });
    console.log("queryTennisCourt");
    params['district']='';
    console.log(params);
    let _this = this;
    _this.setData({
      isCourtLoading: true
    })
    searchByRegion(params,(res)=>{
        console.log(res);
        let result = res.data;
        if(result.code === "1000000"){
          let list = result.data;
          let markPositions = [];
          for (let index = 0; index < list.length; index++) {
            let x = list[index];
            let positions = {};
            positions.latitude = Number(x.latitude);
            positions.longitude = Number(x.longitude);
            positions.courtName = x.courtName;
            positions.courtId = x.id;
            markPositions.push(positions);
          };
          _this.setData({
            tennisCourtList : list,
            isCourtLoading: false
          }),
          _this.addMark(markPositions);
          wx.hideLoading();
        }
    })
  },

    // 标记的基本信息
    // positions = [{latitude: 23.099994,longitude: 113.324520}]
  addMark:function (positions) {

    // 标记的基本信息
    const marker = {
      id: 1,
      iconPath: img,
      width: 50,
      height: 50,
      joinCluster: true, // 指定了该参数才会参与聚合
      label:{
        width: 90,
        height: 35,
        borderRadius: 10,
        bgColor: '#005335',
        color: '#ffffff',
      },
    };
    const markers = []
    positions.forEach((p, i) => {
      const newMarker = Object.assign(marker, p)
      newMarker.id = p.courtId;
      newMarker.label.content = p.courtName;
      markers.push(newMarker)
      this.mapCtx.addMarkers({
        markers,
        clear: false,
        complete(res) {
          console.log('addMarkers', res)
        }
      })
    })
  },

  addUserMark:function (positions) {
    console.log("addUserMark");
    console.log(positions);
    // 标记的基本信息
    const marker = {
      id: 0,
      iconPath: img_user,
      width: 50,
      height: 50,
      joinCluster: false, // 指定了该参数才会参与聚合
    };
    const markers = []
    const newMarker = Object.assign(marker, positions);
    markers.push(newMarker)
    this.mapCtx.addMarkers({
      markers,
      clear: false,
      complete(res) {
        console.log('addMarkers', res)
      }
    })
  },



  onMarkerTap(e) {
    console.log('@@ markertap', e)
  },
  
  onCalloutTap(e) {
    console.log('@@ onCalloutTap', e)
  },

  onLabelTap(e) {
    console.log('@@ labletap', e)
  },

  // 设置移动地图到中心到某个点
  onCourtLbs(res){
      const index= res.currentTarget.dataset['index'];
      let positions = {};
      positions.latitude = Number(index.latitude);
      positions.longitude = Number(index.longitude);
      this.setData({
        onLocation: positions
      })
  },

  onSearchByKey(operator){
      let _this = this;
      let _searchValue = operator.detail;
      getNowUserLocation(true,(res)=>{
          _this.setData({
            userLocation : res,
            onLocation: res
          });
          res.searchMapKey = _searchValue;
          this.queryTennisCourt(res);
          this.addUserMark(res);
      });
      console.log(operator)
  }

})