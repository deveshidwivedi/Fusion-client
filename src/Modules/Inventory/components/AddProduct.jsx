import React, { useState } from 'react';
import '../styles/addProduct.css';

function AddProduct() {
  const [formData, setFormData] = useState({
    productName: '',
    quantity: '',
    category: '',
    department: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle adding product
    console.log(formData);
  };


  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Product Name</label>
        <input
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          placeholder="Enter Product Name"
        />

        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Enter Quantity"
        />

        <label>Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Enter Category"
        />

        <label>Department</label>
        <select name="department" value={formData.department} onChange={handleChange}>
          <option value="">Select Department</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="ME">ME</option>
          <option value="SM">SM</option>
          <option value="DS">DS</option>
          
          {/* Add more departments if needed */}
        </select>

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter Description of Product"
        ></textarea>
<center>
        <button type="submit">Add Product</button>
        </center>
      </form>
    </div>
  );
}

export default AddProduct;