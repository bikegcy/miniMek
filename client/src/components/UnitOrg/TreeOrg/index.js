import React, {Component} from 'react';
import { Tree, Icon } from 'antd';

const TreeNode = Tree.TreeNode;

class TreeOrg extends Component {

  render() {
    const data = this.props.treeData || {};
    if (!data.damageTeam) data.damageTeam = [];
    if (!data.tankTeam) data.tankTeam = [];
    if (!data.supportTeam) data.supportTeam = [];
    // const icons = [
    //   'https://vignette.wikia.nocookie.net/overwatch/images/6/6b/Pi_defaultwhite.png/revision/' +
    //   'latest/scale-to-width-down/100?cb=20160704195247',
    //   'https://vignette.wikia.nocookie.net/overwatch/images/5/53/Pi_defaultblack.png/revision/' +
    //   'latest/scale-to-width-down/100?cb=20160704195235',
    //   'https://vignette.wikia.nocookie.net/overwatch/images/2/2c/Pi_tracer.png/revision/latest/' +
    //   'scale-to-width-down/100?cb=20160704195837',
    //   'https://vignette.wikia.nocookie.net/overwatch/images/a/ac/Pi_piggy.png/revision/latest/' +
    //   'scale-to-width-down/100?cb=20160706001324',
    //   'https://vignette.wikia.nocookie.net/overwatch/images/f/ff/Pi_bunny.png/revision/latest/' +
    //   'scale-to-width-down/100?cb=20160706000740',
    //   'https://vignette.wikia.nocookie.net/overwatch/images/6/6a/Pi_genji.png/revision/latest/' +
    //   'scale-to-width-down/100?cb=20160704195433',
    //   'https://vignette.wikia.nocookie.net/overwatch/images/d/de/Monkey_icon.png/revision/latest/' +
    //   'scale-to-width-down/100?cb=20170125171656',
    //   'https://vignette.wikia.nocookie.net/overwatch/images/b/bf/Pi_tankcrossing.png/revision/latest/' +
    //   'scale-to-width-down/100?cb=20160706000712',
    //   'https://vignette.wikia.nocookie.net/overwatch/images/b/b5/Pi_reaper.png/revision/latest/' +
    //   'scale-to-width-down/100?cb=20160704195731'
    // ];
    console.log('treeData: ', data);
    return(
      <Tree
        showIcon
        defaultExpandAll
        defaultSelectedKeys={['0-0-0']}
      >
        <TreeNode icon={<Icon type="smile-o" />} title={data.name} key="0-0">
          <TreeNode icon={<Icon type="smile-o" />} title="Damage Team" key="0-0-0" >
            {data.damageTeam.map((item, index) => {
              return <TreeNode icon={<Icon type="usb" />} title={item} key={item} />})
            }
          </TreeNode>
          <TreeNode icon={<Icon type="smile-o" />} title="Tank Team" key="0-0-1" >
            {data.tankTeam.map((item, index) => {
              return <TreeNode icon={<Icon type="safety" />} title={item} key={item} />})
            }
          </TreeNode>
          <TreeNode icon={<Icon type="smile-o" />} title="Support Team" key="0-0-2" >
            {data.supportTeam.map((item, index) => {
              return <TreeNode icon={<Icon type="medicine-box" />} title={item} key={item} />})
            }
          </TreeNode>

        </TreeNode>
      </Tree>
    );
  }
}

export default TreeOrg;