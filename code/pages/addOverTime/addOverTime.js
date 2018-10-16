var index = 0;
var dimButton = false;
const app = getApp()
var util = require('../../utils/util.js')
Page({
  data: {
    bill_project: "请填写您的项目",
    dates: util.formatDate(new Date()),
    ot_duration: "0.0h(请输入准确到小时数)",
    ot_reason: "请填写加班原因",
    areaIndex: 0,
    area: ['h'],
    flag: false
    },
    //  点击日期组件确定事件  
    bindDateChange: function (e) {
      console.log(e.detail.value)
      this.setData({
        dates: e.detail.value
      })
    },
    bindPickerChange: function (e) {
      this.setData({
        areaIndex: e.detail.value
      })
    }, 
    onUnload:function(e){
      if(this.data.flag){
        getApp().globalData.nativeBackFlag = true;
      }else{
        getApp().globalData.nativeBackFlag = false;
      }
    } ,
    bindTextAreaBlur: function (e) {
      console.info(e.detail.value)
    },
    formSubmit: function (e) {
     
      console.info("submit======")
      var warn = "";
      var that = this;
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];
      var prevPage = pages[pages.length - 2];

      if (e.detail.value.bill_project == "") {
        warn = "请填写您的项目！";
      } else if (e.detail.value.ot_duration == "") {
        warn = "请输入您的具体加班时间";
      } else if (e.detail.value.ot_reason == '') {
        warn = "请输入您的加班原因";
      } else {
        this.setData({flag:true});
        dimButton = true;
        console.log('form发生了submit事件，携带数据为：', getApp().globalData.nativeBackFlag)
        prevPage.setData({
          newOTInfo:{
            bill_project: e.detail.value.bill_project,
            ot_date: e.detail.value.ot_date,
            ot_duration: e.detail.value.ot_duration,
            ot_reason: e.detail.value.ot_reason
          },
          flag:true,
          sign : 0
        })
        wx.navigateBack({ 
          url: '../overTime/overTime' 
        }) 
      }
      if (dimButton == false) {
        wx.showModal({
          title: '提示',
          content: warn
        })
      }
    }
  

})