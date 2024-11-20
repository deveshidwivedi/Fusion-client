import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import "../styles/addProduct.css";

function AddProduct({ onSuccess, selectedDepartment }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("Please log in to add a product");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/inventory/api/departments/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            item_name: data.productName,
            quantity: parseInt(data.quantity, 10), // Parse the quantity to an integer
            department_name: selectedDepartment,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to add product: ${errorData.detail || response.statusText}`
        );
      }

      const result = await response.json();
      console.log("Product added:", result);
      alert("Product added successfully!");

      if (onSuccess) {
        onSuccess();
      }

      reset(); // Reset the form fields
    } catch (error) {
      console.error("Error occurred:", error);
      alert(`Error occurred: ${error.message}`);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="productName">Product Name
          <span className="required">*</span>
          </label>
          <input
            type="text"
            id="productName"
            {...register("productName", { required: "Product Name is required" })}
            placeholder="Enter Product Name"
          />
          {errors.productName && (
            <p className="error-message">{errors.productName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="quantity">Quantity
          <span className="required">*</span>
          </label>
          <input
            type="number"
            id="quantity"
            {...register("quantity", {
              required: "Quantity is required",
              valueAsNumber: true,
              min: { value: 1, message: "Quantity must be at least 1" },
            })}
            placeholder="Enter Quantity"
          />
          {errors.quantity && (
            <p className="error-message">{errors.quantity.message}</p>
          )}
        </div>

        <center>
          <button type="submit">Add Product</button>
        </center>
      </form>
    </div>
  );
}

AddProduct.propTypes = {
  onSuccess: PropTypes.func,
  selectedDepartment: PropTypes.string.isRequired,
};

export default AddProduct;
