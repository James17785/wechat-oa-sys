const app = getApp()

Page({
  data: {
    chinasoftiInfo: {},
    hasUserInfo: true,
    imagePath: app.globalData.imagePath,
    formDisabled: true
  },
  onLoad: function () {

    // 获取openId
    if (app.globalData.openId) {
      console.log("openId来自全局数据");
      app.getUserChinasoftiInfo(app.globalData.openId);
    } else {
      app.openIdResultCallback = openId => {
        console.log("openId来自server返回");
        if (openId) {
          app.getUserChinasoftiInfo(openId);
        }
      }
    }

    // 获取中软用户信息
    if (app.globalData.chinasoftiInfo) {
      console.log("从全局数据设置中软用户信息到’我的‘页面");
      this.setData({
        chinasoftiInfo: app.globalData.chinasoftiInfo
      })
    } else {
      app.chinasoftiInfoCallback = chinasoftiInfo => {
        console.log("从sever返回设置中软用户信息到’我的‘页面");
        this.setData({
          chinasoftiInfo: chinasoftiInfo
        })
      }
    }
  },
  navigateToRegister: function () {
    wx.navigateTo({
      url:
      "../register/register"
    });
  },
  updatMyInfo: function () {
    console.log(JSON.stringify(this.data.chinasoftiInfo));
    wx.navigateTo({
      url: '../register/register?chinaSoftiInfo=' + JSON.stringify(this.data.chinasoftiInfo)
    })
  }
})
