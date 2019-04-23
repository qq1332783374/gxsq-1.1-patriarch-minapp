
require("sdk/libs/strophe");
let WebIM = require("utils/WebIM")["default"];
let msgStorage = require("comps/chat/msgstorage");
let msgType = require("comps/chat/msgtype");
let ToastPannel = require("./comps/toast/toast");
let disp = require("utils/broadcast");

let req = require('./utils/api.js')

function ack(receiveMsg) {
  // 处理未读消息回执
  var bodyId = receiveMsg.id;         // 需要发送已读回执的消息id
  var ackMsg = new WebIM.message("read", WebIM.conn.getUniqueId());
  ackMsg.set({
    id: bodyId,
    to: receiveMsg.from
  });
  WebIM.conn.send(ackMsg.body);
}

function onMessageError(err) {
  if (err.type === "error") {
    wx.showToast({
      title: err.errorText
    });
    return false;
  }
  return true;
}

function getCurrentRoute() {
  let pages = getCurrentPages();
  let currentPage = pages[pages.length - 1];
  return currentPage.route;
}

function calcUnReadSpot(message) {
  let myName = wx.getStorageSync("myUsername");
  let members = wx.getStorageSync("member") || []; //好友
  var listGroups = wx.getStorageSync('listGroup') || []; //群组
  let allMembers = members.concat(listGroups)
  let count = allMembers.reduce(function (result, curMember, idx) {
    let chatMsgs;
    if (curMember.roomId) {
      chatMsgs = wx.getStorageSync(curMember.roomId + myName.toLowerCase()) || [];
    } else {
      chatMsgs = wx.getStorageSync(curMember.name.toLowerCase() + myName.toLowerCase()) || [];
    }

    return result + chatMsgs.length;
  }, 0);
  getApp().globalData.unReadMessageNum = count;
  disp.fire("em.xmpp.unreadspot", message);
}

