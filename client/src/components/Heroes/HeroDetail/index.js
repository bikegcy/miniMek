import React, {Component} from 'react';
import { Form, Input, Select, Button, message, InputNumber, Icon, Slider } from 'antd';

import { connect } from 'react-redux';
import { getMechs } from "../../../actions/mechActions";
import { updateHero } from "../../../actions/heroActions";

const FormItem = Form.Item;
const Option = Select.Option;

class HeroDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      disabled: true
    };
  }

  componentDidMount() {
    //console.log('see rowData', this.props.rowData.length);
    this.props.getMechs();
    if (this.props.rowData.length > 0) {
      this.props.form.setFieldsValue({
        _id: this.props.rowData._id,
        name: this.props.rowData.name,
        age: this.props.rowData.age,
        role: this.props.rowData.role,
        affiliation: this.props.rowData.affiliation,
        weapon: this.props.rowData.affiliation,
        damage: this.props.rowData.damage,
        health: this.props.rowData.health,
        mech: this.props.rowData.mech
      });
    }

    console.log('mech: ', this.props.mech);
  }

  handleEdit = () => {
    this.setState({disabled: false})
  };

  handleNoEdit = () => {
    this.setState({disabled: true})
  };

  handleReset = () => {
    // this.props.form.setFieldsValue({
    //   name: this.props.rowData.name,
    //   age: this.props.rowData.age,
    //   role: this.props.rowData.role,
    //   ultimate: this.props.rowData.ultimate,
    //   occupation: this.props.rowData.occupation,
    //   affiliation: this.props.rowData.affiliation,
    //   weapon: this.props.rowData.affiliation,
    //   damage: this.props.rowData.damage,
    //   health: this.props.rowData.armor
    // });
    this.setState({disabled: true});
    this.props.form.resetFields();
  };


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({...values});
        console.log('Received values of form: ', values);
        // do a store request here
        const newHero = {
          _id:         this.props.rowData._id,
          name:        values.name,
          age:         values.age,
          role:        values.role,
          affiliation: values.affiliation,
          weapon:      values.weapon,
          damage:      values.damage,
          health:      values.health,
          mech:        values.mech,
          date:        this.props.rowData.date
        };


        if (newHero.name === this.props.rowData.name
          && newHero.age === this.props.rowData.age
          && newHero.role === this.props.rowData.role
          && newHero.affiliation === this.props.rowData.affiliation
          && newHero.weapon === this.props.rowData.weapon
          && newHero.damage === this.props.rowData.damage
          && newHero.health === this.props.rowData.health
          && newHero.mech === this.props.rowData.mech) {
          message.error('There is no change!');
        } else {
          if (!newHero._id) {
            this.props.form.resetFields();
            message.error('Please select the Hero first!', 2);
          } else {
            this.props.updateHero(newHero);
            message.success('Hero info submit success!', 2);
          }
        }
        this.setState({disabled: true});
        //this.props.form.resetFields();
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 6 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 14 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          offset: 4,
        },
        sm: {
          offset: 4,
        },
      },
    };
    const curData=this.props.rowData;
    console.log('row data: ', this.props.rowData);
    const mechs = this.props.mech.mechs || [];
    console.log('state mechs: ', this.state.mechs);

    return(
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="Name" hasFeedback>
          {getFieldDecorator('name', {
            initialValue: curData.name,
            value: curData.name,
            rules: [{
              required: true, message: 'Please set the hero name!',
            }],
          })(
            <Input placeholder='hero name' disabled={this.state.disabled}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Age"
          hasFeedback
        >
          {getFieldDecorator('age', {
            initialValue: curData.age,
            rules: [{
              required: true, message: 'Please set the hero age correctly!',
            }],
          })(
            <InputNumber min={-100} max={300} placeholder='hero age' disabled={this.state.disabled}/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Role" hasFeedback>
          {getFieldDecorator('role', {
            initialValue: curData.role,
            rules: [{
              required: true, message: 'Please set the hero role!',
            }],
          })(
            <Select placeholder='hero role' disabled={this.state.disabled}>

              <Option value="damage"><Icon type="usb" /> Damage</Option>
              <Option value="tank"><Icon type="safety" /> Tank</Option>
              <Option value="support"><Icon type="medicine-box" /> Support</Option>
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Affiliation" hasFeedback>
          {getFieldDecorator('affiliation', {
            initialValue: curData.affiliation,
            rules: [{
              required: true, message: 'Please set the hero affiliation!',
            }],
          })(
            <Input placeholder='hero affiliation' disabled={this.state.disabled}/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Weapon" hasFeedback>
          {getFieldDecorator('weapon', {
            initialValue: curData.weapon,
            rules: [{
              required: true, message: 'Please set the hero weapon!',
            }],
          })(
            <Input placeholder='hero occupation' disabled={this.state.disabled}/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Mech" hasFeedback>
          {getFieldDecorator('mech', {
            initialValue: curData.mech,
            rules: [{
              required: true, message: 'Please set the hero mech!',
            }],
          })(
            <Select placeholder='hero mech' disabled={this.state.disabled}>
              {mechs.map((mech, index) => {
                return <Option value={mech.model} key={mech.name}> {mech.name + ' ' + mech.model}</Option>;
                })}
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Damage"
        >
          {getFieldDecorator('damage', {
            initialValue: curData.damage,
            rules: [{
              required: true, message: 'Please set the hero damage!',
            }],
          })(
            <Slider max={150}
                    marks={{ 0: '0', 25: '25', 50: '50', 75: '75', 100: '100', 125: '125', 150: '150' }}
                    disabled={this.state.disabled}
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Health"
        >
          {getFieldDecorator('health', {
            initialValue: curData.health,
            rules: [{
              required: true, message: 'Please set the hero health!',
            }],
          })(
            <Slider max={600}
                    marks={{ 0: '0', 100: '100', 200: '200', 300: '300', 400: '400', 500: '500', 600: '600' }}
                    disabled={this.state.disabled}
            />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button style={{marginRight: '80px', width: '100px'}} onClick={this.handleNoEdit} >View</Button>
          <Button style={{ width: '100px'}} onClick={this.handleEdit}>Edit</Button>
          <br />
          <Button type="danger" style={{marginRight: '80px', width: '100px'}} onClick={this.handleReset}>Reset</Button>
          <Button type="primary" style={{ width: '100px'}} htmlType="submit">Submit</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedHeroDetail = Form.create()(HeroDetail);

const mapStateToProps = state => ({
  mech: state.mech
});

export default connect(
  mapStateToProps,
  { getMechs, updateHero }
)(WrappedHeroDetail);