// pages/user/classform/classform.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    thesis:[]
  },
  del(e){
    
    console.log(e.target.dataset.index)
    console.log(this.data.thesis[e.target.dataset.index].jobUUID)
    const delObj = {
      api: '/patriarch/post/delete/' + this.data.thesis[e.target.dataset.index].jobUUID + '',
      data: {

      },
      method: "GET",
    }
    app.req.httpApi(delObj.api, delObj.data, delObj.method).then((res) => {
      wx.showToast({
        title: '删除成功',
        icon: 'none'
      })
      return
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this =this
    console.log(app.globalData.user.parUUID)
    const publishObj = {
      api: '/patriarch/post/get/' + app.globalData.user.parUUID + '/1',
      data: {

      },
      method: "GET",
    }
    app.req.httpApi(publishObj.api, publishObj.data, publishObj.method).then((res) => {
      console.log(res)
      _this.setData({
        'thesis': res.list
      })
    })
    // const publishObj = {
    //   api: '/patriarch/parent/post/get/' + app.globalData.user.parUUID+'',
    //   data: {
       
    //   },
    //   method: "GET",
    // }
    // app.req.httpApi(publishObj.api, publishObj.data, publishObj.method).then((res) => {
    //   console.log(res)
    //   _this.setData({
    //     'thesis': res
    //   })
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