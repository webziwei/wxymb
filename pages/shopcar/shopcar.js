// pages/shopcar/shopcar.js
var formatTime = require('../../utils/util.js');

Page({

      /**
       * 页面的初始数据
       */
      data: {
            carAraay: [
            ],
            carPrice:0,
            allCheck:true,
            shopcarList:[]
           
      },
      //减法触发事件
      jian: function(options) {
            //获取第几个商品
            var index = options.target.dataset.aaa;
            // console.log(index)
            
            var num = this.data.shopcarList[index].shopsCount;
            if(num<=1){//最小值设置为1
                  num=1;
            }else{
                  num--;
            }
            //记录当前更新信息数据
            var key = "shopcarList[" + index +"].shopsCount"
            var obj={};
            obj[key]=num;
            //同步数据
            this.setData(obj);

            // console.log(this.data.shopcarList)
            //同步缓存数据
             wx.setStorageSync('shopcart', this.data.shopcarList);
            // console.log(shopcart)

            //调用总价格计算函数
            this.calcPrice()
      },
      //加法触发事件
      jia:function(options){
            //获取第几个商品 通过自定义属性
            var index = options.target.dataset.aaa;
            // console.log(index)

            //获取当前商品数量
            var num = this.data.shopcarList[index].shopsCount;

            if (num >=999) {//判断当前商品数量
                  num = 999;
            } else {
                  num++;
            }

            //记录当前更新的商品数据
            var key = "shopcarList[" + index + "].shopsCount";
            var obj = {};
            obj[key] = num;

            this.setData(obj);//{shopcarList[" + index + "].shopsCount：num}
            //更新购物车商品数量
            // console.log(num)
            // console.log(this.data.shopcarList)

            //更新购物车数组
            wx.setStorageSync('shopcart', this.data.shopcarList);
            // console.log(shopcart)

            //调用总价格计算函数
            this.calcPrice()
      },
      del:function(options){
            //获取第几个商品
            var index = options.target.dataset.aaa;

            this.data.shopcarList.splice(index,1);//调用数组api，删除该商品

            if (this.data.shopcarList.length==0){//判断当前购物车有商品没，没取消全选
                  this.data.allCheck=false;
            }
            //定义一个布尔值，用于判断是否当前购物车商品是否全部选中
            let flag = true;
            this.data.shopcarList.forEach(item => {//遍历购物车数组

                  if (!item.checked) {//判断当前商品是否选中，有一个商品未选中便取消全选
                        flag = false;
                  }
            })
            //设置全选按钮状态
            this.data.allCheck = flag;//全部选中为true，

            //同步数据
            this.setData({ allCheck: this.data.allCheck});

            //更新当前组件购物车数据
            this.setData({ shopcarList: this.data.shopcarList});
            //更新缓存的购物车数据
            wx.setStorageSync('shopcart', this.data.shopcarList);
            // console.log(shopcart)
            wx.showToast({//调用微信自定义组件
                  title: '成功删除',
                  icon: 'success',
                  duration: 2000
            })
            //调用总价计算函数
            this.calcPrice()
      },
      calcPrice:function(){//计算购物车总价
            let price=0;
            // self=this;
            this.data.shopcarList.forEach((item,index)=>{//遍历购物车数组
                  if(item.checked){//判断当前商品是否选中
                        price += item.shopsCount * item.shopsPrice;//计算价格
                  }else{
                        //有未选中的商品取消全选
                        this.data.allCheck=false;
                  }
            })
            //同步数据
            this.setData({ allCheck: this.data.allCheck })
            this.setData({carPrice:price})
      },
      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function(options) {//显示页面时更新页面数据
            //获取缓存数据
            var carList = wx.getStorageSync('shopcart');
            console.log(carList)
            //添加到当前组件
            this.setData({
                  shopcarList: carList
            })      
      },
      selectShop(e){//判断选择状态
            //获取当前商品id
            var index = e.target.dataset.alpha;
            console.log(index)
            //获取当前商品是否选中
            var check = this.data.shopcarList[index].checked;

            //点击切换选中/未选中
            this.data.shopcarList[index].checked=!check;

            //定义一个布尔值，用于判断是否当前购物车商品是否全部选中
            let flag=true;
            this.data.shopcarList.forEach(item => {//遍历购物车数组
            
                  if (!item.checked) {//判断当前商品是否选中，有一个商品未选中便取消全选
                      flag=false;
                  }
            })
            //甚至全选按钮状态
            this.data.allCheck=flag;//全部选中为true，
            //数据同步
            this.setData({ allCheck: this.data.allCheck})
            this.setData({
                  shopcarList: this.data.shopcarList
            })
            //缓存同步
            wx.setStorageSync('shopcart', this.data.shopcarList);

            //调用总价计算函数
            this.calcPrice()
      },
      allselect(){
            //取反当前选择状态
            this.data.allCheck = !this.data.allCheck;

            if (this.data.allCheck){//选择全选
                  this.data.shopcarList.forEach(item=>{//遍历全部商品改为选中状态
                        item.checked=true;
                  })
            }else{//取消全选
                  this.data.shopcarList.forEach(item => {//遍历全部商品改为未选中状态
                        item.checked = false;
                  })
            }

            // console.log(this.data.shopcarList)
            //数据同步
            this.setData({
                  shopcarList: this.data.shopcarList
            })
            //缓存同步
            wx.setStorageSync('shopcart', this.data.shopcarList);
            //调用总价计算函数
            this.calcPrice()
      },
      order(){
            // console.log("aa")
           
            let shoporder=[];//提交商品数组
            
            let oldcar=[];//剩下商品数组
            let order={};//订单数据

            this.data.shopcarList.forEach(item=>{//遍历判断选中的商品
                  if(item.checked){
                        shoporder.push(item);//将商品信息添加进数组
                        // order['price'] = this.data.carPrice;
                        // order["oid"] = "wx" + formatTime.formatTime(new Date())+"1234";
                  }else{
                        oldcar.push(item);
                  }
            })
            //设置订单信息
            order['shoporder'] = shoporder;
            order['price'] = this.data.carPrice;
            order["oid"] = "wx" +( parseInt(Math.random()*10000)+1000)+"1234";
            order["time"] = formatTime.formatTime(new Date());
            // console.log(order)
            // console.log(oldcar)

            //获取数据缓存
            let orderList = wx.getStorageSync('orderList');

           

            if (shoporder.length!=0) {
                  // orderlist.unshift(order)
                  if (!orderList) {
                        //如果没有缓存数据
                        //缓存数据
                        // wx.setStorageSync('orderList',[]);
                        orderList = [];
                        orderList.unshift(order)
                        wx.setStorageSync( 'orderList',orderList );
                  } else {
                        // 如果存在缓存数据 将缓存数据写入data中 异步的话
                        orderList.unshift(order)
                        //同步缓存
                        wx.setStorageSync('orderList', orderList);

                  }
                  console.log(orderList)
                  //设置缓存
                  // wx.setStorageSync('orderList', orderlist);
                   wx.showToast({
                        title: '提交成功',
                        icon: 'success',
                        duration: 2000
                  })

            }else{
                  wx.showToast({
                        title: '请选择商品',
                        icon: 'warn',
                        duration: 2000
                  })
            }
            
            this.setData({//更新同步当前组件信息
                  shopcarList: oldcar
            })

            //缓存同步
            wx.setStorageSync('shopcart', this.data.shopcarList);

            //调用总价计算函数
            this.calcPrice()
           
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
            //获取缓存的购物车数据
            var carList = wx.getStorageSync('shopcart');
            
            if (!carList){
                  //如果没有缓存数据
                  //缓存数据
                  // wx.setStorageSync('shopcart', this.data.shopcarList);
                  this.setData({
                        shopcarList: []
                  })
            }else{
                  // 如果存在缓存数据 将缓存数据写入data中 异步的话
                  this.setData({
                        shopcarList: carList
                  })
            }


            if (this.data.shopcarList.length == 0) {
                  this.data.allCheck = false;
            }
            let flag = true;
            this.data.shopcarList.forEach(item => {//遍历购物车数组

                  if (!item.checked) {//判断当前商品是否选中
                        flag = false;
                  }
            })
            this.data.allCheck = flag;//切换状态
            this.setData({ allCheck: this.data.allCheck });//同步状态
            

            this.calcPrice()
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

      }   
})