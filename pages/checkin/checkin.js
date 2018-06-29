// pages/checkin/checkin.js
var util = require('../../utils/util.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
    checkboxItems: [
    ],
    userinfo: {
      nickName: "",
      avatarUrl: "",
      province: ""
    },
    curtime:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var time = util.formatDate(new Date());
    //console.log("time ",time)
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      curtime: time
    });   
  },

  checkboxChange: function (e) {
    
    var that = this;
    var Items = that.data.checkboxItems, values = e.detail.value;
    for (var i = 0, lenI = that.data.checkboxItems.length; i < lenI; ++i) {
      Items[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (Items[i].value == values[j]) {
          Items[i].checked = true;
          break;
        }
      }
    }
    //console.log('checkbox发生change事件，', Items);
    that.setData({
      checkboxItems: Items
    });
  },
  userCheckIn:function(){
    var checkUserList = [];
    
    var that = this;
    //console.log("items ", that.data.checkboxItems )
    for (var i = 0, lenI = that.data.checkboxItems.length; i < lenI; ++i) {
      var _obj = {};
      if (that.data.checkboxItems[i].checked == true){
        _obj.userID = that.data.checkboxItems[i].value;
        _obj.userName = that.data.checkboxItems[i].name;
        checkUserList.push(_obj);
      }
    }
    checkUserList.join(",");
    //url: 'http://172.16.1.69:8080/signIn1',
    console.log(JSON.stringify(checkUserList))
    wx.request({
      url: 'https://wgcxinzhan.cn/signIn1',
      data: { signInfos: JSON.stringify(checkUserList) },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
     
      success: function (res) {
        //console.log("code", res);
        if (res.data.code == 0) {
          wx.showToast({
            title: '批量签到成功',
            duration: 1500
          })
          setTimeout(function () { wx.hideToast() }, 2000)
          that.setData({
            form: {}
          })
          console.log('xxx', that.data.form);
          //that.nameReset()
        } else {
          wx.showToast({
            title: res.data.message || '批量签到失败',
            icon: 'loading',
            image: '../../images/customized/icon-error.png',
            duration: 1500
          })

          setTimeout(function () { wx.hideToast() }, 2000)
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

    var appInstance = getApp()
    //console.log("check in ", appInstance.globalData.userInfo)
    if (appInstance.globalData.userInfo == undefined || appInstance.globalData.userInfo == null) {
      wx.getUserInfo({
        success: function (res) {
          that.setData({
            userinfo: {
              nickName: res.userInfo.nickName,
              avatarUrl: res.userInfo.avatarUrl,
              province: res.userInfo.province
            }
          })
          console.log("mydata ", userinfo);
        },
        fail: function () {
          wx.showModal({
            title: '无法获取人员表',
            content: '新志愿者点击【新增】进行信息录入，点击【签到】进行签到；老志愿者点击【没有查到】，进行签到',
          })
        }
      })

    }
    else {
      var that = this;
      that.setData({
        userinfo: {
          nickName: appInstance.globalData.userInfo.nickName,
          avatarUrl: appInstance.globalData.userInfo.avatarUrl,
          province: appInstance.globalData.userInfo.province
        }
      })
    }
    var that = this;
    var params = that.data.userinfo;
    wx.request({
      url: 'https://wgcxinzhan.cn/getUserList',
      method: "POST",
      data: params,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log("getuserlist ", res.data);
        var list = [];
        for (var i = 0; i < res.data.length; i++) {
          var _obj = {};
          _obj.name = res.data[i].name;
          _obj.value = res.data[i].id;
          _obj.checked = false;
          list.push(_obj);
        }
        if (list.length == 0 || list[0].name == null || list[0].value == null) {
          wx.showModal({
            title: '无法获取人员表',
            content: '新志愿者点击【新增】进行信息录入，然后点击【签到】进行签到；老志愿者点击【没有查到】，进行签到',
          })
          // wx.navigateTo({
          //   url: '../inputdata-ex/inputnevolunteer'
          // })
        }
        else {
          that.setData({
            checkboxItems: list
          })
        }

      }
    })
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