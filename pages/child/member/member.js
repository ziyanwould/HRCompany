// pages/child/member/member.js
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
  
  }
})