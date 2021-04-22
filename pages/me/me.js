// me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showShare: false,
    options: [
      { name: '微信', icon: 'wechat', openType: 'share' },
      { name: '微博', icon: 'weibo' },
      { name: '复制链接', icon: 'link' },
      { name: '分享海报', icon: 'poster' },
      { name: '二维码', icon: 'qrcode' },
    ],

    src:"",
    nickname:"",
    quote:""
  },

  onClick(event) {
    this.setData({ showShare: true });
  },

  onClose() {
    this.setData({ showShare: false });
  },

  onSelect(event) {
    wx.showToast(event.detail.name);
    this.onClose();
  },

  rankArray () {
    var a = Math.random() + ""
    var rand1 = a.charAt(5)
    var quotes = new Array
    quotes[1] = '不奋发，则心日颓靡；不检束，则心日恣肆'
    quotes[2] = '自制是一种秩序，一种对于快乐与欲望的控制'
    quotes[3] = '哪怕一点小小的克制，也会使人变得强而有力'
    quotes[4] = '做一个自律的人，像优秀的人学习'
    quotes[5] = '真正的自由是在所有时候都能控制自己'
    quotes[6] = '每天爱自己多一点！！！'
    quotes[7] = '如果连自己都不能控制，废物'
    quotes[8] = '登峰造极的成就源于自律'
    quotes[9] = '自我控制是最强者的本能'
    quotes[0] = '立志言为本，修身行乃先'
    this.setData({
      quote:quotes[rand1]
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userinfo = wx.getStorageSync('userinfo')
    this.setData({
      src : userinfo.avatarUrl,
      nickname:userinfo.nickName
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.rankArray()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})