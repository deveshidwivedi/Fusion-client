
import React from 'react';
import { useForm } from 'react-hook-form';
import '../styles/transferProduct.css';

function TransferProduct() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
   
    console.log(data);
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
