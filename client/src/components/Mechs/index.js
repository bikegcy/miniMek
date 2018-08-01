import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';
import MechTable from './MechTable';
import MechDetail from './MechDetail';
import './style.css';

class Mechs extends Component {

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
        <p>Reactor online, sensors online, weapons online. All systems nominal.</p>
        <Row type="flex" align="middle">
          <Col className="mech-table" span={16}>
            <div className="mech">
              <MechTable
                handleRowClick={this.handleRowClick}
              />
            </div>
          </Col>
          <Col className="mech-detail" offset={1} span={7}>
            <div className="center-mech-detail">
              <MechDetail
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

const WithRouterMechs = withRouter(Mechs);

export default WithRouterMechs;