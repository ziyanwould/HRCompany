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
         'fn': 'resume'
       }
      ,
       {
         'class': 'image9',
         'image': 'QQ',
         'mes': '消息中心',
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
        'mes': '消息中心',
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
    // 判断是否登录
    let that = this;
    let value = wx.getStorageSync('token')
    if (value.has_Verify == 3) {
      that.setData({
        items: {
          show: false
        
        },
        token: true
      });
    }
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
  },
  exit(){
    let that = this;
    let login = wx.getStorageSync('token');
    let oppid = wx.getStorageSync('oppid');
    console.log("mes",login,oppid)
    wx.showModal({
      title: '温馨提示',
      content: '是否确定退出？',
      confirmText: "退出",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
       
        utils.post('api/common/login_out', {
          login_token: login.login_token,
          wx_open_id: oppid
        }).then((res) => {
          wx.removeStorageSync('token')
          //还原本地面的未登录信息
          that.setData({
            token: false
          });
          console.log(res);//正确返回结果
          //
          //wx.hideLoading();
          // resolve()
        }).catch((errMsg) => {

          console.log(errMsg);//错误提示信息
          //wx.hideLoading();
          // reject()
        })
        } else {
          console.log('用户点击辅助操作')
        }
      }
    });
    
  },
  login(){
    this.setData({
      items: {
        //height: 550,
        masTitle: "",
        show: true,
        fages: true
      }
    });
  },
  //针对登录的js

  getPhoneNumber(e) {
    let that = this;
    that.setData({

      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv
    })
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) { }
      })
    } else {
      new Promise(step1)
        .then(function (val) {
          console.log(val);
          return new Promise(step2)
        })
        .then(function (val) {
          console.log(val);
          return new Promise(step3)
        })
        .then(function () {
          console.log('搞定！')
        })



      function step1(resolve, reject) {
        const mylogin = utils.wxPromisify(wx.login);
        mylogin().then(res => {
          console.log(res)
          let data = {
            "code": res.code
          }
          that.setData({
            code: data
          })
          resolve(true)
        }).catch(res => {
          reject(false)
        })
      }


      function step2(resolve, reject) {

        utils.post('api/common/get_com_wx_openid', that.data.code).then((res) => {
          console.log(res);//正确返回结果
          wx.hideLoading();
          that.setData({
            oppid: res.wx_openid
          })
          //存储oppid
          try {
            wx.setStorageSync('oppid', res.wx_openid)
          } catch (e) {
          }
          //存储结束
          resolve()
        }).catch((errMsg) => {
          console.log(errMsg);//错误提示信息
          wx.hideLoading();
          reject()
        });
      }

      function step3(resolve, reject) {
        let datas = {
          "openid": that.data.oppid,
          "encryptedData": that.data.encryptedData,
          "iv": that.data.iv
        };
        utils.post('api/common/wx_login_phone_token', datas).then((res) => {
          console.log(res);//正确返回结果
          // console.log(res.dic.has_Verify)
          if (res.dic.has_Verify == 0) {
            wx.showModal({
              title: '温馨提示',
              content: '你的微信号尚未进行企业认证，是否进行认证？',
              confirmText: "确定",
              cancelText: "取消",
              success: (e) => {
                console.log(e);
                if (e.confirm) {
                  //console.log('用户点击主操作')
                  wx.navigateTo({
                    // url: `/pages/child/logon/logon?login_phone=${res.dic.login_phone}&login_token=${res.dic.login_token}`//实际路径要写全
                    url: '/pages/child/logon/logon?login_phone=' + res.dic.login_phone + '&login_token=' + res.dic.login_token//实际路径要写全
                  })
                } else {
                  //console.log('用户点击辅助操作')
                }
              }
            })
          } else if (res.dic.has_Verify == 1 || res.dic.has_Verify == 2) {
            wx.showModal({
              title: '温馨提示',
              content: '您的账号还在审核中',
              confirmText: "确定",
              cancelText: "取消",
              success: (e) => {
                console.log(e);
                if (e.confirm) {
                  //console.log('用户点击主操作')

                } else {
                  //console.log('用户点击辅助操作')
                }
              }
            })
          } else if (res.dic.has_Verify == 3) {
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 3000
            });
            // 存储登录信息
            try {
              // wx.setStorageSync('token', res.dic.login_token);
              wx.setStorageSync('token', res.dic);
              app.globalData.register = true;
              that.setData({
                'items.show': false,
                token: true
              })
            } catch (e) {
            }
          } else if (res.dic.has_Verify == 4) {
            wx.showModal({
              title: '温馨提示',
              content: '你的微信号尚未进行企业认证，是否进行认证？',
              confirmText: "确定",
              cancelText: "取消",
              success: (e) => {
                console.log(e);
                if (e.confirm) {
                  //console.log('用户点击主操作')
                  wx.navigateTo({
                    url: `/pages/child/logon/logon?login_phone=${res.dic.login_phone}&login_token=${res.dic.login_token}&has_Verify=${res.dic.has_Verify}`//实际路径要写全
                    //序号为4是认证失败，需要提示重新认证，并且接口换成“api/common/company_again_register”
                  })
                } else {
                  //console.log('用户点击辅助操作')
                }
              }
            })
          }
          wx.hideLoading();
          resolve()
        }).catch((errMsg) => {
          console.log(errMsg);//错误提示信息
          wx.hideLoading();
          reject()
        });
      }
      // wx.showModal({
      //   title: '提示',
      //   showCancel: false,
      //   content: '同意授权',
      //   success: function (res) { }
      // })
    }
  },
  urlTo() {
    wx.navigateTo({
      url: `/pages/child/logon/logon`//实际路径要写全
    })
  },
  urlTo2() {
    wx.navigateTo({
      url: `/pages/child/logon/logon?type=company`//实际路径要写全
    })
  },
  urlclose() {
    this.setData({
      items: {
        show: false
      }
    });
  }
  //
  ,//简历
  resume(){
    wx.navigateTo({
      url: `/pages/child/resume/resume`//实际路径要写全
    })
  }
})