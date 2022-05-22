import React from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  allProducts: any[];
}

const ProductsByCategoryComponent = ({ allProducts }: IProps) => {
  const navigate = useNavigate();
  const toProductDetails: (productID: string) => void = (productID) =>
    navigate(`product/${productID}`);

  return (
    <div className="grid grid-cols-3 gap-y-16 ">
      {allProducts &&
        allProducts.map((product: any) => (
          <div
            key={product.id}
            className="bg-main-red w-fit flex flex-col items-center mx-auto"
          >
            <img
              src={product.mainImage}
              style={{ width: "391px", height: "391px" }}
              className="border-2 border-main-red"
            />
            <h3
              className="text-white"
              style={{ fontSize: "18px", fontWeight: "600" }}
            >
              {product.name}
            </h3>
            <h3
              className="text-main-yellow "
              style={{ fontSize: "22px", fontWeight: "700" }}
            >
              {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
            </h3>
            <button
              className="text-main-red"
              style={{
                backgroundColor: "#FFDD55",
                minWidth: "165px",
                minHeight: "35px",
                border: "2px solid #FFF",
                fontSize: "15px",
                fontWeight: "600",
                lineHeight: "18px",
              }}
              onClick={() => toProductDetails(product.id)}
            >
              Mua ngay
            </button>
          </div>
        ))}
    </div>
  );
};

export default ProductsByCategoryComponent;