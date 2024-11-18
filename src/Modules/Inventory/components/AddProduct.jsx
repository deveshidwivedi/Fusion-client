import React, { useState } from "react";
import "../styles/addProduct.css";

function AddProduct() {
  const [formData, setFormData] = useState({
    productName: "",
    quantity: "",
    department: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("Please log in to add a product");
      return;
    }

    if (!formData.productName || !formData.quantity || !formData.department) {
      alert("Please fill in all the fields");
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
            item_name: formData.productName,
            quantity: formData.quantity,
            department_name: formData.department,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error details:", errorData);
        throw new Error(
          `Failed to add product: ${errorData.detail || response.statusText}`,
        );
      }

      const data = await response.json();
      console.log("Product added:", data);
      alert("Product added successfully!");
      setFormData({
        productName: "",
        quantity: "",
        department: "",
      });
    } catch (error) {
      console.error("Error occurred:", error);
      alert(`Error occurred: ${error.message}`);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            placeholder="Enter Product Name"
          />
        </div>

        <div>
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Enter Quantity"
          />
        </div>

        <div>
          <label htmlFor="department">Department</label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="ME">ME</option>
            <option value="SM">SM</option>
            <option value="DS">DS</option>
          </select>
        </div>

        <center>
          <button type="submit">Add Product</button>
        </center>
      </form>
    </div>
  );
}

export default AddProduct;
