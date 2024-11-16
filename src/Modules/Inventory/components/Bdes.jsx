import React, { useState } from "react";
import { Table, Container, Group, Paper, Button, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import AddProduct from "./AddProduct";
import "../styles/popupModal.css";

export default function Inventory() {
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("CSE");
  const navigate = useNavigate();

  const data = [
    // CSE Department Data
    {
      product: "Computer",
      quantity: 50,
      price: 10000,
      department: "CSE",
      lastUpdated: "29-03-2024",
    },
    {
      product: "Peripherals",
      quantity: 50,
      price: 500,
      department: "CSE",
      lastUpdated: "29-03-2024",
    },
    {
      product: "Projectors",
      quantity: 50,
      price: 15000,
      department: "CSE",
      lastUpdated: "14-03-2024",
    },
    // ECE Department Data
    {
      product: "Wires",
      quantity: 30,
      price: 600,
      department: "ECE",
      lastUpdated: "26-03-2024",
    },
    {
      product: "Voltmeter",
      quantity: 30,
      price: 1200,
      department: "ECE",
      lastUpdated: "26-03-2024",
    },
    // Mech Department Data
    {
      product: "Chairs",
      quantity: 80,
      price: 480,
      department: "Mech",
      lastUpdated: "29-03-2024",
    },
    {
      product: "Cables",
      quantity: 80,
      price: 80,
      department: "Mech",
      lastUpdated: "29-03-2024",
    },
    // SM Department Data
    {
      product: "Lasers",
      quantity: 140,
      price: 900,
      department: "SM",
      lastUpdated: "04-03-2024",
    },
    {
      product: "Boards",
      quantity: 140,
      price: 2050,
      department: "SM",
      lastUpdated: "04-03-2024",
    },
    // Design Department Data
    {
      product: "Sheets",
      quantity: 100,
      price: 200,
      department: "Design",
      lastUpdated: "01-10-2024",
    },
    {
      product: "Art Supplies",
      quantity: 50,
      price: 500,
      department: "Design",
      lastUpdated: "28-09-2024",
    },
    {
      product: "Laptop",
      quantity: 20,
      price: 60000,
      department: "Design",
      lastUpdated: "15-09-2024",
    },
  ];

  const departments = [
    { label: "CSE", value: "CSE" },
    { label: "ECE", value: "ECE" },
    { label: "Mech", value: "Mech" },
    { label: "SM", value: "SM" },
    { label: "Design", value: "Design" },
  ];

  const handleTransferClick = () => {
    navigate("/inventory/transfer");
  };

  const openAddProductModal = () => {
    setShowAddProductModal(true);
  };

  const closeAddProductModal = () => {
    setShowAddProductModal(false);
  };

  const filteredData = data.filter(
    (item) => item.department === selectedDepartment,
  );

  return (
    <Container
      style={{
        marginTop: "20px",
        maxWidth: "1200px",
        maxHeight: "1000px",
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <Text
        align="center"
        style={{
          fontSize: "26px",
          marginBottom: "20px",
          fontWeight: 600,
          color: "#228BE6",
        }}
      >
        {selectedDepartment} Department Inventory
      </Text>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Group spacing="md">
          <Button
            style={{ fontSize: "14px" }}
            variant="filled"
            color="blue"
            onClick={handleTransferClick}
            size="md"
          >
            Transfer Item
          </Button>

          {departments.map((dept, index) => (
            <Button
              key={index}
              style={{
                fontSize: "14px",
                backgroundColor:
                  selectedDepartment === dept.value ? "#228BE6" : "white",
                color: selectedDepartment === dept.value ? "white" : "black",
                border: "1px solid #1366D9",
              }}
              onClick={() => setSelectedDepartment(dept.value)}
              size="md"
            >
              {dept.label}
            </Button>
          ))}

          <Button
            style={{ fontSize: "14px" }}
            variant="filled"
            color="blue"
            onClick={openAddProductModal}
            size="md"
          >
            Add Product
          </Button>
        </Group>
      </div>

      <Paper
        shadow="xs"
        p="lg"
        style={{
          borderRadius: "12px",
          marginLeft: "190px",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <Table striped highlightOnHover verticalSpacing="md">
            <thead>
              <tr>
                <th
                  style={{
                    fontSize: "20px",
                    padding: "16px 8px 16px 8px", // Reduced left padding
                    textAlign: "left", // Align text to the left
                  }}
                >
                  Product
                </th>
                <th
                  style={{
                    fontSize: "20px",
                    padding: "16px 8px 16px 8px", // Adjust padding for left alignment
                    textAlign: "left",
                  }}
                >
                  Quantity
                </th>
                <th
                  style={{
                    fontSize: "20px",
                    padding: "16px 8px 16px 8px", // Adjust padding
                    textAlign: "left",
                  }}
                >
                  Price
                </th>
                <th
                  style={{
                    fontSize: "20px",
                    padding: "16px 8px 16px 8px", // Adjust padding
                    textAlign: "left",
                  }}
                >
                  Last Updated
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td style={{ padding: "16px", fontSize: "14px" }}>
                    {item.product}
                  </td>
                  <td style={{ padding: "16px", fontSize: "14px" }}>
                    {item.quantity}
                  </td>
                  <td style={{ padding: "16px", fontSize: "14px" }}>
                    ${item.price}
                  </td>
                  <td style={{ padding: "16px", fontSize: "14px" }}>
                    {item.lastUpdated}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Paper>

      {showAddProductModal && (
        <>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1000,
              overflow: "hidden",
            }}
            role="button"
            tabIndex={0}
            onClick={closeAddProductModal}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                closeAddProductModal();
              }
            }}
            aria-label="Close Add Product Modal Background"
          />

          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              maxWidth: "600px",
              backgroundColor: "#fff",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              zIndex: 1001,
              overflow: "hidden", // Ensure no scrollbar appears
            }}
          >
            <button
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                backgroundColor: "transparent",
                border: "none",
                fontSize: "16px",
                cursor: "pointer",
              }}
              onClick={closeAddProductModal}
              aria-label="Close Modal"
            >
              X
            </button>

            <div
              style={{
                margin: "-80px 0 -65px 0",
                height: "835px",
                overflow: "hidden", // Prevent scrolling inside modal
              }}
            >
              <AddProduct />
            </div>
          </div>
        </>
      )}
    </Container>
  );
}
