var pageObject = {
    data: {
      form: {
      },
      pwdValue: '',
      xxxPwd: '',
      showOne: true,
      showTwo: false,
      showThree: false,
      numPeople: 0,
      newPeople: "0人",
      strList:"",
      strPorridge:"",
      checkList: [],
      detailLog:[],
      DayInfo:{
        dailyLeader:"",
        cooker:"",
        checker:"",
        forwarder:"",
        totalcups:"",
        numPeople:"",
        newPeople:"",
        photographer:"",
        dailylog:"",
        propaganda:"",
        summingup:"",
        logistics:"",
        cleaner:"",
        environment:"",
        signnamelist:""

      }
    },
    getDailyVolunteerList:function(){
      var that = this;
      //获取当日志愿者名单列表
      //url: 'https://wgcxinzhan.cn/getDailyList',

      wx.request({
        url: 'https://wgcxinzhan.cn/getDailyList',
        method: "GET",
        data: "",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log("getDailyList ", res);
          if (res.statusCode == 200) {
            var strlist = "";
            if(res.data.length > 0)
            {
              strlist = res.data[0];
              for (var i = 1; i < res.data.length; i++) {
                strlist += (" " + res.data[i] );
              }
            }
            that.setData({
              strList:strlist,
              checkList:res.data
            })
          } else {
            that.setData({
              strList:"",
              checkList:[]
            })
          }
        },
        fail: function () {
          that.setData({
            strList:"",
            checkList:[]
          })
        }
      })



    },
    onLoad: function () {
      this.getDailyVolunteerList();
      var that = this;
       
        //获取统计信息
        //url: 'https://wgcxinzhan.cn/getstat',
        wx.request({
          url: 'https://wgcxinzhan.cn/getstat',
          method: "GET",
          data: "",
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log("getstat ", res);
            if (res.statusCode == 200) {
              var newperson = res.data.todayNum + "人";
              if(res.data.todayPerson.length > 0)
              {
                 newperson +=" ("+res.data.todayPerson[0];
                for (var i = 1; i < res.data.todayPerson.length; i++) {
                  newperson += " ";
                  newperson += res.data.todayPerson[i];
                }
                newperson += "）"
              }
              that.setData({
                numPeople: res.data.totalCount,
                newPeople: newperson
              }) 
            } else {
              that.setData({
                numPeople: 0,
                newPeople: "0人"
              })
            }
          },
          fail: function () {
            that.setData({
              numPeople: 0,
              newPeople: "0人"
            })
          }
        })

        this.myGetDayInfo();
    },
    inputPwd: function(e) {
        this.data.pwdValue = e.detail.value;
    },
    verfityPwd: function() {
        const self = this;
        if (this.data.pwdValue != "" ) {
          //url: ''
          wx.request({
            url: 'https://wgcxinzhan.cn/verifyPwd',
            data: {xxxpwd:self.data.pwdValue},
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function (res) {
              //console.log("code", res);
              if (res.data.code == 0) {
                console.log("登陆成功");
                self.setData({
                  showOne: false,
                  showTwo: true,
                  showThree: false
                })
              } else {
                wx.showToast({
                  title: res.data.message ||'密码验证失败',
                  icon: 'loading',
                  image: '../../images/customized/icon-error.png',
                  duration: 1500
                })
                setTimeout(function () { wx.hideToast() }, 2000)
              }
            },
            fail:function(res){
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
                duration: 2500
            })
        }
    },
    iptValueChange: function (e) {
      var that = this;
      var fieldName = e.currentTarget.dataset['name'];
      
      that.setData({
        [fieldName]: e.detail.value
      })
    },
    makeDetailLog:function(){
      var that = this;
        var strlist = [];
        var date = new Date();
        var mydate = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日";
        var item = "仁爱魏公村心栈"+mydate+"奉粥日志";
        strlist.push(item);
        var weekday = new Array(7);
        weekday[0] = "周日"
        weekday[1] = "周一"
        weekday[2] = "周二"
        weekday[3] = "周三"
        weekday[4] = "周四"
        weekday[5] = "周五"
        weekday[6] = "周六"

        item = "奉粥日期: "+ mydate + "(" + weekday[date.getDay()]+")"
        strlist.push(item);

        if(that.data.form.dailyLeader != undefined 
        && that.data.form.dailyLeader != null 
        && that.data.form.dailyLeader.length != 0)
        {
          item = "日负责人: " + that.data.form.dailyLeader;
          strlist.push(item);
        }
        if (that.data.form.cooker != undefined
          && that.data.form.cooker != null
          && that.data.form.cooker.length != 0)
        {
          item = "熬粥: " + that.data.form.cooker;
          strlist.push(item);
        }
        if (that.data.form.checker != undefined
          && that.data.form.checker != null
          && that.data.form.checker.length != 0)
        {
          item = "签到引领: " + that.data.form.checker;
          strlist.push(item);
        }
        if (that.data.form.forwarder != undefined
          && that.data.form.forwarder != null
          && that.data.form.forwarder.length != 0) 
        {
          item = "前行: " + that.data.form.forwarder;
          strlist.push(item);
        }
        if (that.data.form.totalcups != undefined
          && that.data.form.totalcups != null
          && that.data.form.totalcups.length != 0) 
        {
          item = "总杯数: " + that.data.form.totalcups;
          strlist.push(item);
        }
        item = "总人数: " + that.data.numPeople;
        strlist.push(item);

        item = "新人数: " + that.data.newPeople;
        strlist.push(item);

        if (that.data.form.photographer != undefined
          && that.data.form.photographer != null
          && that.data.form.photographer.length != 0) 
        {
          item = "摄影: " + that.data.form.photographer;
          strlist.push(item);
        }
        if (that.data.form.dailylog != undefined
          && that.data.form.dailylog != null
          && that.data.form.dailylog.length != 0) 
        {
          item = "日志: " + that.data.form.dailylog;
          strlist.push(item);
        }
        if (that.data.form.propaganda != undefined
          && that.data.form.propaganda != null
          && that.data.form.propaganda.length != 0) 
        {
          item = "文宣: " + that.data.form.propaganda;
          strlist.push(item);
        }
        if (that.data.form.summingup != undefined
          && that.data.form.summingup != null
          && that.data.form.summingup.length != 0) 
        {
          item = "结行: " + that.data.form.summingup;
          strlist.push(item);
        }
        if (that.data.form.logistics != undefined
          && that.data.form.logistics != null
          && that.data.form.logistics.length != 0) 
        {
          item = "后勤: " + that.data.form.logistics;
          strlist.push(item);
        }
        if (that.data.form.cleaner != undefined
          && that.data.form.cleaner != null
          && that.data.form.cleaner.length != 0) 
        {
          item = "粥车粥桶: " + that.data.form.cleaner;
          strlist.push(item);
        }
        if (that.data.form.environment != undefined
          && that.data.form.environment != null
          && that.data.form.environment.length > 0
          && that.data.form.environment != "无"
          && that.data.checkList.length > 0) 
        {
        item = "环保: " + that.data.form.environment;
        strlist.push(item);
        var tmpAry = [];
          tmpAry = that.data.form.environment.split('、');
          var tmpcookee = [];

          for (var i = 0; i < tmpAry.length; i++) {
            for (var j = 0; j < that.data.checkList.length; j++) {
              if (that.data.checkList[j] == tmpAry[i]) {
                that.data.checkList.splice(j,1)
                break;
              }
            }
          }
          
          if(that.data.checkList.length != 0)
          {
            item = "奉粥: " + that.data.checkList[0];
            for(var i = 1;i < that.data.checkList.length;i++)
            {
              item += " "+ that.data.checkList[i];
            }
            strlist.push(item);
            that.setData({
              strPorridge:item
            });
          }
        }
        else{
          item = "环保: 无";
          strlist.push(item);
          item = "奉粥: " + that.data.strList;
          strlist.push(item);
          that.setData({
            strPorridge: item
          });
        } 
        
        that.setData({
          detailLog:strlist
        })
    },
    submitInfo: function (e) {
      var that = this;
        if (this.verify(e)) {
        this.makeDetailLog();
        this.apply();
        
        that.setData({
          showOne: false,
          showTwo:false,
          showThree:true
        })
      } else {
        wx.showModal({
          title: '输入项有误',
          content: '输入项有误，请确认'
        })
      }

    },
    verify: function (e) {
      var isSuccess = false;

      var dailyLeader = this.data.form.dailyLeader;
      var cooker = this.data.form.cooker;
      if (dailyLeader == null || dailyLeader == undefined || dailyLeader.length == 0) {
        wx.showToast({
          title: '日负责人不能为空!',
          icon: 'loading',
          image: '../../images/customized/icon-error.png',
          duration: 1500
        })
        setTimeout(function () { wx.hideToast() }, 2000)
      } else if (cooker == null || cooker == undefined || cooker.length == 0) {
        wx.showToast({
          title: '煮粥侠不能为空!',
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
    apply: function (e) {
      var that = this;
      //var params = Object.assign(that.data.form, that.data.userinfo);
      //console.log("that data info ",that.data.userinfo)
      //console.log("apply params",params)
      //url: 'https://wgcxinzhan.cn/dailyLog',
      var info = { "signnamelist":that.data.strPorridge,"newpersonslist":that.data.newPeople}
      var params = Object.assign(that.data.form, info);
      wx.request({
        url: 'https://wgcxinzhan.cn/dailyLog',
        data: params,
        method: "POST",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          //console.log("code", res);
          if (res.data.code == 0) {
          that.setData({
            showOne:false,
            showTwo:false,
            showThree:true
          })
          that.setData({
            form: {}
          })
            //console.log('xxx', that.data.form);
            //that.nameReset()
          } else {
            wx.showToast({
              title: res.data.message || '提交日志失败',
              icon: 'loading',
              image: '../../images/customized/icon-error.png',
              duration: 1500
            })

            setTimeout(function () { wx.hideToast() }, 2000)
          }
        }
      })
    },
    CopyInfo:function(){
      var that = this;
      var strCopy = "";
      for(var i = 0; i < that.data.detailLog.length;i++)
      {
        strCopy += that.data.detailLog[i];
        strCopy += '\n';
      }
      wx.setClipboardData({
        data: strCopy,
        success:function(){
          console.log("clip success");
          wx.showToast({
            title: "信息复制成功" ,
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
    myGetDayInfo:function(){
    var that = this;
      wx.request({
        url: 'https://wgcxinzhan.cn/getDayInfo',
        method: "POST",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          //console.log("getDayInfo ", res.data);
          that.setData({
              DayInfo:res.data
            });
          that.setData({
            form: res.data
          })
          //console.log("dayInfo ", that.data.DayInfo);
        }
      })
    }
}

Page(pageObject)