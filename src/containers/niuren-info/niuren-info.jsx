import React, {Component} from 'react'
import {NavBar, WingBlank, List, InputItem, Button, TextareaItem} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import AvatarSelector from '../../components/avatar-selector/avatar-selector'
import {update} from '../../redux/actions'

class NiurenInfo extends Component {
  state = {
    avatar: '', // 头像
    company: '', //公司名称
    title: '', //职位名
    money: '',  // 薪资
    desc: ''
  }
  handleChange = (name, val) => {
    this.setState({
      [name]: val
    })
  }
  saveBtn = () => {
    console.log(this.state)
    this.props.update(this.state)
  }
  setAvatar = (avatar) => {
    this.setState({
      avatar
    })
  }

  render() {
    const {avatar} = this.props.user
    if (avatar) {
      return <Redirect to='/niuren'></Redirect>
    }
    return (
      <div>
        <NavBar>牛人信息完善</NavBar>
        <AvatarSelector setAvatar={this.setAvatar}/>
        <WingBlank>
          <List>
            <InputItem onChange={val => this.handleChange('title', val)}>求职岗位：</InputItem>
            <TextareaItem onChange={val => this.handleChange('desc', val)} title='职位要求：' rows={3}/>
            <Button onClick={this.saveBtn} type='primary'>保存</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {update}
)(NiurenInfo)