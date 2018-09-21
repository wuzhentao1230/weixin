# 签到小程序

[TOC]

## 项目目录结构
```
weixin/   
|- dist/packages/@minui           // 引入的 minui 插件
|- images/
    |-- customized/               
    |-- index/                    // index 页面的图片
|- pages/     
    |-- checkin/                  // 签到模块主页面
    |-- customized/               // 新增志愿者页面
    |-- index/                    // 首页
        |--- img/
        |--- introduce/           // 心栈介绍页
    |-- inputVolInfo/
        |--- component/           // 组件
            |---- addComponent/              // 添加志愿者组件
            |---- deleteComponent/           // 删除志愿者组件
            |---- inputComponent/            // 输入组件
            |---- volInputComponent/         // 志愿者选择组件
        |--- getNewDetail/                   // 获取新志愿者列表
        |--- inputDetail/                    // 输入奉粥分工页面
        |--- inputDetailNew/                 // 输入奉粥分工页面2.0
    |-- inputdata-ex/             // 老志愿者签到页面
|- styles/                        // 项目全局样式
    |-- weui.wxss                 // 引入weui
|- utils/                         // 工具文件夹
|- README.md
|- ...
```

## 启动项目

下载微信开发者工具，导入项目

## 版本更新记录

- 2.5.2 引入minui，进行测试
- 2.6.0 重新布局奉粥日志录入页面，新增2.0页面（2018年9月21日）
