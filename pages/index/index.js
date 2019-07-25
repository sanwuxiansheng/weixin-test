// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{} // 存储用户信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getUserInfo({
      success: (res) => {
        // console.log('成功' + res)
        // console.log(res)
        if (res.rawData) {
          this.setData({
            userInfo:JSON.parse(res.rawData)
          })
        }
        // console.log(this.data.userInfo)
      },
      fail: (res) => {
        console.log('失败' + res)
        // console.log(res)
      }
    })
  },
  // 获取用户信息的回调函数
  loginUser (res) {
    // console.log(res)
    if (res.detail) {
      this.setData({
        userInfo:JSON.parse(res.detail.rawData)
      })
    }
    // console.log(this.data.userInfo)
  },
  gotoList() {
    // wx.navigateTo(Object object) 跳到指定界面后可以返回到之前的界面
    // wx.navigateTo({
    //   url: '/pages/list/list',
    // })
    // wx.redirectTo()  跳到指定界面后不能返回到之前的界面
    wx.switchTab({
      url: '/pages/list/list',
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