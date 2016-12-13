import React from 'react'
import { withRouter } from 'react-router'
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

const SideMenu = withRouter(React.createClass({
  getInitialState() {
    return {
      current: '1',
    }
  },
  handleClick(e) {
    console.log('click ', e)
    this.setState({
      current: e.key,
    })

    this.props.router.push(`/WxKeyList`)
  },
  render() {
    return (
      <Menu onClick={this.handleClick}
        // style={{ width: '100%' }}
        defaultOpenKeys={['sub1']}
        selectedKeys={[this.state.current]}
        mode="inline"
        >
        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
          <Menu.Item key="1">Option 1</Menu.Item>
          <Menu.Item key="2">Option 2</Menu.Item>
          <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
        </SubMenu>
      </Menu>
    )
  },
}))

export default SideMenu
