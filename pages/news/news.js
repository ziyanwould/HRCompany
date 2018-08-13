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
  }
})