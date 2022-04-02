import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Card, CardBody, Col, Row, CardTitle, Button, Badge } from "reactstrap";
import { UserEdit, UserEditPassword } from ".";
import { server } from "../../Constants";
import { httpClient } from "../../utils/HttpClient";
import { AlertMessage } from "../alert";
import { getUserById } from "../../actions/userAction";
import img_default from "../../assets/images/users/user2.jpg";

export const Userinfo = (props) => {
  const [file, setFile] = useState(null);
  const [fileUpload, setFileUpload] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [editing, setEditing] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const { id } = useParams();
  const getUserData = (postID) => {
    props.getUserById(postID);
  };
  useEffect(() => {
    getUserData(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  if (!props.userReducer.data) return null;
  const {
    username,
    first_name,
    last_name,
    nick_name,
    email,
    tel,
    role,
    avatar_url,
  } = props.userReducer.data;

  const handleEdit = (e) => {
    e.preventDefault();
    setEditing(!editing);
  };
  const handleEditPassword = (e) => {
    e.preventDefault();
    setEditingPassword(!editingPassword);
  };
  const handleChange = (event) => {
    if (event.target.files.length > 0) {
      const file = URL.createObjectURL(event.target.files[0]);
      setFile(file);
      setFileUpload(event.target.files[0]);
    }
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", fileUpload);
    formData.append("id", id);
    setIsUploading(true);
    // await props.updateAvatar(formData);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    httpClient
      .put(`${server.USER_UPDATE_AVATAR_URL}`, formData, config)
      .then(function (result) {
        if (result.status === 200) {
          AlertMessage({
            message: "The avatar photo has been successfully replaced",
            type: "success",
          });
          props.getUserById(id);
          setFile(null);
          setFileUpload(null);
        } else {
          AlertMessage({ message: "Some error ocurred", type: "error" });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setIsUploading(false);
  };
  const LeftElement = () => {
    return (
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
          <div className="upload-image">
            <img
              src={file ? file : avatar_url ? avatar_url : img_default}
              className={!file && !avatar_url ? "img-gray image" : "image"}
              alt="avatar"
            />
            <div className="middle">
              <label htmlFor="upload" title="Upload a photo" className="text">
                Upload
              </label>
            </div>
          </div>

          {file ? (
            <Button
              color="primary"
              onClick={handleUpload}
              disabled={isUploading}
              className="mt-1"
            >
              <i className="bi bi-check"></i> Save
            </Button>
          ) : null}
        </div>
      </div>
    );
  };
  const InfoElement = () => {
    return (
      <div>
        <CardTitle tag="h2">
          {first_name} {last_name}
        </CardTitle>
        <div>
          <h3>{username}</h3>
        </div>
        <p>
          <strong className="mr-3">Nickname: </strong>
          {nick_name}
        </p>
        <p>
          <strong className="mr-3">Email: </strong>
          {email}
        </p>
        <p>
          <strong className="mr-3">Tel.: </strong>
          {tel}
        </p>
        <p>
          <strong className="mr-3">Role Name: </strong>
          {role === "admin" ? (
            <Badge color="primary" pill>
              {role}
            </Badge>
          ) : (
            <Badge color="light" className="text-dark" pill>
              {role}
            </Badge>
          )}
        </p>
        <p>
          <Button color="light" onClick={handleEdit}>
            <i className="bi bi-person icon-2"></i> Change Profile
          </Button>
        </p>
        <p>
          <Button color="light" onClick={handleEditPassword}>
            <i className="bi bi-shield-lock"></i> Change Password
          </Button>
        </p>
      </div>
    );
  };

  return (
    <div>
      <Card>
        <CardBody>
          <Row>
            <Col sm={3}>{LeftElement()}</Col>
            <Col sm={8}>
              {!editing && !editingPassword ? (
                InfoElement()
              ) : editing ? (
                <UserEdit setEditing={setEditing} editing={editing} />
              ) : editingPassword ? (
                <UserEditPassword
                  setEditing={setEditingPassword}
                  editing={editingPassword}
                />
              ) : null}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

const mapStateToProps = ({ userReducer }) => ({ userReducer });

const mapDispatchToProps = { getUserById };

export default connect(mapStateToProps, mapDispatchToProps)(Userinfo);
