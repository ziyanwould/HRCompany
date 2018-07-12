// pages/creation/creation.js
var model = require('../../model/model.js')
const utils = require('../../utils/util.js')

var show = false;
var item = {};
const app = getApp();
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // show:true,
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
      }
      
    ],
    tabs: ["发布兼职", "发布全职",],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    //版块数据组
    allms:{
     // showTextarea:true,
      select:[
        {
          comTitle:'职位信息',
          child:[
            {
              inputTitle:'职位标题',
              inputPlace:'请输入',
              input:'',
              fn:'titleInput'
              
            },
            {
              countTitle:'职位薪资',
              countCount:'请选择',
              fn:'choosePay'
            }
          ],
        },
         {
          comTitle: '任职要求',
          child: [
            {
              countTitle: '职位类别',
              countCount: '请选择',
              fn: 'post'
            },
            {
              countTitle: '招聘人数',
              countCount: '请选择',
              fn: 'receuit'
            },
            {
              countTitle: '工作地区',
              countCount: '请选择',
              fn: 'area'
            }
            ,
            {
              countTitle: '工作经验',
              countCount: '请选择',
              fn: 'exp'
            }
            ,
            {
              countTitle: '学历要求',
              countCount: '请选择',
              fn: 'education'
            }
          
          ],
        }
      ],
      textarea:[
        {
          textareaTitle:"情况说明",
          fn:'textarea',
          placeTitle:'请编辑岗位职责',
          textarea:''
        }
      ],
      publish:'发布职位',
      fn:'publish'
    },
    otherms:{
      select: [
        {
          comTitle: '职位信息',
          child: [
            {
              inputTitle: '职位标题',
              inputPlace: '请输入',
              input: '',
              fn: 'FtitleInput'

            },
            {
              countTitle: '职位薪资',
              countCount: '请选择',
              fn: 'FchoosePay'
            }
          ],
        },
        {
          comTitle: '证书要求',
          child: [
            {
              countTitle: '证书类别',
              countCount: '请选择',
              fn: 'Ftype'
            },
            {
              countTitle: '注册情况',
              countCount: '请选择',
              fn: 'Fcase'
            },
            {
              countTitle: '证书状态',
              countCount: '请选择',
              fn: 'Fstate'
            }
            ,
            {
              countTitle: '用证地区',
              countCount: '请选择',
              fn: 'Farea'
            }
            ,
            {
              countTitle: '证书用途',
              countCount: '请选择',
              fn: 'Fuse'
            }

          ],
        }
      ],
      textarea: [
        {
          textareaTitle: "情况说明",
          fn: 'Ftextarea',
          placeTitle: '请编辑岗位职责',
          textarea: ''
        }
      ],
      publish: '发布职位',
      fn: 'publish'
    },
    item: {
      show: show
    }

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
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    var that = this;
    //请求数据
    model.updateAreaData(that, 0, e);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  //  let message = utils.sjc();
  //  console.log(message) 测试箭头函数

    // utils.request('sort/get_job_type', {
    //   params: {},
    //   success:res=> {
    //      console.log(res)
    //      utils.deleteEmptyProperty(res);
    //      console.log(res)
    //   }
    // }) 测试封装函数
   let that =this;
    /**跳转筛选 */
    let value = wx.getStorageSync('worktype')
    console.log("otherms", that.data.otherms)
    console.log("allms", that.data.allms)
    if (value) {
      if (that.data.activeIndex==0){
        that.setData({
          'otherms.select[1].child[0].countCount': value.value,
           pID: value.id
        })
      }else{
        that.setData({
          'allms.select[1].child[0].countCount': value.value,
           fID: value.id
        })
      }
        
    }
    wx.removeStorageSync('worktype')
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
  area(){
    this.translate()
  },
  Farea(){
    this.translate()
  },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
   
  },
   //点击选择城市按钮显示picker-view
  translate(e) {
    let that = this;
    //隐藏输入框及头部及底部
    that.setData({
      'otherms.showTextarea': true,
      'allms.showTextarea':true,
      show:true

    })
   
    model.animationEvents(this, 0, true, 400);
  },
  //隐藏picker-view
  hiddenFloatView(e) {
    var that = this;
    //隐藏输入框及头部及底部
    that.setData({
      'otherms.showTextarea': false,
      'allms.showTextarea': false,
      show: false
    })
    model.animationEvents(this, 200, false, 400);
    console.log(that.data.province, that.data.city)
  },
  //滑动事件
  bindChange(e) {
    let that = this;
    model.updateAreaData(this, 1, e);
    item = this.data.item;
    this.setData({
      province: item.provinces[item.value[0]].name,
      city: item.citys[item.value[1]].name,
      county: item.countys[item.value[2]].name
    });
    if (that.data.activeIndex == 0) {
      that.setData({
        'otherms.select[1].child[3].countCount': that.data.province + ' ' + that.data.city
      })
    } else {
      that.setData({
        'allms.select[1].child[2].countCount': that.data.province + ' ' + that.data.city
      })
    }
  },
  onReachBottom () {
  },
  nono() { },

