// pages/textDetail/textDetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isModalShow1: false,
    isModalShow2: false,
    commentsTxt: '', // 添加评论
    rpTxt: '', // 回复
    discuss: '',
    discusss: '',
    params: null,
    textDetail: null,
    uuid: {},
    headimg: '',
    index: ''
  },
  showMoadl1() { // 添加评论
    if (app.globalData.lsLogin == false) {
      wx: wx.navigateTo({
        url: '/pages/user/register/register',

      })
    }
    else {
      this.setData({
        "isModalShow1": true
      })
    }


  },
  hideMoadl() {
    this.setData({
      "isModalShow1": false,
      "isModalShow2": false
    })
  },
  showMoadl(e) {

    if (app.globalData.lsLogin == false) {
      wx: wx.navigateTo({
        url: '/pages/user/register/register',

      })
    }
    else {
      var then = this
      this.setData({
        "isModalShow2": true,
        "index": e.currentTarget.dataset.index,

      })
      console.log(this.data.discuss[this.data.index])
      this.setData({
        'discusss': this.data.discuss[this.data.index]

      })
      console.log(this.data.discusss)
    }

  },
  commentsTxt(e) {
    this.setData({
      'commentsTxt': e.detail.value
    })
  },
  rpTxt(e) {
    this.setData({
      'rpTxt': e.detail.value
    })
  },
  addComment() {
    if (this.data.commentsTxt == '') {
      wx.showToast({
        title: '请输入评论内容',
        icon: 'none'
      })
      return
    } else {
      // console.log(this.data.commentsTxt)
      // console.log(this.data.textDetail.postUUID)
      // console.log(app.globalData.user.stuUUID)
      // console.log(this.data.textDetail.stuUUID)
      // console.log(this.data.commentsTxt)
      const commentObj = {
        api: '/student/post/discuss/add',
        data: {
          postUUID: this.data.textDetail.postUUID,
          stuA: app.globalData.user.stuUUID,
          stuB: this.data.textDetail.stuUUID,
          discussContent: this.data.commentsTxt
        },
        method: 'POST',
      }
      app.req.httpApi(commentObj.api, commentObj.data, commentObj.method).then((res) => {

      })
      this.setData({
        "isModalShow1": false
      })
      wx.showToast({
        title: '发送成功',
        icon: 'none'
      })

    }
  },
  reply() {
    if (this.data.rpTxt == '') {
      wx.showToast({
        title: '请输入评论内容',
        icon: 'none'
      })
      return
    } else {
      const commentObj = {
        api: '/student/post/discuss/add',
        data: {
          postUUID: this.data.textDetail.postUUID,
          stuA: app.globalData.user.stuUUID,
          stuB: this.data.discusss.stuA,
          discussContent: this.data.rpTxt
        },
        method: 'POST',
      }
      app.req.httpApi(commentObj.api, commentObj.data, commentObj.method).then((res) => {

      })
      this.setData({
        "isModalShow2": false
      })
      wx.showToast({
        title: '发送成功',
        icon: 'none'
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var _this = this
    // wx.showLoading({
    //   title: '加载中',
    // })
    console.log('*** 获取参数 ***')
    //http://192.168.22.46/student
    this.data.params = options.postUUID
    console.log(this.data.params)
    wx.request({
      url: 'http://192.168.22.46/student/post/get/' + this.data.params + '',
      data: {

      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res.data)
        _this.setData({
          'textDetail': res.data,
          'headimg': "http://192.168.22.46:8001/" + res.data.stuHeadImg + ""
        })

        // console.log(_this.data.textDetail)
        // console.log(_this.data.headimg)

        wx.request({
          url: 'http://192.168.22.46/student/post/discuss/get/' + _this.data.params + '',
          data: {

          },
          method: 'GET',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success(res) {
            console.log(res)
            if (res.data.length == 0) {
              _this.data.discuss = ''
            }
            _this.setData({
              'discuss': res.data
            })
          }
        })

      }
    })
    // const textDetailObj = {
    //   api: '/post/get/' + this.data.params + '',
    //   data: {

    //   },
    //   method: "GET",
    // }
    // app.req.httpApi(textDetailObj.api, textDetailObj.data, textDetailObj.method).then((res) => {
    //   console.log('****文章详情******')

    //   _this.setData({
    //     'textDetail': res,
    //     'headimg': "http://192.168.22.46/" + res.stuHeadImg + ""
    //   })
    //   // _this.headimg = "http://192.168.22.46/" + _this.textDetail.stuHeadImg + ""
    //   console.log(_this.data.textDetail)
    //   console.log(_this.data.headimg)


    //   const discussObj = {
    //     api: '/post/discuss/get/' + _this.data.params + '',
    //     data: {

    //     },
    //     method: "GET",
    //   }
    //   app.req.httpApi(discussObj.api, discussObj.data, discussObj.method).then((res) => {
    //     console.log(res)
    //     if (res.length == 0) {
    //       _this.data.discuss = ''
    //     }
    //     _this.setData({
    //       'discuss': res
    //     })
    //   })
    // })
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