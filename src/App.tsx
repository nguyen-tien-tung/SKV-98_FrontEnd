import logo from "./logo.svg";
import "./App.scss";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import NewProductForm from "./views/NewProductForm";
import Home from "./views/Home";
import NotFoundPage from "./views/404";
import TopNav from "./components/topnav/TopNav";
import SignUpOrLogIn from "./views/auth/SignUpOrLogIn";

import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import AllProducts from "./views/allPRoducts";
function App() {
  const NavLayout = () => (
    <>
      <TopNav />
      <Outlet />
      <Footer />
    </>
  );

  return (
    <BrowserRouter>
      <div className="App ">
        <Routes>
          <Route path="auth" element={<SignUpOrLogIn />} />

          <Route path="/" element={<NavLayout />}>
            <Route path="" element={<Home />} />
            <Route path="upload-new-product" element={<NewProductForm />} />
            <Route path="all-products" element={<AllProducts />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
