Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    title: {
      type: String,
      value: 'default title'
    },
    placeholder: {
      type: String,
      value: 'default placeholder'
    },
    volList: {        // 今日奉粥志愿者list
      type: Array,
    },
    defaultVal: {     // 已经选择的志愿者名单
      type: Array,
      value: []
    },
    maxSelect: {      // 最多选择个数
      type: Number,
      default: 0
    }
  },
  data: {
    volDataList: [],
  },
  methods: {
    /**
     * 选择志愿者事件
     */
    popupShowEvent() {
      var that = this;
      if(this.properties.defaultVal.length != 0) {
        this.properties.volList.forEach((item,index) => {
          if(that.properties.defaultVal.indexOf(item)>=0) {
            var value = "volDataList[" + index + "]";
            var key = {name:item,checked:true};
            that.setData({
              [value]:key
            })
          } else {
            var value = "volDataList[" + index + "]";
            var key = {name:item};
            that.setData({
              [value]:key
            })
          }
        });
      } else {
        this.properties.volList.forEach((item,index) => {
          var value = "volDataList[" + index + "]";
          var key = {name:item};
          that.setData({
            [value]:key
          })
        })
      }
      var popupComponent = this.selectComponent('.J_Popup');
      popupComponent && popupComponent.show();
    },
    /**
     * 弹出框确定事件
     */
    selectVolEvent() {
      var that = this;
      if(this.properties.defaultVal.length > this.properties.maxSelect) {
        wx.showToast({
          title: '最多选择 ' + that.properties.maxSelect + ' 个',
          icon: 'loading',
          image: '../../../images/customized/icon-warning.png',
          duration: 1500
        })
        setTimeout(function () { wx.hideToast() }, 2000)
        return;
      }
      var popupComponent = this.selectComponent('.J_Popup');
      popupComponent && popupComponent.hide();
      this.triggerEvent('selectEvent',this.properties.defaultVal);
    },
    checkboxChange(e) {
      this.setData({
        defaultVal: e.detail.value
      })
    }
  }
})