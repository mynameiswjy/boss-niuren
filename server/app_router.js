const express = require('express')
const models = require('./models')
const md5 = require('blueimp-md5')
const UserModel = models.getModel('user')
const ChatModel = models.getModel('chat')

//得到路由器
const router = express.Router()
const _filter = {'pwd': 0, '__v': 0}
// 注册
router.post('/register', function (req, res) {
  // 1. 获取请求参数
  const {name, pwd, type} = req.body
  // 2. 处理(操作数据库数据)
  // 2.1. 根据name查询是否已经存在,
  UserModel.findOne({name}, _filter, function (err, user) {
    if (err) return err
    // 3.1. 如果已经存在, 返回一个错误的提示
    if (user) {
      return res.send({code: 1, msg: '用户名已存在'})
    }
    // 2.2. 如果不存在, 保存到数据库,
    const userModel = new UserModel({name, pwd: md5(pwd), type})
    userModel.save(function (err, user) {
      //向浏览器返回cookie
      res.cookie('UserId', user._id)
      res.send({code: 0, data: {user} || 'user是空的'})
    })

  })

})
// 登录
router.post('/login', function (req, res) {
  const {name, pwd} = req.body
  UserModel.findOne({name}, function (err, user) {
    // console.log(user)
    if (err) return res.send("服务器错误")
    if (user) {
      let oldPsw = user.pwd
      let userPsw = md5(pwd)
      // console.log(oldPsw)
      // console.log(userPsw)
      if (userPsw == oldPsw) {
        res.cookie('UserId', user._id, {maxAge: 1000*60*60*24*7})
        res.json({code: 0, msg: '登录成功', data: {user}})
      } else {
        res.send({code: 1, msg: '密码错误'})
      }
    } else {
      res.send({code: 1, msg: '用户不存在，请注册'})
    }
  })
})
// 更新用户信息
router.post('/update', function (req, res) {
  //获取浏览器发来的 cookie
  const userid = req.cookies.UserId
  const newUser = req.body
  if (!userid) {
    return res.send({code: 1, msg: '你还没登录'})
  }
  UserModel.findByIdAndUpdate({_id: userid}, newUser, function (err, user) {
    if (err) return res.send({code: 1, msg: '服务器错误 505！'})
    if (!user) {
      // 清除浏览器保存的cookie
      res.clearCookie('UserId')
      res.send({code: 1,msg: '请登录'})
    } else {
      const {_id, name, type} = user
      user = Object.assign({}, newUser, {_id, name, type})
      res.send({code: 0,data: user, msg: '保存成功'})
    }
  })

})

// 获取用户信息
router.get('/userInfo', function (req, res) {
  //获取用户发来的userid
  const userid = req.cookies.UserId

  if (!userid) {
    return res.send({code: 1, msg: '数据不存在'})
  }
  //根据用户发来的userid 去数据库里查询
  UserModel.findOne({_id: userid}, _filter, function (err, user) {
    if (!user) {
      // 清楚浏览器保存的cookie
      res.clearCookie('UserId')
      res.send({code: 1,msg: '请登录'})
    } else {
      res.send({code: 0,data: user, msg: '获取成功'})
    }
  })
})

// 查询列表
router.get('/userList',function (req, res) {
  // 获取type类型
  const {type} = req.query
  // 去数据库里查询
  UserModel.find({type}, function (err, user) {
    return res.send({code: 0, data: user})
	})
})

// 获取用户的历史对话
router.get('/getmsgs', function (req, res) {
  const userId = req.cookies.UserId

  UserModel.find({}, function (err, userdocs) {
    const users = {}
    userdocs.forEach(user => {
      users[user._id] = {name: user.name, avatar: user.avatar}
    })
		ChatModel.find({'$or': [{from: userId},{to: userId}]}, function (err, chatMsgs) {
				return res.json({code: 0, data: {chatMsgs, users}})
			}
		)
	})
})

module.exports = router