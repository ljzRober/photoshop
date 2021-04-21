const app = getApp()

Page({
  data: {
    classify:[
      {
        title:"一寸",
        describe:"像素尺寸：295x413 px",
        support:"电子照"
      },
      {
        title:"二寸",
        describe:"像素尺寸：413x579 px",
        support:"电子照"
      },
      {
        title:"英语四六级考试",
        describe:"像素尺寸：144x192 px",
        support:"电子照"
      },
      {
        title:"普通话水平测试",
        describe:"像素尺寸：390x567 px",
        support:"电子照"
      },
      {
        title:"国考",
        describe:"像素尺寸：413x531 px",
        support:"电子照"
      },
      {
        title:"国考",
        describe:"像素尺寸：413x531 px",
        support:"电子照"
      },
      {
        title:"硕士研究生考试",
        describe:"像素尺寸：390x567 px",
        support:"电子照"
      },
    ],
  },
  onLoad: function () {
  },
  choosecgcolor(e){
    wx.navigateTo({
      url: '../photo/photo?orgPage=pages/index',
    })
  },
})
