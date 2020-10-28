// pages/imageScale/imageScale.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: '',
    src: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this
    wx.createSelectorQuery().select('#img').boundingClientRect(function (res) {
      console.log(res)
      _this.setData({
        height: res.width * 0.75 + 'px'
      })
    }).exec();
  },
  //选择图片
  chooseImage() {
    const _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        _this.setData({
          src: tempFilePaths[0]
        })
      }
    })
  },


})