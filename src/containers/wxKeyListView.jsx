import React, { Component } from 'react'
import { Table, Modal, Button } from 'antd'
import { Link ,withRouter} from 'react-router'


const { Column} = Table

const demoData = [{
  Name: 'HBH',
  AppID: 1231,
  AppSecret: 1231,
}]

class WxKeyListView extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      modal: false
    }
  }

  handleCancel = () => {
    // this.setState({ modal: false })
     this.props.router.push({pathname:this.props.location.state.returnTo})
    //  this.setState({ modal: false })
  }
  componentWillReceiveProps(nextProps) {
    if (!!nextProps.location.state && !!nextProps.location.state.modal) {
      this.setState({ modal: true })
    }else{
      this.setState({ modal: false })
    }
  }

  render() {
    return (
      <div>
        <Table dataSource={demoData} bordered>
          <Column
            title="Name"
            dataIndex="Name"
            key="Name"
            />
          <Column
            title="AppID"
            dataIndex="AppID"
            key="AppID"
            />
          <Column
            title="AppSecret"
            dataIndex="AppSecret"
            key="AppSecret"
            />
          <Column
            title="操作"
            key="action"
            render={(text, record) => (
              <span>
                {/*<a onClick={() => {
                  this.setState((state, props) => {
                    return {
                      modal: true
                    }
                  })
                } }>编辑</a>*/}
                <Link to={{
                  pathname: `WxKeyList/Edit/${record.Name}`,
                  state: {
                    modal: true,
                    returnTo: this.props.location.pathname
                  }
                }}> 编辑</Link>
              </span>
            )}
            />
        </Table>
        <Modal
          // visible={this.state.modal}
          visible={this.state.modal}
          title="Title"
          // onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>Return</Button>,
            <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
          >
          {this.props.children}
        </Modal>
      </div>
    )
  }
}

export default withRouter(WxKeyListView);