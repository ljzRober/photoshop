const app = getApp()
let loginuserinfo = require("../../utils/login")
Page({
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
    userinfo:{},
    openid:"",
    hasuserinfo:false,
    show: false,
    asheetshow:false,
    tmp:{}
  },
  onLoad: function () {
    const userinfo = wx.getStorageSync('userinfo')
    if(userinfo.openid){
      this.userinfo = userinfo
      console.log("用户信息",this.userinfo)
    }else{
      wx.hideTabBar()
      this.setData({ show: true });
    }
  },
  onClickHide() {
    this.setData({ show: false });
  },
  choosecgcolor(e){
    wx.navigateTo({
      url: '../photo/photo?orgPage=pages/index',
    })
  },
  async getuserinfo1(){
    this.setData({
      userinfo : await loginuserinfo.getuserinfo()
    })
    console.log("userinfo前台",this.data.userinfo);
    if(this.data.userinfo.openid){
      this.setData({ show: false });
      wx.showTabBar({
        animation: true,
      })
    }
  },

  async getuserinfo(){
    const that = this
    console.log("成功调用getuserinfo");
    wx.getUserProfile({
      desc: '请允许授权获取您的信息',
      async success(res) {
        const self = that
          self.setData({
            userinfo : res.userInfo
          })
          await wx.cloud.callFunction({
            name:"login",
            success:res=>{
              console.log("云函数调用成功")
              self.setData({
                openid:res.result.openid,
                show: false
              })
              self.data.userinfo.openid = self.data.openid;
              let userinfo = self.data.userinfo
              console.log("userinfo后台",userinfo)
              wx.setStorageSync('userinfo', userinfo)
              wx.showTabBar({
                animation: true,
              })
            },
            fail:res=>{
              console.log("云函数调用失败")
            }
          })
        },
      fail: (res) => {
        console.log("获取用户信息失败")
      }
    })
  },

  posterr(){
    wx.showToast({
      title: "该功能暂未开放",
      icon: 'error',
      duration: 2000
    })
  },
  changeasshow(event){
    this.setData({
      asheetshow:true,
      tmp:event.currentTarget.dataset.tmp
    })
  },
  onClose(){
    this.setData({ asheetshow: false });
  },
  choosephoto(){
    wx.navigateTo({
      url: '../photo1/photo1?orgPage=pages/index',
    })
  }
})
