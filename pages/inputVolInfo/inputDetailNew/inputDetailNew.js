var util = require('../../../utils/util.js'); 
var pageObject = {
  data: {
    showInput: true,
    showCopy: false,

    volListArr: [],             // 获取当日志愿者名单列表请求response
    newPeopleList: '',
    notice: '奉粥日志模块 2.0 上线！使用期间如有任何问题请联系汤志鹏（18801313828）。',
    
    dayInfo: {
      dailyLeader: [],        // 日负责人 
      cooker: [],             // 煮粥侠
      checker: [],            // 签到
      forwarder: [],          // 前行
      totalcups: 0,           // 总杯数
      numPeople: 0,           // 总人数
      newPeople: [],          // 新人数
      photographer: [],       // 摄影
      dailylog: [],           // 日志
      propaganda: [],         // 文宣
      summingup: [],          // 结行
      logistics: [],          // 后勤
      cleaner: [],            // 粥车粥桶
      environment: [],        // 环保
      signnamelist: [],       // 奉粥
    },
    dayInfoStr: {
      dailyLeader: '',        // 日负责人 
      cooker: '',             // 煮粥侠
      checker: '',            // 签到
      forwarder: '',          // 前行
      totalcups: 0,           // 总杯数
      numPeople: 0,           // 总人数
      newPeople: '',          // 新人
      photographer: '',       // 摄影
      dailylog: '',           // 日志
      propaganda: '',         // 文宣
      summingup: '',          // 结行
      logistics: '',          // 后勤
      cleaner: '',            // 粥车粥桶
      environment: '',        // 环保
      signnamelist: '',       // 当日签到
    },
    jobInfo: {                // 职位对照表,用于判断,以下的key不能为null
      dailyLeader: '日负责人',
      cooker: "煮粥侠",
      checker: "签到引领",
      forwarder: "前行",
      totalcups: "总杯数",
      photographer: "摄影",
      dailylog: "日志",
      propaganda: "文宣",
      summingup: "结行",
      logistics: "后勤",
      cleaner: "粥车粥桶",
      signnamelist: "志愿者",
    },
    detailLog: [],              // 提交的奉粥日志文本，用于复制
  },

  onLoad: function() {
    // this.getDailyVolunteerList();     // 获取志愿者列表
    this.myGetDayInfo();
  },

  /** 
   * 获取当天志愿者信息
   * 如果还没有填写当天信息，则接口返回为空
   * url: 'https://wgcxinzhan.cn/getDayInfo'
   */
  myGetDayInfo: function() {
    var that = this;
    wx.request({
      url: 'https://wgcxinzhan.cn/getDayInfo',
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("2、当天志愿者名单：", res.data);
        if(res.data == "") {                // res.data 为空，说明还未填写志愿者信息 
          that.getDailyVolunteerList();
          that.getTotalPeople();
          return;
        }
        // 接口有数据，则说明已经填写志愿者信息,需要对信息进行处理
        var transData = res.data;
        // 计算总签到人数
        var volList = transData.signnamelist + ' ' + (transData.environment == '无' ? '' : transData.environment)
        volList = volList.replace(/(^\s*)|(\s*$)/g, "").replace(/\s+/g, ' ');
        that.setData({
          volListArr: volList.split(' ')
        })
        var notStrToArr = ['day', 'newpersonslist', 'totalcheckin', 'totalcups'];
        for(var item in transData) {
          var key = 'dayInfo.' + item;
          if(item == 'newpersonslist') {
            key = 'dayInfo.newPeople';
          }
          var value;
          if(notStrToArr.indexOf(item) < 0) {
            value = transData[item].split(' ');
          } else if(item == 'newpersonslist') {
            var newVol = transData[item];          // 格式化新人数（待优化）
            newVol = transData[item] == '0人' ? '' : newVol.slice(newVol.indexOf('(')+1,newVol.indexOf(')'));
            value = newVol.split(' ');
          } else if(item == 'totalcups'){
            value = transData[item];
          }
          if(item != 'day' && item != 'totalcheckin') {
            that.setData({
              [key]: value
            })
          }
        }
      }
    })
  },

  /**
   * 获取当日志愿者名单列表
   * url: 'https://wgcxinzhan.cn/getDailyList'
   */
  getDailyVolunteerList: function () {
    var that = this;

    wx.request({
      url: 'https://wgcxinzhan.cn/getDailyList',
      method: "GET",
      data: "",
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // res.data = ["周新", "高志胜", "高秀竹", "杨雨晴", "刘春霞", "杨海英", "高凤兰", "康倩倩", "李京云", "丁赛", "张婷", "姚毓华","周新", "高志胜", "高秀竹", "杨雨晴", "刘春霞", "杨海英", "高凤兰", "康倩倩", "李京云", "丁赛", "张婷", "姚毓华","周新", "高志胜", "高秀竹", "杨雨晴", "刘春霞", "杨海英", "高凤兰", "康倩倩", "李京云", "丁赛", "张婷", "姚毓华"];
        console.log("未填写报表，当天签到志愿者列表 ", res);
        that.setData({
          volListArr: res.data,
          ['dayInfo.signnamelist']: res.data
        })
      },
      fail: function () {
        that.setData({
          volListArr: []
        })
      }
    })
  },

  /**
   * 获取新志愿者list
   * url: 'https://wgcxinzhan.cn/getstat'
   */
  getTotalPeople: function() {
    var that = this;
     
    wx.request({
      url: 'https://wgcxinzhan.cn/getstat',
      method: "GET",
      data: "",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("未填写报表，当天新人数 ", res.data.todayPerson);
        that.setData({
          ['dayInfo.newPeople']: res.data.todayPerson
        })
      },
      fail: function () {
        that.setData({
          ['dayInfo.newPeople']: []
        })
      }
    })
  },

  /**
   * 新增志愿者
   */
  addVolEvent(e) {
    var value = this.data.volListArr;
    value.push(e.detail);
    var haveSign = this.data.dayInfo.signnamelist;
    if(haveSign.indexOf(e.detail) < 0) {
      haveSign.push(e.detail);
    }
    this.setData({
      volListArr: value,
      ['dayInfo.signnamelist']: haveSign
    })
  },

  /**
   * 志愿者更改事件
   */
  selectEvent(e) {
    var key = e.currentTarget.dataset.name;
    this.setData({
      [key]: e.detail
    })
    // console.log(this.data.dayInfo);
  },

  /**
   * 环保和奉粥互斥
   */
  selectEnvSignEvent(e) {
    var changeName = e.currentTarget.dataset.name;
    var huchiName = changeName == 'dayInfo.environment' ? 'dayInfo.signnamelist' : 'dayInfo.environment';
    var huchiValue = util.arraySub(this.data.volListArr, e.detail);
    this.setData({
      [changeName]: e.detail,
      [huchiName]: huchiValue
    })
  },

  /**
   * 提交事件
   */
  submitInfo(e) {
    var that = this;
    if (this.verify(e)) {       // 检测成功
      this.geneDayInfoStr();
      this.makeDetailLog();     // 生成日志文本
      this.apply();
    }
  },

  /**
   * 生成 dayInfo 的 String 格式
   */
  geneDayInfoStr() {
    var that = this;
    // 又要数据处理
    for(var item in this.data.dayInfo) {
      var key = 'dayInfoStr.' + item;
      var valueTmp = this.data.dayInfo[item];
      var value;
      if(valueTmp instanceof Array) {
        value = valueTmp.length == 0 ? '' : valueTmp.join(' ');
      } else if(item == 'numPeople'){
        key = 'dayInfoStr.numPeople';
        value = that.data.volListArr.length;
      } else {
        value = valueTmp;
      }
      that.setData({
        [key]: value
      })
    }
  },

  /**
   * 验证输入框
   */
  verify(e) {
    var that = this;
    var isSuccess = true;
    var errorTitle;
    for (var key in this.data.jobInfo) {
      if (this.data.dayInfo[key] == undefined || this.data.dayInfo[key] == null || this.data.dayInfo[key] == '') {
        var nullJobName = that.data.jobInfo[key];
        wx.showToast({
            title: '请选择 ' + nullJobName + ' ^_^ !',
            icon: 'none',
            duration: 1500
        })
        setTimeout(function () { wx.hideToast() }, 2000);
        isSuccess = false;
        return false;
      }
    }
    return true;
  },

  /**
   * 生成日志文本
   */
  makeDetailLog() {
    var that = this;
    var strlist = [];
    var date = new Date();
    var mydate = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日";
    var item = "仁爱魏公村心栈" + mydate + "奉粥日志";
    strlist.push(item);
    var weekday = new Array(7);
    weekday = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

    item = "奉粥日期: " + mydate + "(" + weekday[date.getDay()] + ")"
    strlist.push(item);
    strlist.push("日负责人: " + that.data.dayInfoStr.dailyLeader);
    strlist.push("熬粥: " + that.data.dayInfoStr.cooker);
    strlist.push("签到引领: " + that.data.dayInfoStr.checker);
    strlist.push("前行: " + that.data.dayInfoStr.forwarder);
    strlist.push("总杯数: " + that.data.dayInfoStr.totalcups);
    strlist.push("总人数: " + that.data.dayInfoStr.numPeople);
    // 处理新人数
    var newPeoLen = that.data.dayInfoStr.newPeople == "" ? 0 : that.data.dayInfo.newPeople.length;
    var newPeople = newPeoLen + '人' + (newPeoLen == 0 ? '' : '(' + that.data.dayInfoStr.newPeople + ')');
    this.setData({
      newPeopleList: newPeople
    })
    strlist.push("新人数: " + newPeople);
    strlist.push("摄影: " + that.data.dayInfoStr.photographer);
    strlist.push("日志: " + that.data.dayInfoStr.dailylog);
    strlist.push("文宣: " + that.data.dayInfoStr.propaganda);
    strlist.push("结行: " + that.data.dayInfoStr.summingup);
    strlist.push("后勤: " + that.data.dayInfoStr.logistics);
    strlist.push("粥车粥桶: " + that.data.dayInfoStr.cleaner);
    // 处理环保
    if (that.data.dayInfoStr.environment != '') {
      item = "环保: " + that.data.dayInfoStr.environment;
      strlist.push(item);
    } else {
      item = "环保: 无";
      strlist.push(item);
    }
    strlist.push("奉粥:" + that.data.dayInfoStr.signnamelist);
    that.setData({
      detailLog: strlist
    })
    console.log('生成日志', this.data.detailLog)
  },

  /**
   * 提交日志
   */
  apply() {
    var that = this;
    
    // var info = { "signnamelist": that.data.dayInfoStr, "newpersonslist": that.data.newPeople }
    var info = {"newpersonslist": that.data.newPeopleList }

    var params = Object.assign(that.data.dayInfoStr, info);
    console.log('提交', params);
    wx.request({
      url: 'https://wgcxinzhan.cn/dailyLog',
      data: params,
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            showInput: false,
            showCopy: true,
          })
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

  /**
   * 一键复制
   */
  CopyInfo() {
    var that = this;
    var strCopy = "";
    for(var i = 0; i < that.data.detailLog.length;i++) {
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
      }
    })
  }
}

Page(pageObject)