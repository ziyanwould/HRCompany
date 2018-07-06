const app = getApp();

Page({
  data: {
    //自定义模板必须引入的数据版块
    navData: [
      {
        name: "兼职人才",  //文本
        current: 1,    //是否是当前页，0不是  1是
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
        current: 0,
        style: 0,
        ico: 'icon-wode',
        fn: 'bindViewMy'
      },
    ],
    seek:{
      fn: 'seek',
    }
    ,
    list:[
     
    ]

    
  
    
  },
  //各个跳转函数
  gotoCompanyIndex:function(){
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
  gotobusinessCard:function(){
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
  onLoad:function(){
    let that = this;
    let isIphoneX = app.globalData.isIphoneX;
    that.setData({
      isIphoneX: isIphoneX
    });
    that.datalist();
   
  },
  //请求函数
  datalist:function(messages="玩命加载中"){
    var that = this;
    wx.showLoading({
        title: messages,
    });
    let setArr = ['李文文', '吴碧勇', '何碧碧',  '迪迦','李雯'];
    var list = that.data.list;
    if (list.length>19) {
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
        area: i % 2 == 0 ? '广东佛山市' : '广东广州市',
        stats: i % 2 == 0 ? '资质' : '不限',
        pay: '面议',
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
  },
})
