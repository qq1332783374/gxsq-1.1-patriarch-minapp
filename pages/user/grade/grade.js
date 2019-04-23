// pages/user/grade/grade.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grade: [{
        id: 1,
        textbook: '',
        score: "分数"
      },

    ],
    stuUUID: ''
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this
    wx.getStorage({
      key: 'sonObj', //对应存储的key名
      success: function(res) {
        console.log(res.data[0].stuUUID)

        _this.setData({
          'stuUUID': res.data[0].stuUUID
        })
        const gradeObj = {
          api: '/patriarch/score/getScore/' + _this.data.stuUUID + '',
          data: {

          },
          method: "GET",
        }
        app.req.httpApi(gradeObj.api, gradeObj.data, gradeObj.method).then((res) => {
          console.log(res)
          _this.setData({
            'grade': res
          })
        })

      }
    })


  },
})