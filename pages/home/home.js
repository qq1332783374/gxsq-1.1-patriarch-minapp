// 时间转换
var times = require('../../utils/util.js')
// pages/home/home.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    seekInput: '', //搜索
    page: 1, //页数

    articles: [],
    current: 'tab2',
    myTabData: null,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://image.sitapix.com/sourcefile/apple-business-coffee-265075-via-sitapix-com.jpeg@!index-thumb'
    }, {
      id: 1,
      type: 'image',
        url: 'https://image.sitapix.com/sourcefile/black-and-white-computer-keyboard-desk-209692-via-sitapix-com.jpeg@!index-thumb'
    }, {
      id: 2,
      type: 'image',
        url: 'https://image.sitapix.com/sourcefile/adults-brainstorming-business-1246742-via-sitapix-com.jpeg@!index-thumb'
    }, {
      id: 3,
      type: 'image',
        url: 'https://image.sitapix.com/sourcefile/architect-businesswoman-composition-313691-via-sitapix-com.jpeg@!index-thumb'
    }, {
      id: 4,
      type: 'image',
        url: 'https://image.sitapix.com/sourcefile/blurred-background-camera-camera-equipment-1336858-via-sitapix-com.jpeg@!index-thumb'
    }, {
      id: 5,
      type: 'image',
        url: 'https://image.sitapix.com/sourcefile/business-commerce-container-379964-via-sitapix-com.jpeg@!index-thumb'
    }, {
      id: 6,
      type: 'image',
        url: 'https://image.sitapix.com/sourcefile/business-computer-desk-7060-via-sitapix-com.jpg@!index-thumb'
    }],
  },
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // 搜索
  seekInput(e) {
    this.setData({
      'seekInput': e.detail.value
    })

  },
  seek() {
    var _this = this
    var reg = /^[0-9]+.?[0-9]*$/
    if (!reg.test(this.data.seekInput)) {
      const indusObj = {
        api: '/student/post/job/get/like/job/post',
        data: {
          postName: this.data.seekInput,
          nextPage: 1
        },
        method: "POST",
      }
      app.req.httpApi(indusObj.api, indusObj.data, indusObj.method).then((res) => {
        console.log(res)
        if (res.list.length == 0) {
          wx.showToast({
            title: '暂无相关内容',
            icon: 'none',
            duration: 1000
          })
        } else {
        _this.setData({
          'myTabData': res.list
        })
        }
      })
    } else {
      const industryObj = {
        api: '/student/post/job/get/industryID/job/post/' + this.data.seekInput + '/1',
        data: {

        },
        method: "GET",
      }
      app.req.httpApi(industryObj.api, industryObj.data, industryObj.method).then((res) => {
        console.log(res)
        if (res.list.length == 0) {
          wx.showToast({
            title: '暂无相关内容',
            icon: 'none',
            duration: 1000
          })
        } else {
        _this.setData({
          'myTabData': res.list
        })
        }
      })
    }
    console.log(this.data.seekInput)
  },
  /**
   * 获取文章列表
   */
  getData(params = {}) {
    let _this = this
    // wx.showLoading({
    //   title: '加载中',
    // })
    // // 请求参数
    // const paramsObj = {
    //   api: params.api + params.params || '//post/all/',
    //   data: {},
    //   method: 'GET'
    // }
    // app.req.httpApi(paramsObj.api, paramsObj.data, paramsObj.method).then((res) => {
    //   console.log(res)
    //   if (res.list) {
    //     wx.hideLoading()
    //     _this.setData({
    //       myTabData: res.list
    //     })
    //   } else {
    //     // wx.showToast({
    //     //   title: '加载失败',
    //     //   icon: 'none'
    //     // })
    //     // return
    //   }
    // })
  },
  handleChange({
    detail
  }) {
    console.log(detail)
    this.setData({
      current: detail.key
    });
  },


  /**
   *  获取分类列表
   */
  // onLoad: function (options) {
  //   console.log(1)
  //   console.log(app)
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  getTabData(key) {
    if (key == 'tab1') { // 全查

      this.getData()

    } else if (key == 'tab2') { // 校园热门

      const params = {
        // api: '/student/post/list/1/',
        // data: {},
        // params: 1
      }
      this.getData(params)

    } else if (key == 'tab3') { // 全查

      this.getData()

    }
  },

  /**
   * 获取全部数据
   */
  getData(params = {}) {

    // wx.showLoading({
    //   title: '加载中',
    // })
    // 请求参数
    let _this = this
    const parObj = {
      api: '/student/post/job/get/1',
      data: {

      },
      method: "GET",
    }
    app.req.httpApi(parObj.api, parObj.data, parObj.method).then((res) => {
      console.log(res)
      _this.setData({
        'myTabData': res.list
      })
      if (res.list == '') {
        wx.showToast({
          title: '无发帖记录',
          icon: 'none'
        })
        return
      }
    })

  },

  handleChange({
    detail
  }) {

    this.setData({
      current: detail.key
    });
    this.getTabData(detail.key)

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this
    //   if (app.globalData.lsLogin==false){

    //  }else{
    //     const parObj = {
    //       api: '/post/get/' + app.globalData.user.parUUID+'/1',
    //       data: {

    //       },
    //       method: "GET",
    //     }
    //     app.req.httpApi(parObj.api, parObj.data, parObj.method).then((res) => {
    //       console.log(res)
    //       _this.setData({
    //         'myTabData':res
    //       })
    //     })
    //  }


    // this.fetchArticleList(1)
    // 获取初始数据
    this.getData()
    // 默认不登录
    wx.setStorage({
      key: "isLogin",
      data: false
    })
  },
  onReachBottom() {
    // 下拉触底，先判断是否有请求正在进行中
    // 以及检查当前请求页数是不是小于数据总页数，如符合条件，则发送请求
    // if (!this.loading && this.data.page < this.data.pages) {
    //   this.fetchArticleList(this.data.page + 1)
    // }
    var that = this;
    // wx.showLoading({
    //   title: '玩命加载中',
    // })
    // this.data.page = this.data.page + 1;




  },

})