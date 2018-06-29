//app.js
App({
  globalData: {
    userInfo: null,
    code: "",
    encryptedData: "",
    iv: ""
  },
  onLaunch: function () {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        this.globalData.userInfo = res.userInfo
        // console.log("app userinfo ",res.userInfo)
      }
    })
    // // 登录
    // wx.login({
    //   success: function (res) {
    //     var code = res.code;
    //     if (code) {
    //       console.log('获取用户登录凭证：' + code);
    //       wx.getUserInfo({
    //         withCredentials: true,
    //         success: function (res_user) {
    //           console.log("getuserinfo", res_user)
    //           //this.data.globaluserinfo = res_user.userInfo
    //           // that.setData({
    //           //   nickName: res_user.userInfo.nickName,
    //           //   avatarUrl: res_user.userInfo.avatarUrl,
    //           //   code: res.code,
    //           //   encryptedData: res_user.encryptedData,
    //           //   iv: res_user.iv
    //           // });
    //         },
    //         fail:function(){
    //           console.log("获取用户信息失败！")
    //         }
    //       })
    //     } else {
    //       console.log('获取用户登录态失败：' + res.errMsg);
    //     }
    //   }
    // });

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  }
})