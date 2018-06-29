// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     
      nickName:"",
      avatarUrl:"",
      code:"",
      encryptedData:"",
      iv:"",
      loginStatus:0
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  
  usernavigateTo:function(){
   
    wx.navigateTo({
      url:'../inputdata/inputdata',  //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后缀
      success:function() { console.log("success")},        //成功后的回调；
      fail:function() { console.log("error")},          //失败后的回调；
      complete:function() { }      //结束后的回调(成功，失败都会执行)
      })
  },
  myUserInfo:function(res){
    var that = this;
    var openId = (wx.getStorageSync('openId'))
    console.log("openid ", openId)
    if( openId )
    {
      console.log("11111")
      wx.getUserInfo({
        success:function(res){
          console.log("userinfo ",res)
          // that.setData({
          //   myuserinfo:{
          //     nickName: res.userInfo.nickName,
          //     avatarUrl:res.userInfo.avatarUrl
          //   }
          // })
        },
        fail:function(){
          console.log("获取失败！")
        },
        complete:function(){
          console.log("获取用户信息完成！")
        }
      })
    }
    else{
      
      // 登录
      wx.login({
        success: function (res) {
          var code = res.code;
          if (code) {
            console.log('获取用户登录凭证：' + code);
            wx.getUserInfo({
              withCredentials:true,
              success:function(res_user){
                console.log("getuserinfo",res_user)
                  that.setData({
                  nickName: res_user.userInfo.nickName,
                  avatarUrl: res_user.userInfo.avatarUrl,
                  code:res.code,
                  encryptedData:res_user.encryptedData,
                  iv:res_user.iv
                });
                // wx.request({
                //   //后台接口地址
                //   url: 'https://wgcxinzhan.cn/login',
                //   data: {
                //     code: res.code,
                //     encryptedData: res_user.encryptedData,
                //     iv: res_user.iv
                //   },
                //   method: 'GET',
                //   header: {
                //     'content-type': 'application/json'
                //   },
                //   success: function (res) {
                //     wx.setStorageSync('openId', res.data.openId);

                //   }
                // })

              },
              fail:function(){
                console.log("getuserinfo failed!")
              },
              complete:function(){
                console.log("getuserinfo complete!")
              }
            })
          } else {
            console.log('获取用户登录态失败：' + res.errMsg);
          }
        }
      });

      // wx.login({
      //   sucess: function (res) {
      //     console.log(2)
      //     console.log(res.code)
      //     if(res.code){
      //       wx.getUserInfo({
      //         withCredentials: true,
      //         success:function(res_user){
      //           console.log("reget userinfo",res_user)
      //           // that.setData({
      //           //   nickName: res_user.userInfo.nickName,
      //           //   avatarUrl: res_user.userInfo.avatarUrl,
      //           //   code:res.code,
      //           //   encryptedData:res_user.encryptedData,
      //           //   iv:res_user.iv
      //           // })
      //           // wx.request({
      //           //   //后台接口地址
      //           //   url: 'https://....com/wx/login',
      //           //   data: {
      //           //     code: res.code,
      //           //     encryptedData: res_user.encryptedData,
      //           //     iv: res_user.iv
      //           //   },
      //           //   method: 'GET',
      //           //   header: {
      //           //     'content-type': 'application/json'
      //           //   },
      //           //   success: function (res) {
      //           //     // this.globalData.userInfo = JSON.parse(res.data);
      //           //     that.setData({
      //           //       nickName: res.data.nickName,
      //           //       avatarUrl: res.data.avatarUrl,
      //           //     })
      //           //     wx.setStorageSync('openId', res.data.openId);

      //           //   }
      //           // })
      //           wx.setStorageSync('openId', "123456789");
      //         },//success
      //         fail:function(){
      //           console.log("log in fail")
      //           that.myUserReLogin();
      //         },//fail
      //         complete:function(){
      //           console.log("log compelete")
      //         }
      //       })
      //     }//end res.code
      //   }//end login success
      // })//end wx.login
      console.log("login end")
    }
  },
  bindgetPhoneNumber:function(e){
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) { }
      })
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '同意授权',
        success: function (res) { }
      })
    }  
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
})