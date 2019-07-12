Page({

      /**
       * 页面的初始数据
       */
      data: {
            imageFor: [{
                        img: '../../image/assets/1.jpg'
                  },
                  {
                        img: '../../image/assets/2.jpg'
                  },
                  {
                        img: '../../image/assets/3.jpg'
                  }
            ],
            indicatorDots: true, //指示点
            autoplay: true, //是否自动播放
            interval: 2000, //时间间隔
            duration: 1000, //切换时间
            shopList: [
                  {
                        shopId: "a0000",
                        shopImage: '../../image/1.1.jpg ',
                        shopName: "勇士队库里球衣30号杜兰特汤普森詹姆斯欧文篮球服套装男定制队服",
                        shopAddres: "贵州",
                        shopPrice: "99.00",
                        oldPrice: "999.00",
                        shopDetalis: "勇士队库里球衣30号杜兰特汤普森詹姆斯欧文篮球服套装男定制队服"
                  },
                  {

                        shopId: "a0001",
                        shopImage: '../../image/2.1.jpg ',
                        shopName: "NBA-Nike 金州勇士队 库里 男子 运动球服 球衣903990-495",
                        shopAddres: "杭州",
                        shopPrice: "1111.00",
                        oldPrice: "999.00",
                        shopDetalis: "勇士队库里球衣30号杜兰特汤普森詹姆斯欧文篮球服套装男定制队服"
                  },
                  {

                        shopId: "a0002",
                        shopImage: '../../image/3.1.jpg ',
                        shopName: "全明星篮球服套装男詹姆斯球衣定制库里欧文莱昂纳德比赛队服印字",
                        shopAddres: "广州",
                        shopPrice: "888.00",
                        oldPrice: "999.00",
                        shopDetalis: "全明星篮球服套装男詹姆斯球衣定制库里欧文莱昂纳德比赛队服印字"
                  },
                  {

                        shopId: "a0003",
                        shopImage: '../../image/4.1.jpg ',
                        shopName: "库里篮球服套装男定制杜兰特库里汤普森勇士城市版球衣队服训练服",
                        shopAddres: "潮州",
                        shopPrice: "666.00",
                        oldPrice: "999.00",
                        shopDetalis: "库里篮球服套装男定制杜兰特库里汤普森勇士城市版球衣队服训练服"
                  },
                  {

                        shopId: "a0004",
                        shopImage: '../../image/4.1.jpg ',
                        shopName: "汤普森篮球服套装男定制汤普森勇士城市版球衣队服训练服",
                        shopAddres: "潮州",
                        shopPrice: "136.00",
                        oldPrice: "499.00",
                        shopDetalis: "汤普森篮球服套装男定制杜兰特库里汤普森勇士城市版"
                  }
            ],
            balllist: [
                  {
                  name: "斯蒂芬-库里",
                  num: "30",
                  img: "../../image/nba/1.jpg",
                  address: "G",
                  tall: "1.91",
                  day: "1988-03-14"
                  },
                  {
                        name: "克莱-汤普森",
                        num: "11",
                        img: "../../image/nba/2.jpg",
                        address: "G",
                        tall: "2.01",
                        day: "1990-02-08"
                  },
                  {
                        name: "丹吉洛-拉塞尔",
                        num: "1",
                        img: "../../image/nba/3.jpg",
                        address: "G",
                        tall: "1.96",
                        day: "1996-02-23"
                  },
                  {
                        name: "德雷蒙德-格林",
                        num: "23",
                        img: "../../image/nba/4.jpg",
                        address: "F",
                        tall: "2.01",
                        day: "1990-03-04"
                  },
                  {
                        name: "威利-考利-斯坦",
                        num: "00",
                        img: "../../image/nba/5.jpg",
                        address: "C",
                        tall: "2.13",
                        day: "1993-08-18"
                  },
                  {
                        name: "凯文-卢尼",
                        num: "5",
                        img: "../../image/nba/6.jpg",
                        address: "F",
                        tall: "2.06",
                        day: "1996-02-06"
                  },
                  {
                        name: "亚历克-伯克斯",
                        num: "13",
                        img: "../../image/nba/7.jpg",
                        address: "G",
                        tall: "1.98",
                        day: "1991-07-20"
                  },
                  {
                        name: "雅各布-埃文斯",
                        num: "10",
                        img: "../../image/nba/8.jpg",
                        address: "G",
                        tall: "1.98",
                        day: "1997-06-18"
                  },
                  {
                        name: "奥马里-斯佩尔曼",
                        num: "2",
                        img: "../../image/nba/9.jpg",
                        address: "F",
                        tall: "2.06",
                        day: "1997-07-21"
                  },
                  {
                        name: "阿方索-麦金尼",
                        num: "28",
                        img: "../../image/nba/10.jpg",
                        address: "F",
                        tall: "2.03",
                        day: "1992-09-17"
                  },
            ]
      },
      //跳转到详情页带参数
      jumpDetails: function(e) {
            // console.log(e)
            //获取事件对象数据下的shopid
            var shopID = e.currentTarget.dataset.shopid;

            wx.navigateTo({ //api保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。
                  url: '../details/details?shopid=' + shopID //设置参数 商品id
            })
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function(options) {
            //记录this
            let self = this;
            //获取数据缓存
            const shopList = wx.getStorageSync('shopList');

            if (!shopList) {
                  //如果没有缓存数据
                  //缓存数据
                  wx.setStorageSync('shopList', self.data.shopList);


            } else {
                  // 如果存在缓存数据 将缓存数据写入data中 异步的话
                  this.setData({
                        shopList
                  })
            }
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

      }
})