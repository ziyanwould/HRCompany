// pages/creation/creation.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //自定义模板必须引入的数据版块
    navData: [
      {
        name: "兼职人才",  //文本
        current: 0,    //是否是当前页，0不是  1是
        style: 0,     //样式
        ico: '.icon-fabu',  //不同图标
        fn: 'gotoCompanyIndex'   //对应处理函数
      }, {
        name: "全职人才",
        current: 0,
        style: 0,
        ico: 'icon-mingpianjia',
        fn: 'gotobusinessCard'
      }, {
        name: "发布",
        current: 1,
        style: 1,
        ico: '',
        fn: 'gotopublish'
      }, {
        name: "消息",
        current: 0,
        style: 0,
        ico: 'icon-yikeappshouyetubiao35',
        fn: 'gotoMessages'
      }, {
        name: "公司",
        current: 0,
        style: 0,
        ico: 'icon-wode',
        fn: 'bindViewMy'
      },
    ],

  },
  //各个跳转函数
  gotoCompanyIndex: function () {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
  gotobusinessCard: function () {
    wx.reLaunch({
      url: '/pages/detail/detail'
    })
  },
  gotopublish: function () {
    wx.reLaunch({
      url: '/pages/creation/creation'
    })
  },
  gotoMessages: function () {
    wx.reLaunch({
      url: '/pages/news/news'
    })
  },
  bindViewMy: function () {
    wx.reLaunch({
      url: '/pages/user/user'
    })
  },
  //各个跳转函数end

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX
    });

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