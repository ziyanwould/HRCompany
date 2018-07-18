// pages/child/comInfo/comInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cominfo: {
      // showTextarea:true,
      select: [
        {
           //comTitle: '任职要求',
          child: [
            {
              countTitle: '公司地址',
              countCount: '请选择',
              fn: 'chooseArea'
            },
            {
              inputTitle: '电子邮箱',
              inputPlace: '请输入',
              input: '',
              fn: 'emailInput'

            },
            {
              inputTitle: '公司网址',
              inputPlace: '请输入',
              input: '',
              fn: 'wwwInput'
            },
           
          ],
        },
        {
          //comTitle: '任职要求',
          child: [
            {
              inputTitle: '联系人姓名',
              inputPlace: '请输入',
              input: '',
              fn: 'nameInput'
            },
            {
              inputTitle: '联系人手机号码',
              inputPlace: '请输入',
              input: '',
              fn: 'callInput'
            },
            {
              inputTitle: '座机号码',
              inputPlace: '请输入',
              input: '',
              fn: 'tellInput'
            },
            {
              inputTitle: 'QQ号码',
              inputPlace: '请输入',
              input: '',
              fn: 'QQInput'
            },

          ],
        }
      ],
      textarea: [
        {
          textareaTitle: "企业介绍",
          fn: 'textarea',
          placeTitle: '请编辑企业介绍',
          textarea: '',
          noteMaxLen: 500, //备注最多字数 
          limitNoteLen: 0, 
        }
      ],
      publish: '提交修改',
      fn: 'publish'
    },
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
    console.log(this.data.cominfo)
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
  ,
   textarea(e){
     let value = e.detail.value, len = parseInt(value.length);

     if (len > this.data.noteMaxLen) return;

     this.setData({
       'cominfo.textarea[0].textarea': value,
       'cominfo.textarea[0]currentNoteLen': len, //当前字数  
       'cominfo.textarea[0]limitNoteLen': this.data.noteMaxLen - len //剩余字数  
     });
  }
})