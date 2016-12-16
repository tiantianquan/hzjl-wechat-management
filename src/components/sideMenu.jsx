import React, { Component } from 'react'
import { withRouter, Link } from 'react-router'
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

class SideMenu extends Component {
  constructor(props) {
    super(props)
    console.log(this.props.location.pathname)
    this.state = {
      current: this.props.location.pathname.split('/')[1],
    }
  }

  _handleClick = (e) => {
    this.setState({
      current: e.key,
    })
  }
  render() {
    return (
      <Menu onClick={this._handleClick}
        // style={{ width: '100%' }}
        defaultOpenKeys={['sub1']}
        selectedKeys={[this.state.current]}
        mode="inline"
        >
        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
          <Menu.Item key="WechatAccountList"><Link to='/WechatAccountList'>微信账户管理</Link></Menu.Item>
          <Menu.Item key="CategoryList"><Link to='/CategoryList'>图文消息分类管理</Link></Menu.Item>
          <Menu.Item key="NewsList"><Link to='/NewsList'>图文消息管理</Link></Menu.Item>
        </SubMenu>
      </Menu>
    )
  }
}

export default withRouter(SideMenu)
