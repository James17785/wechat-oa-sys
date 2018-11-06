
var index = 0;
const app = getApp()
var util = require('../../utils/util.js')
Page({
  data: {
    employee_name: "请输入姓名",
    employee_duration: "请输入工作年限",
    employee_phone: "请填写电话",
    employee_techy:"请输入技术方向",
    employee_level:"请输入应聘级别",
    areaIndex: 0,
    area: ['Y'],
    flag: false
  },
  onUnload: function (e) {
    if (this.data.flag) {
      getApp().globalData.flag = true;
    } else {
      getApp().globalData.flag = false;
    }
  },
  bindTextAreaBlur: function (e) {
    console.info(e.detail.value)
  },
  formSubmit: function (e) {

    console.info("submit======")
    var warn = "";
    var that = this;
    var flag = false;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];
    var prevPage = pages[pages.length - 2];

    if (e.detail.value.leave_type == "") {
      warn = "请选择休假类型！";
    } else if (e.detail.value.leave_duration == "") {
      warn = "请输入您的请假时长";
    } else if (e.detail.value.leave_backup == '') {
      warn = "请输入您的BackUp";
    } else {
      this.setData({ flag: true });
      console.log('form发生了submit事件，携带数据为：', prevPage)
      prevPage.setData({
        newLeaveInfo: {
          employee_name: e.detail.value.employee_name,
          employee_duration: e.detail.value.employee_duration,
          employee_phone: e.detail.value.employee_phone,
          employee_techy: e.detail.value.employee_techy,
          employee_level: e.detail.value.employee_level
        }
      })
      wx.navigateBack({
        url: '../recommend/recommend'
      })
    }
    if (this.data.flag == false) {
      wx.showModal({
        title: '提示',
        content: warn
      })
    }
  }


})