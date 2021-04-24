// pages/order/order.js

const fmdate = require('../../utils/fmdate.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgid:"",
    date:"",
    imginfo:{},
    logs:[],
    hasdata:false
  },

  getimglogs:function(){
    const that = this;
    const userinfo = wx.getStorageSync('userinfo')
    wx.cloud.callFunction({
      name:"getimglogs",
      data:{
        openid:userinfo.openid
      },
      success:res=>{
        console.log("res",res)
        that.setData({
          logs:res.result.data.map(log=>{
            var date = fmdate.formatTime(new Date(log.date))
            log.date = date

            wx.cloud.getTempFileURL({
              fileList: [log.imgid],
              success: res => {
                // fileList 是一个有如下结构的对象数组
                // [{
                //    fileID: 'cloud://xxx.png', // 文件 ID
                //    tempFileURL: '', // 临时文件网络链接
                //    maxAge: 120 * 60 * 1000, // 有效期
                // }]
                console.log(res.fileList)
                log.imgid = res.fileList[0].tempFileURL
              },
              fail: console.error
            })

            return log
          }),
          hasdata:true
        })
        console.log("logs",that.data.logs)
      },
      fail:res=>{
        console.log("res",res)
      }
    })
  },

  onShow: function () {
    this.getimglogs()
  }
})