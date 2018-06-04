import React from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

const Item = TabBar.Item

class NavFooter extends React.Component {

	static propTypes = {
		navList: PropTypes.array.isRequired
	}

	render() {
		const navList = this.props.navList.filter(v => !v.hide)
		const {pathname} = this.props.location
		return (
			<div className='nav-footer'>
				<TabBar>
					{navList.map(v => (
						<Item
							key={v.path}
							title={v.text}
							icon={{uri: require(`./img/${v.icon}.png`)}}
							selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
							selected={pathname === v.path}
							onPress={() => {
								this.props.history.replace(v.path)
							}}
						>
						</Item>
					))}
				</TabBar>
			</div>
		)
	}
}

export default withRouter(NavFooter)