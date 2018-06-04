/*
* boss主面板
* */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavBar, WingBlank} from 'antd-mobile'

import UserList from '../../components/user-list/user-list'
import {getUserList} from '../../redux/actions'

class Boss extends Component {
	componentWillMount() {
		this.props.getUserList('niuren')
	}
  render () {
		const {userList} = this.props
		return (
      <div>
				<NavBar>牛人列表</NavBar>
				<UserList userList={userList}/>
				<WingBlank>
				</WingBlank>
      </div>
    )
  }
}

export default connect(
	state => ({userList: state.userList}),
	{getUserList}
)(Boss)