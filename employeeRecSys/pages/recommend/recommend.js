// pages/leave/leave.js

//获取应用实例
var util = require('../../utils/util.js');
var li = [];
var index = 0;
var currtIndex = 0;
const app = getApp()

Page({

  data: {
    height: 20,
    focus: false,
    modalFlag: true,
    list: li,
  },
  onShow: function () {
    if (!app.globalData.openId) {
      console.info("empty")
      this.setData({ modalFlag: true })
    } else {
      this.setData({ modalFlag: true })
      this.getUserChinasoftiInfo();
    }
    var flag = getApp().globalData.flag;//判断是从哪个页面跳转过来
    var sign = getApp().globalData.sign;//判断从修改页面中的保存还是删除按钮过来，保存为1，删除为2
    var options = this.data.newLeaveInfo;
    index = li.length;
    if (flag) {
      li.push({
        "index": index,
        "employee_name": options.employee_name,
        "employee_duration": options.employee_duration,
        "employee_phone": options.employee_phone,
        "employee_techy": options.employee_techy,
        "employee_level": options.employee_level,
        "image": "../../image/uncheck.png",
      })
      this.setData({
        list: li
      })
      console.info(index);
    };

    if (sign == '2') {
      li.splice(currtIndex, 1);
      this.setData({
        'list': li
      })
    }
  },
  toModifyAddre: function (e) {
    getApp().globalData.flag = false;
    getApp().globalData.sign = 2;
    currtIndex = e.currentTarget.dataset.index;
    this.setData({
      list: li
    })
    this.onShow();
  },
  modalOk: function () {
    // wx.switchTab({
    //     url: '../../pages/index/index'
    //   })
  },
  bindButtonTap: function () {
    this.setData({
      focus: true
    })
  },
  bindFormSubmit: function (e) {
    console.log(e.detail.value.textarea)
  },
  formSubmit: function (e) {

    var arr = [],
      objectArr = e.detail.value
    for (let i in objectArr) {
      let o = {};
      o[i] = objectArr[i];
      arr.push(o)
    }
    console.log('form发生了submit事件，携带数据为：', arr)
    
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  addAddre: function (e) {
    console.info(e)
    wx.navigateTo({
      url: '../addRecommend/addRecommend?id=' + 0
    })
  },
  // //  点击日期组件确定事件  
  // bindDateChange: function (e) {
  //   console.log(e.detail.value)
  //   this.setData({
  //     dates: e.detail.value
  //   })
  // },
  getUserChinasoftiInfo: function () {
    console.log("获取用户中软信息");
    if (app.globalData.dummy) {
      var chinasoftiInfo = require("../../dummy/chinasoftiInfo.js")
      console.log("获取用户中软信息：<dummy>", chinasoftiInfo);
      if (chinasoftiInfo.code == 0 && chinasoftiInfo.data) {
        this.setData({
          name_chinese: chinasoftiInfo.data.name_chinese,
          name_english: chinasoftiInfo.data.name_english,
          staffId: chinasoftiInfo.data.staffId,
          rm_email: chinasoftiInfo.data.rm_email,
          hsbc_mgr_email: chinasoftiInfo.data.hsbc_mgr_email
        });
      }
    } else {
      wx.request({
        url: app.globalData.serverPath + "/weapp/user",
        data: {
          openId: app.globalData.openId
        },
        success: function (res) {
          console.log("获取用户中软信息成功：<e.detail.userInfo>", e.detail.userInfo);
          if (res.code == 0 && res.openId) {
            this.setData({
              name_chinese: res.body.data.name_chinese,
              name_english: res.body.data.name_english,
              staffId: res.body.data.staffId,
              rm_email: res.body.data.rm_email,
              hsbc_mgr_email: res.body.data.hsbc_mgr_email,
            })
          }
        }
      })
    }
  }
})

