/*
* user 信息面板
* */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Result, Modal, NavBar, WhiteSpace, Button} from 'antd-mobile'
import cookies from 'browser-cookies'

import {resetUser} from '../../redux/actions'

const Item = List.Item
const Brief = Item.Brief

class User extends Component {
  handleClick = () => {
  	console.log(this.props)
  	const {resetUser} = this.props
  	Modal.alert('警告', '你确定退出吗？', [
			{text: '我再想想'},
			{
				text: '残忍拒绝',
				onPress() {
					// 清除cookie 以及内部user信息
					cookies.erase('UserId')
					resetUser()
				}
			}
			])
  	/*this.props.history.replace('/login')
		return null*/
	}
	render () {
    const {user} = this.props
    if (!user.avatar) return null
		return (
			<div>
        <NavBar>个人中心</NavBar>
				<Result
					img={<img src={require(`../../assets/imgs/${user.avatar}.png`)} style={{width: 50}} alt="avatar"/>}
					title={user.name}
					message={user.company}
				/>
        <List renderHeader = {() => '相关信息'}>
          <Item>
            <Brief>职位：{user.title}</Brief>
            <Brief>简介：{user.desc}</Brief>
            <Brief>薪资：{user.money}</Brief>
          </Item>
          <WhiteSpace/>
          <Button onClick={this.handleClick}>退出登录</Button>
        </List>
			</div>
		)
	}
}

export default connect(
	state => ({user: state.user}),
	{resetUser}
)(User)