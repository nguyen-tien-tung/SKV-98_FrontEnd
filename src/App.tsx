import logo from "./logo.svg";
import "./App.scss";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import NewProductForm from "./views/NewProductForm";
import Home from "./views/Home";
import NotFoundPage from "./views/404";
import TopNav from "./components/topnav/TopNav";
import SignUpOrLogIn from "./views/auth/SignUpOrLogIn";

import { Outlet } from "react-router-dom";

function App() {
  const NavLayout = () => (
    <>
      <TopNav />
      <Outlet />
    </>
  );

  return (
    <BrowserRouter>
      <div className="App ">
        <Routes>
          <Route path="auth/login" element={<SignUpOrLogIn />} />
          <Route path="auth/signup" element={<SignUpOrLogIn />} />

          <Route path="/" element={<NavLayout />}>
            <Route path="upload-new-product" element={<NewProductForm />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
