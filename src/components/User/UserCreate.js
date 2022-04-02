import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";
import { server } from "../../Constants";
import { httpClient } from "../../utils/HttpClient";
import { AlertMessage } from "../alert";
import file_default from "../../assets/images/users/user2.jpg";

export const UserCreate = (props) => {
  const initialState = {
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    nick_name: "",
    email: "",
    tel: "",
    role: "user",
  };
  const [submiting, setSubmiting] = useState(false);
  const [inputState, setInputState] = useState(initialState);
  const [isErrors, setIsErrors] = useState({});
  const [file, setFile] = useState(null);
  const [fileUpload, setFileUpload] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append("first_name", inputState.first_name);
      formData.append("last_name", inputState.last_name);
      formData.append("nick_name", inputState.nick_name);
      formData.append("email", inputState.email);
      formData.append("tel", inputState.tel);
      formData.append("avatar", fileUpload);
      formData.append("username", inputState.username);
      formData.append("password", inputState.password);
      formData.append("role", inputState.role);
      setSubmiting(true);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      httpClient
        .post(`${server.USER_URL}`, formData, config)
        .then(function (result) {
          if (result.status === 200) {
            AlertMessage({ message: "successfully", type: "success" });
            setInputState(null);
            e.target.reset();
            //   setEditing(!editing);
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
  const handleChange = (event) => {
    if (event.target.files.length > 0) {
      const file = URL.createObjectURL(event.target.files[0]);
      setFile(file);
      setFileUpload(event.target.files[0]);
    }
  };

  const validate = () => {
    const { username, password, confirm_password } = inputState;
    if (!username) {
      setIsErrors({ ...isErrors, username: "Please enter your username." });
      return false;
    }
    if (typeof username !== "undefined" && username.length < 3) {
      setIsErrors({
        ...isErrors,
        username: "Make sure it's at least 3 characters",
      });
      return false;
    }
    if (!password) {
      setIsErrors({ ...isErrors, password: "Please enter your password." });
      return false;
    }
    if (typeof password !== "undefined" && password.length < 8) {
      setIsErrors({
        ...isErrors,
        password: "Make sure it's at least 8 characters",
      });
      return false;
    }
    if (!confirm_password) {
      setIsErrors({
        ...isErrors,
        confirm_password: "Please enter your confirm password.",
      });
      return false;
    }

    let isValid = true;
    if (
      typeof password !== "undefined" &&
      typeof confirm_password !== "undefined"
    ) {
      if (password !== confirm_password) {
        setIsErrors({ ...isErrors, password: "Passwords don't match." });
        isValid = false;
      }
    }

    return isValid;
  };
  const red_star = <small className="text-danger">*</small>;

  const setInputStateOnChange = (event) => {
    const { name, value } = event.target;
    setInputState((prevState) => {
      return { ...prevState, [name]: value };
    });
    if(["username","password","confirm_password"].includes(name)){
      if (name === "confirm_password") {
        setIsErrors({ ...isErrors, password: null, [name]: null });
      } else {
        setIsErrors({ ...isErrors, [name]: null });
      }
    }else{
    }
    
  };
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h6" className="p-3 border-bottom">
            <i className="bi bi-person me-2"> </i>
            New User
          </CardTitle>

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col sm={4}>
                <div className="bg-light-gray p-3">
                  <div className="flex-upload">
                    <h5>Profile Picture</h5>
                    <input
                      type="file"
                      onChange={handleChange}
                      id="upload"
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                    <div className="upload-image w-50p">
                      <img
                        src={file ? file : file_default}
                        className="image"
                        alt="avatar"
                      />
                      <div className="middle">
                        <label
                          htmlFor="upload"
                          title="Upload a photo"
                          className="text"
                        >
                          Upload
                        </label>
                      </div>
                    </div>
                  </div>
                  <FormGroup>
                    <Label>Username {red_star}</Label>
                    <Input
                      placeholder="Username"
                      type="text"
                      name="username"
                      onChange={setInputStateOnChange}
                      className={
                        isErrors["username"] ? "border border-danger" : ""
                      }
                    />
                    <span className="text-danger">
                      {isErrors["username"] ? isErrors["username"] : null}
                    </span>
                  </FormGroup>
                  <FormGroup>
                    <Label>Password {red_star}</Label>
                    <Input
                      placeholder="Password"
                      type="password"
                      name="password"
                      onChange={setInputStateOnChange}
                      className={
                        isErrors["password"] ? "border border-danger" : ""
                      }
                    />
                    <span className="text-danger">
                      {isErrors["password"] ? isErrors["password"] : null}
                    </span>
                  </FormGroup>
                  <FormGroup>
                    <Label>Confirm Password {red_star}</Label>
                    <Input
                      placeholder="Confirm Password"
                      type="password"
                      name="confirm_password"
                      onChange={setInputStateOnChange}
                      className={
                        isErrors["confirm_password"]
                          ? "border border-danger"
                          : ""
                      }
                    />
                    <span className="text-danger">
                      {isErrors["confirm_password"]
                        ? isErrors["confirm_password"]
                        : null}
                    </span>
                  </FormGroup>
                </div>
              </Col>
              <Col sm={8}>
                <div className="p-3">
                  <FormGroup>
                    <Label>Name {red_star}</Label>
                    <Input
                      placeholder="Name"
                      type="text"
                      name="first_name"
                      onChange={setInputStateOnChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Last Name {red_star}</Label>
                    <Input
                      placeholder="Last Name"
                      type="text"
                      name="last_name"
                      onChange={setInputStateOnChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Nickname</Label>
                    <Input
                      placeholder="Nickname"
                      type="text"
                      name="nick_name"
                      onChange={setInputStateOnChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Email {red_star}</Label>
                    <Input
                      placeholder="Email"
                      type="email"
                      name="email"
                      onChange={setInputStateOnChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Tel.</Label>
                    <Input
                      placeholder="Telephone number"
                      type="text"
                      name="tel"
                      onChange={setInputStateOnChange}
                    />
                  </FormGroup>
                  <Label>Role Name:</Label>
                  <div className="flex-box">
                    <FormGroup check className="ms-2">
                      <Input
                        id="role_admin"
                        type="radio"
                        name="role"
                        value="admin"
                        onChange={setInputStateOnChange}
                      />
                      <Label for="role_admin" check>
                        Admin
                      </Label>
                    </FormGroup>

                    <FormGroup check className="ms-4">
                      <Input
                        id="role_user"
                        type="radio"
                        defaultChecked="true"
                        name="role"
                        value="user"
                        onChange={setInputStateOnChange}
                      />
                      <Label for="role_user" check>
                        User
                      </Label>
                    </FormGroup>
                  </div>
                  <p className="mt-4">
                    <Button
                      type="submit"
                      className="mr-3"
                      color="primary"
                      disabled={submiting}
                    >
                      Submit
                    </Button>
                    <Link to="/users" className="btn btn-light">
                      Cancel
                    </Link>
                  </p>
                </div>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserCreate);
