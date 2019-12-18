

# 注： 该项目只是交流学习，不可用作商业用途

## 简介

这是一个用React Native写的小说APP，支持搜索小说、订阅小说、在线阅读。（仅仅支持 Android，因为我没有 Mac 电脑，不能进行适配 苹果的）

## 效果图

| ![Screenshot_2019-12-18-12-45-59-249_com.bookcity](https://github.com/zhaosirlaile/bookcity/blob/master/img/Screenshot_2019-12-18-12-45-59-249_com.bookcity.jpg) | ![Screenshot_2019-12-18-12-46-15-169_com.bookcity](https://github.com/zhaosirlaile/bookcity/blob/master/img/Screenshot_2019-12-18-12-46-15-169_com.bookcity.jpg) | ![Screenshot_2019-12-18-12-46-18-238_com.bookcity](https://github.com/zhaosirlaile/bookcity/blob/master/img/Screenshot_2019-12-18-12-46-18-238_com.bookcity.jpg) | ![Screenshot_2019-12-18-12-46-22-697_com.bookcity](https://github.com/zhaosirlaile/bookcity/blob/master/img/Screenshot_2019-12-18-12-46-22-697_com.bookcity.jpg) |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![Screenshot_2019-12-18-12-46-25-030_com.bookcity](https://github.com/zhaosirlaile/bookcity/blob/master/img/Screenshot_2019-12-18-12-46-25-030_com.bookcity.jpg) | ![Screenshot_2019-12-18-12-46-31-190_com.bookcity](https://github.com/zhaosirlaile/bookcity/blob/master/img/Screenshot_2019-12-18-12-46-31-190_com.bookcity.jpg) | ![Screenshot_2019-12-18-12-46-34-887_com.bookcity](https://github.com/zhaosirlaile/bookcity/blob/master/img/Screenshot_2019-12-18-12-46-34-887_com.bookcity.jpg) | ![Screenshot_2019-12-18-12-46-48-794_com.bookcity](https://github.com/zhaosirlaile/bookcity/blob/master/img/Screenshot_2019-12-18-12-46-48-794_com.bookcity.jpg) |
| ![Screenshot_2019-12-18-12-47-14-172_com.bookcity](https://github.com/zhaosirlaile/bookcity/blob/master/img/Screenshot_2019-12-18-12-47-14-172_com.bookcity.jpg) |                                                              |                                                              |                                                              |



## 目录结构

```shell
├─components		# 公共组件
├─config			# 配置文件
├─dataStore			# 获取数据，存储数据的方法
├─images			# 一些要用到的图片
├─navigation		# 导航的配置
│  ├─BookStack
│  ├─LibraryStack
│  └─MyStack
├─pages				# 每一张的页面
│  ├─Book
│  │  ├─details
│  │  │  ├─details
│  │  │  └─detailsCatalog
│  │  ├─NovelReader
│  │  │  ├─catalog
│  │  │  └─content
│  │  └─Search
│  │      ├─Search
│  │      └─SearchList
│  ├─Library
│  │  ├─details
│  │  │  ├─details
│  │  │  └─detailsCatalog
│  │  ├─NovelReader
│  │  │  ├─catalog
│  │  │  └─content
│  │  └─Search
│  │      ├─Search
│  │      └─SearchList
│  └─My
│      └─otherPage
│          └─AboutMe
├─redux				# 数据中心，redux
│  ├─actionCreator
│  ├─actionTypes
│  └─reducer
└─util
```

## 技术栈

1. 导航 **react-navigation**
2. ui组件库 **native-base**
3. 数据管理 **redux**、**react-redux**
4. 数据请求 **fetch**
5. 中间件 **redux-thunk**

## 安装

```shell
git clone https://github.com/dlyt/YCool.git
npm install
```

连接一下

```shell
react-native link
```

## APP

[下载地址](.\趣味书阁.apk)

## 开发环境

自己去官网看

## License

仅供学习使用
