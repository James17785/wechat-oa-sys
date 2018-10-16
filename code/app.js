App({
  onLaunch: function () {

    // openId检测
    console.log("在本地缓存中检测openId是否已经存在");
    var openId = wx.getStorageSync("openId");
    if (openId) {
      console.log("本地缓存中存在openId:", openId);
      this.globalData.openId = openId;
    } else {
      console.log("本地缓存中不存在openId", openId);
      // 获取openId
      this.getUserOpenId();
    }
  },
  globalData: {
    dummy: false,
    userInfo: null,
    chinasoftiInfo: null,
    nativeBackFlag: false,
    serverPath: "https://329050018.hotnuclear.xyz",
    imagePath: "https://raw.githubusercontent.com/CharlesSWANG/Wechat-OA-Assisst/master/image/",
    openId: ""
  },
  getUserOpenId: function () {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId
        console.log("临时登录凭证code获取成功");
        if (this.globalData.dummy) {
          var openIdResult = require("dummy/openId.js");
          this.getUserOpenIdCallback(openIdResult);
        } else {
          wx.request({
            url: this.globalData.serverPath + "/weapp/auth",
            data: {
              code: res.code
            },
            success: this.getUserOpenIdCallback
          })
        }
      }
    })
  },
  getUserOpenIdCallback: function (openIdResult) {
    var openIdResult = openIdResult.data;
    console.log("openId获取成功：", openIdResult);
    if (openIdResult.code == 0 && openIdResult.openId) {
      this.globalData.openId = openIdResult.openId;
      wx.setStorageSync("openId", this.globalData.openId);
      if (this.openIdResultCallback) {
        this.openIdResultCallback(this.globalData.openId);
      }
    }
  },
  getUserChinasoftiInfo: function (openId) {
    if (this.globalData.dummy) {
      var chinasoftiInfo = require("dummy/chinasoftiInfo.js")
      this.getUserChinasoftiInfoCallback(chinasoftiInfo);
    } else {
      wx.request({
        url: this.globalData.serverPath + "/weapp/user",
        data: {
          openId: openId || this.globalData.openId
        },
        success: this.getUserChinasoftiInfoCallback
      })
    }
  },
  getUserChinasoftiInfoCallback: function (chinasoftiInfo) {
    var chinasoftiInfo = chinasoftiInfo.data;
    if (chinasoftiInfo.code == 0 && chinasoftiInfo.data) {
      console.log("获取用户中软信息成功：", chinasoftiInfo);
      this.globalData.chinasoftiInfo = chinasoftiInfo.data;
      if (this.chinasoftiInfoCallback) {
        this.chinasoftiInfoCallback(this.globalData.chinasoftiInfo);
      }
    } else if (chinasoftiInfo.code == 1) {
      console.log("获取用户中软信息失败：", chinasoftiInfo);
      this.globalData.chinasoftiInfo = null;
      wx.redirectTo({
        url: '/pages/register/register'
      })
    }
  }
})