import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router";
import { Store } from "../screens/Store";
import CheckoutSteps from "../components/CheckoutSteps";

export default function ShippingAddressScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispach } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [firstName, setFirstName] = useState(shippingAddress.fullName || "");
  const [lastName, setLastName] = useState(shippingAddress.lastName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  });
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispach({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { firstName, lastName, address, city, postalCode, country },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        firstName,
        lastName,
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate("/payment");
  };
  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="container small-container">
        <h1 className="my-3"> Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label> First Name </Form.Label>
            <Form.Control
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label> City </Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label> Postal </Form.Label>
            <Form.Control
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label> Country </Form.Label>
            <Form.Control
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <div className="mb-3">
            <Button variant="primary" className="cusButton" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
