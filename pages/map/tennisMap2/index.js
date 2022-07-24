// pages/map/tennisMap/index.js
const citySelector = requirePlugin('citySelector');
const img = '/image/location.png'
const chooseLocation = requirePlugin('chooseLocation');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 23.099994,
    longitude: 113.324520,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    this.mapCtx = wx.createMapContext('mapId')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const selectedCity = citySelector.getCity(); // 选择城市后返回城市信息对象，若未选择返回null
    console.log(selectedCity);

    const location = chooseLocation.getLocation(); 
    console.log(location);

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    citySelector.clearCity();
  },

  showMap: function () {
    const key = 'V2LBZ-OFS6W-RDQRL-RIFGS-Y7HFF-OUFI3'; // 使用在腾讯位置服务申请的key
    const referer = 'AT网关'; // 调用插件的app的名称
    const hotCitys = ''; // 用户自定义的的热门城市
    
    wx.navigateTo({
      url: `plugin://citySelector/index?key=${key}&referer=${referer}&hotCitys=${hotCitys}`,
    })
  },
  showS: function () {
    const key = 'V2LBZ-OFS6W-RDQRL-RIFGS-Y7HFF-OUFI3'; // 使用在腾讯位置服务申请的key
    const referer = 'AT网关'; //调用插件的app的名称
    const location = JSON.stringify({
      latitude: 39.89631551,
      longitude: 116.323459711
    });
    const category = '网球,娱乐休闲';

  
    wx.navigateTo({
      url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location + '&category=' + category,
      success: function(res) {
        // 通过 eventChannel 向被打开页面传送数据
        console.log("navigateTo");
        console.log(res);
      }
    });
  },

  addMark:function () {

    // 标记的基本信息
    const marker = {
      id: 1,
      iconPath: img,
      width: 50,
      height: 50,
      joinCluster: true, // 指定了该参数才会参与聚合
      label:{
        width: 50,
        height: 30,
        borderWidth: 1,
        borderRadius: 10,
        bgColor: '#ffffff'
      },

      
    };

    const positions = [
      {
        latitude: 23.099994,
        longitude: 113.324520,
      }, {
        latitude: 23.099994,
        longitude: 113.322520,
      }, {
        latitude: 23.099994,
        longitude: 113.326520,
      }, {
        latitude: 23.096994,
        longitude: 113.329520,
      }
    ];
    console.log("<<<<<<<<<<<<");
    const markers = []
    positions.forEach((p, i) => {
      const newMarker = Object.assign(marker, p)
      newMarker.id = i + 1
      newMarker.label.content = `label ${i + 1}`
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
  onMarkerTap(e) {
    console.log('@@ markertap', e)
  },
  
  onCalloutTap(e) {
    console.log('@@ onCalloutTap', e)
  },

  onLabelTap(e) {
    console.log('@@ labletap', e)
  }




})