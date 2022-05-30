import React from "react";
import { useNavigate, Link } from "react-router-dom";
import moneyConverter from "@/utils/moneyConverter";
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
              {moneyConverter(product.price)}đ
            </h3>
            <Link to={`/product/${product.id}`}>
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
              >
                Mua ngay
              </button>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ProductsByCategoryComponent;
