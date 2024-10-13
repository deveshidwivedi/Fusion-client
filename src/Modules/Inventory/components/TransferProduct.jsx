import React, { useState } from "react";
import "../styles/transferProduct.css";

function TransferProduct() {
  const [requests] = useState([
    { department: "ECE", item: "Laptop", quantity: 10 },
    // Add more request objects if needed
  ]);

  return (
    <div className="container">
      {/* Main content */}
      <div className="content">
        {/* <div className="breadcrumb">
          <p>Overall Inventory {'>'} CSE {'>'} Transfer</p>
        </div> */}

        <div className="table-container">
          <h2>Transfer Requests</h2>
          <table>
            <thead>
              <tr>
                <th>Department</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => (
                <tr key={index}>
                  <td>{request.department}</td>
                  <td>{request.item}</td>
                  <td>{request.quantity}</td>
                  <td>
                    <input type="checkbox" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Transfer Form */}
        <div className="form-container">
          <h2>Process Transfer</h2>
          <form>
  <div className="form-group">
    <label htmlFor="product-name">Product Name</label>
    <input
      type="text"
      id="product-name"
      placeholder="Enter Product Name"
      required
    />
  </div>

  <div className="form-group">
    <label htmlFor="quantity">Quantity</label>
    <input
      type="number"
      id="quantity"
      placeholder="Enter Quantity"
      required
      min="1"
    />
  </div>

  <div className="form-group">
    <label htmlFor="from-department">From Department</label>
    <select id="from-department" required>
      <option value="">Select Department</option>
      <option value="CSE">CSE</option>
      <option value="ECE">ECE</option>
      <option value="ME">ME</option>
      <option value="SM">SM</option>
    </select>
  </div>

  <div className="form-group">
    <label htmlFor="to-department">To Department</label>
    <select id="to-department" required>
      <option value="">Select Department</option>
      <option value="CSE">CSE</option>
      <option value="ECE">ECE</option>
    </select>
  </div>

  <button type="submit" className="form-button">Transfer</button>
</form>

        </div>
      </div>
    </div>
  );
}

export default TransferProduct;
