import React, { useState } from "react";
import { connect } from "react-redux";
import {
  CardBody,
  CardTitle,
  Button,
  FormGroup,
  Form,
  Label,
  Input,
} from "reactstrap";
import { server } from "../../Constants";
import { httpClient } from "../../utils/HttpClient";
import { AlertMessage } from "../alert";

export const UserEditPassword = (props) => {
  const initialState = {
    old_password: "",
    new_password: "",
    confirm_new_password: "",
  };
  const [inputState, setInputState] = useState(initialState);
  const [isErrors, setIsErrors] = useState({});
  const [submiting, setSubmiting] = useState(false);
  const { editing, setEditing } = props;

  const { username, first_name, last_name } = props.userReducer.data;
  if (!props.userReducer.data) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmiting(true);
      let payload = {
        old_password: inputState.old_password,
        new_password: inputState.new_password,
        username: username,
      };

      httpClient
        .put(`${server.USER_CHANGE_PASSWORD_URL}`, payload)
        .then((result) => {
          if (result.status === 200) {
            AlertMessage({ message: "successfully", type: "success" });
            setInputState(initialState);
            setEditing(!editing);
          } else {
            AlertMessage({ message: "Some error ocurred", type: "error" });
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            const err_message = error.response.data.message;
            if (err_message === "Invalid password") {
              setIsErrors({
                ...isErrors,
                old_password: err_message,
              });
            } else if (
              err_message === "Username not exist" ||
              err_message === "username is null"
            ) {
              AlertMessage({ message: "Please login", type: "error" });
            } else {
              AlertMessage({
                message: err_message,
                type: "error",
              });
            }
          } else if (error.response.data.message) {
            AlertMessage({
              message: error.response.data.message,
              type: "error",
            });
          }
        });
      setSubmiting(false);
    }
  };
  const validate = () => {
    const { old_password, new_password, confirm_new_password } = inputState;
    if (!old_password) {
      setIsErrors({
        ...isErrors,
        old_password: "Please enter your old password.",
      });
      return false;
    }
    if (!new_password) {
      setIsErrors({ ...isErrors, new_password: "Please enter your password." });
      return false;
    }
    if (typeof new_password !== "undefined" && new_password.length < 8) {
      setIsErrors({
        ...isErrors,
        new_password: "Make sure it's at least 8 characters",
      });
      return false;
    }
    if (!confirm_new_password) {
      setIsErrors({
        ...isErrors,
        confirm_new_password: "Please enter your confirm password.",
      });
      return false;
    }

    let isValid = true;
    if (
      typeof new_password !== "undefined" &&
      typeof confirm_new_password !== "undefined"
    ) {
      if (new_password !== confirm_new_password) {
        setIsErrors({ ...isErrors, new_password: "Passwords don't match." });
        isValid = false;
      }
    }

    return isValid;
  };
  const handleCancelUpdate = (e) => {
    e.preventDefault();
    setEditing(!editing);
  };
  return (
    <div>
      <CardTitle tag="h6" className="border-bottom p-3 mb-0">
        <i className="bi bi-pencil me-2"> </i>
        Change Password
      </CardTitle>
      <CardBody>
        <h2>
          {first_name} {last_name}
        </h2>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Old Password</Label>
            <Input
              placeholder="Old Password"
              defaultValue={inputState.old_password}
              type="password"
              onChange={(e) => {
                setInputState({ ...inputState, old_password: e.target.value });
                setIsErrors({ ...isErrors, old_password: null });
              }}
              className={isErrors["old_password"] ? "border border-danger" : ""}
            />
            <span className="text-danger">
              {isErrors["old_password"] ? isErrors["old_password"] : null}
            </span>
          </FormGroup>
          <FormGroup>
            <Label>New Password</Label>
            <Input
              placeholder="New Password"
              defaultValue={inputState.new_password}
              type="password"
              onChange={(e) => {
                setInputState({ ...inputState, new_password: e.target.value });
                setIsErrors({ ...isErrors, new_password: null });
              }}
              className={isErrors["new_password"] ? "border border-danger" : ""}
            />
            <span className="text-danger">
              {isErrors["new_password"] ? isErrors["new_password"] : null}
            </span>
          </FormGroup>
          <FormGroup>
            <Label>Confirm New Password</Label>
            <Input
              placeholder="Confirm New Password"
              defaultValue={inputState.confirm_new_password}
              type="password"
              onChange={(e) => {
                setInputState({
                  ...inputState,
                  confirm_new_password: e.target.value,
                });
                setIsErrors({
                  ...isErrors,
                  new_password: null,
                  confirm_new_password: null,
                });
              }}
              className={
                isErrors["confirm_new_password"] ? "border border-danger" : ""
              }
            />
            <span className="text-danger">
              {isErrors["confirm_new_password"]
                ? isErrors["confirm_new_password"]
                : null}
            </span>
          </FormGroup>
          <p>
            <Button
              type="submit"
              className="mr-3"
              color="primary"
              disabled={submiting}
            >
              Update Password
            </Button>
            <Button onClick={handleCancelUpdate} color="light">
              Cancel
            </Button>
          </p>
        </Form>
      </CardBody>
    </div>
  );
};

const mapStateToProps = ({ userReducer }) => ({ userReducer });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserEditPassword);
