import React, {Component} from 'react'
import {WingBlank, List, InputItem, WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Logo from '../../components/logo/logo'
import {login} from '../../redux/actions'

class Login extends Component {
  state = {
    name: '',
    pwd: ''
  }
  register = () => {
    this.props.history.replace('./register')
  }
  handleChange = (name, val) => {
    this.setState({
      [name]: val
    })
  }
  btnLogin = () => {
    this.props.login(this.state)
  }
  render() {
    const {redirectTo, msg} = this.props
    if (redirectTo) {
      return <Redirect to={redirectTo}/>
    }
    return (
      <div>
        <Logo></Logo>
        <WingBlank>
          {msg ? <p className='error-text'>{msg}</p> : ''}
          <List>
            <InputItem onChange={val => this.handleChange('name', val)}>用户</InputItem>
            <InputItem onChange={val => this.handleChange('pwd', val)} type='password'>密码</InputItem>
            <WhiteSpace/>
          </List>
            <Button onClick={this.btnLogin} type='primary'>登录</Button>
            <WhiteSpace/>
            <Button onClick={this.register}>还没有账号</Button>
        </WingBlank>
      </div>
    )
  }
}
export default connect(
  state => state.user,
  {login}
)(Login)