import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import $axios from "@/axios/index";
import { Category } from "../../types/Category";
import ProductsByCategoryComponent from "@/components/productsByCategory/ProductsByCategoryComponent";

const ProductsByCategory = () => {
  const [productsByCategory, setProductsByCategory] = useState<any[]>([]);
  let { category } = useParams<{ category: Category }>();
  const [categoryInVNese, setCategoryInVNese] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const res = await $axios.get(`product/byCategory/${category}`);
        setProductsByCategory(res.data);
      } catch (error) {}
    })();
    switch (category) {
      case Category.DONG_TRUNG_HA_THAO:
        setCategoryInVNese("Đông trùng hạ thảo");
        break;
      case Category.YEN_SAO_THUONG_HANG:
        setCategoryInVNese("Yến sào thượng hạng");
        break;
      case Category.SAFFARON:
        setCategoryInVNese("Saffaron");
        break;
      case Category.NHAN_SAM:
        setCategoryInVNese("Nhân sâm");
        break;
      case Category.KHAC:
        setCategoryInVNese("Khác");
        break;

      default:
        break;
    }
  }, [category]);
  return (
    <div className="section my-10">
      <h1 className="mb-6">{categoryInVNese}</h1>
      <ProductsByCategoryComponent allProducts={productsByCategory} />
    </div>
  );
};

export default ProductsByCategory;
