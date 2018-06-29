// pages/inputdata-ex/inputnevolunteer.js
var util = require('../../utils/util.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form:{
    }
  },
  userinfo: {
    nickName: "",
    avatarUrl: "",
    province: ""
  },
  nameValue:"",
  phoneValue:"",
  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var time = util.formatDate(new Date());
    console.log("time ", time)
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      curtime: time
    });
  },
  iptValueChange: function (e) {
    var that = this;
    var fieldName = e.currentTarget.dataset['name'];
    //console.log('dataset为 ', e.currentTarget.dataset)
    //console.log('组件值为 ', e.currentTarget.dataset['name'])

    that.setData({
      [fieldName]: e.detail.value
    })
    //console.log('value is ', e.detail.value)

  },
  mySubmit: function (e) {
    if (e.detail.userInfo) {
      let res
      console.log("e ", e.detail.userInfo)
      var that = this;
      that.setData({
        userinfo: {
          nickName: e.detail.userInfo.nickName,
          avatarUrl: e.detail.userInfo.avatarUrl,
          province: e.detail.userInfo.province
        }
      })
      var myApp = getApp();
      myApp.globalData.userInfo = that.data.userinfo;
      // console.log("global userinfo", myApp.globalData.userInfo)
      if (this.verify(e)) {
        this.apply();
      }
    } else {
      wx.showModal({
        title: '请允许授权',
        content: '只获取用户公开信息如昵称、头像等',
      })
    }

  },
  verify: function (e) {
    var isSuccess = false;

    var name = this.data.form.name;
    var phone = this.data.form.phone;

    if (name == null || name == undefined || name.length == 0) {
      wx.showToast({
        title: '姓名不能为空!',
        icon: 'loading',
        image: '../../images/customized/icon-error.png',
        duration: 1500
      })
      setTimeout(function () { wx.hideToast() }, 2000)
    } else if (phone == null || phone == undefined || phone.length == 0) {
      wx.showToast({
        title: '联系电话不能为空!',
        icon: 'loading',
        image: '../../images/customized/icon-error.png',
        duration: 1500
      })
      setTimeout(function () { wx.hideToast() }, 2000)
    } else {
      isSuccess = true;
    }

    return isSuccess;
  },
  apply: function (e) {
    var that = this;
    var params = Object.assign(that.data.form, that.data.userinfo);
    wx.request({
      url: 'https://wgcxinzhan.cn/signIn2',
      data: params,
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("code", res);
        if (res.data.code == 0) {
          wx.showToast({
            title: '签到成功',
            duration: 1500
          })
          setTimeout(function () { wx.hideToast() }, 2000)
          that.setData({
            form: {},
            nameValue: "",
            phoneValue: ""
          })
          console.log('xxx', that.data.form);
        } else {
          wx.showToast({
            title: res.data.message || '签到失败',
            icon: 'loading',
            image: '../../images/customized/icon-error.png',
            duration: 1500
          })

          setTimeout(function () { wx.hideToast() }, 2000)
          that.setData({
            form: {
            },
            nameValue: "",
            phoneValue: ""
          })
        }
      }
    })
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

  // formSubmit: function (e) {
  //   var that = this;
  //   var formData = e.detail.value;
  //   wx.request({
  //     url: 'https://wgcxinzhan.cn/genUser',
  //     data: formData,
  //     header: {
  //       'Content-Type': 'application/json'
  //     },
  //     success: function (res) {
  //       console.log(res.data)
  //       that.modalTap();
  //     }
  //   })
  // },
  // formReset: function () {
  //   console.log('form发生了reset事件');
  //   this.modalTap2();
  // },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})