// pages/photo1/photo1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classify:[
      {
        title:"一寸",
        describe:"295x413",
        support:"电子照"
      },
      {
        title:"二寸",
        describe:"413x579",
        support:"电子照"
      },
      {
        title:"英语四六级考试",
        describe:"144x192",
        support:"电子照"
      },
      {
        title:"普通话水平测试",
        describe:"390x567",
        support:"电子照"
      },
      {
        title:"国考",
        describe:"413x531",
        support:"电子照"
      },
      {
        title:"简历照片",
        describe:"295x413",
        support:"电子照"
      },
      {
        title:"硕士研究生考试",
        describe:"390x567",
        support:"电子照"
      },
      {
        title:"德福考试",
        describe:"360x480",
        support:"电子照"
      },
    ],
    hasimage:false,
    asheetshow1:false,
    asheetshow:false,
    imgsrc:"",
    tmp:{
      title:"一寸",
      describe:"295x413",
      support:"电子照"
    },
    info:{
      imgcolor:"blue",
      size:""
    },
    redshow:false,
    blueshow:true,
    whiteshow:false,
    imgcolor:"blue",
    size:""
  },
  changeasshow(){
    if(this.data.hasimage){
      this.setData({
        asheetshow:true
      })
    }else{
      wx.showToast({
        title: '请先上传图片',
        icon:'error'
      })
    }
    
  },
  changeasshow1(event){
      this.setData({
        asheetshow1:true,
        asheetshow:false,
        tmp:event.currentTarget.dataset.tmp
      })
  },
  getpicture(){
    const that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          imgsrc : tempFilePaths,
          hasimage : true
        })

      }
    })
  },
  onClose(){
    this.setData({ asheetshow: false });
  },
  onClose1(){
    this.setData({ asheetshow1: false });
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
  },
  navigatetap(){
    var isize = "info.size";
    var td = "tmp.describe";
    this.setData({
      isize : td
    })
    console.log("info",this.data.info)
    this.data.info.size = this.data.tmp.describe;
    const that = this;
    wx.navigateTo({
      url: '../camera/camera?orgPage=photo',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { 
          info:that.data.info,
          imagePath: that.data.imgsrc})
      }
    })
  }
})