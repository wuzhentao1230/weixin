Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    title: {
      type: String,
      value: 'default title'
    },
    defaultVal: {
      type: Number,
    },
  },
  methods: {
    inputEvent(e) {
      this.setData({
        defaultVal: e.detail.value
      })
      this.triggerEvent('inputEvent',this.properties.defaultVal);
    }
  }
})