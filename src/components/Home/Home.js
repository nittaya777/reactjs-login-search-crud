import React from "react";
import { Row, Col, Card, CardBody} from "reactstrap";
const Dashboard = () => {
  return (
    <Row>
      <Col>
        <Card>
          <CardBody className="p-4">
            <Row>
              <Col lg="8">
                <h2 className="mt-4">Dashboard Lorem ipsum dolor sit amet.</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Sapiente nemo nisi exercitationem totam accusamus minima odio
                  sint reiciendis esse dolores!
                </p>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Fugiat maiores doloremque modi nobis aut a odio libero
                  temporibus, assumenda veniam ullam nemo perferendis
                  consequuntur itaque autem aliquid adipisci odit cumque ex
                  porro quos iste? Dolorem cumque quaerat maxime ratione,
                  nostrum, inventore quas obcaecati ullam ducimus in sit sequi
                  placeat nisi?
                </p>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Dashboard;
