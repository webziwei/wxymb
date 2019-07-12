// pages/activity/activity.js
Page({
      /**
       * 页面的初始数据
       */
      data: {
       
            movielist:[]
      },

/**
 * 生命周期函数--监听页面加载
 */
onLoad: function (options) {
            var self=this
            wx.request({
                  url: 'http://webwzw.com:3200/api', //仅为示例，并非真实的接口地址
                  data: {
                        x: '',
                        y: ''
                  },
                  header: {
                        'content-type': 'application/json' // 默认值
                  },
                  success: function (res) {
                        //设置数据
                        self.setData({ movielist: res.data.result})
                        // console.log(self.data.movielist)
                  }
            })
      
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