// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imginfo:{}
  },
  onSubmit(){
    const that = this;
    console.log('图片地址',that.data.imginfo.imgid)
    wx.saveImageToPhotosAlbum({
      filePath:that.data.imginfo.imgid,
      success(res) { 
        console.log('成功下载',res)
        wx.switchTab({
          url: '../index/index?orgPage=pay',
        })
      }
    })
  },
  onLoad:function(){
    const that = this
    const eventChannel = this.getOpenerEventChannel();
      eventChannel.on('imginfo', function (data) {
        that.setData({
          imginfo:data.info
        })
      })
  }
})