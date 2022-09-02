import { React, useContext, useEffect } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Card from "react-bootstrap/Card";
import { Helmet } from "react-helmet-async";
import CheckoutSteps from "../components/CheckoutSteps";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "./Store";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/esm/Button";

export default function PlaceOrderScreen() {
  const navigate = useNavigate();
  const { state, ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  cart.itemsPrice = cart.cartItems.reduce(
    (a, c) => a + c.quantity * c.price,
    0
  );

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(cart.itemsPrice * 0.15);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = async () => {};

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart, navigate]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1 className="my-3">Preview Order</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name: </strong> {cart.shippingAddress.firstName}{" "}
                {cart.shippingAddress.lastName} <br></br>
                <strong> Address: </strong> {cart.shippingAddress.address}{" "}
                {cart.shippingAddress.city}, {cart.shippingAddress.states}{" "}
                {cart.shippingAddress.postalCode}
              </Card.Text>
              <Link to="/shipping">Edit</Link>
            </Card.Body>
          </Card>
          {/* Payment */}
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method: </strong> {cart.paymentMethod}
              </Card.Text>
              <Link to="/payment"> Edit</Link>
            </Card.Body>
          </Card>
          {/* Items */}
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {cart.cartItems.map((item) => (
                  <ListGroup.Item>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.images}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{" "}
                        <Link to={`/product/${item.slug}`}> {item.name}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>{" "}
                      </Col>
                      <Col>${item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to="/cart"> Edit</Link>
            </Card.Body>
          </Card>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title> Order Summary </Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${cart.itemsPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col> Shipping</Col>
                      <Col> ${cart.shippingPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col> Tax </Col>
                      <Col>${cart.taxPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong> Order Total </strong>
                      </Col>
                      <Col>${cart.totalPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button
                        type="button"
                        disabled={cart.cartItems.length === 0}
                        onClick={placeOrderHandler}
                        className="cusButton"
                      >
                        Place Order
                      </Button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Col>
      </Row>
    </div>
  );
}
