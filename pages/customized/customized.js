//logs.js
const util = require('../../utils/util.js')
var birthDayObj = require("./birthday.js")
Page({
  data: {

    form: {
      calendar: 0,
      gender: 0, 
    },
    userinfo:{
      nickName:"",
      avatarUrl:"",
      province:""
    },
    nameValue:"",
    phoneValue:"",
    monthValue:"",
    index:[0,0],
    genderSelected: 0,
    calendarSelected: 0,
    genders: [
      { name: "男　", value: 0 },
      { name: "女", value: 1 }
    ],
    calendars: [
      { name: "阳历", value: 0 },
      { name: "阴历", value: 1 }
    ]
  },
  onLoad: function () {
   
   var defaultMonth = '4';
      var days = birthDayObj.getDaysById(defaultMonth);
      this.setData({
        month: [birthDayObj.monthsList, days]
      })
  },
  birthDayPickerBindChange: function (e) {
    var that = this;
    var fieldName = e.currentTarget.dataset['name'];
    //console.log('fieldName 携带值为', fieldName,e.detail.value[0])
    var tempValue;
    var monthNum = e.detail.value[0] + 1;
    var dayNum = e.detail.value[1] + 1;
    tempValue =  monthNum + '@' + dayNum 
    var monthstring = monthNum +"月"+dayNum+"日"
    that.setData({
      [fieldName]: tempValue,
      monthValue: monthstring,
      index: e.detail.value
    })
  },
  iptCalendarChange: function (e) {
    var key = 'form.calendar'
    this.setData({
      [key]: e.detail.value,
      calendarSelected: e.detail.value
    })
  },
  iptGenderChange: function (e) {
    var key = 'form.gender'
    this.setData({
      [key]: e.detail.value,
      genderSelected: e.detail.value
    })
  },
  birthDayPickerColumnBindChange:function(e)
  {
    //console.log("birthdayPickercolumn ",e.detail.column)
    if (e.detail.column == 0) {
      //console.log('月份发生变化，携带值为', e.detail.value)
      var days = birthDayObj.getDaysById(e.detail.value);
      //console.log('选择的月份长度 ', days.length);
      this.setData({
        month: [birthDayObj.monthsList, days]
      })
    }
  },
  iptValueChange: function (e) {
    var that = this;
    var fieldName = e.currentTarget.dataset['name'];
    //console.log('dataset为 ', e.currentTarget.dataset)
    //console.log('组件值为 ', e.currentTarget.dataset['name'])
    
    that.setData({
      [fieldName]: e.detail.value
    })
    //console.log('value is ',e.detail.value)
    
  },
 
  mySubmit: function(e) {
    var myApp = getApp();
    var that = this;
    if (e.detail.userInfo || myApp.globalData.userInfo ) {
      let res
      if (myApp.globalData.userInfo){
        that.setData({
          userinfo: {
            nickName: myApp.globalData.userInfo.nickName,
            avatarUrl: myApp.globalData.userInfo.avatarUrl,
            province: myApp.globalData.userInfo.province
          }
        })
      }else{
        //console.log("e ", e.detail.userInfo)
        that.setData({
          userinfo: {
            nickName: e.detail.userInfo.nickName,
            avatarUrl: e.detail.userInfo.avatarUrl,
            province: e.detail.userInfo.province
          }
        })
        myApp.globalData.userInfo = that.data.userinfo;
      }

      if (this.verify(e)) {
        if (this.verifyphone())
        {
          this.apply();
        }
        else
        {
          wx.showToast({
            title: '手机号有误2',
            icon: 'success',
            duration: 2000
          })
        }
      }
    }else{
      wx.showModal({
        title: '请允许授权',
        content: '只获取用户公开信息如昵称、头像等',
      })
    }
      
  },
  verify: function(e) {
    var isSuccess = false;

    var name = this.data.form.name;
    var phone = this.data.form.phone;
    var gender = this.data.form.gender;
    var birthDate = this.data.form.birthDate;
    
    if (name == null || name == undefined || name.length == 0) {
      wx.showToast({
        title: '姓名不能为空!',
        icon: 'loading',
        image: '../../images/customized/icon-error.png',
        duration: 1500
      })
      setTimeout(function () { wx.hideToast() }, 2000)
    }else if (phone == null || phone == undefined || phone.length == 0) {
      wx.showToast({
        title: '联系电话不能为空!',
        icon: 'loading',
        image: '../../images/customized/icon-error.png',
        duration: 1500
      })
      setTimeout(function () { wx.hideToast() }, 2000)
    } 
    else if(birthDate == null ||birthDate == undefined || birthDate.length == 0){
      wx.showToast({
        title: '生日不能为空!',
        icon: 'loading',
        image: '../../images/customized/icon-error.png',
        duration: 1500
      })
      setTimeout(function () { wx.hideToast() }, 2000)
    }
    else {
      isSuccess = true;
    }
    

    return isSuccess; 
  },
  verifyphone:function(){
    var that = this;
    var isSuccess = false;
    var phone = that.data.form.phone;
    if ((/^1[356789]\d{9}$/.test(phone))) {
        isSuccess = true;
      if (phone.length > 11) {
        wx.showToast({
          title: '手机号有误',
          icon: 'success',
          duration: 2000
        })
        isSuccess = false;
      }
    } else {
      isSuccess = false;
    }
    return isSuccess;
  },
  apply: function(e) {
    var that = this;
    var params = Object.assign(that.data.form, that.data.userinfo);
    //console.log("that data info ",that.data.userinfo)
    //console.log("apply params",params)
    //url: '',
    wx.request({
      url: 'https://wgcxinzhan.cn/genUser',
      data: params, 
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //console.log("code", res);
        if (res.data.code == 0) {
          wx.showToast({
            title: '信息添加成功',
            duration: 1500
          })
          setTimeout(function () { wx.hideToast() }, 2000)
          that.setData({
            form: {}
          })
          //console.log('xxx', that.data.form);
          //that.nameReset()
        } else {
          // wx.showToast({
          //   title: res.data.message || '信息添加失败',
          //   icon: 'loading',
          //   image: '../../images/customized/icon-error.png',
          //   duration: 1500
          // })
          
          // setTimeout(function () { wx.hideToast() }, 2000)
          wx.showModal({
            title: '新志愿者签到失败',
            content: res.data.message,
          })
        }
        that.setData({
          form: {
            calendar: 0,
            gender: 0
          },
          genderSelected: 0,
          calendarSelected: 0,
          nameValue:"",
          phoneValue:"",
          monthValue:"",
        })
      }
    })
  }
})
