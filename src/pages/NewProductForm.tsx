import React, { useState } from "react";

import { useForm } from "../helper/useForm";
import IProduct, { ProductStates } from "../types/IProduct";
import { Category } from "../types/Category";

import storage from "@/firebase/firebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import $axios from "@/axios/index";

const NewProductForm = () => {
  const productInfo: IProduct = {
    name: "",
    price: 0,
    category: "",
    origin: "",
    description: "",
    mainImage: "",
    images: [],
    mass: 0,
    state: ProductStates.AVAILABLE,
  };
  const [imageSource, setImageSource] = useState<string>("");
  const submitForm = async () => {
    values.price = parseFloat(values.price);
    values.mass = parseFloat(values.mass);
    try {
      const res = await $axios.post(
        import.meta.env.VITE_API_URL + "product",
        values
      );
      setImageSource(res.data.images[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const [waitingImage, setWaitingImage] = useState<boolean>(true);
  const [waitingImages, setWaitingImages] = useState<boolean>(true);

  const handleMainImage: (e: any) => void = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        alert(error);
      },
      () => {
        setWaitingImage(true);
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          values.mainImage = downloadURL;
          setWaitingImage(false);
        });
      }
    );
  };

  const handleImages: (e: any) => void = (e) => {
    const files: { [key: string]: any } = e.target.files;
    let tempFiles: Array<string | ArrayBuffer | null> = [];
    for (const [key, value] of Object.entries(files)) {
      const storageRef = ref(storage, `files/${value.name}`);
      const uploadTask = uploadBytesResumable(storageRef, value);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          alert(error);
        },
        () => {
          setWaitingImages(true);
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            tempFiles.push(downloadURL);
            setWaitingImages(false);
          });
        }
      );
    }
    values.images = tempFiles;
  };

  const { onChange, onSubmit, values } = useForm(submitForm, productInfo);
  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col w-fit mx-auto">
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
        <label htmlFor="name">Origin</label>
        <input
          type="text"
          value={values.origin}
          onChange={onChange}
          name="origin"
        />
        <label htmlFor="category">Category</label>
        <select name="category" value={values.category} onChange={onChange}>
          {Object.values(Category).map((key) => (
            <option value={key} key={key}>
              {key}
            </option>
          ))}
          <option value=""></option>
        </select>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          value={values.description}
          onChange={onChange}
          name="description"
        />
        <label htmlFor="mass">Mass</label>
        <input
          type="text"
          value={values.mass}
          onChange={onChange}
          name="mass"
        />
        <label htmlFor="image">Image</label>
        <input type="file" onChange={handleMainImage} name="mainImage" />
        <label htmlFor="images">Images</label>
        <input type="file" onChange={handleImages} name="images" multiple />
        {!waitingImage && !waitingImages && <button>SUBMIT</button>}
      </form>
      <img src={`${imageSource}`} alt="" />
    </div>
  );
};

export default NewProductForm;
