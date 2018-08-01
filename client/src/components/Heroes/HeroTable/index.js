import React, {Component} from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import { getHeroes, updateHero} from "../../../actions/heroActions";
import '../style.css';

class HeroTable extends Component {

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
    console.log('get Heroes here');
    this.props.getHeroes();
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
    let oriData = this.props.hero.heroes || [];
    oriData.forEach(hero => {
      hero.ability = hero.damage + ' / ' + hero.health;
    });
    const data = oriData;
    console.log('redux store', this.props.hero);
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => { return a.name.localeCompare(b.name)},
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order
    }, {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      sorter: (a, b) => { return a.role.localeCompare(b.role)},
      sortOrder: sortedInfo.columnKey === 'role' && sortedInfo.order
    }, {
      title: 'Affiliation',
      dataIndex: 'affiliation',
      key: 'affiliation',
      sorter: (a, b) => { return a.affiliation.localeCompare(b.affiliation)},
      sortOrder: sortedInfo.columnKey === 'affiliation' && sortedInfo.order
    }, {
      title: 'Weapon',
      dataIndex: 'weapon',
      key: 'weapon',
      sorter: (a, b) => { return a.weapon.localeCompare(b.weapon)},
      sortOrder: sortedInfo.columnKey === 'weapon' && sortedInfo.order
    }, {
      title: 'Ability',
      dataIndex: 'ability',
      key: 'ability',
      sorter: (a, b) => { return a.ability.localeCompare(b.ability)},
      sortOrder: sortedInfo.columnKey === 'ability' && sortedInfo.order
    }, {
      title: 'Mech',
      dataIndex: 'mech',
      key: 'mech',
      sorter: (a, b) => { return a.mech.localeCompare(b.mech)},
      sortOrder: sortedInfo.columnKey === 'mech' && sortedInfo.order
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
        columns={columns}
        dataSource={data}
        rowKey="name"
        pagination={pagination}
        locale={{emptyText: 'No Data'}}
        onChange={this.handleChange}
      />
    );
  }
}

const mapStateToProps = state => ({
  hero: state.hero
});

export default connect(
  mapStateToProps,
  { getHeroes, updateHero}
)(HeroTable);