import axios from "axios";
import React, { useState } from "react";

import { useForm } from "../helper/userForm";
import IProduct from "../types/IProduct";

const NewProductForm = () => {
  const productInfo: IProduct = {
    name: "",
    price: 0,
    description: "",
    mainImage: "",
    images: [],
  };
  const [imageSource, setImageSource] = useState<string>("");
  const submitForm = async () => {
    values.price = parseFloat(values.price);
    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "product",
        values
      );
      setImageSource(res.data.images[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMainImage: (e: any) => void = (e) => {
    const file = e.target.file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      values.mainImage = reader.result;
    };

    reader.onerror = function () {
      console.log(reader.error);
    };
  };

  const handleImages: (e: any) => void = (e) => {
    const files = e.target.files;
    let tempFiles: Array<string | ArrayBuffer | null> = [];
    for (const [key, value] of Object.entries(files)) {
      const reader = new FileReader();
      reader.readAsDataURL(value as any);
      reader.onload = function () {
        tempFiles.push(reader.result);
      };

      reader.onerror = function () {
        console.log(reader.error);
      };
    }
    values.images = tempFiles;
  };

  const { onChange, onSubmit, values } = useForm(submitForm, productInfo);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          value={values.name}
          onChange={onChange}
          name="name"
        />
        <label htmlFor="price">Price</label>
        <input
          type="text"
          value={values.price}
          onChange={onChange}
          name="price"
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          value={values.description}
          onChange={onChange}
          name="description"
        />
        <label htmlFor="image">Image</label>
        <input type="file" onChange={handleMainImage} name="mainImage" />
        <label htmlFor="images">Images</label>
        <input type="file" onChange={handleImages} name="images" multiple />
        <button>SUBMIT</button>
      </form>
      <img src={`${imageSource}`} alt="" />
    </div>
  );
};

export default NewProductForm;
