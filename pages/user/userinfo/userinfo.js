// pages/user/userinfo/userinfo.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userimg:'',
    userinfo: [{
        id: 1,
        name: '姓名:',
        text: '1'
      },
      {
        id: 1,
        name: '手机:',
        text: ''
      }
      
     
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
    
    
      this.setData({
        'userinfo[0].text': app.globalData.user.parName,
        'userinfo[1].text': app.globalData.user.telephone
        
     
      })
    
    console.log(app.globalData.user)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})