import NumberFormat from "react-number-format";
import { v4 as uuidv4 } from "uuid";
import { Card, CardBody, Table } from "reactstrap";
const ProductList = (props)=>{
    const {orderlist,total_shipping_price} = props.data;
    let total = 0;
    const createProductRow = (productList) => {
        const { detail, items } = productList;
        let product_list = "";
        if (
          detail.product_sub_id !== "" &&
          detail.product_sub_id !== 0 &&
          detail.product_sub_id !== null
        ) {
          let sub_item = [];
          for (const value of items) {
            sub_item.push(
              value.product_sub_name + " " + value.product_sub_item_name
            );
          }
          let sub_name = sub_item.join(" , ");
          product_list = (
            <>
              ตัวเลือกสินค้า:<span className="ml-4 title-item">{sub_name}</span>
            </>
          );
        }
        return product_list;
      };

    return (
        <Card>
            <CardBody>
              <h6 className="mb-3">รายการสินค้า</h6>
              <Table
                className="no-wrap mt-3 align-middle table-head-bg"
                responsive
                borderless
              >
                <thead>
                  <tr className="text-left text-uppercase">
                    <th className="col-mw-135">รหัสสินค้า (SKU)</th>
                    <th className="pl-7 col-product">
                      <span className="text-dark-75">สินค้าทั้งหมด</span>
                    </th>
                    <th className="col-mw-100 text-center">ราคาต่อชิ้น</th>
                    <th className="col-mw-80 text-center">จำนวน</th>
                    <th className="col-mw-115 text-right">ราคาขายสุทธิ</th>
                  </tr>
                </thead>
                <tbody>
                  {orderlist &&
                    orderlist.length > 0 &&
                    orderlist.map((val) => {
                      let sku =
                        val.detail.product_sku !== ""
                          ? val.detail.product_sku
                          : "—";
                      let price = Number(val.detail.price);
                      let amount = Number(val.detail.amount);
                      let sum_price = price * amount;
                      total += sum_price;
  
                      return (
                        <tr key={uuidv4()}>
                          <td>
                            <span className="text-dark-75 d-block font-size-lg">
                              {sku}
                            </span>
                          </td>
                          <td className="pl-0 py-2">
                            <div className="d-flex align-items-center">
                              <div className="symbol symbol-50 symbol-light mr-4">
                                <span className="symbol-label">
                                  <img
                                    src=""
                                    className="h-75 align-self-end"
                                    alt=""
                                  />
                                </span>
                              </div>
                              <div>
                                <span className="text-dark-75 text-hover-primary mb-1 font-size-lg">
                                  {val.detail.product_name}
                                </span>
                                <span className="text-muted font-weight-bold d-block">
                                  {createProductRow(val)}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="text-center">
                            <span className="text-dark-75 d-block font-size-lg">
                              <NumberFormat
                                thousandSeparator={true}
                                displayType={"text"}
                                value={price}
                              ></NumberFormat>
                            </span>
                          </td>
                          <td className="text-center">
                            <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                              <NumberFormat
                                thousandSeparator={true}
                                displayType={"text"}
                                value={amount}
                              ></NumberFormat>
                            </span>
                          </td>
                          <td className="text-right">
                            <span className="text-dark-75 d-block font-size-lg">
                              <NumberFormat
                                thousandSeparator={true}
                                displayType={"text"}
                                value={sum_price}
                              ></NumberFormat>
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
                <tfoot id="sum">
                  <tr>
                    <td colSpan="3" className="text-right">
                      รวมค่าสินค้า
                    </td>
                    <td colSpan="2" className="summary-value">
                      <NumberFormat
                        thousandSeparator={true}
                        displayType={"text"}
                        value={total}
                        prefix={"฿"}
                      ></NumberFormat>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="text-right">
                      ค่าจัดส่งทั้งหมด
                    </td>
                    <td colSpan="2" className="summary-value">
                      <NumberFormat
                        thousandSeparator={true}
                        displayType={"text"}
                        value={total_shipping_price}
                        prefix={"฿"}
                      ></NumberFormat>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="text-right">
                      ยอดชำระเงิน
                    </td>
                    <td colSpan="2">
                      <div className="summary-value total-lg">
                        <NumberFormat
                          thousandSeparator={true}
                          displayType={"text"}
                          value={total + total_shipping_price}
                          prefix={"฿"}
                        ></NumberFormat>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </Table>
            </CardBody>
          </Card>
      )
}
export default ProductList;