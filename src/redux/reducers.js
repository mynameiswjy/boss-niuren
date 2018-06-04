/*
* 包含多个用于新生成的state的reducer函数模块
* */
import {combineReducers} from 'redux'

import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  USER_LIST,
  GET_CHAT_MSG,
  GET_CHAT_MSGS_LIST
} from './action-types'
import {getRedirecTo} from '../utils'

const initUser = {
  name: '',
  type: '',
  msg: '',
  redirectTo: ''
}
//管理用户状态
function user(state = initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      const {type, avatar} = action.data.user
      return {...action.data, redirectTo: getRedirecTo(type, avatar)}
    case ERROR_MSG:
      return {...state, msg: action.msg}
    case RECEIVE_USER:
      return action.data
    case RESET_USER:
      return initUser
    default:
      return state
  }
}
const initUserList = []
// 管理用户列表
function userList(state=initUserList, action) {
  switch (action.type) {
    case USER_LIST:
      return action.data
    default:
      return state
  }
}
// 管理服务器发来的 聊天对话
const initChat = {
  chatMsgs: [],
  users: {}
}
function chat(state=initChat, action) {
  switch (action.type) {
    case GET_CHAT_MSG:
      return {...state, chatMsgs: [...state.chatMsgs, action.data]}
    case GET_CHAT_MSGS_LIST:
      return action.data
    default:
      return state
  }
}
export default combineReducers({
  user,
  userList,
  chat
})
