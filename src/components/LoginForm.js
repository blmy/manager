//a login form that based on redux

import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';//get access to action creator 
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {
  onEmailChange(text) {
    //because we wire up our action creator, we now have access
    //to a prop inside our component called this.props.emailChanged
    //call action creator with user text input, on return received
    //send return to all reducers.
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    //destructuring
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  renderButton() {
    //this.props.loading; How and where to get this props?
    //Through actions index.js 'loginUser' > 'LOGIN_USER' >
    //AuthReducer.js > 'LOGIN_USER' > 'loading'.
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            //input = value returned by reducer from mapStateToProps
            value={this.props.email}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

//const mapStateToProps = state => {
  //return {
    ////state.auth; auth is the key in reducer index.js
    ////state.auth.email; email is the key returned by reducer
    //email: state.auth.email,
    //password: state.auth.password,
    //error: state.auth.error
  //};
//};

//destructuring of mapStateToProps
//auth; auth is the key in reducer index.js
//email, password, error; is the key returned by reducer
const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return {
    email,
    password,
    error,
    loading
  };
};

//wire up action creator (index.js) with connect.
//second argument is going to be action creator that we want to bind
//to our component.
export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser,

})(LoginForm);
