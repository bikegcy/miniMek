import React, {Component} from 'react';
import { Form, Input, Select, Button, message, Icon, Slider } from 'antd';

import { connect } from 'react-redux';
import { getMechs, updateMech } from "../../../actions/mechActions";

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
        _id:        this.props.rowData._id,
        name:       this.props.rowData.name,
        model:      this.props.rowData.model,
        weight:     this.props.rowData.weight,
        classType:  this.props.rowData.classType
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
        const newMech = {
          _id:         this.props.rowData._id,
          name:        values.name,
          model:       values.model,
          weight:      values.weight,
          classType:   values.classType,
          date:        this.props.rowData.date
        };
        if (newMech.name === this.props.rowData.name
          && newMech.model === this.props.rowData.model
          && newMech.classType === this.props.rowData.classType) {
          message.error('There is no change!');
        } else {
          if (!newMech._id) {
            this.props.form.resetFields();
            message.error('Please select the mech first!', 2);
          } else {
            this.props.updateMech(newMech);
            message.success('Mech info submit success!', 2);
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
          offset: 0,
        },
        sm: {
          offset: 0,
        },
      },
    };
    const curData=this.props.rowData;
    console.log('row data: ', this.props.rowData);
    console.log('state mechs: ', this.state.mechs);

    return(
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="Name" hasFeedback>
          {getFieldDecorator('name', {
            initialValue: curData.name,
            value: curData.name,
            rules: [{
              required: true, message: 'Please set the mech name!',
            }],
          })(
            <Input placeholder='mech name' disabled={this.state.disabled}/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Model" hasFeedback>
          {getFieldDecorator('model', {
            initialValue: curData.model,
            rules: [{
              required: true, message: 'Please set the mech model!',
            }],
          })(
            <Input placeholder='mech model' disabled={this.state.disabled}/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Class" hasFeedback>
          {getFieldDecorator('classType', {
            initialValue: curData.classType,
            rules: [{
              required: true, message: 'Please set the mech class!',
            }],
          })(
            <Select placeholder='mech class' disabled={this.state.disabled}>

              <Option value="Heavy"><Icon /> Heavy </Option>
              <Option value="Medium"><Icon /> Medium </Option>
              <Option value="Light"><Icon /> Light </Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Weight"
        >
          {getFieldDecorator('weight', {
            initialValue: curData.weight,
            rules: [{
              required: true, message: 'Please set the mech weight!',
            }],
          })(
            <Slider max={100}
                    marks={{ 0: '0', 20: '20', 40: '40', 60: '60', 80: '80', 100: '100' }}
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
  { getMechs, updateMech }
)(WrappedHeroDetail);