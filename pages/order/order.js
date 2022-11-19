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
  onClose(event) {
    console.log("event",event)
    const dinfo = event.currentTarget.dataset.dinfo;
    const { position, instance } = event.detail;
    switch (position) {
      case 'cell':
        instance.close();
        break;
      case 'right':
        wx.showModal({
          content: '确定删除吗',
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.cloud.deleteFile({
                fileList: [dinfo.imgid],
                success: res => {
                  // handle success
                  console.log("delete",res.fileList);
                  wx.cloud.callFunction({
                    name:"delimglogs",
                    data:{
                      id:dinfo._id
                    },
                    success:(res)=>{
                      console.log("deletedatabase",res);
                    }
                  })
                },
                fail: console.error
              })
            }}
        })
        break;
    }
  },
  getimglogs:function(){
    const that = this;
    const userinfo = wx.getStorageSync('userinfo')
    wx.cloud.callFunction({
      name:"getimglogs",
      data:{
        openid:userinfo.openid
      },
      async success(res){
        console.log("res",res)
        that.setData({
          logs:await res.result.data.map(log=>{
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
                log.imgid = res.fileList[0].tempFileURL
              },
              fail: console.error
            })

            return log
          }),
          
        });
        that.setData({
          hasdata:true
        });
        console.log("logs",that.data.logs)
      },
      fail:res=>{
        console.log("res",res)
      }
    })
  },

  onShow: function () {
    this.getimglogs()
  },

  async topay(e){
    console.log("nowlogs",this.data.logs);
    console.log("e",e);
    let tmplogs = this.data.logs;
    var pinfo = e.currentTarget.dataset.info;

    /**必须先转化为网络地址 */
    for (var i=0;i<tmplogs.length;i++)
      { 
        if(tmplogs[i].date == pinfo.date){
          pinfo.imgid = tmplogs[i].imgid;
          break;
        }
      }

    await wx.downloadFile({
      url: pinfo.imgid, //仅为示例，并非真实的资源
      success (res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        pinfo.imgid = res.tempFilePath;
      }
    })
    
    console.log("pinfo",pinfo)
    wx.navigateTo({
      url: '../pay/pay',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('imginfo', { 
          info:pinfo})
      }
    })
  },

  
})