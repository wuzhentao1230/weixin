Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    title: {
      type: String,
      value: 'default title'
    },
    volList: {        // 今日奉粥志愿者list
      type: Array,
    },
  },
  data: {
    newVol: [],
    errorFlag: false
  },
  methods: {
    /**
     * 选择志愿者事件
     */
    popupShowEvent() {
      var that = this;
      var popupComponent = this.selectComponent('.J_Popup');
      popupComponent && popupComponent.show();
    },
    /**
     * 弹出框确定事件
     */
    submitAddEvent() {
      var popupComponent = this.selectComponent('.J_Popup');
      if(this.data.newVol == '') {
        wx.showToast({
          title: '新增姓名不能为空',
          icon: 'loading',
          image: '../../../images/customized/icon-warning.png',
          duration: 1500
        })
        popupComponent && popupComponent.hide();
      } else if(!this.isLegal(this.data.newVol)){
        wx.showToast({
          title: '输入格式有误',
          icon: 'loading',
          image: '../../../images/customized/icon-warning.png',
          duration: 1500
        })
      } else {
        this.triggerEvent('addVolEvent',this.data.newVol);
        this.setData({
          newVol: ''
        })
        popupComponent && popupComponent.hide();
      }
    },
    isLegal(name) {
      var reg = /^[\u4E00-\u9FA5]{2,5}$/;
      return reg.test(name);
    },
    inputNewVol(e) {
      this.setData({
        newVol: e.detail.value
      })
    }
  }
})