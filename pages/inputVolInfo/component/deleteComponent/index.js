Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    title: {
      type: String,
      value: 'default title'
    },
    defaultVal: {     // 已经选择的志愿者名单
      type: Array,
      value: []
    },
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
        that.properties.defaultVal.forEach((item,index) => {
          var value = "volDataList[" + index + "]";
          var key = {name:item,checked:true};
          that.setData({
            [value]:key
          })
        });
      }
      var popupComponent = this.selectComponent('.J_Popup');
      popupComponent && popupComponent.show();
    },
    /**
     * 弹出框确定事件
     */
    selectVolEvent() {
      var that = this;
      var popupComponent = this.selectComponent('.J_Popup');
      popupComponent && popupComponent.hide();
      this.triggerEvent('delVolEvent',this.properties.defaultVal);
    },
    checkboxChange(e) {
      this.setData({
        defaultVal: e.detail.value
      })
    }
  }
})