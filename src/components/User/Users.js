import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { search } from "../../actions/userAction";
import Moment from "react-moment";
import {
  Card,
  CardBody,
  CardTitle,
  Table,
  Input,
  Row,
  Col,
  InputGroup,
  InputGroupText,
  Badge
} from "reactstrap";
import { PaginationComponent } from "../Pagination";
import { Link } from "react-router-dom";
import img_default from "../../assets/images/users/user2.jpg";

const Users = (props) => {
  const [selectedPage, setSelectedPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const pageSize = 6;
  const {search} = props;
  const handleSelected = (page) => {
    setSelectedPage(page);
    search({
      page: page,
      size: pageSize,
      keyword: keyword,
    });
  };

  useEffect(() => {
    handleSelected(selectedPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!props.userReducer.data) return null;
  //
  const createPagination = () => {
    try {
      const { data, isFetching } = props.userReducer;
      return (
        !isFetching &&
        data.currentPage && (
          <PaginationComponent
            totalItems={data.totalCount}
            pageSize={pageSize}
            onSelect={handleSelected}
            maxPaginationNumbers={8}
            defaultActivePage={selectedPage}
          />
        )
      );
    } catch (err) {}
  };
  const createRows = () => {
    try {
      const { data, isFetching } = props.userReducer;
      return (
        !isFetching &&
        data.data !== null &&
        data.data.map((item) => (
          <tr key={item.id} className="border-top">
            <td>
              <div className="d-flex align-items-center p-2">
                <img
                  src={item.avatar_url ? item.avatar_url : img_default}
                  className="rounded-circle"
                  alt="avatar"
                  width="45"
                  height="45"
                />
                <div className="ms-3">
                  <h6 className="mb-0">
                    {item.first_name} {item.last_name}
                  </h6>
                  <span className="text-muted">{item.email}</span>
                </div>
              </div>
            </td>
            <td>{item.username}</td>
            <td>
              {item.role === "admin" ? (
                <Badge color="primary" pill>
                  {item.role}
                </Badge>
              ) : (
                <Badge color="light" className="text-dark" pill>
                  {item.role}
                </Badge>
              )}
            </td>
            <td>
              {item.status === "disable" ? (
                <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
              ) : item.status === "enable" ? (
                <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
              ) : (
                <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
              )}
            </td>
            <td>
              <Moment format="DD/MM/YYYY">{item.created}</Moment>
            </td>
            <td>
              <Link to={`/user/edit/${item.id}`} className="btn btn-warning"><i className="bi bi-pencil"/></Link>
            </td>
          </tr>
        ))
      );
    } catch (err) {
      console.log("err->", err);
    }
  };

  return (
    <div>
      <Card>
        <CardBody>
          <Row>
            <Col sm={7}>
              <CardTitle tag="h5" className="pt-3">
                สมาชิก ({props.userReducer.data?.totalCount} รายการ)
              </CardTitle>
            </Col>
            <Col sm={5}>
              <div className="flex-box flex-end">
                <div className="flex-1">
                  <InputGroup>
                    <Input
                      type="text"
                      placeholder="ค้นหาสมาชิก"
                      value={keyword}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleSelected(1);
                        }
                      }}
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                    <InputGroupText
                      className="btn-search"
                      onClick={() => handleSelected(1)}
                    >
                      <i className="bi bi-search"></i>
                    </InputGroupText>
                  </InputGroup>
                </div>
                <Link to="/user/create" className="btn btn-primary ms-1">
                  <i className="bi bi-plus" /> New User
                </Link>
              </div>
            </Col>
          </Row>
          <Table className="no-wrap mt-3 align-middle table-head-bg" responsive borderless>
            <thead>
              <tr>
                <th>Info</th>
                <th>Username</th>
                <th>Role</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{createRows()}</tbody>
          </Table>
          {createPagination()}
        </CardBody>
      </Card>
    </div>
  );
};

const mapStateToProp = ({ userReducer }) => ({ userReducer });
const mapDispatchToProps = { search };
export default connect(mapStateToProp, mapDispatchToProps)(Users);
