import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardTitle,
  CardBody,
  Row,
  Col,
  InputGroup,
  InputGroupText,
  Input,
  Button,
  Table,
  Badge,
} from "reactstrap";
import DateRangePicker from "../DateRangePicker/index";
import { connect } from "react-redux";
import { search } from "../../actions/saleAction";
import { PaginationComponent } from "../Pagination";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import NumberFormat from "react-number-format";
import img_default from "../../assets/images/users/user2.jpg";

const Sale = (props) => {
  let year = moment().subtract(2, "years").year();
  let start = year + "-01-01";
  const [dateStart, setDateStart] = useState(
    moment(start).format("DD/MM/YYYY")
  );
  const [dateEnd, setDateEnd] = useState(moment().format("DD/MM/YYYY"));

  const [selectedPage, setSelectedPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [pageSize, setPageSize] = useState(6);
  const [resetForm, setResetForm] = useState(false);
  const { search } = props;
  const handleSelected = (page) => {
    let input_keyword = keyword;
    setSelectedPage(page);

    const splitDS = dateStart.split("/");
    const dStart =
      splitDS.length === 3
        ? moment(splitDS[2] + "-" + splitDS[1] + "-" + splitDS[0]).format(
            "YYYY-MM-DD"
          )
        : "";

    const splitDE = dateEnd.split("/");
    const dEnd =
      splitDE.length === 3
        ? moment(splitDE[2] + "-" + splitDE[1] + "-" + splitDE[0]).format(
            "YYYY-MM-DD"
          )
        : "";

    search({
      page: page,
      size: pageSize,
      keyword: input_keyword,
      type: "",
      date_from: dStart,
      date_to: dEnd,
    });
    setResetForm(false);
  };

  useEffect(() => {
    // clean up controller
    let isSubscribed = true;
    handleSelected(selectedPage);
    // cancel subscription to useEffect
    return () => (isSubscribed = false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetForm, pageSize]);
  if (!props.saleReducer.data) return null;

  const handleCallbackStart = (start) => {
    setDateStart(moment(start).format("DD/MM/YYYY"));
    const dStart = moment(start).format("YYYY-MM-DD");
    const splitD = dateEnd.split("/");
    const dEnd = moment(splitD[2] + "-" + splitD[1] + "-" + splitD[0]).format(
      "YYYY-MM-DD"
    );
    if (moment(dStart).isAfter(dEnd)) {
      setDateEnd(moment(start).format("DD/MM/YYYY"));
    }
  };

  const handleCallbackFinish = (finish) => {
    setDateEnd(moment(finish).format("DD/MM/YYYY"));
    const dEnd = moment(finish).format("YYYY-MM-DD");
    const splitD = dateStart.split("/");
    const dStart = moment(splitD[2] + "-" + splitD[1] + "-" + splitD[0]).format(
      "YYYY-MM-DD"
    );
    if (moment(dStart).isAfter(dEnd)) {
      setDateStart(moment(finish).format("DD/MM/YYYY"));
    }
  };
  const handleInputStart = (event) => {
    // console.log("start");
    setDateStart(moment(event.target.value).format("DD/MM/YYYY"));
  };
  const handleInputFinish = (event) => {
    // console.log("finish");
    setDateEnd(moment(event.target.value).format("DD/MM/YYYY"));
  };
  const handlePageSize = (e) => {
    setPageSize(Number(e.target.value));
  };
  const createPagination = () => {
    try {
      const { data, isFetching } = props.saleReducer;
      return (
        !isFetching &&
        data.currentPage && (
          <div className="flex-box flex-between">
            <div className="text-gray-01 flex-box flex-center mb-2">
              <div className="mr-4">
                <Input type="select" value={pageSize} onChange={handlePageSize} className="bg-light">
                <option value={6}>6</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </Input>
              </div>
              <div>
                แสดง {data.currentCount} จาก {data.totalCount} แถว
              </div>
            </div>
          <div className="mb-2">
            <PaginationComponent
              totalItems={data.totalCount}
              pageSize={pageSize}
              onSelect={handleSelected}
              maxPaginationNumbers={5}
              defaultActivePage={selectedPage}
            /></div>
          </div>
        )
      );
    } catch (err) {}
  };
  const orderStatus = (order_status) => {
    let class_name = "";
    switch (order_status) {
      case 4:
        class_name = "primary";
        break;
      case 5:
        class_name = "success";
        break;
      case 6:
        class_name = "success";
        break;
      case 7:
        class_name = "danger";
        break;
      case 8:
        class_name = "danger";
        break;
      case 9:
        class_name = "danger";
        break;

      default:
        //1,2,3
        class_name = "warning";
        break;
    }
    return class_name;
  };
 
  const createRows = () => {
    try {
      const { data, isFetching } = props.saleReducer;
      return (
        !isFetching &&
        data.data !== null &&
        data.data.map((item) => {
          return (
            <tr key={uuidv4()} className="border-top">
              <td className="pl-0 py-2">
                {item.product_list.map((val) => {
                  return (
                    <div className="d-flex py-2 row-item" key={uuidv4()}>
                      <div className="symbol symbol-50 mr-4 align-self-center">
                        <span className="symbol-label">
                          <img
                            src={val.product_image}
                            className="img-100"
                            alt=""
                          />
                        </span>
                      </div>
                      <div>
                        <div className="text-dark-75 text-hover-primary mb-1">
                          {val.product_name}
                        </div>
                        {val.sub_item_status ? (
                          <span className="text-gray-01 font-weight-bold d-inline-block">
                            ตัวเลือกสินค้า:
                            <br />
                            <span>{val.sub_item_data.sub_name}</span>
                            <span className="ml-2">
                              จำนวน: {val.sub_item_data.amount}
                            </span>
                          </span>
                        ) : (
                          <span className="text-gray-01 font-weight-bold d-block">
                            จำนวน: {val.amount}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </td>
              <td>{item.shop_name}</td>
              <td>{item.order_code}</td>
              <td>{item.fullname}</td>
              <td>{moment(item.createdAt).format("DD/MM/YYYY")}</td>
              <td>
                <NumberFormat
                  thousandSeparator={true}
                  displayType={"text"}
                  prefix={"฿"}
                  value={item.summary_price}
                />
              </td>
              <td>
                <Badge color={orderStatus(item.order_status)}>
                  {item.status_name}
                </Badge>
              </td>
              <td>{item.logistic_short_name}</td>
              <td>
                <Link to={`/sale/info/${item.order_id}`} className="btn btn-warning">
                  <i className="bi bi-pencil" />
                </Link>
                
              </td>
            </tr>
          );
        })
      );
    } catch (err) {
      console.log("err->", err);
    }
  };
  const handleInput = (e) => {
    setKeyword(e.target.value);
  };
  const handleReset = () => {
    setKeyword("");
    setDateStart(moment(start).format("DD/MM/YYYY"));
    setDateEnd(moment().format("DD/MM/YYYY"));
    setResetForm(true);
  };

  return (
    <Card>
      <CardBody>
        <Row>
          <Col sm={3} className="group-border-primary">
            <InputGroup>
              <Input
                type="text"
                id="keyword"
                placeholder="ค้นหาคำสั่งซื้อ"
                value={keyword}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSelected(1);
                  }
                }}
                onChange={handleInput}
              />
              <InputGroupText
                className="btn-search"
                onClick={(e) => handleSelected(1)}
              >
                <i className="bi bi-search"></i>
              </InputGroupText>
            </InputGroup>
          </Col>
          <Col sm={2} className="pt-2 label-title">
            วันที่สั่งซื้อ:{" "}
          </Col>
          <Col sm={5} className="flex-box">
            <div className="mx-2">
              <DateRangePicker
                minDate="01/01/2020"
                defaultVal={dateStart}
                handleCallback={handleCallbackStart}
                handleInput={handleInputStart}
                key="date-start"
              />{" "}
            </div>
            <div> ... </div>
            <div className="mx-2">
              <DateRangePicker
                minDate="01/01/2020"
                defaultVal={dateEnd}
                handleCallback={handleCallbackFinish}
                handleInput={handleInputFinish}
                key="date-finish"
              />
            </div>
          </Col>
          <Col sm={2}>
            <Button
              type="button"
              color="primary"
              onClick={(e) => handleSelected(1)}
            >
              ค้นหา
            </Button>
            <Link to="#" className="btn-reset" onClick={handleReset}>
              รีเซ็ต
            </Link>
          </Col>
        </Row>
        <CardTitle tag="h5" className="pt-3">
          {props.saleReducer.data?.totalCount} รายการ
        </CardTitle>
        <Table
          className="no-wrap mt-3 align-middle table-head-bg"
          responsive
          borderless
        >
          <thead>
            <tr className="text-left text-uppercase">
              <th className="pl-7 col-product">
                <span className="text-dark-75">สินค้าทั้งหมด</span>
              </th>
              <th className="text-center col-shop-name">ร้านค้า</th>
              <th className="col-order-number">หมายเลขคำสั่งซื้อ</th>
              <th className="col-mw-115">ผู้ซื้อ</th>
              <th className="col-mw-135">วันที่สั่งซื้อ</th>
              <th className="col-mw-80">ยอดสั่งซื้อ</th>
              <th className="col-mw-115">สถานะ</th>
              <th className="col-mw-100">ช่องทาง</th>
              <th className="col-mw-65"></th>
            </tr>
          </thead>
          <tbody>
            {props.saleReducer.data?.data.length > 0 ? (
              createRows()
            ) : (
              <tr>
                <td colSpan="9" className="text-center not-found">
                  <i className="bi bi-file-earmark-text icon" />
                  <div>ไม่พบผลการค้นหา</div>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
       {props.saleReducer.data?.data.length > 0 && createPagination()}
      </CardBody>
    </Card>
  );
};
const mapStateToProp = ({ saleReducer }) => ({ saleReducer });
const mapDispatchToProps = { search };
export default connect(mapStateToProp, mapDispatchToProps)(Sale);
