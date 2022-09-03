import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropDown from "react-bootstrap/NavDropdown";
import Badge from "react-bootstrap/Badge";
import { LinkContainer } from "react-router-bootstrap";
import { useContext } from "react";
import { Store } from "./screens/Store";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SignupScreen from "./screens/SignupScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreens from "./screens/OrderScreens";

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1}></ToastContainer>
        <header>
          <Navbar variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>
                  <figure>
                    <img src="../lips.png" alt="Lucious lips"></img>
                    <figcaption>CocoTi Cosmetics</figcaption>
                  </figure>
                </Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link to="/cart">
                  <span>
                    <i className="fa-solid fa-cart-shopping">Cart</i>
                  </span>
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropDown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropDown.Item> User Profile</NavDropDown.Item>
                    </LinkContainer>
                    <LinkContainer to="orderhistory">
                      <NavDropDown.Item>Order History</NavDropDown.Item>
                    </LinkContainer>
                    <NavDropDown.Divider></NavDropDown.Divider>
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      {" "}
                      Sign Out
                    </Link>
                  </NavDropDown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen></CartScreen>}></Route>
              <Route path="/signin" element={<SigninScreen></SigninScreen>} />
              <Route
                path="/signup"
                element={<SignupScreen></SignupScreen>}
              ></Route>
              <Route
                path="/placeorder"
                element={<PlaceOrderScreen></PlaceOrderScreen>}
              ></Route>
              <Route
                path="/order/:id"
                element={<OrderScreens></OrderScreens>}
              ></Route>
              <Route
                path="/shipping"
                element={<ShippingAddressScreen></ShippingAddressScreen>}
              ></Route>
              <Route
                path="/payment"
                element={<PaymentMethodScreen></PaymentMethodScreen>}
              ></Route>

              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">&copy; Cyan the Computer Scientist </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
