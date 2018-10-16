// pages/addLeave/addLeave.js
var index = 0;
const app = getApp()
var util = require('../../utils/util.js')
Page({
  data: {
    leave_type: "选择休假类型",
    startDates: util.formatDate(new Date()),
    startTimes: util.formatTimeOnly(new Date()),
    endDates: util.formatDate(new Date()),
    endTimes: util.formatTimeOnly(new Date()),
    leave_duration: "0.0h(请输入准确到小时数)",
    leave_backup: "请填写您的backup",
    areaIndex: 0,
    area: ['H'],
    flag: false
  },
  //  点击日期组件确定事件  
  bindStartDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      startDates: e.detail.value
      
    })
  },
  bindStartTimeChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      //dates: e.detail.value,
      startTimes: e.detail.value + ":00"

    })
  },
  bindEndDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
     // dates: e.detail.value
      endDates: e.detail.value
    })
  },
  bindEndTimeChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      //dates: e.detail.value
      endTimes: e.detail.value + ":00"
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      areaIndex: e.detail.value
    })
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
          leave_type: e.detail.value.leave_type,
          leave_s_date: e.detail.value.leave_s_date,
          leave_s_time: e.detail.value.leave_s_time + ":00",
          leave_e_date: e.detail.value.leave_e_date,
          leave_e_time: e.detail.value.leave_e_time + ":00",
          leave_duration: e.detail.value.leave_duration,
          leave_backup: e.detail.value.leave_backup
        }
      })
      wx.navigateBack({
        url: '../leave/leave'
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