// pages/my/my.js
Page({

      /**
       * 页面的初始数据
       */
      data: {
            tabText:["我的订单","我的收藏","我的地址","联系客服","关于我们"]

      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {
            var _this=this;
            //获取登陆凭证
            wx.login({
                  success(res) {
                        if (res.code) {//成功获取
                              // 发起网络请求
                              wx.getUserInfo({//接口获取用户信息
                                    success(res) {
                                          console.log(res.userInfo)
                                          _this.setData(res.userInfo);//设置数据

                                    }
                              })
                             
                        } else {
                              console.log('登录失败！' + res.errMsg)
                        }
                  }
            })
           
      },
      order(){
             wx.redirectTo({
                  url: '../order/order'
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