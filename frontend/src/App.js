import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropDown from "react-bootstrap/NavDropdown";
import Badge from "react-bootstrap/Badge";
import { LinkContainer } from "react-router-bootstrap";
import { useContext, useEffect, useState } from "react";
import { Store } from "./screens/Store";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SignupScreen from "./screens/SignupScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreens from "./screens/OrderScreens";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import Button from "react-bootstrap/esm/Button";
import { getError } from "./utils";
import axios from "axios";
import SearchBox from "./components/SearchBox";
import SearchScreen from "./screens/SearchScreen";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AdminRoute from "./screens/AdminRoute";
import DashboardScreen from "./screens/DashboardScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import MapScreen from "./screens/MapScreen";

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fullBox, cart, userInfo } = state;
  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (error) {
        toast.error(getError(error));
      }
    };

    fetchCategories();
  }, []);
  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? fullBox
              ? "site-container active-cont d-flex flex-column full-box"
              : "site-container active-cont d-flex flex-column"
            : fullBox
            ? "site-container d-flex flex-column full-box"
            : "site-container d-flex flex-column"
        }
      >
        <ToastContainer position="bottom-center" limit={1}></ToastContainer>
        <header>
          <Navbar variant="dark" expand="lg">
            <Container>
              <Button
                variant="dark"
                className="cusButton"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i>
              </Button>
              <LinkContainer to="/">
                <Navbar.Brand>
                  <figure>
                    <img src="../lips.png" alt="Lucious lips"></img>
                    <figcaption>CocoTi Cosmetics</figcaption>
                  </figure>
                </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>

              <Navbar.Collapse id="basic-navbar-nav">
                <SearchBox></SearchBox>
                <Nav className="me-auto w-100 justify-content-end">
                  <Link to="/cart">
                    <i className="fa-solid fa-cart-shopping"></i>
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
                  {userInfo && userInfo.isAdmin && (
                    <NavDropDown title="Admin" id="admin-nav-dropdown">
                      <LinkContainer to="/admin/dashboard">
                        <NavDropDown.Item>Dashboard</NavDropDown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/products">
                        <NavDropDown.Item>Products</NavDropDown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orders">
                        <NavDropDown.Item>Orders</NavDropDown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/users">
                        <NavDropDown.Item>Users</NavDropDown.Item>
                      </LinkContainer>
                    </NavDropDown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <div
          className={
            sidebarIsOpen
              ? "active-nav side-navbar d-flex justify-content-between flex-wrap flex-colum"
              : "side-navbar d-flex justify-content-between flex-wrap flex-column"
          }
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>Category</strong>
            </Nav.Item>
            <Nav.Item>
              {categories.map((category) => (
                <Nav.Item key={category}>
                  <LinkContainer
                    to={`/search?category=${category}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    <Nav.Link>{category}</Nav.Link>
                  </LinkContainer>
                </Nav.Item>
              ))}
            </Nav.Item>
          </Nav>
        </div>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen></CartScreen>}></Route>
              <Route
                path="/search"
                element={<SearchScreen></SearchScreen>}
              ></Route>
              <Route path="/signin" element={<SigninScreen></SigninScreen>} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoutes>
                    <ProfileScreen></ProfileScreen>
                  </ProtectedRoutes>
                }
              ></Route>
              <Route
                path="/map"
                element={
                  <ProtectedRoutes>
                    <MapScreen></MapScreen>
                  </ProtectedRoutes>
                }
              ></Route>
              <Route
                path="/signup"
                element={<SignupScreen></SignupScreen>}
              ></Route>
              <Route
                path="/placeorder"
                element={
                  <ProtectedRoutes>
                    <PlaceOrderScreen></PlaceOrderScreen>
                  </ProtectedRoutes>
                }
              ></Route>
              <Route
                path="/order/:id"
                element={<OrderScreens></OrderScreens>}
              ></Route>
              <Route
                path="/orderhistory"
                element={
                  <ProtectedRoutes>
                    <OrderHistoryScreen></OrderHistoryScreen>
                  </ProtectedRoutes>
                }
              ></Route>
              <Route
                path="/shipping"
                element={<ShippingAddressScreen></ShippingAddressScreen>}
              ></Route>
              <Route
                path="/payment"
                element={<PaymentMethodScreen></PaymentMethodScreen>}
              ></Route>
              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <DashboardScreen></DashboardScreen>{" "}
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/orders"
                element={
                  <AdminRoute>
                    <OrderListScreen></OrderListScreen>
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <UserListScreen></UserListScreen>
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <ProductListScreen></ProductListScreen>{" "}
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/product/:id"
                element={
                  <AdminRoute>
                    <ProductEditScreen></ProductEditScreen>{" "}
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/user/:id"
                element={
                  <AdminRoute>
                    <UserEditScreen></UserEditScreen>
                  </AdminRoute>
                }
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
