import React, {Component} from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import { getMechs, updateMech} from "../../../actions/mechActions";
import '../style.css';

class MechTable extends Component {

  constructor() {
    super();
    this.state = {
      sortedInfo: null,
      pagination: {
        showSizeChanger: true,
        defaultPageSize: 10,
        pageSize: 10,
        onShowSizeChange: this.onShowSizeChange
      }
    };
  }

  componentDidMount() {
    console.log('this is component did mount');
    this.props.getMechs();
  }

  handleChange = ( pagination, filter, sorter ) => {
    //console.log('various parameters sorter: ', pagination);
    //console.log('sorter: ', sorter);
    this.setState({
      sortedInfo: sorter
    });
  };

  onShowSizeChange = (current, pageSize) => {
    let newPage = {...this.state.pagination};
    newPage.pageSize = pageSize;
    this.setState({
      pagination: newPage
    })
  };

  render() {
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};
    const data = this.props.mech.mechs;
    console.log('redux mech store', this.props.mech);
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => { return a.name.localeCompare(b.name)},
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order
    }, {
      title: 'Model',
      dataIndex: 'model',
      key: 'model',
      sorter: (a, b) => { return a.model.localeCompare(b.model)},
      sortOrder: sortedInfo.columnKey === 'model' && sortedInfo.order
    },  {
      title: 'Weight',
      dataIndex: 'weight',
      key: 'weight',
      sorter: (a, b) => a.weight - b.weight,
      sortOrder: sortedInfo.columnKey === 'weight' && sortedInfo.order
    }, {
      title: 'Class',
      dataIndex: 'classType',
      key: 'classType',
      sorter: (a, b) => { return a.classType.localeCompare(b.classType)},
      sortOrder: sortedInfo.columnKey === 'classType' && sortedInfo.order
    }];
    const pagination = this.state.pagination;
    return (
      <Table
        onRow={(record) => {
          return {
            onClick: () => {
              //console.log(record);
              this.props.handleRowClick(record);
            },
          };
        }}
        rowKey="name"
        columns={columns}
        dataSource={data}
        pagination={pagination}
        locale={{emptyText: 'No Data'}}
        onChange={this.handleChange}
      />
    );
  }
}

const mapStateToProps = state => ({
  mech: state.mech
});

export default connect(
  mapStateToProps,
  { getMechs, updateMech}
)(MechTable);