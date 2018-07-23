// pages/child/logon/logon.js
var model = require('../../../model/model.js')
const utils = require('../../../utils/util.js')

var show = false;
var item = {};
const app = getApp();
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
let interval = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTime: 61,
    step:-1,
    useDa:{
      step: [
        {
          num: 1,
          active: true
        },
        {
          num: 2,
          active: false
        }
        , {
          num: 3,
          active: false
        }
        , {
          num: 4,
          active: false
        }
      ],
      mesInput:true,
      credImg:false,
      inputList:[
        {
          img:'logocomp.png',
          classx:'img1',
          title:'企业名字：',
          value:'',
          placeholder:'(请与营业执照注册名保存一致)',
          placlass:'loPlone',
          fn:'watchInput'
        },
        {
          img: 'Logoarea.png',
          classx: 'img2',
          title: '所在地：',
          value: '',
          placeholder: '',
          placlass: 'loPlone',
          fn: '',
          dis:true,
          fun:'area'
        },
        {
          img: 'detailArea.png',
          classx: 'imgarea',
          title: '详细地址：',
          value: '',
          placeholder: '',
          placlass: 'loPlone',
          fn: 'watchInput'
        },
        // {
        //   img: 'detailArea.png',
        //   classx: 'imgarea',
        //   title: '验证码：',
        //   value: '',
        //   placeholder: '请输入验证码',
        //   placlass: 'loPlone',
        //   fn: '',
        //   fn2:'getVerificationCode',
        //   valMessPan:true,
        //   time: "获取验证码"
        // }
      
      ],
      Ccie:{
        img:'companylogon.png',
        classx:'img4',
        uptext:'点击上传营业执照',
        other:'(图片格式为jpg,png,大小不超过3M)',
        fn:'setup'

      },
      lastSetp:'lastSetp',
      nextSetp:'nextSetp',
      nextText:'下一步',
      mes:true,
      mesLeft:'注册代表你已同意',
      mesRight:'《建筑猎聘用户协议》',
      Acc:true,
      AccText:'已有账户',
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    let that = this;
    model.updateAreaData(that, 0, e);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("信息", this.data.useDa);

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
  getVerificationCode: function (e) {
    let flage = this.data.useDa.inputList[3].time;
    if (!(flage == '获取验证码' || flage == '重新发送')){
      console.log("输入框信息", flage)
       return false;
     }
    //  发送验证码
    let mobile = this.data.mobile;
    let regMobile = /^1\d{10}$/;
    // if (!regMobile.test(mobile)) {
    //   wx.showModal({
    //     content: '您的手机号输入有误',
    //     showCancel: false,
    //     success: function (res) {
    //       if (res.confirm) {
    //         //console.log('用户点击确定')
    //       }
    //     }
    //   });
    //   return false;
    // }
    //启动计数器
    this.getCode();
    var that = this
    that.setData({
      'useDa.inputList[3].disabled': true
    })
    // if (that.data.leibie == 0) {
    //   var tmoble = "手机注册"
    // } else {
    //   var tmoble = "手机登录"

    // };

    // wx.request({
    //   url: 'https://api.17liepin.com/api/common/send_smscode',
    //   header: {
    //     'content-type': 'application/json',
    //     'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY='

    //   },
    //   method: 'POST',
    //   data: {
    //     mobile: that.data.mobile,
    //     action_type: tmoble,
    //     content: "登录/注册建筑猎聘"

    //   },


    //   success: function (res) {
    //     console.log("接口返回", res.data)
    //     wx.showToast({
    //       title: res.data.message,
    //       icon: 'success',
    //       duration: 2000
    //     });

    //     //  存储验证码是否发送成功
    //     that.setData({
    //       note: res.data.success
    //     })
    //   }

    // })
  },
  getCode: function (options) {
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        'useDa.inputList[3].time': currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          'useDa.inputList[3].time': '重新发送',
          currentTime: 61,
          'useDa.inputList[3].disabled': false
        })
      }
    }, 1000)
  },
  //地区三联动
  area() {
    this.translate()
  },
  Farea() {
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
    model.animationEvents(this, 0, true, 400);
  },
  //隐藏picker-view
  hiddenFloatView(e) {
    var that = this;
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
  
      that.setData({
        'useDa.inputList[1].value': that.data.province + ' ' + that.data.city + ' ' + that.data.county
      })
  
  },
  onReachBottom() {
  },
  nono() { },
  //监测页面
  watchInput(e){
    let that = this;
    let id = e.target.dataset.id  
    console.log(id, e.detail.value)
    let value = 'useDa.inputList[' + id+'].value';
    that.setData({
      [value]: e.detail.value
    })
  },
  //页面逻辑版块
  activeSetp(){
    let that = this;
    let arg = that.data.useDa.step;
    for (let val of arg) {
      if (val.active) {
        that.setData({
          step: val.num,
        })
      }
    }

  },
  //设置导航状态
  setStep(nums){
    let that = this;
    let arg = that.data.useDa.step;
    for (let val of arg) {
      if (val.num == nums) {
         val.active =true
      }else{
        val.active =false
      }
    }
    //console.log(arg)
    that.setData({
      'useDa.step': arg
    })
  },
  lastSetp(){
  
    let that = this;
    that.activeSetp()
    switch (that.data.step) {
      case 1:
        wx.navigateBack({
          delta: 1 //返回页面数
        })
        break;
      case 2:
      
        break;
      default:
      
    }
  },
  nextSetp(){
    let that = this;
    that.activeSetp();
    switch (that.data.step) {
      case 1:
        that.step1();
        break;
      case 2:
        that.setStep(3);
        that.state(3)
        break;
      default:

    }
 
  
  }
  ,
  step1(){
    let that = this;
    //console.log(that.data.useDa.inputList[0].value, that.data.useDa.inputList[1].value, that.data.useDa.inputList[2].value)
    let arg = that.data.useDa.inputList;
    for (let val of arg) {
      if (val.value=='') {
        wx.showModal({
          content: '您尚有信息没有填写完毕',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        });
      }else{
        //页面信息刷新
        that.setStep(2);
        that.state(2);

      }
    }

  },
  state(unm){
    let that = this;
    if (unm==2){
      that.setData({
        'useDa.mesInput' : false,
        'useDa.credImg': true,
        'useDa.Acc':false,
      }) 
    } else if (unm == 3){
      
      let list = [
        {
          img:'code.png',
          classx:'img1',
          title:'设置登录密码：',
          value:'',
          placeholder:'请输入密码',
          placlass:'loPlone',
          fn:'watchInput',
          'type':'password',
        },
        {
          img: 'code.png',
          classx: 'img2',
          title: '确认登录密码：',
          value: '',
          placeholder: '请再次输入密码',
          placlass: 'loPlone',
          fn: 'watchInput',
          'type': 'password',
        
        }]
      that.setData({
        'useDa.mesInput': true,
        'useDa.credImg': false,
        'useDa.Acc': false,
        'useDa.inputList': list
      }) 
    }
  
  }

})