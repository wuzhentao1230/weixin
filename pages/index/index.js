// pages/index/index.js

var config = require('../../config')
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

    nickName: "",
    avatarUrl: "",
    code: "",
    encryptedData: "",
    iv: "",
    loginStatus: 0,
    // -------我是数据分割线-----
    xinzhan_des: "全国100多家，北京50多家。欢迎大家多多来奉粥，传递一份爱，温暖一个城",
    shouxing_list_str: null,
    curtime:""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var time = util.formatDate(new Date());
    this.setData({
      curtime: time
    });   
    wx.request({

      url: config.service.shouxingUrl,
      success: function(res) {
        console.log(res);
        var arr = res.data;
        var str="";
        for (var i in arr) {
          console.log(i + "-----" + arr[i]);
          str = str + arr[i] + ",  "
        }
        that.setData({
          shouxing_list_str: str
        });
      
      }

    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})