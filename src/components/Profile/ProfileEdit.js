import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Button,
  CardTitle,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { server } from "../../Constants";
import { httpClient } from "../../utils/HttpClient";
import { AlertMessage } from "../alert";
import { getProfileById } from "../../actions/profileAction";

export const ProfileEdit = (props) => {
  const [submiting, setSubmiting] = useState(false);
  const [inputState, setInputState] = useState(null);
  const { editing, setEditing } = props;
  //
  const info = props.profileReducer.data;
  const { id, first_name, last_name, nick_name, email, tel } = info;

  let initialState = {
    first_name: first_name,
    last_name: last_name,
    nick_name: nick_name,
    email: email,
    tel: tel,
  };
  useEffect(() => {
    setInputState(initialState);
  }, [])// eslint-disable-line react-hooks/exhaustive-deps
  if (!props.profileReducer.data) return null;

  const handleCancelUpdate = (e) => {
    e.preventDefault();
    setEditing(!editing);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("first_name", inputState.first_name);
    formData.append("last_name", inputState.last_name);
    formData.append("nick_name", inputState.nick_name);
    formData.append("email", inputState.email);
    formData.append("tel", inputState.tel);
    formData.append("id", id);
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
          props.getProfileById(id);
          setEditing(!editing);
        } else {
          AlertMessage({ message: "Some error ocurred", type: "error" });
        }
      })
      .catch((error) => {
        // console.log(error);
        if (error.response.data.message) {
          AlertMessage({ message: error.response.data.message, type: "error" });
        }
      });

    setSubmiting(false);
  };

  return (
    <div>
      <CardTitle tag="h6" className="border-bottom p-3 mb-0">
        <i className="bi bi-pencil me-2"> </i>
        Edit Profile
      </CardTitle>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Name</Label>
            <Input
              placeholder="Name"
              defaultValue={first_name}
              type="text"
              onChange={(e) =>
                setInputState({ ...inputState, first_name: e.target.value })
              }
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Last Name</Label>
            <Input
              placeholder="Last Name"
              defaultValue={last_name}
              type="text"
              onChange={(e) =>
                setInputState({ ...inputState, last_name: e.target.value })
              }
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Nickname</Label>
            <Input
              placeholder="Nickname"
              defaultValue={nick_name}
              type="text"
              onChange={(e) =>
                setInputState({ ...inputState, nick_name: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input
              placeholder="Email"
              defaultValue={email}
              type="email"
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
              defaultValue={tel}
              type="text"
              onChange={(e) =>
                setInputState({ ...inputState, tel: e.target.value })
              }
            />
          </FormGroup>
          <p>
            <Button
              type="submit"
              className="mr-3"
              color="primary"
              disabled={submiting}
            >
              Update profile
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

const mapStateToProps = ({ profileReducer }) => ({ profileReducer });

const mapDispatchToProps = { getProfileById };

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
