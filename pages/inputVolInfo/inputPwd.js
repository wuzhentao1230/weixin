var pageObject = {
    data: {
        pwdValue: '',
        xxxPwd: '',
        pageSelected:0,
        SubPages: [
          { name: "奉粥日志", value: 0, suburl:"./inputDetail/inputDetail" },
          { name: "志愿者列表", value: 1,suburl:"../getNewDetail/getNewDetail" }
        ],
    },
    inputPwd: function (e) {
        this.data.pwdValue = e.detail.value;
        // console.log(this.data.pwdValue);
    },

    verfityPwd: function () {
        const self = this;
        
        if (this.data.pwdValue != "") {
          //url: ''
          wx.request({
            url: 'https://wgcxinzhan.cn/verifyPwd',
            data: {
              xxxpwd: self.data.pwdValue
            },
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function (res) {
              // console.log("code", res);
              if (res.data.code == 0) {
                console.log("登陆成功");
                var subPage = self.data.SubPages[self.data.pageSelected];
                wx.navigateTo({
                  url: subPage.suburl,
                  success: function () {
                    console.log('密码正确，跳转成功');
                  },
                  error: function () {
                    wx.showToast({
                      title: '发生未知错误',
                      icon: 'loading',
                      image: '../../images/customized/icon-error.png',
                      duration: 1500
                    })
                    setTimeout(function () { wx.hideToast() }, 2000)
                  }
                })
              } else {
                wx.showToast({
                  title: res.data.message || '密码验证失败',
                  icon: 'loading',
                  image: '../../images/customized/icon-error.png',
                  duration: 1500
                })
                setTimeout(function () { wx.hideToast() }, 2000)
              }
            },
            fail: function (res) {
              wx.showToast({
                title: res.statusCode || '服务器异常',
                icon: 'loading',
                image: '../../images/customized/icon-error.png',
                duration: 1500
              })
              setTimeout(function () { wx.hideToast() }, 2000)
            }
          })
        } else {
            wx.showToast({
                title: '请输入访问密码',
                icon: 'loading',
                image: '../../images/customized/icon-error.png',
                duration: 1500
            })
        }
    },
    iptPageChange: function (e) {
      //var key = 'form.gender'
      console.log("iptPageChange",e.detail.value);
      this.setData({
        pageSelected: e.detail.value
      })
    },
}

Page(pageObject)