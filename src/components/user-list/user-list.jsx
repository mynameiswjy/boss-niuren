//用户列表组件
/*
* react模板
* */
import React, {Component} from 'react'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

const Header = Card.Header
const Body = Card.Body

class UserList extends Component {
	static propTypes = {
		userList: PropTypes.array.isRequired
	}
	handleClick = (user) => {
		this.props.history.push(`/chat/${user._id}`)
	}

  render () {
  	console.log(this.props)
    return (
			<WingBlank>
				{
					this.props.userList.map(item => {
						return <div key={item._id}>
							<WhiteSpace/>
							<Card onClick={() => this.handleClick(item)}>
								<Header
									title={item.name}
									thumb={require(`../../assets/imgs/${item.avatar}.png`)}
									extra={<span>{item.title}</span>}
								/>
								<Body>
								{item.type === 'boss' ? (<div>公司: {item.company}</div>) : null}
								<div>描述: {item.desc}</div>
								{item.type === 'boss' ? (<div>薪资: {item.money}</div>) : null}
								</Body>
							</Card>
						</div>
					})
				}
			</WingBlank>
    )
  }
}

export default withRouter(UserList)