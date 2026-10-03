import { BrowserRouter,Routes,Route } from "react-router-dom";
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



const App =()=>{
  return<>
  <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route path="/home" element={<Home/>}></Route>
    <Route path="/products" element={<Products/>}></Route>
    <Route path="/search" element={<SearchBar/>}></Route>
    <Route path="/cart" element={<Cart/>}></Route>
    <Route path="/orders" element={<Orders/>}></Route>
    <Route path="/login" element={<Login/>}></Route>
    <Route path="/register" element={<Register/>}></Route>
    <Route path="/about" element={<About />} />
    <Route path="/addfood" element={<AddFood />} />
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="/view" element={<ViewFood />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/admin/orders" element={<AdminOrders />} />
  </Routes>
  <Footer/>
  </BrowserRouter>
  </>
}
export default App;