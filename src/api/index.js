/*
* 所有Ajax请求的方法模块*/
import ajax from './ajax'

//请求注册
export const ReqRegister = user => ajax('/api/register', user, 'POST')

//请求登录
export const ReqLogin = user => ajax('/api/login', user, 'POST')

//继续补全信息
export const ReqUpdate = user => ajax('/api/update', user, 'POST')

//请求用户参数
export const ReqUserInfo = () => ajax('/api/userInfo')

//获取用户列表
export const ReqUserList = (type) => ajax('/api/userList', {type})

// 获取当前用户的所有聊天记录
export const  reqChatMsgsList = () => ajax('/api/getmsgs')