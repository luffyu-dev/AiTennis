// pages/invite/share/inviteShare.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    create_invite_steps: [
      {desc: '基本信息'},
      {desc: '预览'},
      {desc: '分享邀请'}
    ],
    invite_steps_active:1,
    invite_train_data:{}
  },

    /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.queryInviteShareData();
  },


  queryInviteShareData(){
    let _edit_train_data = {
      train_title:"默认标题",
      train_start_time:"2022-01-02 18:00",
      train_start_address:"宝安公园",
      train_player:0,
      train_explain:"说明",
      train_pic_list:[],
    };
    this.setData({
      invite_train_data:_edit_train_data
    })
  }
})