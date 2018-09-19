// pages/getNewDetail.js
var config = require('../../config')
var pageObject = {

  /**
   * 页面的初始数据
   */
  data: {
    newPeopleDetail: [],
    strNewDetailInfo:[],
    shouxing_list_str:"",     // 寿星列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNewPersons();
    this.getshouxinglist();
  },

  /**
   * 获取新志愿者名单
   */
  getNewPersons: function () {
    var that = this;
    wx.request({
      url: 'https://wgcxinzhan.cn/getNesPerson',
      method: 'GET',
      data: "",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // var testData = {avatarUrl: null,birthDate: "",calendar: null, gender:"男", id:"117",md5Code:"c30f28322063e5f8d8bd63b3fb5de4e6", name:"郭立宁", nickName:null, phone:"18810996332", solar:"10-25"
        // };
        // res.data.push(testData);
        that.setData({
          newPeopleDetail: res.data
        })
        // console.log("getNesPerson ", res.data);

        var myStrNewDetail = "";
        var strlist = [];
        if (that.data.newPeopleDetail.length > 0) {
          for (var i = 0; i < that.data.newPeopleDetail.length; i++) {
            myStrNewDetail = "";
            myStrNewDetail += that.data.newPeopleDetail[i].name;
            myStrNewDetail += " ";
            myStrNewDetail += that.data.newPeopleDetail[i].phone;
            myStrNewDetail += " ";
            myStrNewDetail += that.data.newPeopleDetail[i].gender;
            myStrNewDetail += " ";
            myStrNewDetail += that.data.newPeopleDetail[i].solar;
            strlist.push(myStrNewDetail);
          }
          // console.log("strnew detail:", strlist)
          that.setData({
            strNewDetailInfo: strlist
          })
        }
        //console.log("newpeopleDetail ",that.data.newPeopleDetail)
      },
      fail: function () {
        that.setData({
          newPeopleDetail: []
        })
        that.setData({
          strNewDetailInfo: []
        })
      }
    })
  },

  /**
   * 复制新志愿者列表
   */
  CopyNewPeopleInfo() {
    var that = this;
    var copyVolInfo = '新志愿者列表：\n';
    for (var i = 0; i < that.data.strNewDetailInfo.length;i++) {
      copyVolInfo += that.data.strNewDetailInfo[i] + '\n';
    }
    wx.setClipboardData({
      data: copyVolInfo,
      success: function () {
        // console.log("clip success");
        wx.showToast({
          title: "新志愿者信息复制成功",
          icon: 'none',
          duration: 1500
        })
      }
    })
  },

  /**
   * 获取寿星列表
   */
  getshouxinglist: function () {
    var that = this;
    wx.request({
      url: config.service.shouxingUrl,
      success: function (res) {
        console.log(res);
        var arr = res.data;
        if (res.data.length == 0) {
          that.setData({
            shouxing_list_str: '今日无寿星'
          });
          return;
        }
        var str = "";
        for (var i in arr) {
          //console.log(i + "-----" + arr[i]);
          str = str + arr[i] + ", "
        }
        str = str.substr(0, str.length - 2);
        that.setData({
          shouxing_list_str: str
        });
      }
    })
  },

  /**
   * 复制寿星列表
   */
  CopyShouXingInfo: function () {
    var that = this;
    var strCopy = "";

    // strCopy = "新志愿者列表：\n"
    // for (var i = 0; i < that.data.strNewDetailInfo.length; i++) {
    //   strCopy += that.data.strNewDetailInfo[i];
    //   strCopy += '\n';
    // }
    strCopy += "今日寿星名单：\n"
    strCopy += that.data.shouxing_list_str;

    wx.setClipboardData({
      data: strCopy,
      success: function () {
        console.log("clip success");
        wx.showToast({
          title: "寿星名单复制成功",
          icon: 'none',
          duration: 1500
        })
        // wx.getClipboardData({
        //   success: function (res) {
        //     console.log(res.data)
        //   }
        // })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
}
Page(pageObject)
