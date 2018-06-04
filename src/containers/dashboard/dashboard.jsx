import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import cookies from 'browser-cookies'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import BoosInfo from '../boss-info/boss-info'
import NiurenInfo from '../niuren-info/niuren-info'
import NotFound from '../../components/not-found/not-found'
import Boss from '../boss/boss'
import Chat from '../chat/chat'
import Niuren from '../niuren/niuren'
import Msg from '../msg/msg'
import User from '../user/user'
import {getUserInfo} from '../../redux/actions'
import {getRedirecTo} from '../../utils'
import NavFooter from '../../components/nav-footer/nav-footer'


class Dashboard extends Component {
  navList = [
    {
      path: '/niuren', // 路由路径
      component: Niuren,
      title: '牛人列表',
      icon: 'job',
      text: '牛人',
      hide: false
    },
    {
      path: '/boss', // 路由路径
      component: Boss,
      title: 'BOSS列表',
      icon: 'boss',
      text: 'BOSS',
      hide: false
    },
    {
      path: '/msg', // 路由路径
      component: Msg,
      title: '消息列表',
      icon: 'msg',
      text: '消息',
			hide: false
    },
    {
      path: '/me', // 路由路径
      component: User,
      title: '个人中心',
      icon: 'user',
      text: '我',
			hide: false
    }
  ]
  componentDidMount(){
    // 取出cookie中的id
    const UserId = cookies.get('UserId')
    // 取出本地user对象
    const user = this.props.user

    // 判断本地user如果没有就去发送请求  而且有本地cookie
    if (UserId && !user._id) {
      this.props.getUserInfo()
    }
  }


  render() {
    const userId = cookies.get('UserId')
    const {user, location} = this.props
		const currentNav = this.navList.find(nav => nav.path === location.pathname)
    if (!userId && !user.type) {
      return <Redirect to='/login'></Redirect>
    }
    if (user.type) {
			if (location.pathname === '/') {
				// 计算需要跳转的路由
				const path = getRedirecTo(user.type, user.avatar)
				// 跳转
				return <Redirect to={path}></Redirect>
			}
			if (user.type === 'boss') {
				// 显示第一个
				this.navList[0].hide = true
			} else {
				this.navList[1].hide = true
			}
		}

    return (
      <div>
        <Switch>
          <Route path='/bossinfo' component={BoosInfo}/>
          <Route path='/niureninfo' component={NiurenInfo}/>
          <Route path='/chat/:userId' component={Chat}/>
          {
            this.navList.map((nav, index) => {
              return <Route key={index} path={nav.path} component={nav.component}/>
            })
          }
          <Route component={NotFound}></Route>
        </Switch>
        {currentNav ? <NavFooter navList={this.navList}/> : null}
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {getUserInfo}
)(Dashboard)