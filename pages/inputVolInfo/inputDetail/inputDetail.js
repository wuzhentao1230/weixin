var pageObject = {
    data: {
        showInput: true,
        showCopy: false,
        strList: "",                // 当日志愿者列表
        strPorridge: "",
        checkList: [],              // 获取当日志愿者名单列表请求response
        numPeople: 0,               // 总人数
        newPeople: "0人",           // 新人数
        newPeopleDetail:[],         // 新人详细信息
        detailLog: [],              // 提交的奉粥日志文本，用于复制

        form: {
        },
        dayInfo: {
            dailyLeader: "",
            cooker: "",
            checker: "",
            forwarder: "",
            totalcups: "",
            numPeople: "",
            newPeople: "",
            photographer: "",
            dailylog: "",
            propaganda: "",
            summingup: "",
            logistics: "",
            cleaner: "",
            environment: "",
            signnamelist: ""
        },
        jobInfo: {              // 职位对照表,用于判断,以下的key不能为null
            dailyLeader: '日负责人',
            cooker: "煮粥侠",
            checker: "签到引领",
            forwarder: "前行",
            totalcups: "总杯数",
            numPeople: "总人数",
            newPeople: "新人数",
            photographer: "摄影",
            dailylog: "日志",
            propaganda: "文宣",
            summingup: "结行",
            logistics: "后勤",
            cleaner: "粥车粥桶",
            environment: "环保",
            signnamelist: "志愿者",
        }
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
                // res.data = ["辛开愚", "张军", "张婷", "康倩倩", "任蕾", "李信", "孙文正", "李新芹", "吴京昌", "丁赛", "刘建华", "夏淑", "周新", "杨晓东", "杨晓欣", "张亮", "卢漫漫", "林鹭"];
                // console.log("当天签到志愿者列表 ", res);
                if (res.statusCode == 200) {
                    var strlist = "";
                    if (res.data.length > 0) {
                        strlist = res.data[0];
                        for (var i = 1; i < res.data.length; i++) {
                            strlist += (" " + res.data[i]);
                        }
                    }
                    that.setData({
                        strList: strlist,
                        checkList: res.data
                    })
                } else {
                    that.setData({
                        strList: "",
                        checkList: []
                    })
                }
            },
            fail: function () {
                that.setData({
                    strList: "",
                    checkList: []
                })
            }
        })
    },

    /**
     * 获取志愿者总人数/新人数/新人名称
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
                console.log("getstat ", res);
                if (res.statusCode == 200) {
                    var newperson = res.data.todayNum + "人";
                    if (res.data.todayPerson.length > 0) {
                        newperson += " (" + res.data.todayPerson[0];
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
    },

    /** 
     * 获取当天志愿者信息
     * 如果还没有填写当天信息，则跳转到输入信息页面，否则跳转到一键复制页面
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
                // console.log("当天志愿者名单：", res.data);
                that.setData({
                    DayInfo:res.data
                });
                that.setData({
                    form: res.data
                })
            }
        })
    },

    onLoad: function() {
        var that = this;
        this.getDailyVolunteerList();
        this.getTotalPeople();
        this.myGetDayInfo();
    },

    iptValueChange: function(e) {
        var that = this;
        var fieldName = e.currentTarget.dataset['name'];

        that.setData({
            [fieldName]: e.detail.valuetest
        })
        // console.log('fieldName = ' + fieldName + ',e.detail.value = ' + e.detail.value);
    },

    submitInfo: function(e) {
        var that = this;
        if (this.verify(e)) {       // 检测成功
            this.makeDetailLog();
            this.apply();
        } else {
            wx.showModal({
                title: '输入项有误',
                content: '输入项有误，请确认'
            })
        }  
    },

    /**
     * 生成日志文本
     */
    makeDetailLog: function() {
        var that = this;
        var strlist = [];
        var date = new Date();
        var mydate = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日";
        var item = "仁爱魏公村心栈" + mydate + "奉粥日志";
        strlist.push(item);
        var weekday = new Array(7);
        weekday = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]

        item = "奉粥日期: " + mydate + "(" + weekday[date.getDay()] + ")"
        strlist.push(item);
        strlist.push("日负责人: " + that.data.form.dailyLeader);
        strlist.push("熬粥: " + that.data.form.cooker);
        strlist.push("签到引领: " + that.data.form.checker);
        strlist.push("前行: " + that.data.form.forwarder);
        strlist.push("总杯数: " + that.data.form.totalcups);
        strlist.push("总人数: " + that.data.numPeople);
        strlist.push("新人数: " + that.data.newPeople);
        strlist.push("摄影: " + that.data.form.photographer);
        strlist.push("日志: " + that.data.form.dailylog);
        strlist.push("文宣: " + that.data.form.propaganda);
        strlist.push("结行: " + that.data.form.summingup);
        strlist.push("后勤: " + that.data.form.logistics);
        strlist.push("粥车粥桶: " + that.data.form.cleaner);

        if (that.data.form.environment != undefined && that.data.form.environment != null
            && that.data.form.environment.length > 0 && that.data.form.environment != "无"
            && that.data.checkList.length > 0) {
            item = "环保: " + that.data.form.environment;
            strlist.push(item);
            var tmpAry = [];
            tmpAry = that.data.form.environment.split(' ');
            var tmpcookee = [];

            for (var i = 0; i < tmpAry.length; i++) {
                for (var j = 0; j < that.data.checkList.length; j++) {
                    if (that.data.checkList[j] == tmpAry[i]) {
                        that.data.checkList.splice(j, 1)
                        break;
                    }
                }
            }

            if (that.data.checkList.length != 0) {
                item = "奉粥: " + that.data.checkList[0];
                for (var i = 1; i < that.data.checkList.length; i++) {
                    item += " " + that.data.checkList[i];
                }
                strlist.push(item);
                that.setData({
                    strPorridge: item
                });
            }
        } else {
            item = "环保: 无";
            strlist.push(item);
            item = "奉粥: " + that.data.strList;
            strlist.push(item);
            that.setData({
                strPorridge: item
            });
        }
        //console.log(strlist);
        that.setData({
            detailLog: strlist
        })
    },

    apply: function() {
        var that = this;
        var info = { "signnamelist": that.data.strPorridge, "newpersonslist": that.data.newPeople }
        var params = Object.assign(that.data.form, info);
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
                    that.setData({
                        form: {}
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
     * 输入框检查
     */
    verify: function(e) {
        var that = this;
        var isSuccess = true;
        var errorTitle;

        for (var key in this.data.jobInfo) {
            if ((key != 'numPeople' && key != 'newPeople' && key != 'environment' && key != 'signnamelist') && (this.data.form[key] == undefined || this.data.form[key] == null || this.data.form[key] == '')) {
                var nullJobName = that.data.jobInfo[key];
                wx.showToast({
                    title: '请填写 ' + nullJobName + ' ^_^ !',
                    icon: 'none',
                    duration: 1500
                })
                setTimeout(function () { wx.hideToast() }, 2000);
                isSuccess = false;
                return;
            }
        }
        return isSuccess;
    },

    CopyInfo: function(){
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
                // wx.getClipboardData({
                //   success: function (res) {
                //     console.log(res.data)
                //   }
                // })
            }
        })
    },
}

Page(pageObject)