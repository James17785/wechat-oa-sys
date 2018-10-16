var flag=false;
Page({
  data:{
    bill_project: "请填写您的项目",
    dates: "1900-01-01",
    ot_duration: "0.0h(请输入准确到小时数)",
    ot_reason: "请填写加班原因",
    areaIndex: 0,
    area: ['h'],
    index:"0",
    flag:false
  },
   onLoad: function(options) {
    this.setData({
      bill_project: options.bill_project,
      dates: options.ot_date,
      ot_duration: options.ot_duration,
      ot_reason: options.ot_reason,
      index:options.index
    })
    console.log("传过来的index"+options.index);
   },
   bindPickerChange: function (e) {
     this.setData({
       areaIndex: e.detail.value
     })
   }, 
   //  点击日期组件确定事件  
   bindDateChange: function (e) {
     console.log(e.detail.value)
     this.setData({
       dates: e.detail.value
     })
   },
   onUnload: function (e) {
     if (this.data.flag) {
       getApp().globalData.nativeBackFlag = true;
     } else {
       getApp().globalData.nativeBackFlag = false;
     }
   },
    areaPickerBindchange:function(e){
    this.setData({
      areaValue:e.detail.value
    })
  },
    addrePickerBindchange:function(e){
    this.setData({
      addreValue:e.detail.value
    })
  },
  //点击删除
    delete:function(){
      var that = this;
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];
      var prevPage = pages[pages.length - 2];
      this.setData({ flag: true });
      wx.showModal({
       title: '提示',
       content: '确认删除该加班信息吗？',
       success: function(res) {
         console.info("传递回去的参数是" + that.data.index);
         if (res.confirm) {
           console.log('用户点击确定')
           wx.navigateBack({
              url: '../overTime/overTime'
             }); 
          prevPage.setData({
            index: that.data.index,
            sign:2,
            flag:false
          })

         } else if (res.cancel) {
           console.log('用户点击取消')
      }
    }
})

    },
//点击取消，返回上个页面
    cancel:function(){
      wx.navigateBack({
         delta: 1
      })
    },
    //点击保存
  formSubmit: function(e) {
    var warn ="";
    var that = this;
    if (e.detail.value.bill_project == "") {
      warn = "请填写您的项目！";
    } else if (e.detail.value.ot_duration == "") {
      warn = "请输入您的具体加班时间";
    } else if (e.detail.value.ot_reason == '') {
      warn = "请输入您的加班原因";
    } else {
      this.setData({ flag: true });
      flag = true;
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];
      var prevPage = pages[pages.length - 2];
      console.info("传递回去的index是" + that.data.index);
      prevPage.setData({
        newOTInfo: {
          bill_project: e.detail.value.bill_project,
          ot_date: e.detail.value.ot_date,
          ot_duration: e.detail.value.ot_duration,
          ot_reason: e.detail.value.ot_reason
        },
        index: that.data.index,
        flag: false,
        sign: 1
      })
      wx.navigateBack({
        url: '../overTime/overTime'
      });
    }
    if(flag==false){
      wx.showModal({
      title: '提示',
      content:warn
    })
    }
    
  },
  
  })