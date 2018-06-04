/*
* 更新state 包含n个action creator的模块
* */
import {ReqLogin, ReqRegister, ReqUpdate, ReqUserInfo, ReqUserList, reqChatMsgsList} from '../api'

import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  USER_LIST,
	GET_CHAT_MSG,
	GET_CHAT_MSGS_LIST
} from './action-types'
// 引入客户端io
import io from 'socket.io-client'
// 连接服务器
const socket = io('ws://localhost:5000')

//同步授权成功的action
const authSuccess = user => ({type: AUTH_SUCCESS, data: user})

//同步错误信息action
const errorMsg = msg => ({type: ERROR_MSG, msg: msg})

//接收用户
const receiveUser = user => ({type: RECEIVE_USER, data: user})

//重置用户
export const resetUser = msg => ({type: RESET_USER, msg: msg})

//用户列表
const userList = user => ({type: USER_LIST, data: user})

/*
* 异步注册action
* */
export const register = ({name, pwd, pwd2, type}) => {
  return async dispatch => {
    //检查数据的合法性
    if (pwd !== pwd2) return dispatch(errorMsg('两次密码不同'))
    if (!pwd || !name) return dispatch(errorMsg('用户名密码不能为空'))

    //发送alax请求
   /* ReqRegister({name, pwd, type}).then(res => {

    })*/
    const res = await ReqRegister({name, pwd, type})
    const {code, data, msg} = res.data
    if (code === 0) {
      dispatch(authSuccess(data))
    } else {
      dispatch(errorMsg(msg))
    }
  }
}
/*
* 登录
* */
export const login = ({name, pwd}) => {
  return dispatch => {
    if (!pwd || !name) return dispatch(errorMsg('用户名密码不能为空'))
    //发送ajax请求
    ReqLogin({name, pwd}).then(res => {
      const {code, data, msg} = res.data
      if (code === 0) {
        dispatch(authSuccess(data))
      } else {
        dispatch(errorMsg(msg))
      }
    })
  }
}
// boss 信息补全
export const update = (user) => {
  const {avatar, title, desc} = user
  return dispatch =>{
    if (!avatar || !title || !desc) return dispatch(errorMsg('亲，请先补全信息呢，不然我们没法为你推荐工作呢'))

    //发送ajax请求
    ReqUpdate(user).then(res => {
      const {data, code, msg} = res.data
      if (code === 0) {
        dispatch(receiveUser(data))
      } else {
        dispatch(resetUser(msg))
      }
    })
  }
}
/*
* 根据用户cookie里的userid 获取数据
* */
export const getUserInfo = () => {

  return dispatch => {
    ReqUserInfo().then(res => {
      const {data, code, msg} = res.data
      if (code === 0) {
        dispatch(receiveUser(data))
      } else {
        dispatch(resetUser(msg))
      }
    })
  }
}
/*
* 获取用户列表
* */
export const getUserList = (type) => {
  return async dispatch => {
    const res = await ReqUserList(type)
    const {code, data}  = res.data
    if (code === 0) {
      dispatch(userList(data))
    }
  }
}
/*
* 异步向服务器发送消息
* */
export const sendMsg = ({from, to, content}) => {
  return dispatch => {
		// 向服务器发送消息
		socket.emit('sendMessage', {from, to, content})
  }
}

/*
*  同步接收服务器消息
* */
const getChatMsg = (chatMsg) => ({type: GET_CHAT_MSG, data: chatMsg})
/*
* 异步接收服务器消息
* */
export const getServerMsg = () => {
  return dispatch => {
		// 绑定receiveMessage监听， 接收服务器发来的消息
		socket.on('receiveMessage', function (chatMsg) {
      dispatch(getChatMsg(chatMsg))
		})
  }
}


const getMsgList = ({chatMsgs, users}) => ({type: GET_CHAT_MSGS_LIST, data: {chatMsgs, users}})
/*
* 异步获取当前用户所有相关消息列表
* */
export const getUserChatMsgsList = () => {
  return async dispatch => {
    const res = await reqChatMsgsList()
    const {code, data} = res.data
    if (code === 0) {
      dispatch(getMsgList(data))
    }
  }
}
