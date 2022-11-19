// pages/photo1/photo1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classify:[
      {
        title:"自定义尺寸",
        describe:"295x413",
        support:"电子照"
      },
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
    asheetshow2:false,
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
    size:"",
    iwidth:"",
    iheight:""
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
    console.log("event",event)
  if(event.currentTarget.dataset.tmp.title == "自定义尺寸"){
    this.setData({
      asheetshow2:true,
      asheetshow:false
    })
  }else{
    this.setData({
      asheetshow1:true,
      asheetshow:false,
      tmp:event.currentTarget.dataset.tmp
    })
  }      
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
  onClose2(){
    this.setData({ asheetshow2: false });
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
  onChange(event) {
    // event.detail 为当前输入的值
    this.setData({
      iwidth : event.detail
    })
  },
  onChange1(event) {
    // event.detail 为当前输入的值
    this.setData({
      iheight : event.detail
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
  },

  navigatetap1(){
    this.data.info.size = this.data.iwidth+"x"+this.data.iheight;
    console.log("info",this.data.info)
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