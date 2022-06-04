import React from "react";
import { Link } from "react-router-dom";

const AdminRoutes = () => {
  return (
    <div className="section flex justify-evenly">
      <Link to="upload-new-product">Upload New Product</Link>
      <Link to="all-loyalty-setting">Loyalty Settings</Link>
      <Link to="all-order-requests">All Order Requests</Link>
    </div>
  );
};

export default AdminRoutes;
