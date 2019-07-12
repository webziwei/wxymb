
// pages/spdetail/spdetail.js
var formatTime = require('../../utils/util.js');
Page({

      /**
       * 页面的初始数据
       */
      data: {
            imageFor: [{
                  img: '../../image/goods01.jpg'
            },
            {
                  img: '../../image/goods02.jpg'
            },
            {
                  img: '../../image/goods03.jpg'
            },
            {
                  img: '../../image/goods04.jpg'
            },
            ],
            indicatorDots: true, //指示点
            shopsDetailData:[],
            carNum:0

      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {
            // console.log(options)
            //页面加载获取缓存的数据
            var shopList = wx.getStorageSync('shopList');
            // console.log(shopList)
            //初始化数据
            //获取商品缓存数据
         
            //遍历获取到的缓存数据将对应参数的数据写入data
            for (var i = 0; i < shopList.length; i++) {

                  if (shopList[i].shopId == options.shopid) {//判断参数

                        this.setData({//将数据写入key设置为shopsDetailData value为对应的shopList[i]
                              shopsDetailData: shopList[i]
                        })
                        // console.log(shopList[i])

                        break;//跳出
                  }
            }

            //获取系统信息
            var res = wx.getSystemInfoSync();
            // console.log(res)
            //记录系统宽度
            this.screenWidth = res.screenWidth;

            //获取购物车商品个数
            var shopcartData = wx.getStorageSync('shopcart');



            this.setData({
                  carNum: !shopcartData ? 0 : shopcartData.length
            })

      },
      //设置轮播图图片 按比例缩放放大图片
      imgloaded: function (e) {
            //求出图片比例高度
            // console.log(e)
            var height = this.screenWidth / e.detail.width * e.detail.height;

            this.setData({
                  height
            })

      },
      addcar:function(){//加入购物车
            //创建商品信息对象
            var shopInfo = {};
            //设置添加时间
            var addTime = formatTime.formatTime(new Date());

            shopInfo.shopsId = this.data.shopsDetailData.shopId;
            shopInfo.shopsName = this.data.shopsDetailData.shopName;
            shopInfo.shopsImage = this.data.shopsDetailData.shopImage;
            shopInfo.shopsCount =1;
            shopInfo.shopsPrice = this.data.shopsDetailData.shopPrice;
            shopInfo.oldPrice = this.data.shopsDetailData.oldPrice;

             shopInfo.addtime = addTime;
            shopInfo.checked=true;


            // console.log('shopInfo ==> ',shopInfo);

            //获取购物数据
            var shopcartData = wx.getStorageSync('shopcart');

            shopcartData = !shopcartData ? [] : shopcartData;//如果有数据设为当前数组，如果没数组为空数组
            //判断购物车商品是否重复
            var index = shopcartData.findIndex(val => { return val.shopsId == shopInfo.shopsId });

            if(index!=-1){//重复更新数量
                  shopcartData[index].shopsCount++;
            }else{//不重复 添加商品信息进购物车
                  shopcartData.unshift(shopInfo);
            }
            //重置购物车数据
            wx.setStorageSync('shopcart', shopcartData);

            this.setData({
                  carNum: ++this.data.carNum
            })

            wx.showToast({
                  title: '成功加入',
                  icon: 'success',
                  duration: 2000
            })
            // console.log('shopcartData ==> ', shopcartData);


      },
      jumpcar:function(){//跳转到购物车
        
            wx.switchTab({
                  url: '../shopcar/shopcar'
            })
      },
      junmpindex(){//跳转到首页
            wx.switchTab({
                  url: '../index/index'
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
       * 生命周期函数--监听页面卸载
       */
      onUnload: function () {

      }

})