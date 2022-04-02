import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import {
  CardBody,
  CardTitle,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { server } from "../../Constants";
import { httpClient } from "../../utils/HttpClient";
import { AlertMessage } from "../alert";
import { getUserById } from "../../actions/userAction";

export const UserEdit = (props) => {
  const {
    first_name,
    last_name,
    nick_name,
    email,
    tel,
    role,
  } = props.userReducer.data;
  const initialState = {
    first_name: first_name,
    last_name: last_name,
    nick_name: nick_name,
    email: email,
    tel: tel,
    role: role,
  };
  const [submiting, setSubmiting] = useState(false);
  const [inputState, setInputState] = useState(null);
  const { editing, setEditing } = props;
  const [isErrors, setIsErrors] = useState({});

  let { id } = useParams();
  useEffect(()=>{
    setInputState(initialState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if (!props.userReducer.data) return null;
  

  const handleSubmit = (e) => {
    e.preventDefault();
    
      const formData = new FormData();
      formData.append("first_name", inputState.first_name);
      formData.append("last_name", inputState.last_name);
      formData.append("nick_name", inputState.nick_name);
      formData.append("email", inputState.email);
      formData.append("tel", inputState.tel);
      formData.append("role", inputState.role);
      formData.append("id", id)
      setSubmiting(true);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      httpClient
        .put(`${server.USER_URL}`, formData, config)
        .then(function (result) {
          if (result.status === 200) {
            AlertMessage({ message: "successfully", type: "success" });
            setInputState(null);
            e.target.reset();
            props.getUserById(id);
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
    
  };

  const handleCancelUpdate = (e) => {
    e.preventDefault();
    setEditing(!editing);
  };

  
  const red_star = <small className="text-danger">*</small>;
  return (
    <div>
       <CardTitle tag="h6" className="border-bottom p-3 mb-0">
        <i className="bi bi-pencil me-2"> </i>
        Edit 
      </CardTitle>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            
                <div className="p-3">
                  <FormGroup>
                    <Label>Name {red_star}</Label>
                    <Input
                      placeholder="Name"
                      type="text"
                      defaultValue={first_name}
                      onChange={(e) =>
                        setInputState({
                          ...inputState,
                          first_name: e.target.value,
                        })
                      }
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Last Name {red_star}</Label>
                    <Input
                      placeholder="Last Name"
                      type="text"
                      defaultValue={last_name}
                      onChange={(e) =>
                        setInputState({
                          ...inputState,
                          last_name: e.target.value,
                        })
                      }
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Nickname</Label>
                    <Input
                      placeholder="Nickname"
                      type="text"
                      defaultValue={nick_name}
                      onChange={(e) =>
                        setInputState({
                          ...inputState,
                          nick_name: e.target.value,
                        })
                      }
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Email {red_star}</Label>
                    <Input
                      placeholder="Email"
                      type="email"
                      defaultValue={email}
                      onChange={(e) =>
                        setInputState({ ...inputState, email: e.target.value })
                      }
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Tel.</Label>
                    <Input
                      placeholder="Telephone number"
                      type="text"
                      defaultValue={tel}
                      onChange={(e) =>
                        setInputState({ ...inputState, tel: e.target.value })
                      }
                    />
                  </FormGroup>
                  <Label>Role Name:</Label>
                  <div className="flex-box">
                    <FormGroup check className="ms-2">
                      <Input
                        id="role_admin"
                        name="user_role"
                        type="radio"
                        defaultChecked={role === "admin" ? true : false}
                        onClick={(e) =>
                          setInputState({ ...inputState, role: "admin" })
                        }
                      />
                      <Label for="role_admin" check>
                        Admin
                      </Label>
                    </FormGroup>

                    <FormGroup check className="ms-4">
                      <Input
                        id="role_user"
                        name="user_role"
                        type="radio"
                        defaultChecked={role === "user" ? true : false}
                        onClick={(e) =>
                          setInputState({ ...inputState, role: "user" })
                        }
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
                      Update
                    </Button>
                    <Button onClick={handleCancelUpdate} color="light">
                      Cancel
                    </Button>
                  </p>
                </div>
              
          </Form>
        </CardBody>
    </div>
  );
};

const mapStateToProps = ({ userReducer }) => ({ userReducer });

const mapDispatchToProps = { getUserById };

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
