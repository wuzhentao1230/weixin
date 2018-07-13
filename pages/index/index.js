// pages/index/index.js

var config = require('../../config')
var util = require('../../utils/util.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // swiper
        indicatorDots: true,        // 是否显示面板指示点
        autoplay: true,             // 自动播放
        circular: true,             // 是否采用衔接滑动
        vertical: false,            // 滑动是否为纵向
        interval: 3000,             // 自动切换时间间隔
        duration: 1000,              // 滑动动画时长
        background: ['https://upload-images.jianshu.io/upload_images/9674600-1e1089e3e41928ee.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700', 'https://upload-images.jianshu.io/upload_images/9674600-fa38b46182f961f3.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700', 'https://upload-images.jianshu.io/upload_images/9674600-6254921ee5b54d77.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700'],
        
        // logo部分 
        modeFound:'widthFix',
        src_found: './img/foundation_logo.png',
        modewgc: 'widthFix',
        src_wgc: './img/xinzhan_logo.jpg',

        nickName: "",
        avatarUrl: "",
        code: "",
        encryptedData: "",
        iv: "",
        loginStatus: 0,

        isHaveShouXing: false,
        modeShouxing: 'widthFix',
        src_shouxing: './img/birth_bg.jpg',
        shouxing_list_str: null,
        curtime:"",

        // 底部欢迎接入志愿者
        mode: 'widthFix',
        src: './img/volunteer.png',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        var time = util.formatDate(new Date());
        time = time.replace(/(\d*)\/(\d*)\/(\d*)/, '$1年$2月$3日');         // 替换成年月日的形式
        this.setData({
            curtime: time
        });  
         
        wx.request({
            url: config.service.shouxingUrl,
            success: function(res) {
                console.log(res);
                var arr = res.data;
                if(res.data.length != 0) {
                    that.setData({
                        isHaveShouXing: true
                    });
                }
                var str="";
                for (var i in arr) {
                    //console.log(i + "-----" + arr[i]);
                    str = str + arr[i] + ", "
                }
                str = str.substr(0, str.length-2);
                that.setData({
                    shouxing_list_str: str
                });
            }
        })
    },

    lookMore: function() {
        wx.navigateTo({
            url: './introduce/introduce',
            success: function () {
                console.log('跳转至简介页面');
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