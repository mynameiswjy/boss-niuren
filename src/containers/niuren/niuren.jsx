/*
* 牛人主面板
* */
import React, {Component} from 'react'
import {NavBar} from 'antd-mobile'
import {connect} from 'react-redux'

import UserList from '../../components/user-list/user-list'
import {getUserList} from '../../redux/actions'

class Niuren extends Component {
  componentDidMount() {
    this.props.getUserList('boss')
  }
  render () {
    return (
      <div>
				<NavBar>Boss列表</NavBar>
				<UserList userList={this.props.userList}/>
      </div>
    )
  }
}

export default connect(
  state => ({userList: state.userList}),
  {getUserList}
)(Niuren)