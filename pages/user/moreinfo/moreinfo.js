// pages/user/moreinfo/moreinfo.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    className: '',
    children:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this =this
    console.log(app.globalData.user.parUUID)
    wx.getStorage({
      key: 'sonObj',//对应存储的key名
      success: function (res) {
       console.log(res)
        _this.setData({
          'children': res.data
        })
      }
    })
   
    // wx.request({
    //   url: 'http://192.168.22.46/patriarch/student/getStudent/' + app.globalData.user.parUUID+'',
    //   data: {
        
    //   },
    //   method: 'GET',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   success(res) {
    //     console.log(res.data)
    //     _this.setData({
    //       'children': res.data
    //     })
    //   }
    // })

    // const registerObj = {
    //   api: '/student/getStudent/' + app.globalData.user.parUUID +'',
    //   data: {
       
    //   },
    //   method: "GET",
    // }
    // app.req.httpApi(registerObj.api, registerObj.data, registerObj.method).then((res) => {
    //   console.log(res)
    //   _this.setData({
    //       'children': res
    //     })
    // })
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
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})