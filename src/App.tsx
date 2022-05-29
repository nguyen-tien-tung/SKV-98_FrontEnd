import logo from "./logo.svg";
import "./App.scss";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import NewProductForm from "./pages/NewProductForm";
import Home from "./pages/home/Home";
import NotFoundPage from "./pages/error/404";
import TopNav from "./components/topnav/TopNav";
import SignUpOrLogIn from "./pages/auth/SignUpOrLogIn";

import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import AllProducts from "./pages/AllProducts";
import ProductsByCategory from "./pages/products-by-category/ProductsByCategory";
import ProductDetails from "./pages/productDetails/ProductDetails";
import ContactUs from "./pages/contact-us/ContactUs";
import AboutUs from "./pages/about-us/AboutUs";
import UserContextProvider from "./contexts/UserContext";
import { useContext, useEffect } from "react";
import { UserContext } from "./contexts/UserContext";
import News from "@/components/news/News";
import CreateLoyaltySetting from "./pages/loyaltySetting/CreateLoyaltySetting";
import ShoppingCart from "./pages/shoppingCart/ShoppingCart";

function App() {
  const NavLayout = () => (
    <>
      <TopNav />
      <Outlet />
      <Footer />
    </>
  );

  return (
    <UserContextProvider>
      <BrowserRouter>
        <div className="App ">
          <Routes>
            <Route path="/auth/signup" element={<SignUpOrLogIn />} />
            <Route path="/auth/login" element={<SignUpOrLogIn />} />

            <Route path="/" element={<NavLayout />}>
              <Route path="" element={<Home />} />
              <Route path="/product/:productId" element={<ProductDetails />} />
              <Route path="/upload-new-product" element={<NewProductForm />} />
              <Route path="/news" element={<News />} />
              <Route path="/all-products" element={<AllProducts />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/shopping-cart" element={<ShoppingCart />} />
              <Route
                path="/create-loyalty-setting"
                element={<CreateLoyaltySetting />}
              />
              <Route
                path="products-by-category/:category"
                element={<ProductsByCategory />}
              />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
