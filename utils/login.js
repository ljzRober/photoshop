
let openid = ""
let userinfo = {}

var loginuserinfo = {async getuserinfo(){
  console.log("成功调用getuserinfo");
  await wx.getUserProfile({
    desc: '请允许授权获取您的信息',
    async success(res) {
        userinfo = res.userInfo
        await wx.cloud.callFunction({
          name:"login",
          success:res=>{
            console.log("云函数调用成功")
            openid=res.result.openid
            console.log("openid",openid)
            userinfo.openid = openid;
            console.log("userinfo后台",userinfo)
            wx.setStorageSync('userinfo', userinfo)
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
  console.log("userinfo",userinfo);
  return userinfo
}
}

module.exports=loginuserinfo