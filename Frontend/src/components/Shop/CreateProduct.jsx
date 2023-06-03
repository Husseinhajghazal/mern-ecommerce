import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "../Input/Input";
import { categoriesData } from "../../data/data";
import styles from "../../styles/styles";
import { AiFillDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { createProduct } from "../../redux/actions/product";

const MAX_FILE_SIZE = 204800;

const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Delete = (i) => {
    const filteredArray = preview.filter((_, index) => index !== i);
    setPreview(filteredArray);
    setError2([]);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Product created successfully.");
      navigate("/dashboard/products");
    }
  }, [dispatch, error, navigate, success]);

  const submitHandler = async (values) => {
    if (preview.length === 0) {
      setError2(["Please chose one image at least."]);
    }

    if (error2.length !== 0) {
      return;
    }

    const newForm = new FormData();

    preview.forEach((image) => newForm.append("images", image));
    for (let value in values) {
      newForm.append(value, values[value]);
    }
    newForm.append("shopId", seller?._id);

    dispatch(createProduct(newForm));
  };

  const [preview, setPreview] = useState([]);
  const [error2, setError2] = useState([]);

  useEffect(() => {
    let Errors = [];
    for (let i = 0; i < preview.length; i++) {
      if (preview[i].size > MAX_FILE_SIZE) {
        Errors.push(`${i + 1}. image has size more than 200KB`);
      }
    }
    setError2(Errors);
  }, [preview]);

  useEffect(() => {
    for (let i = 0; i < preview.length; i++) {
      if (!preview[i].type.includes("image")) {
        const filteredArray = preview.filter((_, index) => index !== i);
        setPreview(filteredArray);
        toast.error("It's not photo");
      }
    }
  }, [preview]);

  const handleImageChange = (e) => {
    e.preventDefault();

    let files = Array.from(e.target.files);
    setPreview((prevImages) => [...prevImages, ...files]);
  };

  const initialValues = {
    name: "",
    description: "",
    category: "",
    originalPrice: "",
    discountPrice: "",
    stock: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("required"),
    description: Yup.string().required("required"),
    category: Yup.string().required("required"),
    discountPrice: Yup.string().required("required"),
    stock: Yup.string().required("required"),
  });

  return (
    <motion.div
      initial={{ y: "-120%" }}
      animate={{ y: 0 }}
      exit={{ y: "-120%" }}
      className="w-[95%] 800px:w-[55%] bg-white shadow h-[80vh] rounded-[4px] mt-3 p-3 overflow-y-scroll"
    >
      <h5 className="800px:text-[30px] font-Poppins text-center">
        Create Product
      </h5>
      <Formik
        initialValues={initialValues}
        onSubmit={submitHandler}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <br />
            <Input
              id="name"
              label="Name"
              type="text"
              placeholder="Enter your product name..."
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={errors.name && touched.name}
              error={errors.name}
            />
            <br />
            <Input
              id="description"
              label="Description"
              type="textarea"
              placeholder="Enter your product description..."
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={errors.description && touched.description}
              error={errors.description}
            />
            <br />
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <div className="mt-1">
                <select
                  id="category"
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none ${
                    errors.category && touched.category
                      ? "focus:ring-rose-500 focus:border-rose-500 hover:border-rose-500 border-rose-500"
                      : "focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 border-gray-300"
                  } duration-500 sm:text-sm`}
                >
                  <option value="">Choose a category</option>
                  {categoriesData &&
                    categoriesData.map((i, index) => (
                      <option key={index} value={i.title}>
                        {i.title}
                      </option>
                    ))}
                </select>
                {errors.category && touched.category && (
                  <p className="text-sm ml-2 text-rose-600">
                    {errors.category}
                  </p>
                )}
              </div>
            </div>
            <br />
            <Input
              id="originalPrice"
              label="Original Price"
              type="number"
              placeholder="Enter your product original price..."
              value={values.originalPrice}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={errors.originalPrice && touched.originalPrice}
              error={errors.originalPrice}
            />
            <br />
            <Input
              id="discountPrice"
              label="Discount Price"
              type="number"
              placeholder="Enter your product discount price..."
              value={values.discountPrice}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={errors.discountPrice && touched.discountPrice}
              error={errors.discountPrice}
            />
            <br />
            <Input
              id="stock"
              label="Stock"
              type="number"
              placeholder="Enter your product stock..."
              value={values.stock}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={errors.stock && touched.stock}
              error={errors.stock}
            />
            <br />
            <label className="block text-sm font-medium text-gray-700">
              Images
            </label>
            <div className="mt-1">
              <input
                type="file"
                name=""
                id="upload"
                className="hidden"
                multiple
                onChange={handleImageChange}
              />
              <div className="w-full flex items-center flex-wrap">
                <motion.label
                  whileHover={{ color: "green", scale: 1.2 }}
                  className="h-[110px] w-[110px] m-2 text-[#555] flex items-center justify-center"
                  htmlFor="upload"
                >
                  <AiOutlinePlusCircle size={30} />
                </motion.label>
                {preview &&
                  preview.map((i, index) => (
                    <div className="relative" key={index}>
                      <img
                        src={URL.createObjectURL(i)}
                        alt=""
                        className="h-[110px] w-[110px] object-cover m-2"
                      />
                      <motion.span
                        whileHover={{ color: "red", scale: 1.2 }}
                        className="absolute top-3 left-3 text-[#555]"
                        onClick={() => Delete(index)}
                      >
                        <AiFillDelete size={20} />
                      </motion.span>
                    </div>
                  ))}
              </div>
            </div>
            <br />
            {error2 &&
              error2.map((i, index) => (
                <p key={index} className="text-[red]">
                  {i}
                </p>
              ))}
            <br />
            <button type="submit" className={`${styles.button} !w-full`}>
              Create
            </button>
          </form>
        )}
      </Formik>
    </motion.div>
  );
};

export default CreateProduct;
