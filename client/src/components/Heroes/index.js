import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';
import './style.css';
import HeroTable from "./HeroTable";
import HeroDetail from "./HeroDetail";


class Heroes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      curRecord: {}
    }
  }


  handleRowClick = (record) => {
    this.setState({
      curRecord: record
    });
  };

  render() {

    return(
      <div>
        <p>The world could always need more heroes.</p>
        <Row type="flex" align="middle">
          <Col className="hero-table" span={16}>
            <div className="hero">
              <HeroTable
                handleRowClick={this.handleRowClick}
              />
            </div>

          </Col>
          <Col className="hero-detail" offset={1} span={7}>
            <div className="center-hero-detail">
              <HeroDetail
                key={this.state.curRecord.name}
                rowData={this.state.curRecord}
              />
            </div>

          </Col>
        </Row>
      </div>
    );
  }
}

const WithRouterHeroes = withRouter(Heroes);

export default WithRouterHeroes;