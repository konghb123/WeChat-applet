//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },

  onLoad: function () {

  },
  // 跳转页面

  // 设定图片固定比例
  imageScale(){
    wx.navigateTo({
      url: '../imageScale/imageScale',
    })
  },
  // 裁剪图片插件
  tailoring(){
    
  }
})
