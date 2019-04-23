// pages/pushinfo/pushinfo.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postName:'',
    orgName: '',
    orgAddress: '',
    job: '',
    salary: '',
    phone: '',
    linkman: '',
    orgRemark: '',
    jobRequest: '',
    jobRemark: '',
  },
  postName(e){
    
    this.setData({
      'postName': e.detail.value
    })
  },
  orgName(e) {
    
    this.setData({
      'orgName': e.detail.value
    })
  },
  orgAddress(e) {
   
    this.setData({
      'orgAddress': e.detail.value
    })
  },
  job(e) {
    
    this.setData({
      'job': e.detail.value
    })
  },
  salary(e) {
    
    this.setData({
      'salary': e.detail.value
    })
  },
  phone(e) {
    
    this.setData({
      'phone': e.detail.value
    })
  },
  linkman(e) {
   
    this.setData({
      'linkman': e.detail.value
    })
  },
  orgRemark(e) {
   
    this.setData({
      'orgRemark': e.detail.value
    })
  },
  jobRequest(e) {
    
    this.setData({
      'jobRequest': e.detail.value
    })
  },
  jobRemark(e) {
    
    this.setData({
      'jobRemark': e.detail.value
    })
  },
  add(){
    if (this.data.postName == '') {
      wx.showToast({
        title: '请按要求填写哦',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (this.data.orgName == '') {
      wx.showToast({
        title: '请按要求填写哦',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (this.data.orgAddress == '') {
      wx.showToast({
        title: '请按要求填写哦',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (this.data.job == '') {
      wx.showToast({
        title: '请按要求填写哦',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (this.data.salary == '') {
      wx.showToast({
        title: '请按要求填写哦',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (this.data.phone == '') {
      wx.showToast({
        title: '请按要求填写哦',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (this.data.linkman == '') {
      wx.showToast({
        title: '请按要求填写哦',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (this.data.orgRemark == '') {
      wx.showToast({
        title: '请按要求填写哦',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (this.data.jobRequest == '') {
      wx.showToast({
        title: '请按要求填写哦',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (this.data.jobRemark == '') {
      wx.showToast({
        title: '请按要求填写哦',
        icon: 'none',
        duration: 1000
      })
      return false;
    }else{
      let _this = this
      const addObj = {
        api: '/patriarch/post/add',
        data: {
          industryID:1,
          parUUID: app.globalData.user.parUUID,
          postName: this.data.postName,
          orgName: this.data.orgName,
          orgAddress: this.data.orgAddress,
          jobRemark: this.data.jobRemark,
          job: this.data.job,
          jobRequest: this.data.jobRequest,
          orgRemark: this.data.orgRemark,
          salary: this.data.salary,
          phone: this.data.phone,
          linkman: this.data.linkman,
          
          
          
        },
        method: "POST",
      }
      app.req.httpApi(addObj.api, addObj.data, addObj.method).then((res) => {
        console.log(res)
        wx.navigateBack({
          delta: 1
        })
       
          wx.showToast({
            title: '发帖成功',
            icon: 'none'
          })
          return

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