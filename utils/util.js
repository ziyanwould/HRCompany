const Promise = require('bluebird.min.js')
  
  const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const sjc = () => {
  let timestamp = Date.parse(new Date());
  timestamp = timestamp / 1000;
  console.log("当前时间戳为：" + timestamp);
  let n = timestamp * 1000;
  let date = new Date(n);
  //年  
  let Y = date.getFullYear();
  //月  
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  //日  
  let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  //时  
  let h = date.getHours();
  //分  
  let m = date.getMinutes();
  //秒  
  let s = date.getSeconds();

  //console.log("当前时间：" + Y + M + D + h + ":" + m + ":" + s);  

  return [Y - 50 + "-" + M, Y + "-" + M, Y];
}

//获取页面高度
const windows = () =>  {
  var height = 0;
  console.log('onLoad')
  var that = this
  wx.getSystemInfo({
    success: function (res) {
      height = res.windowHeight
    }
  })
  return height;
}


//封装请求
const requestHandler = {
  params: {},
  success: function (res) {
    // success  
  },
  fail: function () {
    // fail  
  },
};

const request=(url, requestHandler, token)=> {
  //注意：可以对params加密等处理  
  const params = requestHandler.params;
  //获取登录钥匙
  wx.request({
    url: 'https://api.17liepin.com/' + url,
    data: params,
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
    // header: {}, // 设置请求的 header 
    header: {
      'content-type': 'application/json',
      'appid': 'bHA4MDYzNWM3OC0zYjYxLTQ1NDgtOTgyNS01ZjQxMWE4MzBkNDY=',
      'login_token': token
    },
    success: res=> {
      //注意：可以对参数解密等处理  
      requestHandler.success(res)
    },
    fail: res=> {
      requestHandler.fail(res)
    },
    complete: function () {
      // complete  
    }
  })
}

//异步处理方案 
function wxPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        //成功
        resolve(res)
      }
      obj.fail = function (res) {
        //失败
        reject(res)
      }
      fn(obj)
    })
  }
}



//格栅化字符串无效值
const deleteEmptyProperty = (object) => {
  for (var i in object) {
    var value = object[i];
    // sodino.com
    // console.log('typeof object[' + i + ']', (typeof value));
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        if (value.length == 0) {
          delete object[i];
          //console.log('delete Array', i);
          continue;
        }
      }
      deleteEmptyProperty(value);
      if (isEmpty(value)) {
        //console.log('isEmpty true', i, value);
        delete object[i];
        //console.log('delete a empty object');
      }
    } else {
      if (value === '' || value === null || value === undefined) {
        // if (value === null) {20180625暂时取消
        delete object[i];
       // console.log('delete ', i);
      } else {
        //console.log('check ', i, value);
      }
    }
  }
}
const isEmpty = (object) => {
  for (var name in object) {
    return false;
  }
  return true;
}

/**时间格栅化 */
const timeFat = (time) => {

  let month = time.substring(5, 7);
  let day = time.substring(8, 10);
  let comTime = time.substring(11, 16);
  let endTime = month + '月' + day + '日 ' + comTime;
  return endTime;
}

module.exports = {
  formatTime: formatTime,
  sjc: sjc,
  windows: windows,
  request: request,
  wxPromisify: wxPromisify,
  deleteEmptyProperty: deleteEmptyProperty,
  timeFat: timeFat
}
