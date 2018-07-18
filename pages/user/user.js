// pages/user/user.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
        current: 1,
        style: 0,
        ico: 'icon-wode',
        fn: 'bindViewMy'
      },
    ],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    comlist:[
      {
        'class':'image6',
        'image':'Cperson',
        'mes':'职位收藏',
        'fn':''
      },
       {
        'class': 'image7',
        'image': 'Ctell',
        'mes': '收藏夹',
        'fn': ''
      }
      ,
       {
         'class': 'image8',
         'image': 'Cphone',
         'mes': '简历管理',
         'fn': ''
       }
      ,
       {
         'class': 'image9',
         'image': 'QQ',
         'mes': '已购买简历',
         'fn': ''
       }
    ],
    firlist:[
      {
        'class':'image0',
        'pic':'business',
        'classt':'text0',
        'count':'广东中住七一网络科技有限公司'
      },
      {
        'class': 'image1',
        'pic': 'site',
        'classt': 'text1',
        'count': '广州市中山大学科技园B座1818'
      },
      {
        'class': 'image2',
        'pic': 'Email',
        'classt': 'text2',
        'count': '15622102239@qq.com'
      },
         {
        'class': 'image3',
        'pic': 'network',
        'classt': 'text3',
        'count': 'www.zhongzhu71.com'
      }
    ]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX
    });

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
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
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },  //各个跳转函数
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
  edit(){
    wx.navigateTo({
      url: '/pages/child/comInfo/comInfo'
    })
  }
})