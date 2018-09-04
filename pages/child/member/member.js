// pages/child/member/member.js
const app = getApp();
const utils = require('../../../utils/util.js')
const Promise = require('../../../utils/bluebird.min.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
        img1:'mber1',
        vip:'普通会员',
        pay:'5000/年',
        lists:[
          { img: 'mber3', text:'下载与邀约人才全职月薪不超过15000'},
          { img: 'mber4', text: '兼职年薪不超过35000' },
          { img: 'mber5', text: '可发布各类职位300个' },
          { img: 'mber6', text: '下载简历300份' }
          
        ]
      },
      {
        img1: 'mber2',
        vip: '高级会员',
        pay: '10000/年',
        lists: [
          { img: 'mber3', text: '下载与邀约人才月薪与年薪不限' },
          { img: 'mber5', text: '可发布各类职位800个' },
          { img: 'mber6', text: '下载简历800份' }

        ]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let token = wx.getStorageSync('token')
    console.log("token", token)
    that.setData({
      token: token.login_token
    })

    console.log(app.globalData.userinfo)
    that.getmessage();
    that.getvip();
    that.commom()
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
  getmessage() {
    let that = this;
    utils.post('api/order/vip_goods_list', false, that.data.token).then((res) => {
      console.log(res);//正确返回结果
      that.setData({
      
      })
      // resolve()
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息
      wx.hideLoading();
      //reject()
    });
  },
  getvip() {
    let that = this;
      utils.post('usercenter/get_vip', false, that.data.token).then((res) => {
      console.log(res);//正确返回结果
      that.setData({
        Etime_String: res.vip.Etime_String,
        vips: res.vip.Name
      })
      // resolve()
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息
      wx.hideLoading();
      //reject()
    });
  },
  commom(){
    let that = this;
    let useinfo = app.globalData.userinfo;
    that.setData({
      nameCompany: useinfo.Company_Name,
      logo: useinfo.Company_Logo
    
    })
  }
})