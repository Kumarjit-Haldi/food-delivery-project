import {
  BrowserRouter,
   Routes,
  Route,
  useLocation
} from "react-router-dom";

import Products from "./components/Products";
import Home from "./components/Home";
import SearchBar from "./components/SearchBar";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Register from "./components/Register";
import About from "./components/About";
import AddFood from "./components/AddFood";
import AdminDashboard from "./components/AdminDasboard";
import ViewFood from "./components/ViewFood";
import Checkout from "./components/Checkout";
import AdminOrders from "./components/AdminOrders";
import AdminRoute from "./components/AdminRoute";
import VerifyOTP from "./components/VerifyOTP";
import AIRecommendations from "./components/AIRecommendations";


const Layout = () => {
  const location = useLocation();

  const isAdminRoute =
    location.pathname === "/admin" ||
    location.pathname === "/admin/orders" ||
    location.pathname === "/addfood" ||
    location.pathname === "/view";

  return (
    <>
      {/* User Navbar */}
      {!isAdminRoute && <Navbar />}

      <Routes>

        {/* User Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/search" element={<SearchBar />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/ai" element={<AIRecommendations />} />
        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/addfood"
          element={
            <AdminRoute>
              <AddFood />
            </AdminRoute>
          }
        />

        <Route
          path="/view"
          element={
            <AdminRoute>
              <ViewFood />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />

      </Routes>

      {/* User Footer */}
      {!isAdminRoute && <Footer />}
    </>
  );
};


const App = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

export default App;