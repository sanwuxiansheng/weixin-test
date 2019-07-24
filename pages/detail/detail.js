// pages/detail/detail.js
let listData = require('../../datas/list-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //保存数据
    detailObj: {},
    isCollected:false,
    isPlayMusic:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    const index = options.index;
    // 根据索引找数组中的某个对象
    const detailObj = listData.list_data[index];
    // console.log(detailObj);
    this.setData({
      detailObj,
      index
    })
    // 页面显示后先读取下缓存
    let storage = wx.getStorageSync('isCollected')
    if (storage[index]) {
      this.setData({
        isCollected: true
      })
    }
    // 获取全局的app实例对象
    const app = getApp();
    // console.log(app)
    if (app.data.palayIndex === index) {
      // 把当前详情页的播放状态数据更新下
      this.setData({
        isPlayMusic: app.data.isPlay
      })
    }
    // 播放监听
    wx.onBackgroundAudioPlay(() => {
      // 立刻更新数据
      this.setData({
        isPlayMusic: true
      })
      app.data.isPlay = this.data.isPlayMusic;
      app.data.palayIndex = index
    })
    // 暂停监听
    wx.onBackgroundAudioPause(() => {
      // 立刻更新数据
      this.setData({
        isPlayMusic: false
      })
      app.data.isPlay = this.data.isPlayMusic;
    })
  },
  
  // 收藏按钮
  handleCollection(){
    let isCollected = !this.data.isCollected;
    this.setData({
      isCollected
    })
    // 提示用户的信息提示框
    let title = isCollected ? '收藏成功' : '取消收藏';
    wx.showToast({
      title
    })
    // 缓存操作
    let obj = wx.getStorageSync('isCollected');
    obj = obj ? obj : {};
    let index = this.data.index;
    obj[index] = isCollected
    wx.setStorage({
      key: 'isCollected',
      data: obj,
    })
    console.log(obj)
  },
  // 分享按钮
  handleShare () {
    wx.showActionSheet({
      itemList: ['分享给好友', '分享到朋友圈', '发送给朋友']
    })
  },
  // 播放音乐
  playMusic () {
    let isPlayMusic = !this.data.isPlayMusic
    this.setData({
      isPlayMusic
    })
    const { coverImgUrl, dataUrl, title } = this.data.detailObj.music
    if (isPlayMusic) {
      // 播放音乐
      wx.playBackgroundAudio({
        dataUrl,
        coverImgUrl,
        title
      })
    } else {
      // 暂停播放音乐
      wx.pauseBackgroundAudio()
    }
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