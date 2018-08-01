import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { Layout, Breadcrumb } from 'antd';
import './App.css';
import NavBar from '../NavBar';
import WithRouterHome from '../Home';
import WithRouterHeroes from '../Heroes';
import WithRouterUnitInfo from "../UnitInfo";
import WithRouterMechs from "../Mechs";
import WithRouterUnitOrg from "../UnitOrg";

import { Provider } from 'react-redux';
import store from '../../store';

const { Content, Footer } = Layout;


class App extends Component {
  constructor() {
    super();
    this.state = {
      key: "",
      selectedKeys: []
    };
  }

  componentDidMount() {
    //console.log('location: ', window.location.href);
    const curLink = window.location.href.split('/').pop();
    //console.log(curLink);
    this.setState({
      key: curLink,
      selectedKeys: [curLink]
    });
  }

  onClickMenu = e => {
    this.setState({
      key: e.key,
      selectedKeys: [e.key]
    });
  };

  onClickHome = () => {
    console.log('hello this is home');

    this.setState({
      key: "",
      selectedKeys: []
    })
  };

  render() {

    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Layout>
              <NavBar
                onClickHome={this.onClickHome}
                onClickMenu={this.onClickMenu}
                selectedKeys={this.state.selectedKeys}
              />
              <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>
                    <Link to="/" onClick={this.onClickHome}>home</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    {this.state.key}
                  </Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
                  <Switch>
                    <Route
                      exact={true}
                      path="/"
                      render={() => (
                        <WithRouterHome />
                      )}
                    />
                    <Route
                      exact={true}
                      path="/unitInfo"
                      render={() => (
                        <WithRouterUnitInfo />
                      )}
                    />
                    <Route
                      exact={true}
                      path="/heroes"
                      render={() => (
                        <WithRouterHeroes />
                      )}
                    />
                    <Route
                      exact={true}
                      path="/mechs"
                      render={() => (
                        <WithRouterMechs />
                      )}
                    />
                    <Route
                      exact={true}
                      path="/unitOrg"
                      render={() => (
                        <WithRouterUnitOrg />
                      )}
                    />
                  </Switch>
                </div>
              </Content>
              <Footer style={{ textAlign: 'center', padding: "8 8 50 50"}}>
                Powered by Ant Design
              </Footer>
            </Layout>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
