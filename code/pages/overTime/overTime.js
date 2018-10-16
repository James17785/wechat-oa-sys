//获取应用实例
var util = require('../../utils/util.js'); 
var index = 0;
var li = [];

var submitPTLi = [];
const app = getApp()
Page({
  data: {
    height: 20,
    focus: false,
    modalFlag:true,
    list: li
  },
 
  onShow: function () {
    if (!app.globalData.openId) {
      console.info("初始化empty")
      this.setData({ modalFlag: false})
    } else {
      this.setData({ modalFlag: true })
      this.getUserChinasoftiInfo();
    }
    var flag = false;//判断是从哪个页面跳转过来
    var sign = 0//判断从修改页面中的保存还是删除按钮过来，保存为1，删除为2
    flag = this.data.flag;
    sign = this.data.sign;
    console.info("传递回来的sign"+sign);
    console.info("传递回来的flag" + flag);
    var nativeBackFlag = getApp().globalData.nativeBackFlag;
    var options = this.data.newOTInfo;
    var index = this.data.index;
    if (flag && nativeBackFlag) {
      li.push({
        "index": li.length,
        "bill_project": options.bill_project,
        "ot_date": options.ot_date,
        "ot_duration": options.ot_duration + "h",
        "ot_reason": options.ot_reason,
        "staffId":this.data.staffId,
        "name_chinese": this.data.name_chinese,
        "name_english": this.data.name_english
      })
      this.setData({
        list: li
      })
    };

    if (sign == '1') {
      console.log("我是从修改页面过来的" + index)
      li[index].bill_project = options.bill_project;
      li[index].ot_date = options.ot_date;
      li[index].ot_duration = options.ot_duration;
      li[index].ot_reason = options.ot_reason;
      this.setData({
        list: li
      })
    };
    if (sign == '2') {
      console.log("我是从删除页面过来的" + index)
      li.splice(index, 1);
      this.setData({
        list: li
      })
      console.info(li);
    }
    getApp().globalData.nativeBackFlag = false;
  },
  toModifyAddre: function (e) {
    wx.navigateTo({
      url: '../modifyAddre/modifyAddre?bill_project=' + e.currentTarget.dataset.bill_project + "&ot_date=" + e.currentTarget.dataset.ot_date + "&ot_duration=" + e.currentTarget.dataset.ot_duration + "&ot_reason=" + e.currentTarget.dataset.ot_reason + "&index=" + e.currentTarget.dataset.index
    })
  },
  modalOk: function () {
    wx.switchTab({
        url: '../../pages/index/index'
      })
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
    console.info(this.data.list)
    var self = this;
    if (this.data.list.length<1){
      wx.showModal({
        title: '提示',
        content: "至少填写一个加班信息"
      })
    }else{
      console.log("添加加班携带的数据", this.data.list);
      if (app.globalData.dummy) {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        })  
  
      }else{
      wx.request({
        url: app.globalData.serverPath + "/weapp/ot",
        data: Object.assign({}, { "ot_records":this.data.list}, { "openId": app.globalData.openId }),
        method:"POST",
        success: function (res) {
          var res = res;
          console.log("response", res);
          if (res.data.code == 0) {
          
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000
            }) 
            li = [];
            self.setData({
              list: []
            })  
            
          }else{
            wx.showModal({
              title: '提示',
              content: "提交失败"
            })
          }
        }
      })
    }
    }
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  addAddre: function (e) {
    console.info(e)
    wx.navigateTo({
      url: '../addOverTime/addOverTime'
    })
  },
  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },
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
      console.log("获取用户中软信息成功：<app.globalData.chinasoftiInfo>", app.globalData.chinasoftiInfo);
      if (app.globalData.chinasoftiInfo) {
            this.setData({
              name_chinese: app.globalData.chinasoftiInfo.name_chinese,
              name_english: app.globalData.chinasoftiInfo.name_english,
              staffId: app.globalData.chinasoftiInfo.staffId,
              rm_email: app.globalData.chinasoftiInfo.rm_email,
              hsbc_mgr_email: app.globalData.chinasoftiInfo.hsbc_mgr_email,
            })
          }
        }
  }
}) 