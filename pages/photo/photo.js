// pages/photo/photo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{
      imgcolor:"blue",
      size:""
    },
    redshow:false,
    blueshow:true,
    whiteshow:false
  },
  takePhoto() {
    wx.navigateTo({
      url: '../camera/camera?id=1'
    })
  },
  chooseImage(){
    const that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
      
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        const that1 = that
        wx.navigateTo({
          url: '../camera/camera?orgPage=photo',
          success: function (res) {
            // 通过eventChannel向被打开页面传送数据
            res.eventChannel.emit('acceptDataFromOpenerPage', { 
              info:that1.data.info,
              imagePath: tempFilePaths})
          }
        })

      }
    })
  },
  tapwhite(){
    this.setData({
      whiteshow:true,
      blueshow:false,
      redshow:false,
      info:{imgcolor:"white",size:""}
    })
  },
  tapred(){
    this.setData({
      whiteshow:false,
      blueshow:false,
      redshow:true,
      info:{imgcolor:"red",size:""}
    })
  },
  tapblue(){
    this.setData({
      whiteshow:false,
      blueshow:true,
      redshow:false,
      info:{imgcolor:"blue",size:""}
    })
  }
})