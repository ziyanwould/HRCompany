// pages/news/news.js
let page = 1;
const app = getApp();
const utils = require('../../utils/util.js')
const Promise = require('../../utils/bluebird.min.js')
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
        current: 0,
        style: 1,
        ico: '',
        fn: 'gotopublish'
      }, {
        name: "推荐",
        current: 1,
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
    seekData:{
      inputShowed: false,
      inputVal: ""
    }
    , list: []
 

  },

  showInput: function () {
    this.setData({
       'seekData.inputShowed': true,
        inputShowed:true
    });
  },
  hideInput: function () {
    this.setData({
       'seekData.inputVal': "",
       'seekData.inputShowed': false,
       inputShowed:false
    });
  },
  clearInput: function () {
    this.setData({
       'seekData.inputVal': ""
    });
  },
  inputTyping: function (e) {
    this.setData({
       'seekData.inputVal': e.detail.value
    });
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
    // wx.reLaunch({
    //   url: '/pages/news/news'
    // })
    return false;
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
    page = 1;
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX
    });
    this.datalist();
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
    if (value.has_Verify != 3) {
      this.setData({
        items: {
          //height: 550,
          masTitle: "",
          show: true,
          fages: true
        }
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
  datalist: function (messages = "玩命加载中") {
    var that = this;
    wx.showLoading({
      title: messages,
    });
    var list = that.data.list;
    //测试用start
    // let setArr = ['李文文', '吴碧勇', '何碧碧',  '迪迦','李雯'];
    // if (list.length>19) {
    //   wx.showToast({
    //     title: '到底了...',
    //     icon: 'loading',
    //     duration: 2000
    //   });

    // }
    // for (let i in setArr) {
    //   if (list.length > 19) {
    //     continue;//终止循环
    //   } 
    //   //let sexs = (i+1) % 2 == 0 ?'男':'女';
    //   let lists = {
    //     fn: 'detail',
    //     sex: i % 2 == 0 ? '女' : '男',
    //     tille: i % 2 == 0 ? '土木工程师-注册岩土工程师' : '土木工程师-注册水利水电工程师',
    //     name: setArr[i],
    //     area: i % 2 == 0 ? '广东佛山市' : '广东广州市',
    //     stats: i % 2 == 0 ? '资质' : '不限',
    //     pay: '面议',
    //     person: false

    //   }
    //   list.push(lists)
    // }
    // that.setData({
    //   list: list
    // });
    //测试end

    utils.post('api/resume/resume_list', {
      "type_id": 0,
      "pageIndex": page,
      "pageSize": 8
    }).then((res) => {
      console.log(res);//正确返回结果
      if (res.list == '') {
        wx.showToast({
          title: '到底了...',
          icon: 'loading',
          duration: 2000
        });
        return false;
      }
      for (let i in res.list) {
        console.log(res.list[i]);
        let lists = {
          fn: 'detail',
          //sex: i % 2 == 0 ? '女' : '男',
          tille: res.list[i].certificate.length == 0 ? res.list[i].title : `${res.list[i].certificate[0].fir_type_name}-${res.list[i].certificate[0].sec_type_name}`,
          name: res.list[i].name,
          area: res.list[i].certificate.length == 0 ? `${res.list[i].city}` : `${res.list[i].certificate[0].province}${res.list[i].certificate[0].city}`,
          stats: i % 2 == 0 ? '资质' : '不限',
          pay: res.list[i].wages == null ? `面议` : `${res.list[i].wages}`,
          person: res.list[i].img,
          time: res.list[i].utime.substr(0, 10)

        }
        if (res.list[i].sex == 0) {
          lists.sex = '男'
        } else if (res.list[i].sex == 1) {
          lists.sex = '男'
        } else if (res.list[i].sex == 2) {
          lists.sex = '女'
        } else {
          lists.sex = res.list[i].sex
        }
        ;
        list.push(lists)
      }
      wx.hideLoading();
      that.setData({
        list: list
      });
      page++;
      //resolve()
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息

      wx.hideLoading();
      // reject()
    });

    setTimeout(function () {
      wx.hideLoading();
    }, 800);
    setTimeout(function () {
      wx.stopPullDownRefresh();
    }, 900)

  },
  screen1(){
   this.setData({
     searSencod:true,
     'seekData.scondSeek': false
   })
  },
  screen2() {
    this.setData({
      searSencod: false,
      'seekData.scondSeek':true
    })
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
})