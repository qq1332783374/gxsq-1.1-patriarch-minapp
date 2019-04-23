// pages/user/user.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hide:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    modals: false,
    userinfo: [{
      username: '',
      userimg: '',
    }],
    moreinfo: [{
        id: 1,
        info: "班级信息",
        url: '/pages/user/moreinfo/moreinfo',
        icon: '../../images/class.png'
      },
      {
        id: 2,
        info: "个人信息",
        url: '/pages/user/userinfo/userinfo',
        icon: '../../images/userinfo.png'
      },
      {
        id: 3,
        info: "我的帖子",
        url: '/pages/user/classform/classform',
        icon: '../../images/classform.png'
      },
      {
        id: 4,
        info: "孩子成绩",
        url: '/pages/user/grade/grade',
        icon: '../../images/grade.png'
      }
    ],
  },



  showModal: function() {

    this.setData({
      modals: true
    })

  },
  hideModal: function() {
    this.setData({
      modals: false
    })
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  },
  lsLogin(){
    
  },
  upimg(){
    
    
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
    var _this =this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              _this.setData({
                'userinfo.username': res.userInfo.nickName,
                'userinfo.userimg': res.userInfo.avatarUrl,
              })
              
              console.log(_this.data.userinfo)
            }
          })
        }
      }
    })
  
    console.log(app.globalData.isLogin)
    


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
    console.log(app.globalData.isLogin)
    if (app.globalData.isLogin == false) {

      this.setData({
        'moreinfo[0].url': "/pages/user/register/register",
        'moreinfo[1].url': "/pages/user/register/register",
        'moreinfo[2].url': "/pages/user/register/register",
        'moreinfo[3].url': "/pages/user/register/register"
      })
      console.log('***isLogin=false****')
      console.log(this.data.moreinfo)
    } else {
      this.setData({
        'moreinfo[0].url': "/pages/user/moreinfo/moreinfo",
        'moreinfo[1].url': "/pages/user/userinfo/userinfo",
        'moreinfo[2].url': "/pages/user/classform/classform",
        'moreinfo[3].url': "/pages/user/grade/grade"
        
      })
      console.log('***isLogin=true****')
    }
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