// pages/detail/detail.js
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
        current: 1,
        style: 0,
        ico: 'icon-mingpianjia',
        fn: 'gotobusinessCard'
      }, {
        name: "发布",
        current: 0,
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
    seek: {
      fn: 'seek',
    }
    ,
    list: []


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
    var that = this;
    let isIphoneX = app.globalData.isIphoneX;
    that.setData({
      isIphoneX: isIphoneX
    });
    that.datalist();

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
    //请求函数
  datalist: function (messages = "玩命加载中") {
    var that = this;
    wx.showLoading({
      title: messages,
    });
    let setArr = ['刘婷婷', '吴军', '文瑜', '王毅', '何仙姑'];
    var list = that.data.list;
    if (list.length > 19) {
      wx.showToast({
        title: '到底了...',
        icon: 'loading',
        duration: 2000
      });

    }
    for (let i in setArr) {
      if (list.length > 19) {
        continue;//终止循环
      }
      //let sexs = (i+1) % 2 == 0 ?'男':'女';
      let lists = {
        fn: 'detail',
        sex: i % 2 == 0 ? '女' : '男',
        tille: i % 2 == 0 ? '土木工程师-注册岩土工程师' : '土木工程师-注册水利水电工程师',
        name: setArr[i],
        education: i % 2 == 0 ? '本科' : '硕士',
        birthday: i % 2 == 0 ? '32岁' : '28岁',
        experience: 1+i+'年',
        person: false

      }
      list.push(lists)
    }
    that.setData({
      list: list
    });

    setTimeout(function () {
      wx.hideLoading();
    }, 800);
    setTimeout(function () {
      wx.stopPullDownRefresh();
    }, 900)

  },
  onPullDownRefresh: function () {
    // 显示顶部刷新图标  
    // wx.showNavigationBarLoading();
    let that = this;
    that.setData({
      list: []
    })
    that.datalist('刷新数据中')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    this.datalist()
  }
})