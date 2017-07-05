import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';//connect helper: connecting all actions
//npm install --save react-native-communications
import Communications from 'react-native-communications';
import EmployeeForm from './EmployeeForm';//importing a file
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';


class EmployeeEdit extends Component {
  state = { showModal: false };//Modal visibility

  componentWillMount() {
    //this.props.employee is forwarded from ListItem's Action router.
    //For each prop in employees, we going using _ to iterate over every property
    //on that object and update our reducer through employeeUpdate action creator.
    //Taking all the attributes off the employees and stuff them as a prefill inside
    //our form reducer thus displaying the selected employee.
    _.each(this.props.employee, (value, prop) => {
      this.props.employeeUpdate({ prop, value });
    });
  }

  onButtonPress() {
    const { name, phone, shift } = this.props;//this.props from mapStateToProps

    this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid });
  }

  onTextPress() {
    const { phone, shift } = this.props;
    //texting your employee through the app
    Communications.text(phone, `Your up coming shift is on ${shift}.`);
  }

  onAccept() {
    const { uid } = this.props.employee;

    this.props.employeeDelete({ uid });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <Card>
        <EmployeeForm />

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Save Changes
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.onTextPress.bind(this)}>
            Text Schedule
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
            Fire Employee
          </Button>
        </CardSection>

        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure you want to delete this?
        </Confirm>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;

  return { name, phone, shift };
};

export default connect(mapStateToProps, {
  employeeUpdate,
  employeeSave,
  employeeDelete
})(EmployeeEdit);
