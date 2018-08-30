// pages/child/HRbeans/HRbeans.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeindex:-1,
    list1:[
      {
        title:'50豆',
        name:'￥50.00',
        id:0
      },
      {
        title: '100豆',
        name: '￥100.00',
        id: 1
      },
      {
        title: '200豆',
        name: '￥200.00',
        id: 2
      }
    ],
    list2: [
      {
        title: '250豆',
        name: '￥250.00',
        id: 3
      },
      {
        title: '300豆',
        name: '￥300.00',
        id: 4
      },
      {
        title: '500豆',
        name: '￥500.00',
        id: 5
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },
  config(e){
    let that  =this;
    console.log(e.currentTarget.id);
    that.setData({
      activeindex: e.currentTarget.id
    })
  }
})