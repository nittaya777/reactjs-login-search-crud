import React, { useEffect,useState,useRef } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../actions/saleAction";
import { v4 as uuidv4 } from "uuid";
import { Card, CardBody, Row, Col } from "reactstrap";
import "./OrderInfo.css";
import ProductList from "./ProductList";
import OrderTimeLine from "./OrderTimeLine";

import { address_full } from "../../utils/Address";

const OrderInfo = (props) => {
  const { id } = useParams();
  const { getOrderById } = props;
  useEffect(() => {
    let isSubscribed = true;
    getOrderById(id)
    return () => (isSubscribed = false);
  }, [id]);
  if (!props.saleReducer.data) return null;
  
  const {
    data: info,
    order_address,
    order_shipping,
    shop_address,
    timeline,
    orderlist,
    order_tracking,
  } = props.saleReducer.data;

  const InfoElement = () => {
    return (
      <Card>
        <CardBody className="order-detail">
          <Row className="title-16">
            <Col sm={4} className="mb-3">
              <i className="bi bi-receipt-cutoff" />
              <label>สถานะ:</label>
              <span className="ps-2 text-primary">{info.status_name}</span>
            </Col>
            <Col sm={3} className="mb-3">
              <i className="bi bi-hash" />
              <label>รหัสคำสั่งซื้อ:</label>
              <span className="ps-2 text-primary">{info.order_id}</span>
            </Col>
            <Col sm={5} className="mb-3">
              <i className="bi bi-file-text" />
              <label>หมายเลขคำสั่งซื้อ:</label>
              <span className="ps-2 text-primary">{info.order_code}</span>
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="mb-3">
              <div className="title-16">
                <i className="bi bi-geo-alt-fill" />
                <label>ที่อยู่ในการจัดส่ง:</label>
              </div>
              <div className="p-2 ps-4">
                {props.saleReducer.data.order_address && (
                  <div>
                    {order_address.name}, {order_address.phone}
                    <br />
                  </div>
                )}

                {props.saleReducer.data.order_address &&
                  address_full({
                    province_id: order_address.province_id,
                    address: order_address.address,
                    subdistrict_name: order_address.subdistrict_name,
                    district_name: order_address.district_name,
                    province_name: order_address.province_name,
                    zip_code: order_address.zip_code,
                  })}
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="mb-3">
              <div className="title-16">
                <i className="bi bi-truck" />
                <label>ข้อมูลการขนส่ง:</label>
              </div>
              <div className="p-2 ps-4">
                ช่องทาง {info.logistic_name}
                {props.saleReducer.data.order_shipping && (
                  <span className="text-primary">
                    - {order_shipping.shipping_code}
                  </span>
                )}
                <div id="timeline-tracking">
                  {orderTrackingList(order_tracking)}
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  };
  const orderTrackingList = (order_tracking) => {
    if (!!order_tracking && order_tracking?.response_data) {
      let tracking = JSON.parse(order_tracking.response_data);
      // console.log(tracking);
      if (tracking.timelines) {
        return (
          <div className="timeline timeline-5 mt-3 ms-2">
            {tracking.timelines.map((value, i) => {
              return value.details.map(function (val, j) {
                return (
                  <div
                    className="timeline-item align-items-start"
                    key={uuidv4()}
                  >
                    <div className="timeline-badge">
                      {i === 0 && j === 0 ? (
                        <i
                          className="bi bi-record-circle-fill"
                          style={{ color: tracking.color }}
                        />
                      ) : (
                        <i className="bi bi-record-circle-fill" />
                      )}
                    </div>
                    <div className="font-weight-mormal font-size-lg timeline-content ps-3">
                      <span
                        className="font-size-lg"
                        // style={color}
                      >
                        {val.date} <span>{val.description}</span>
                      </span>
                    </div>
                  </div>
                );
              });
            })}
          </div>
        );
      }
    }
  };
  const ShopElement = () => {
    return (
      <Card>
        <CardBody>
          <h6 className="mb-3">ข้อมูลร้านค้า</h6>
          <Row className="mb-3">
            <Col sm={3}>
              <div className="symbol symbol-30 mr-4 align-self-center">
                <span className="symbol-label">
                  <img src="" className="img-100" alt="" />
                </span>
              </div>
            </Col>
            <Col sm={9}>{info.shop_name}</Col>
          </Row>
          <Row className="mb-3">
            <Col sm={3}>ที่อยู่</Col>
            <Col sm={9}>
              {props.saleReducer.data.shop_address &&
              address_full({
                province_id: shop_address.province_id,
                address: shop_address.address,
                subdistrict_name: shop_address.sub_district.name_th,
                district_name: shop_address.district.name_th,
                province_name: shop_address.province.name_th,
                zip_code: shop_address.postal_code
              })}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col sm={3}>เบอร์โทร</Col>
            <Col sm={9}>
              {props.saleReducer.data.shop_address && (
                <span>{shop_address.phone}</span>
              )}
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  };

  return (
    <Row>
      <Col sm={9}>
        {InfoElement()}
        <ProductList
          data={{
            orderlist: orderlist,
            total_shipping_price: !!info.total_shipping_price
              ? info.total_shipping_price
              : 0,
          }}
        />
      </Col>
      <Col sm={3}>
        {ShopElement()}
       <OrderTimeLine data={{timeline: timeline}}/>
      </Col>
    </Row>
  );
};
const mapStateToProps = ({ saleReducer }) => ({ saleReducer });
const mapDispatchToProps = { getOrderById };

export default connect(mapStateToProps, mapDispatchToProps)(OrderInfo);
