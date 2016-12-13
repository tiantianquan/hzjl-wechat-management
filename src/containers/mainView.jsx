import React from 'react'
import { Row, Col } from 'antd'
import { SideMenu } from '../components'

const MainView = React.createClass({
  render() {
    return (
      <div className='main-view-wrapper'>
        <div className='side-menu-wrapper' >
          <SideMenu />
        </div>
        <div className='content-wrapper'>
          {this.props.children}
        </div>
      </div>
    )
  }
})

export default MainView