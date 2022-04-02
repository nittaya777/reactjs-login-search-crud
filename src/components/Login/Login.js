import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Input, Label, Card } from "reactstrap";
import "./Login.css";
import { action_login, auto_login } from "../../actions/loginAction";

const Login = (props) => {
  const navigate = useNavigate();
  const [state, setState] = useState({ username: "", password: "" });
  const { auto_login } = props;

  useEffect(() => {
    auto_login(navigate);
  }, []);

  const showError = () => {
    return (
      <div className="alert alert-danger">Error! Incorrect information.</div>
    );
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const payload = {
      username: state.username,
      password: state.password,
    };
    props.action_login(navigate, payload);
  };

  return (
    <div className="container">
      <Card body>
        <Form className="form" onSubmit={handleSubmitForm}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              type="text"
              placeholder="Username"
              required
              onChange={(e) => {
                setState({
                  ...state,
                  username: e.target.value,
                });
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              id="pwd"
              placeholder="********"
              required
              onChange={(e) => {
                setState({
                  ...state,
                  password: e.target.value,
                });
              }}
            />
          </FormGroup>
          {props.loginReducer.isError ? showError() : null}

          <Button type="submit" className="btn" color="primary">
            Sign in
          </Button>
        </Form>
      </Card>
    </div>
  );
};
const mapStateToProps = ({ loginReducer }) => ({ loginReducer });

const mapDispatchToProps = { action_login, auto_login };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
