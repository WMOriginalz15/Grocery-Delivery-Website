"use client";

import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import { categories } from "@/utils/Categories";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddProductForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [isProductCreated, setIsProductCreated] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      inStock: false,
      price: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    if (!data.category) {
      setIsLoading(false);
      return toast.error("Category is not selected!");
    }
    if (!image) {
      setIsLoading(false);
      return toast.error("No image selected!");
    }

    let imageUrl = "";
      try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "ecommerce_unsigned");
      const res = await fetch("https://api.cloudinary.com/v1_1/dyvqj6iws/upload", {
        method: "POST",
        body: formData,
      });
      const cloudinaryData = await res.json();
      if (cloudinaryData.secure_url) {
        imageUrl = cloudinaryData.secure_url;
      } else {
        throw new Error("Cloudinary upload failed");
        }
      } catch (error) {
        setIsLoading(false);
      return toast.error("Error uploading image");
      }

    const productData = {
      name: data.name,
      price: data.price,
      category: data.category,
      description: data.description,
      inStock: data.inStock,
      images: [{ color: "N/A", colorCode: "N/A", image: imageUrl }],
    };

    axios
      .post("/api/product", productData)
      .then(() => {
        toast.success("Product created");
        setIsProductCreated(true);
        reset();
        setImage(null);
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong when saving product to db");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const category = watch("category");

  return (
    <>
      <Heading title="Add a Product" center />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          {...register("name", { required: true })}
        disabled={isLoading}
          className="border p-2 rounded"
      />
        <input
          type="number"
          placeholder="Price"
          {...register("price", { required: true })}
        disabled={isLoading}
          className="border p-2 rounded"
        />
        <select
          {...register("category", { required: true })}
          disabled={isLoading}
          className="border p-2 rounded"
        >
          <option value="">Select Category</option>
          {categories.map((item) => (
            <option key={item.label} value={item.label}>
              {item.label}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Description (optional)"
          {...register("description")}
        disabled={isLoading}
          className="border p-2 rounded"
      />
        <input
          type="file"
          accept="image/*"
        disabled={isLoading}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImage(e.target.files[0]);
            }
          }}
          className="border p-2 rounded"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("inStock")}
            disabled={isLoading}
          />
          This product is in stock
        </label>
      <Button
        label={isLoading ? "Loading..." : "Add Product"}
        onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
      />
      </form>
    </>
  );
};

export default AddProductForm;
