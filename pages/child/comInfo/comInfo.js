// pages/child/comInfo/comInfo.js
const app = getApp();
const utils = require('../../../utils/util.js')
const Promise = require('../../../utils/bluebird.min.js')
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
              watchinput: 'cominfo.select[0].child[1].input',
              fn: 'watchinput'

            },
            {
              inputTitle: '公司网址',
              inputPlace: '请输入',
              input: '',
              watchinput: 'cominfo.select[0].child[2].input',
              fn: 'watchinput'
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
              watchinput:'cominfo.select[1].child[0].input',
              fn: 'watchinput'
            },
            {
              inputTitle: '联系人手机号码',
              inputPlace: '请输入',
              input: '',
              watchinput: 'cominfo.select[1].child[1].input',
              fn: 'watchinput'
            },
            {
              inputTitle: '座机号码',
              inputPlace: '请输入',
              input: '',
              watchinput: 'cominfo.select[1].child[2].input',
              fn: 'watchinput'
            },
            {
              inputTitle: 'QQ号码',
              inputPlace: '请输入',
              input: '',
              watchinput: 'cominfo.select[1].child[3].input',
              fn: 'watchinput'
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
    let that = this;
    if (app.globalData.userinfo != 0) {
      console.log(app.globalData.userinfo)
      that.setData({
        'cominfo.select[0].child[0].countCount': app.globalData.userinfo.Address,
        'cominfo.select[0].child[1].input': app.globalData.userinfo.email,
        'cominfo.select[0].child[2].input': app.globalData.userinfo.Company_Web,
        'cominfo.select[1].child[0].input': app.globalData.userinfo.Link_Man,
        'cominfo.select[1].child[1].input': app.globalData.userinfo.Link_Tel,
        'cominfo.select[1].child[2].input': app.globalData.userinfo.Company_Area_Code,
        'cominfo.select[1].child[3].input': app.globalData.userinfo.qq,
        'cominfo.textarea[0]textarea': app.globalData.userinfo.Company_Intro,
         Company_Logo: app.globalData.userinfo.Company_Logo,
         province: app.globalData.userinfo.province,
         city: app.globalData.userinfo.city,
         county: app.globalData.userinfo.county,
         latitude: app.globalData.userinfo.Lat,
         longitude: app.globalData.userinfo.Lng


      })
    }
    let token = wx.getStorageSync('token')
    console.log("token", token)
    that.setData({
      token: token.login_token
    })
    
   
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
    let that = this;
    let map = wx.getStorageSync('map')
    console.log("map", map)
    if(map){
      that.setData({
        'cominfo.select[0].child[0].countCount': map.detail,
        province: map.province,
        city: map.city,
        county: map.county,
        latitude: map.latitude,
        longitude: map.longitude
      })
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
    wx.removeStorageSync('map')
    console.log("data",this.data)
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
       'cominfo.textarea[0]textarea': value,
       'cominfo.textarea[0]currentNoteLen': len, //当前字数  
       'cominfo.textarea[0]limitNoteLen': this.data.noteMaxLen - len //剩余字数  
     });
  }
  ,
  //跳转地址中间页面
  chooseArea(){
    wx.navigateTo({
      url: `/pages/child/map/map`//实际路径要写全
    })
  },
  //
  //此乃发布
  publish(e){
    let that = this;
    console.log("发布消息", "QQ", that.data.cominfo.select[1].child[3].input,
      "email", that.data.cominfo.select[0].child[1].input,
      "province", that.data.province,
      "city", that.data.city,
      "county", that.data.county,
      "Address", that.data.cominfo.select[0].child[0].countCount,
      "Company_Logo", that.data.Company_Logo,
      "Company_Name", that.data.cominfo.select[1].child[0].input,
      "Company_Web", that.data.cominfo.select[0].child[2].input,
      "Company_Intro", that.data.cominfo.textarea[0].textarea,
      "Company_Area_Code", that.data.cominfo.select[1].child[2].input,
      "Company_Tel", that.data.cominfo.select[1].child[1].input,
      "Link_Man", that.data.cominfo.select[1].child[0].input,
      "Link_Tel", that.data.cominfo.select[1].child[1].input,
      "Lat", that.data.latitude,
      "Lng", that.data.longitude)
    utils.post('usercenter/update_cominfo', {
      "QQ": that.data.cominfo.select[1].child[3].input,
      "email": that.data.cominfo.select[0].child[1].input,
      "province": that.data.province,
      "city": that.data.city,
      "county": that.data.county,
      "Address": that.data.cominfo.select[0].child[0].countCount,
      "Company_Logo": that.data.Company_Logo,
      "Company_Name": that.data.cominfo.select[1].child[0].input,
      "Company_Web": that.data.cominfo.select[0].child[2].input,
      "Company_Intro": that.data.cominfo.textarea[0].textarea,
      "Company_Area_Code": that.data.cominfo.select[1].child[2].input,
      "Company_Tel": that.data.cominfo.select[1].child[1].input,
      "Link_Man": that.data.cominfo.select[1].child[0].input,
      "Link_Tel": that.data.cominfo.select[1].child[1].input,
      "Lat": that.data.latitude,
      "Lng": that.data.longitude

    }, that.data.token).then((res) => {
      console.log(res);//正确返回结果
      wx.showToast({
        title: '已提交',
        icon: 'success',
        duration: 3000
      });
      that.getNewINfo()
      setTimeout(function(){
        wx.navigateBack({
          delta: 2
        })
      },1500)

      //resolve()
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息

      //  reject()
    });
  },
  //更改数据
  watchinput(e){
    let farent = e.currentTarget.dataset.value;
    this.setData({
      [farent]: e.detail.value
    })
    console.log("更改信息", e,e.detail.value)
  },
  //上传图片
  exchangPhotos(){
    let that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log('tempFilePaths', tempFilePaths[0])
        // const uploadFile = utils.wxPromisify(wx.uploadFile({
        //   url: 'https://api.17liepin.com/usercenter/upload_img', //仅为示例，非真实的接口地址
        //   filePath: tempFilePaths[0],
        //   name: 'file',
        //   header: {
        //     'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY=',
        //     'login_token': that.data.token
        //   }
        // }));
        // uploadFile().then(res => {
        // console.log("成功",res)
         
        // }).catch(res => {
        //   console.log("失败",res)
        // })


        wx.uploadFile({
          url: 'https://api.17liepin.com/usercenter/upload_img', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY=',
            'login_token': that.data.token
          },
          success: function (res) {
            //图片格式不对字符串切换
            var obj = JSON.parse(res.data)
          
            console.log("obj", obj.imgs[0])
            that.setData({
              Company_Logo: obj.imgs[0]
            })
          }


        })
      }
    })
  },
  getNewINfo() {
    let that = this;
    utils.post('usercenter/get_cominfo', false, that.data.token).then((res) => {
      console.log("用户信息", res);//正确返回结果
      console.log('res', res)
      //更新全局变量方式 20180515
      app.globalData.userinfo = res.userinfo
      typeof cb == "function" && cb(that.globalData.userinfo)
      //更新全局变量结束 20180515
      // wx.hideLoading();
      // resolve()

    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息
      //wx.hideLoading();
      // reject()
    });
  }
})