import { useState, useEffect, FormEvent, MouseEventHandler } from "react";
import IProduct from "../../types/IProduct";
import { ProductStates } from "../../types/IProduct";
import { Category } from "@/types/Category";
import $axios from "@/axios/index";
import { useLocation, useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "@/firebase/firebaseConfig";
const ProductEdit = () => {
  let navigate = useNavigate();

  const location = useLocation();
  const [product, setProduct] = useState<IProduct>({
    name: "",
    price: 0,
    category: "",
    origin: "",
    description: "",
    mainImage: "",
    images: [],
    mass: 0,
    state: ProductStates.AVAILABLE,
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await $axios.get(
          `product/${location.pathname.split("/").slice(-2)[0]}`
        );
        setProduct(res.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  const [imageSource, setImageSource] = useState<string>("");
  const submitForm = async (e: FormEvent) => {
    e.preventDefault();

    setProduct((p) => ({ ...p, price: p.price, mass: p.mass }));
    try {
      const res = await $axios.patch(
        `${import.meta.env.VITE_API_URL}product/${product.id}`,
        { ...product, price: +product.price, mass: +product.mass }
      );
    } catch (error) {
      console.error(error);
    }
  };
  const deleteProduct = async (e: any) => {
    e.preventDefault();
    try {
      const res = await $axios.delete(
        `${import.meta.env.VITE_API_URL}product/${product.id}`
      );
      if (res.status == 200) navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (e: any) =>
    setProduct((p) => ({ ...p, [e.target.name]: e.target.value }));

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
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct((p) => ({ ...p, mainImage: downloadURL as string }));
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
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            tempFiles.push(downloadURL);
          });
        }
      );
    }
    setProduct((p) => ({ ...p, images: tempFiles as string[] }));
  };

  return (
    <div>
      <form onSubmit={submitForm} className="flex flex-col w-fit mx-auto">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          value={product.name}
          onChange={onChange}
          name="name"
        />
        <label htmlFor="price">Price</label>
        <input
          type="text"
          value={product.price}
          onChange={onChange}
          name="price"
        />
        <label htmlFor="name">Origin</label>
        <input
          type="text"
          value={product.origin}
          onChange={onChange}
          name="origin"
        />
        <label htmlFor="category">Category</label>
        <select name="category" value={product.category} onChange={onChange}>
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
          value={product.description}
          onChange={onChange}
          name="description"
        />
        <label htmlFor="mass">Mass</label>
        <input
          type="text"
          value={product.mass}
          onChange={onChange}
          name="mass"
        />
        <label htmlFor="image">Image</label>
        <input type="file" onChange={handleMainImage} name="mainImage" />
        <label htmlFor="images">Images</label>
        <input type="file" onChange={handleImages} name="images" multiple />
        <button type="submit">SUBMIT</button>
        <button
          className="bg-red-500 rounded-md border-red-200"
          onClick={deleteProduct}
        >
          DELETE PRODUCT
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;
