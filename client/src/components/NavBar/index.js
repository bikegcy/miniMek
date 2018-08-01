import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

const { Header } = Layout;

class NavBar extends Component {

  constructor(props) {
    super(props);
    console.log(this.props.selectedKeys);
    this.state = {
      selectedKeys: this.props.selectedKeys
    }
  }


  render() {
    const selectedKeys=this.props.selectedKeys;
    return(
      <Header style={{ zIndex: 1, width: '100%' }}>
        <div className="logo" onClick={this.props.onClickHome}>
          <Link to="/" ><p className="logo-text"> MiniMek </p></Link>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['heroes']}
          style={{ lineHeight: '64px' }}
          selectedKeys={selectedKeys}
        >
          <Menu.Item key="unitInfo" onClick={this.props.onClickMenu} inlineCollapsed={true}>
            <Link to="/unitInfo" ><Icon type="team" />Unit Info</Link>
          </Menu.Item>
          <Menu.Item key="heroes" onClick={this.props.onClickMenu}>
            <Link to="/heroes" ><Icon type="user" />Heroes</Link>
          </Menu.Item>
          <Menu.Item key="mechs" onClick={this.props.onClickMenu}>
            <Link to="/mechs" ><Icon type="rocket" />Mechs</Link>
          </Menu.Item>
          <Menu.Item key="unitOrg" onClick={this.props.onClickMenu}>
            <Link to="/unitOrg" ><Icon type="idcard" />Unit Organization</Link>
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default NavBar;