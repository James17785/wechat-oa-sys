const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chinasoftiInfoOld: null,
    chinasoftiInfo: null,
    registerOrUpdate: "注册"
  },
  formSubmit: function (e) {
    var warn = "";//弹框时提示的内容  
    var isFormDataReady = false;//判断信息输入是否完整   
    if (e.detail.value.name_chinese == "") {
      warn = "请填写您的中文名！";
    } else if (e.detail.value.name_english == "") {
      warn = "请填写您的英文名！";
    } else if (e.detail.value.staffId == "") {
      warn = "请填写您的Staff ID！";
    } else if (e.detail.value.ehr == "") {
      warn = "请填写您的EHR编号！";
    } else if (e.detail.value.lob == "") {
      warn = "请填写您的lob！";
    } else if (e.detail.value.phone == "") {
      warn = "请填写您的手机号！";
    } else if (false) {
      warn = "您填写的手机号格式不正确！";
    } else if (e.detail.value.email == "") {
      warn = "请选择您的中软RM邮箱"
    } else if (e.detail.value.rm_email == "") {
      warn = "请输写您的中软RM邮箱";
    } else if (e.detail.value.hsbc_mgr_email == "") {
      warn = "请输写您的HSBC Manager（HM）邮箱";
    } else {
      isFormDataReady = true;
      console.log('form发生了submit事件，携带数据为：', e.detail.value);
    }
    if (isFormDataReady) {
      //必要信息都填写，不用弹框，且发送请求，页面进行跳转 
      if (app.globalData.dummy) {
        var registerResult = require("../../dummy/register.js");
        this.registerCallback(registerResult);
      } else {
        wx.request({
          url: app.globalData.serverPath + "/weapp/user",
          method: this.data.registerOrUpdate == "注册" ? "POST" : "PUT",
          data: Object.assign({}, e.detail.value, { "openId": app.globalData.openId }),
          success: this.registerCallback
        })
      }
    } else {
      // 信息填写不完整，弹出输入框  
      wx.showModal({
        title: '提示',
        content: warn
      })
    }
  },
  registerCallback: function (registerResult) {
    var registerResult = registerResult
    if (registerResult.code == 0) {
      console.log("注册成功！");
      wx.reLaunch({
        url: '../../pages/index/index',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if (options.chinaSoftiInfo) {
      this.setData({
        chinasoftiInfo: JSON.parse(options.chinaSoftiInfo),
        registerOrUpdate: "更新"
      })
    } else {
      this.setData({
        registerOrUpdate: "注册"
      })
    }
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