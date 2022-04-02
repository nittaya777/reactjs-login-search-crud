import { Row, Col, Card, CardBody, Button } from "reactstrap";
import './Page404.css'
const Page404 = () => {
  return (
    <Row>
      <Col>
        <Card>
          
          <CardBody className="p-4">
            <Row justify-content>
              <Col lg="8">
                <h2 className="mt-4">404 Page Not Found</h2>
                
                <Button
                  className="mt-3"
                  color="primary"
                  href="/"
                >
                  Home Page
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Page404;
