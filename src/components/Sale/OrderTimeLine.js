import {Card,CardBody} from 'reactstrap';
import {v4 as uuidv4} from 'uuid'

const OrderTimeLine = (props) => {
  const { timeline } = props.data;
  return (
    <Card>
      <CardBody>
        <h6 className="mb-3">ประวัติการซื้อสินค้า</h6>
        <div className="timeline timeline-5 mt-3 ms-2">
          {timeline &&
            timeline.length > 0 &&
            timeline.map((tl_list) => {
              let timeline_remark = "";
              if (tl_list.remark.length > 0) {
                timeline_remark = `<br/>${tl_list.remark}`;
              }
              return (
                <div className="timeline-item align-items-start" key={uuidv4()}>
                  <div className="timeline-badge">
                    <i
                      className={`bi bi-record-circle-fill ${tl_list.color}`}
                    ></i>
                  </div>
                  <div className="font-weight-mormal  timeline-content text-muted ps-3">
                    <span
                      className={`font-weight-bolder ${tl_list.title_color}`}
                    >
                      {tl_list.title}
                    </span>
                    {timeline_remark}
                    <br /> {tl_list.date}
                  </div>
                </div>
              );
            })}
        </div>
      </CardBody>
    </Card>
  );
};
export default OrderTimeLine;
