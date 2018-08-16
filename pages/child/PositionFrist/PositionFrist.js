// pages/child/PositionFrist/PositionFrist.js
const app = getApp();
const utils = require('../../../utils/util.js')
const Promise = require('../../../utils/bluebird.min.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    explain:{
      explain:"情况说明"
    }
    , personMes:{
      switchde:true
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
  console.log("mes",options)
    if (options.type=='全职'){
      that.setData({
        'explain.explain':"自我介绍",
        'personMes.switchde':false,
        'explain.fullTime':true,
         types:'全职'
      })
    }

    console.log(0==[])
   that.getinfo(options.id)
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

  // 
  getinfo(id){
    let that = this;
    let url = '';
    if (that.data.types=='全职'){
      url ='api/resume/full_detail_company'
    }else{
      url = 'api/resume/part_detail_company'
    }

    utils.post(url, {
      resume_id: id
    }).then((res) => {

      if (that.data.types == '全职') {
        that.setData({
          'personMes.resumePart': res.ResumeFull,
          'explain.resumePart': res.ResumeFull
        })
      } else {
        that.setData({
          'personMes.resumePart': res.resumePart,
          'explain.resumePart': res.resumePart
        })
      }
   
      console.log(res, that.data.explain);//正确返回结果
      wx.hideLoading();
      // that.setData({
      //   oppid: res.wx_openid
      // })

      //存储结束
      //resolve()
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息
      wx.hideLoading();
    //  reject()
    });
  }

})