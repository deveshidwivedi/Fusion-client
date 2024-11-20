
import React from 'react';
import { useForm } from 'react-hook-form';
import '../styles/transferProduct.css';

function TransferProduct() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://127.0.0.1:8000/inventory/api/transfer_product/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          productName: data.productName,
          quantity: data.quantity,
          fromDepartment: selectedDepartment, // Assuming selectedDepartment is the current department
          toDepartment: data.todepartment,
          description: data.description,
        }),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Product transferred successfully:', result);
        // Update the inventory table with new data
        setInventoryData((prevData) => {
          const updatedData = [...prevData];
          const index = updatedData.findIndex(
            (item) => item.item_name === result.item_name && item.department_name === result.department_name
          );
          if (index !== -1) {
            updatedData[index] = result; // Update the existing item
          } else {
            updatedData.push(result); // Add new item to the table
          }
          return updatedData;
        });
      } else {
        const error = await response.json();
        alert('Error: ' + error.detail);
      }
    } catch (error) {
      console.error('Error transferring product:', error);
      alert('Something went wrong. Please try again.');
    }
  };
  

  return (
    <div className="add-product-container">
      <h2>Transfer Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Product Name
          <span className="required">*</span>
        </label>
        <input
          type="text"
          {...register('productName', { required: 'Product Name is required' })}
          placeholder="Enter Product Name"
        />
        {errors.productName && <p className="error-message">{errors.productName.message}</p>}

        <label>
          Quantity
          <span className="required">*</span>
        </label>
        <input
          type="number"
          {...register('quantity', {
            required: 'Quantity is required',
            min: { value: 1, message: 'Quantity must be at least 1' }
          })}
          placeholder="Enter Quantity"
        />
        {errors.quantity && <p className="error-message">{errors.quantity.message}</p>}

        <label>
          Category
          <span className="required">*</span>
          </label>
        <input
          type="text"
          {...register('category', { required: 'Category is required' })}
          placeholder="Enter Category"
        />
        {errors.category && <p className="error-message">{errors.category.message}</p>}

        <label>
          To Department
          <span className="required">*</span>
        </label>
        <select {...register('todepartment', { required: 'Department is required' })}>
          <option value="">Select Department</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="ME">ME</option>
          <option value="SM">SM</option>
          <option value="DS">DS</option>
          {/* Add more departments if needed */}
        </select>
        {errors.todepartment && <p className="error-message">{errors.todepartment.message}</p>}

        <label>Description</label>
        <textarea
          {...register('description', { required: 'Description is required' })}
          placeholder="Enter Description of Product"
        ></textarea>
        {errors.description && <p className="error-message">{errors.description.message}</p>}

        <center>
          <button type="submit">Transfer Product</button>
        </center>
      </form>
    </div>
  );
}

export default TransferProduct;
