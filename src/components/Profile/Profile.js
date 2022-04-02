import React, { useState } from "react";
import { connect } from "react-redux";
import { Card,CardBody,Col, Row, CardTitle, Button, Badge } from "reactstrap";
import { ProfileEdit, ProfileEditPassword } from ".";
import { server } from "../../Constants";
import { httpClient } from "../../utils/HttpClient";
import { AlertMessage } from "../alert";
import { getProfileById } from "../../actions/profileAction";

export const Profile = (props) => {
  const [file, setFile] = useState(null);
  const [fileUpload, setFileUpload] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [editing, setEditing] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);

  if (!props.profileReducer.data) return null;
  const info = props.profileReducer.data;

  const {
    id,
    username,
    first_name,
    last_name,
    nick_name,
    email,
    tel,
    role,
    avatar_url,
  } = info;

  const handleEditProfile = (e) => {
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
          props.getProfileById(id);
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

  return (
    <div>
      <Card>
        <CardBody>
          <Row>
            <Col sm={3}>
              {/* <h5>Profile Picture</h5> */}
              <input
                type="file"
                onChange={handleChange}
                id="upload"
                accept="image/*"
                style={{ display: "none" }}
              />
              <div className="upload-image">
                <img
                  src={file ? file : avatar_url}
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
            </Col>
            <Col sm={8}>
              {!editing && !editingPassword ? (
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
                    <Button color="light" onClick={handleEditProfile}>
                      <i className="bi bi-person icon-2"></i> Change Profile
                    </Button>
                  </p>
                  <p>
                    <Button color="light" onClick={handleEditPassword}>
                      <i className="bi bi-shield-lock"></i> Change Password
                    </Button>
                  </p>
                </div>
              ) : editing ? (
                <ProfileEdit setEditing={setEditing} editing={editing} />
              ) : editingPassword ? (
                <ProfileEditPassword
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

const mapStateToProps = ({ profileReducer }) => ({ profileReducer });

const mapDispatchToProps = { getProfileById };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
