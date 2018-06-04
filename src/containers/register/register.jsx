import React, {Component} from 'react'
import {WingBlank, List, InputItem, WhiteSpace, Button, Radio} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Logo from '../../components/logo/logo'
import {register} from '../../redux/actions'

const RadioItem = Radio.RadioItem

class Register extends Component {
  state = {
    name: '',
    pwd: '',
    pwd2: '',
    type: 'boss'
  }
  handleChange = (name, val) => {
    this.setState({
      [name]: val
    })
  }
  btnRegister = () => {
    this.props.register(this.state)
  }
  login = () => {
    this.props.history.replace('./login')
  }

  render() {
    const {msg, redirectTo} = this.props
    if (redirectTo) {
      return <Redirect to={redirectTo}/>
    }
    return (
      <div>
        <Logo/>
        <WingBlank>
          {msg ? <p className='error-text'>{msg}</p> : ''}
          <List>
            <InputItem onChange={val => this.handleChange('name', val)}>用户名:</InputItem>
            <InputItem onChange={val => this.handleChange('pwd', val)} type='password'>密码:</InputItem>
            <InputItem onChange={val => this.handleChange('pwd2', val)} type='password'>确认密码:</InputItem>
            <RadioItem onChange={() => this.handleChange('type', 'niuren')} checked={this.state.type === 'niuren'}>牛人</RadioItem>
            <RadioItem onChange={() => this.handleChange('type', 'boss')} checked={this.state.type === 'boss'}>Boss</RadioItem>
            <WhiteSpace/>
            <Button onClick={this.btnRegister} type='primary'>注 册</Button>
            <WhiteSpace/>
            <Button onClick={this.login}>已经有账号</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => state.user,
  {register}
)(Register)