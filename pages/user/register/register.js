// pages/user/register/register.js
var app = getApp();
var WebIM = require("../../../utils/WebIM")["default"];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    telephone: '',
    password: ''
  },

  getNameValue: function(e) {
    this.setData({
      'telephone': e.detail.value
    })
  },
  getPasswordValue: function(e) {
    this.setData({
      'password': e.detail.value
    })
  },
  register() {
    var _this = this
    if (this.data.telephone == '') {
      wx.showToast({
        title: '账号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (this.data.password == '') {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else {
      console.log('手机号' + this.data.telephone)
      console.log('密码' + this.data.password)
      const registerObj = {
        api: '/patriarch/parent/login',
        data: {
          'telephone': this.data.telephone,
          'password': this.data.password,
        },
        method: "POST",
      }
      app.req.httpApi(registerObj.api, registerObj.data, registerObj.method).then((res) => {
        console.log(res)
          if (res.statusCode == "err") {
          wx.showToast({
            title: '账号或密码错误',
            icon: 'none',
            duration: 1000
          })
        }else{
            app.globalData.isLogin = true
            app.globalData.user = res
            wx.setStorage({
              key: 'isLogin',
              data: true,
            })
            wx.setStorage({
              key: 'par',
              data: res,
            })

            // 环信IM 注册
            let options = {
              username: app.globalData.user.telephone,
              password: '1',
              nickname: app.globalData.user.parName,
              appKey: WebIM.config.appkey,
              success: function (res) {
                console.log(res)
                if (res.statusCode == 200) {
                  let options = {
                    apiUrl: WebIM.config.apiURL,
                    user: app.globalData.user.telephone,
                    pwd: '1',
                    appKey: WebIM.config.appkey
                  };
                  WebIM.conn.open(options);
                }
              },
              error: function (err) {
                console.log('注册失败')
                console.log(err)
                if (err.statusCode == 400) {
                  console.log('前往登录')
                  let options = {
                    apiUrl: WebIM.config.apiURL,
                    user: app.globalData.user.telephone,
                    pwd: '1',
                    appKey: WebIM.config.appkey
                  };
                  WebIM.conn.open(options);
                }
              },
              apiUrl: WebIM.config.apiURL
            };
            WebIM.utils.registerUser(options);


            // 获取孩子信息
            const sonObj = {
              api: '/patriarch/student/getStudent/' + app.globalData.user.parUUID + '',
              data: {},
              method: "GET",
            }
            app.req.httpApi(sonObj.api, sonObj.data, sonObj.method).then((res) => {
              console.log(res)
              wx.setStorage({
                key: 'sonObj',
                data: res
              })

            })

            wx.showToast({
            title: '登录成功',
            icon: 'none',
            duration: 1000
          })
            
            wx.navigateBack({
              delta: 1
            })
        }
      })

     
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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