import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Radio, Select, Avatar, Button, message } from 'antd';
import ColorPicker from './ColorPicker';
import './style.css';

import { connect } from 'react-redux';
import { getUnit, updateUnit } from "../../actions/unitActions";
import { getHeroes } from "../../actions/heroActions";

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class UnitInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      color: {
        r: '254',
        g: '146',
        b: '0',
        a: '1'
      }
    }
  }

  componentDidMount() {
    this.props.getUnit();
    this.props.getHeroes();
    console.log('unit props: ', this.props.unit);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({...values});
        console.log('Received values of form: ', values);
        // do a store request here
        const newUnit = {
          _id:         this.props.unit.unit[0]._id,
          name:        values.name,
          affiliation: values.affiliation,
          icon:        values.icon,
          color:       values.color,
          damageTeam:  values.damageTeam,
          tankTeam:    values.tankTeam,
          supportTeam: values.supportTeam
        };
        console.log('new unit: ', newUnit);
        this.props.updateUnit(newUnit);
        message.success('Unit info submit success', 2);
        this.props.form.resetFields();
      }
    });

  };

  handleColor = (selectedColor) => {
    this.props.form.setFieldsValue({
      color: selectedColor
    });
    this.setState({
      color: selectedColor
    })
  };

  render () {
    console.log('unit props: ', this.props.unit);
    const { getFieldDecorator } = this.props.form;
    let damages = this.props.hero.heroes;
    let damageTeam = damages.filter(hero => {
      if (hero.role === 'damage') return hero;
    }) || [];
    let tankTeam = this.props.hero.heroes.filter(hero => {
      if (hero.role === 'tank') return hero;
    }) || [];
    let supportTeam = this.props.hero.heroes.filter(hero => {
      if (hero.role === 'support') return hero;
    }) || [];
    console.log('attack team',damageTeam);
    const formItemLayout = {
      labelCol: {
        xs: { span: 15 },
        sm: { span: 9 },
      },
      wrapperCol: {
        xs: { span: 8 },
        sm: { span: 6 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 10,
        },
      },
    };
    const color = this.state.color;
    const icons = [
      'https://vignette.wikia.nocookie.net/overwatch/images/6/6b/Pi_defaultwhite.png/revision/' +
      'latest/scale-to-width-down/100?cb=20160704195247',
      'https://vignette.wikia.nocookie.net/overwatch/images/5/53/Pi_defaultblack.png/revision/' +
      'latest/scale-to-width-down/100?cb=20160704195235',
      'https://vignette.wikia.nocookie.net/overwatch/images/2/2c/Pi_tracer.png/revision/latest/' +
      'scale-to-width-down/100?cb=20160704195837',
      'https://vignette.wikia.nocookie.net/overwatch/images/a/ac/Pi_piggy.png/revision/latest/' +
      'scale-to-width-down/100?cb=20160706001324',
      'https://vignette.wikia.nocookie.net/overwatch/images/f/ff/Pi_bunny.png/revision/latest/' +
      'scale-to-width-down/100?cb=20160706000740',
      'https://vignette.wikia.nocookie.net/overwatch/images/6/6a/Pi_genji.png/revision/latest/' +
      'scale-to-width-down/100?cb=20160704195433',
      'https://vignette.wikia.nocookie.net/overwatch/images/d/de/Monkey_icon.png/revision/latest/' +
      'scale-to-width-down/100?cb=20170125171656',
      'https://vignette.wikia.nocookie.net/overwatch/images/b/bf/Pi_tankcrossing.png/revision/latest/' +
      'scale-to-width-down/100?cb=20160706000712',
      'https://vignette.wikia.nocookie.net/overwatch/images/b/b5/Pi_reaper.png/revision/latest/' +
      'scale-to-width-down/100?cb=20160704195731'
    ];
    return(
      <Form onSubmit={this.handleSubmit} className="form-type">
        <FormItem {...formItemLayout} label="Unit Name" hasFeedback>
          {getFieldDecorator('name', {
            rules: [{
              required: true, message: 'Please set the unit name!',
            }],
          })(
            <Input placeholder="Choose your unit name"/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Affiliation" hasFeedback>
          {getFieldDecorator('affiliation', {
            rules: [{
              required: true, message: 'Please set the affiliation name!',
            }],
          })(
            <Select
              placeholder="Select affiliation"
            >
              <Option value="overwatch">Overwatch</Option>
              <Option value="blackwatch">Blackwatch</Option>
              <Option value="talon">Talon</Option>
              <Option value="helix">Helix Security International</Option>
              <Option value="mobile">Mobile Exo-Froce</Option>
              <Option value="vishkar">Vishkar</Option>
              <Option value="russian">Russian Defense Forces</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Icon"
          hasFeedback
        >
          {getFieldDecorator('icon', {
            rules: [{
              required: true, message: 'Please select an icon!',
            }],
          })(
            <RadioGroup>
              <Radio value={'whiteOverwatch'}> <Avatar size='large' src={icons[0]} /> </Radio>
              <Radio value={'blackOverwatch'}> <Avatar size='large' src={icons[1]} /> </Radio>
              <Radio value={'tracer'}>         <Avatar size='large' src={icons[2]} /> </Radio>
              <Radio value={'roadhog'}>        <Avatar size='large' src={icons[3]} /> </Radio>
              <Radio value={'dva'}>            <Avatar size='large' src={icons[4]} /> </Radio>
              <Radio value={'genji'}>          <Avatar size='large' src={icons[5]} /> </Radio>
              <Radio value={'winston'}>        <Avatar size='large' src={icons[6]} /> </Radio>
              <Radio value={'bastion'}>        <Avatar size='large' src={icons[7]} /> </Radio>
              <Radio value={'reaper'}>         <Avatar size='large' src={icons[8]} /> </Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Color"
          hasFeedback
        >
          {getFieldDecorator('color', {
            rules: [{
              required: true, message: 'Please select the unit main color!',
            }],
          })(
            <ColorPicker handleColor={this.handleColor} color={color}/>
          )}

        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Damage Team"
          hasFeedback
        >
          {getFieldDecorator('damageTeam', {
            rules: [{
              required: true, message: 'Please select the attack team!',
            }],
          })(
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Please select the damage team member"
            >
              {damageTeam.map((hero, index) => {
                return <Option key={hero._id} value={hero.name + ' ' + hero.mech}>{hero.name}</Option>
              })}
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Tank Team"
          hasFeedback
        >
          {getFieldDecorator('tankTeam', {
            rules: [{
              required: true, message: 'Please select the tank team!',
            }],
          })(
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Please select the tank team member"
            >
              {tankTeam.map((hero, index) => {
                return <Option key={hero._id} value={hero.name + ' ' +  hero.mech}>{hero.name}</Option>
              })}
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Support Team"
          hasFeedback
        >
          {getFieldDecorator('supportTeam', {
            rules: [{
              required: true, message: 'Please select the support team!',
            }],
          })(
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Please select the support team member"
            >
              {supportTeam.map((hero, index) => {
                return <Option key={hero._id} value={hero.name + ' ' +  hero.mech}>{hero.name}</Option>
              })}
            </Select>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedForm = Form.create()(UnitInfo);

const WithRouterUnitInfo = withRouter(WrappedForm);

const mapStateToProps = state => ({
  unit: state.unit,
  hero: state.hero
});

export default connect(
  mapStateToProps,
  { getUnit, updateUnit, getHeroes }
)(WithRouterUnitInfo);