//es6简化写法
  Ftype(){
    wx.navigateTo({
      url: '/pages/child/selectProject/selectProject'//实际路径要写全
    })
  },
  post(){
    wx.navigateTo({
      url: '/pages/child/selectProject/selectProject?id=0'//实际路径要写全
    })
  },
  //兼职的函数
  
  selsect(arry,elet){
    var that = this;
    wx.showActionSheet({
      itemList: arry,
      success: function (res) {
        if (!res.cancel) {
          console.log(res.tapIndex)
          that.setData({
            [elet]: arry[res.tapIndex]
          })
        }
      }
    })
  },
  FchoosePay(){
    let arry = ["3k -6k", "6k -10k", "10k -15k","15k以上","面议"];
    let ele = 'otherms.select[0].child[1].countCount';
    this.selsect(arry, ele)
  },
  Fcase(){
    let arry = ["转注", "初始", "不限"];
    let ele = 'otherms.select[1].child[1].countCount';
    this.selsect(arry, ele)
  },
  Fstate(){
    let arry = ["闲置中", "快到期", "未拿证","不限"];
    let ele = 'otherms.select[1].child[2].countCount';
    this.selsect(arry, ele)
  },
  Fuse(){
    let arry = ["资质", "项目", "不限"];
    let ele = 'otherms.select[1].child[4].countCount';
    this.selsect(arry, ele)
  },
  FtitleInput(e){
   // console.log(e.detail.value);
   this.setData({
     'otherms.select[0].child[0].input': e.detail.value
   })
  },
  Ftextarea(e){
    this.setData({
      'otherms.textarea[0].textarea': e.detail.value
    })
  },

  publish(){
    console.log(this.data.otherms)
  },
  
  //全职相关
  titleInput(e){
    console.log(e.detail.value);
    this.setData({
      'allms.select[0].child[0].input': e.detail.value
    })
  },
  textarea(e){
    console.log(e.detail.value);
     this.setData({
       'allms.textarea[0].textarea': e.detail.value
     })
  },
  choosePay(){
    let arry = ["3k -6k", "6k -10k", "10k -15k", "15k以上", "面议"];
    let ele = 'allms.select[0].child[1].countCount';
    this.selsect(arry, ele)
  },
  receuit(){
    let arry = ["1-5人", "4-20人", "20-30人", "若干人"];
    let ele = 'allms.select[1].child[1].countCount';
    this.selsect(arry, ele)
  },
  exp(){
    let arry = ["1年", "2-5年", "5-10年", "10年以上"];
    let ele = 'allms.select[1].child[3].countCount';
    this.selsect(arry, ele)
  },
  education(){
    let arry = ["高中", "大专", "本科", "硕士","博士以上","不限"];
    let ele = 'allms.select[1].child[4].countCount';
    this.selsect(arry, ele)
  }
})