/*
* 对话聊天路由组件
* */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavBar, List, InputItem} from 'antd-mobile'

import {sendMsg, getServerMsg, getUserChatMsgsList} from '../../redux/actions'

const Item = List.Item

class Chat extends Component {
	state = {
		content: ''
	}

	handleSubmit = () => {
		const content = this.state.content
		const from = this.props.user._id
		const to = this.props.match.params.userId
		this.props.sendMsg({from, to, content})
		this.state.content = ''
	}
	componentDidMount () {
		// 绑定接收服务器发送的消息
		this.props.getServerMsg()

		this.props.getUserChatMsgsList()
	}

	render() {
		const userId = this.props.match.params.userId
		const ownId = this.props.user._id
		// 取出数据
		const {chatMsgs, users} = this.props.chat
		const currentId = [userId, ownId].sort().join('_')
		// 过滤
		const showMsgs = chatMsgs.filter(msg => msg.chat_id === currentId)
		return (
			<div id='chat-page'>
				<NavBar>{userId}</NavBar>
				<List>
					{
						showMsgs.map((item, index) => {
							if(item.from === userId) {// 别人发过来的
								return (
									<Item key={index} thumb={require(`../../assets/imgs/${users[userId].avatar}.png`)}>
										{item.content}
									</Item>
								)
							} else {
								return (
									<Item key={index} thumb={require(`../../assets/imgs/${this.props.user.avatar}.png`)} className='chat-me'>
										{item.content}
									</Item>
								)
							}
						})
					}

				</List>
				<div className='am-tab-bar'>
					<InputItem
						placehoder='请输入'
						value={this.state.content}
						extra={
							<span onClick={this.handleSubmit}>发送</span>
						}
						onChange={val => {this.setState({content: val})}}
					/>
				</div>
			</div>
		)
	}
}

export default connect(
	state => ({user: state.user, chat: state.chat}),
	{sendMsg, getServerMsg, getUserChatMsgsList}
)(Chat)