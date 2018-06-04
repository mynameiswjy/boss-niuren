import React, {Component} from 'react'
import {NavBar, WingBlank, List, Button, InputItem, TextareaItem} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import AvatarSelector from '../../components/avatar-selector/avatar-selector'
import {update} from '../../redux/actions'

class BossInfo extends Component {
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
    console.log(this.props)
    this.props.update(this.state)
  }
  setAvatar = (avatar) => {
    this.setState({
      avatar
    })
  }
  render () {
    const {avatar} = this.props.user
    if (avatar) {
      // this.props.history.replace('/boss')
      return <Redirect to='/boss'></Redirect>
    }
    return (
      <div>
        <NavBar>boss信息完善</NavBar>
        <AvatarSelector setAvatar = {this.setAvatar}/>
        <WingBlank>
          <List>
            <InputItem onChange={val => this.handleChange('title', val)}>招聘职位：</InputItem>
            <InputItem onChange={val => this.handleChange('company', val)}>公司名称：</InputItem>
            <InputItem onChange={val => this.handleChange('money', val)}>职位薪资：</InputItem>
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
)(BossInfo)