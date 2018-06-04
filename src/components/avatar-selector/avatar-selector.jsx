import React, {Component} from 'react'
import {Grid, List} from 'antd-mobile'
import PropTypes from 'prop-types'

export default class AvatarSelector extends Component {
  static propTypes ={
    setAvatar: PropTypes.func.isRequired
  }
  state = {
    icon: null,
    text: ''
  }
  componentWillMount() {// componentWillMount 旨在第一次render之前调用，componentDidMount 在第一次render之后调用
    this.avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
      .split(',')
      .map(text => ({
        icon: require(`../../assets/imgs/${text}.png`),
        text
      }))
  }
  handleClick = (item) => {
    //更新本地状态
    this.setState({icon: item.icon})
    // 更新父组件状态
    this.props.setAvatar(item.text)
  }
  render () {
    const {icon} = this.state
    const header = icon ? (<p className='nav-title'>已选择头像：<img className='nav-icon' src={icon} alt='avatar'/></p>) : '请选择头像'
    return (
      <div>
        <List renderHeader={() => header}>
          <Grid
          data={this.avatarList}
          columnNum={5}
          onClick={this.handleClick}
          ></Grid>
        </List>
      </div>
    )
  }
}