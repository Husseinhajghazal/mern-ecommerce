import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";

const Input = ({
  value,
  onChange,
  onBlur,
  error,
  isValid,
  autoComplete,
  id,
  type,
  label,
  className,
  classNameInput,
  placeholder,
  min,
  profile,
}) => {
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState(null);

  if (type === "text") {
    return (
      <div className={`${className}`}>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <div className="mt-1">
          <input
            type="text"
            id={id}
            autoComplete={autoComplete}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            className={`${classNameInput} appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none ${
              isValid
                ? "focus:ring-rose-500 focus:border-rose-500 hover:border-rose-500 border-rose-500"
                : "focus:ring-[#f27a1a] focus:border-[#f27a1a] hover:border-[#f27a1a] border-gray-300"
            } duration-500 sm:text-sm`}
          />
          {isValid && <p className="text-sm ml-2 text-rose-600">{error}</p>}
        </div>
      </div>
    );
  }
  if (type === "textarea") {
    return (
      <div className={`${className}`}>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <div className="mt-1">
          <textarea
            rows={6}
            cols={30}
            id={id}
            autoComplete={autoComplete}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            className={`${classNameInput} appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none ${
              isValid
                ? "focus:ring-rose-500 focus:border-rose-500 hover:border-rose-500 border-rose-500"
                : "focus:ring-[#f27a1a] focus:border-[#f27a1a] hover:border-[#f27a1a] border-gray-300"
            } duration-500 sm:text-sm`}
          />
          {isValid && <p className="text-sm ml-2 text-rose-600">{error}</p>}
        </div>
      </div>
    );
  }
  if (type === "number") {
    return (
      <div className={`${className}`}>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <div className="mt-1">
          <input
            type="number"
            id={id}
            autoComplete={autoComplete}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            min={0}
            placeholder={placeholder}
            className={`${classNameInput} !appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none ${
              isValid
                ? "focus:ring-rose-500 focus:border-rose-500 hover:border-rose-500 border-rose-500"
                : "focus:ring-[#f27a1a] focus:border-[#f27a1a] hover:border-[#f27a1a] border-gray-300"
            } duration-500 sm:text-sm`}
          />
          {isValid && <p className="text-sm ml-2 text-rose-600">{error}</p>}
        </div>
      </div>
    );
  }
  if (type === "date") {
    return (
      <div className={`${className}`}>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <div className="mt-1">
          <input
            type="date"
            id={id}
            autoComplete={autoComplete}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            min={min}
            className={`${classNameInput} !appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none ${
              isValid
                ? "focus:ring-rose-500 focus:border-rose-500 hover:border-rose-500 border-rose-500"
                : "focus:ring-[#f27a1a] focus:border-[#f27a1a] hover:border-[#f27a1a] border-gray-300"
            } duration-500 sm:text-sm`}
          />
          {isValid && <p className="text-sm ml-2 text-rose-600">{error}</p>}
        </div>
      </div>
    );
  }
  if (type === "password") {
    return (
      <div className={`${className}`}>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <div className="mt-1 relative">
          <input
            type={visible ? "text" : "password"}
            id={id}
            autoComplete="current-password"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={`${classNameInput} appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none ${
              isValid
                ? "focus:ring-rose-500 focus:border-rose-500 hover:border-rose-500 border-rose-500"
                : "focus:ring-[#f27a1a] focus:border-[#f27a1a] hover:border-[#f27a1a] border-gray-300"
            } duration-500 sm:text-sm`}
          />
          {visible ? (
            <AiOutlineEye
              className={`absolute right-2 top-2 cursor-pointer ${
                profile && "800px:!right-9"
              }`}
              size={25}
              onClick={() => setVisible(false)}
            />
          ) : (
            <AiOutlineEyeInvisible
              className={`absolute right-2 top-2 cursor-pointer ${
                profile && "800px:!right-9"
              }`}
              size={25}
              onClick={() => setVisible(true)}
            />
          )}
          {isValid && <p className="text-sm ml-2 text-rose-600">{error}</p>}
        </div>
      </div>
    );
  }
  if (type === "image") {
    return (
      <div className={`${className} mt-2 flex items-center`}>
        <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              loading="lazy"
              alt="avatar"
              className="h-full object-cover rounded-full"
            />
          ) : (
            <RxAvatar className="h-8 w-8" />
          )}
        </span>
        <label
          htmlFor="image"
          className="ml-5 flex items-center justify-center px-4 py-2 border-gray-300 rounded-md shadow-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 duration-500"
        >
          <span>Upload a file</span>
          <input
            type="file"
            id={id}
            accept=".jpg,.jpeg,.png"
            onChange={(e) => {
              setImage(e.target.files[0]);
              onChange("image", e.target.files[0]);
            }}
            className="sr-only"
          />
        </label>
        {isValid && <p className="text-sm ml-2 text-rose-600">{error}</p>}
      </div>
    );
  }
};

export default Input;
