import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

import './style.css';

class Home extends Component {
  render() {
    return(
      <div className="home">

      </div>
    );
  }
}

const WithRouterHome = withRouter(Home);

export default WithRouterHome;