// pages/user/user.js
const app = getApp();
const utils = require('../../utils/util.js')
const Promise = require('../../utils/bluebird.min.js')
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
        name: "推荐",
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
        'class':'Cmmember',
        'image':'Cmmember',
        'mes':'会员中心',
        'fn':'',
        'RTitle':'开通会员，畅享会员高级功能',
        'Tclass':'Tclass'
      },
      {
        'class': 'Hrdoug',
        'image': 'Hrdoug',
        'mes': '猎聘豆',
        'fn': ''
      },
      {
        'class': 'image6',
        'image': 'Cperson',
        'mes': '职位管理',
        'fn': 'posOrgin'
      },
       {
        'class': 'image7',
        'image': 'Ctell',
        'mes': '收藏夹',
        'fn': 'collect'
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
    nolist: [
      {
        'class': 'Cmmember',
        'image': 'Cmmember',
        'mes': '会员中心',
        'fn': 'notlogin',
        'RTitle': '开通会员，畅享会员高级功能',
        'Tclass': 'Tclass'
      },
      {
        'class': 'Hrdoug',
        'image': 'Hrdoug',
        'mes': '猎聘豆',
        'fn': 'notlogin'
      },
      {
        'class': 'image6',
        'image': 'Cperson',
        'mes': '职位管理',
        'fn': 'notlogin'
      },
      {
        'class': 'image7',
        'image': 'Ctell',
        'mes': '收藏夹',
        'fn': 'notlogin'
      }
      ,
      {
        'class': 'image8',
        'image': 'Cphone',
        'mes': '简历管理',
        'fn': 'notlogin'
      }
      ,
      {
        'class': 'image9',
        'image': 'QQ',
        'mes': '已购买简历',
        'fn': 'notlogin'
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
    let that = this;
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

    this.companyMes()
    try {
      let value = wx.getStorageSync('token')
      if (value.has_Verify == 3) {
        that.setData({
         token:true
        });
      }
    } catch (e) {

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
    // wx.reLaunch({
    //   url: '/pages/user/user'
    // })
    return false;
  },
  edit(){
    wx.navigateTo({
      url: '/pages/child/comInfo/comInfo'
    })
  },
  companyMes(){
    const token = wx.getStorageSync('token')
    utils.post('usercenter/get_cominfo',false,  token).then((res) => {
      console.log(res);//正确返回结果
      // console.log(res.dic.has_Verify)
 
      wx.hideLoading();
     // resolve()
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息
      wx.hideLoading();
     // reject()
    });
  },
  posOrgin(){
    wx.navigateTo({
      url: '/pages/child/positionManagement/positionManagement'//实际路径要写全
    })
  },
  collect(){
    wx.navigateTo({
      url: '/pages/child/collect/collect'//实际路径要写全
    })
  },
  //未登录状态
  notlogin(){
    wx.showModal({
      content: '请先登录/注册',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    });
  }
})