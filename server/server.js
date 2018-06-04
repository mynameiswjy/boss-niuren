// 1. 引入express
const express = require('express')
const bodyParser = require('body-parser') // 解析请求体
const cookieParser = require('cookie-parser')

// 2.引入应用路由器
const appRouter = require('./app_router')

// 2. 生成应用对象(执行express函数)
const app = express()
//得到服务器对象
const server = require('http').Server(app)
// 得到IO对象
const io = require('socket.io')(server)
const models = require('./models')
const ChatModel = models.getModel('chat')

// 3. 注册根路由(使用app的use())
/*app.use('/', function (req, res) {
  res.send('hello server222!')
})*/
app.use(cookieParser()) // 解析cookie数据
app.use(bodyParser.json()) // 解析请求体(ajax请求: json数据格式)
app.use(bodyParser.urlencoded({extended: false})) // 解析请求体(表单数据)

//注册路由器
app.use('/api', appRouter)

// 绑定一个链接
io.on('connection', function (socket) {
	console.log('socket connected')
	//绑定 sendMsg监听，接收客户端消息
	socket.on('sendMessage', function ({from, to, content}) {
		console.log('服务器收到浏览器消息', {from, to, content})
		// 将消息保存到数据库
		const create_time = Date.now() //当前时间
		const chat_id = [from, to].sort().join('_') //代表两个人的会话
		const read = false
		const chatModel = new ChatModel({from, to, content, chat_id, read, create_time})
		chatModel.save(function (err, chatMsg) {
			//	向客户端发消息(保存完成后, 分发消息)
			io.emit('receiveMessage', chatMsg)
		})

		/*io.emit('receiveMessage', {from, to, content})
		console.log('向客户端发消息', {from, to, content})*/
	})
})

// 4. 启动服务器(使用app监听指定端口)
server.listen(5000, () => {
	console.log('start server at port 5000')
})