App({
  req,
  ToastPannel,
  globalData: {
    unReadMessageNum: 0,
    userInfo: null,
    user: [],
    isLogin: false,
    saveFriendList: [],
    saveGroupInvitedList: [],
    isIPX: false //是否为iphone X

  },

  conn: {
    closed: false,
    curOpenOpt: {},
    open(opt) {
      wx.showLoading({
        title: '正在初始化客户端...',
        mask: true
      })
      this.curOpenOpt = opt;
      WebIM.conn.open(opt);
      this.closed = false;
    },
    reopen() {
      if (this.closed) {
        //this.open(this.curOpenOpt);
        WebIM.conn.open(this.curOpenOpt);
        this.closed = false;
      }
    }
  },

  // getPage(pageName){
  // 	var pages = getCurrentPages();
  // 	return pages.find(function(page){
  // 		return page.__route__ == pageName;
  // 	});
  // },

  onLaunch() {
    // 调用 API 从本地缓存中获取数据
    var me = this;
    var logs = wx.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    wx.setStorageSync("logs", logs);


    // 
    disp.on("em.main.ready", function () {
      calcUnReadSpot();
    });
    disp.on("em.chatroom.leave", function () {
      calcUnReadSpot();
    });
    disp.on("em.chat.session.remove", function () {
      calcUnReadSpot();
    });
    disp.on('em.chat.audio.fileLoaded', function () {
      calcUnReadSpot()
    });

    // 
    WebIM.conn.listen({
      onOpened(message) {  // 创建连接
        WebIM.conn.setPresence();
        if (getCurrentRoute() == "pages/login/login" || getCurrentRoute() == "pages/login_token/login_token") {
          me.onLoginSuccess(wx.getStorageSync("myUsername").toLowerCase());
        }
      },
      onClosed() {  // 连接关闭
        me.conn.closed = true;
      },
      onInviteMessage(message) {   // 
        me.globalData.saveGroupInvitedList.push(message);
        disp.fire("em.xmpp.invite.joingroup", message);
        // wx.showModal({
        // 	title: message.from + " 已邀你入群 " + message.roomid,
        // 	success(){
        // 		disp.fire("em.xmpp.invite.joingroup", message);
        // 	},
        // 	error(){
        // 		disp.fire("em.xmpp.invite.joingroup", message);
        // 	}
        // });
      },
      onPresence(message) {
        console.log("%c 处理好友消息", 'color: red');
        console.log(message)
        //对方收到请求加为好友
        if (message.type === 'subscribe') {

          /*同意添加好友操作的实现方法*/
          WebIM.conn.subscribed({
            to: message.from,
            message: '[resp:true]'
          });
          WebIM.conn.subscribe({//需要反向添加对方好友
            to: message.from,
            message: '[resp:true]'
          });
        }
      },

      onRoster(message) {
        // let pages = getCurrentPages();
        // if(pages[0]){
        // 	pages[0].onShow();
        // }
      },

      // onVideoMessage(message){
      // 	console.log("onVideoMessage: ", message);
      // 	if(message){
      // 		msgStorage.saveReceiveMsg(message, msgType.VIDEO);
      // 	}
      // },

      onAudioMessage(message) {
        console.log("onAudioMessage", message);
        if (message) {
          if (onMessageError(message)) {
            msgStorage.saveReceiveMsg(message, msgType.AUDIO);
          }
          calcUnReadSpot(message);
          ack(message);
        }
      },

      onCmdMessage(message) {
        console.log("onCmdMessage", message);
        if (message) {
          if (onMessageError(message)) {
            msgStorage.saveReceiveMsg(message, msgType.CMD);
          }
          calcUnReadSpot(message);
          ack(message);
        }
      },

      // onLocationMessage(message){
      // 	console.log("Location message: ", message);
      // 	if(message){
      // 		msgStorage.saveReceiveMsg(message, msgType.LOCATION);
      // 	}
      // },

      onTextMessage(message) {
        console.log("onTextMessage", message);
        if (message) {
          if (onMessageError(message)) {
            msgStorage.saveReceiveMsg(message, msgType.TEXT);
          }
          calcUnReadSpot(message);
          ack(message);
        }
      },

      onEmojiMessage(message) {
        console.log("onEmojiMessage", message);
        if (message) {
          if (onMessageError(message)) {
            msgStorage.saveReceiveMsg(message, msgType.EMOJI);
          }
          calcUnReadSpot(message);
          ack(message);
        }
      },

      onPictureMessage(message) {
        console.log("onPictureMessage", message);
        if (message) {
          if (onMessageError(message)) {
            msgStorage.saveReceiveMsg(message, msgType.IMAGE);
          }
          calcUnReadSpot(message);
          ack(message);
        }
      },

      onFileMessage(message) {
        console.log('onFileMessage', message);
        if (message) {
          if (onMessageError(message)) {
            msgStorage.saveReceiveMsg(message, msgType.FILE);
          }
          calcUnReadSpot(message);
          ack(message);
        }
      },

      // 各种异常
      onError(error) {

        // 16: server-side close the websocket connection
        console.log(error)

        if (error.type == WebIM.statusCode.WEBIM_CONNCTION_DISCONNECTED) {
          if (WebIM.conn.autoReconnectNumTotal < WebIM.conn.autoReconnectNumMax) {
            return;
          }
          wx.showToast({
            title: "server-side close the websocket connection",
            duration: 1000
          });
          wx.redirectTo({
            url: "../login/login"
          });
          return;
        }
        // 8: offline by multi login
        if (error.type == WebIM.statusCode.WEBIM_CONNCTION_SERVER_ERROR) {
          wx.showToast({
            title: "offline by multi login",
            duration: 1000
          });
          wx.redirectTo({
            url: "../login/login"
          });
        }
        if (error.type == WebIM.statusCode.WEBIM_CONNCTION_OPEN_ERROR) {
          wx.hideLoading()
          disp.fire("em.xmpp.error.passwordErr");
          // wx.showModal({
          // 	title: "用户名或密码错误",
          // 	confirmText: "OK",
          // 	showCancel: false
          // });
        }
        if (error.type == WebIM.statusCode.WEBIM_CONNCTION_AUTH_ERROR) {
          wx.hideLoading()
          disp.fire("em.xmpp.error.tokenErr");
        }
      },
    });
    this.checkIsIPhoneX();
  },
  onShow() {
    this.conn.reopen();
  },

  onLoginSuccess: function (myName) {
    wx.hideLoading()
    wx.redirectTo({
      url: "../chat/chat?myName=" + myName
    });
  },

  getUserInfo(cb) {
    var me = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo);
    }
    else {
      // 调用登录接口
      wx.login({
        success() {
          wx.getUserInfo({
            success(res) {
              me.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(me.globalData.userInfo);
            }
          });
        }
      });
    }
  },
  checkIsIPhoneX: function () {
    const me = this
    wx.getSystemInfo({
      success: function (res) {
        // 根据 model 进行判断
        if (res.model.search('iPhone X') != -1) {
          me.globalData.isIPX = true
        }
      }
    })
  },

});
