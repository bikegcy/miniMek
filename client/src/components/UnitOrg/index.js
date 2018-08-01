import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import TreeOrg from './TreeOrg';
import { connect } from 'react-redux';
import { getUnit} from "../../actions/unitActions";

class UnitOrg extends Component {

  componentDidMount() {
    this.props.getUnit();
  }

  render() {

    let unitInfo = this.props.unit.unit[0] || {};
    console.log('unit info org: ', unitInfo);
    return(
      <div>
        <div style={{ height: 400 }}>
          <TreeOrg
            treeData={unitInfo}
          />
        </div>
      </div>
    );
  }
}

const WithRouterUnitOrg = withRouter(UnitOrg);

const mapStateToProps = state => ({
  unit: state.unit
});

export default connect(
  mapStateToProps,
  { getUnit }
)(WithRouterUnitOrg);