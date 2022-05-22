import React, { useEffect } from "react";
import { useState } from "react";
import IProduct from "../types/IProduct";
import axios from "axios";

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_API_URL + "product");
        setAllProducts(res.data);
      } catch (error) {
        console.error(error);
      }
    })();
  });
  return (
    <div>
      {allProducts.length > 0 &&
        allProducts.map((p) => (
          <>
            <h1>{p.name}</h1>
            <h1>{p.category}</h1>
            <h1>{p.price}</h1>
            <img
              src={p.mainImage}
              alt=""
              style={{ width: "200px", height: "200px" }}
            />
            {p.images.map((i) => (
              <img src={i} style={{ width: "200px", height: "200px" }} />
            ))}
          </>
        ))}
    </div>
  );
};

export default AllProducts;
