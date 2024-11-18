import React, { useState } from "react";
import {
  Table,
  Container,
  Group,
  Paper,
  Button,
  Text,
  // Select,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import AddProduct from "./AddProduct";

const data = [
  {
    product: "Chairs",
    quantity: 80,
    price: 480,
    department: "H1",
    lastUpdated: "29-03-2024",
  },
  {
    product: "Tables",
    quantity: 50,
    price: 1000,
    department: "H1",
    lastUpdated: "29-03-2024",
  },
  {
    product: "Lights",
    quantity: 30,
    price: 300,
    department: "H3",
    lastUpdated: "14-03-2024",
  },
  {
    product: "Bulbs",
    quantity: 100,
    price: 50,
    department: "H3",
    lastUpdated: "26-03-2024",
  },
  {
    product: "Chairs",
    quantity: 80,
    price: 480,
    department: "H4",
    lastUpdated: "29-03-2024",
  },
  {
    product: "Tables",
    quantity: 50,
    price: 1000,
    department: "H4",
    lastUpdated: "29-03-2024",
  },
  {
    product: "Lights",
    quantity: 30,
    price: 300,
    department: "Panini",
    lastUpdated: "14-03-2024",
  },
  {
    product: "Bulbs",
    quantity: 100,
    price: 50,
    department: "Panini",
    lastUpdated: "26-03-2024",
  },
  {
    product: "Chairs",
    quantity: 50,
    price: 400,
    department: "Maa Saraswati",
    lastUpdated: "01-04-2024",
  },
  {
    product: "Tables",
    quantity: 20,
    price: 600,
    department: "Maa Saraswati",
    lastUpdated: "02-04-2024",
  },
];

export default function HostelInventory() {
  const [selectedDepartment, setSelectedDepartment] = useState("H1");
  const sortOption = "Last Updated";
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const navigate = useNavigate();

  const departments = [
    { label: "H1", value: "H1" },
    { label: "H3", value: "H3" },
    { label: "H4", value: "H4" },
    { label: "Panini", value: "Panini" },
    { label: "Maa Saraswati", value: "Maa Saraswati" },
  ];

  const handleTransferClick = () => {
    navigate("/inventory/transfer");
  };

  const filteredData = data
    .filter((item) => item.department === selectedDepartment)
    .sort((a, b) => {
      if (sortOption === "Last Updated") {
        return new Date(b.lastUpdated) - new Date(a.lastUpdated);
      }
      if (sortOption === "price") {
        return a.price - b.price;
      }
      return 0;
    });

  const openAddProductModal = () => {
    setShowAddProductModal(true);
  };

  const closeAddProductModal = () => {
    setShowAddProductModal(false);
  };

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
        {selectedDepartment} Hostel Inventory
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
            size="md"
            onClick={openAddProductModal}
          >
            Add Product
          </Button>
        </Group>
      </div>

      <Paper
        shadow={false}
        p="lg"
        style={{
          borderRadius: "12px",
          marginLeft: "190px",
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <Table striped highlightOnHover verticalSpacing="md">
            <thead>
              <tr>
                <th
                  style={{
                    fontSize: "24px",
                    padding: "16px 16px 16px 8px",
                    textAlign: "left",
                    // marginLeft:"-100px"
                  }}
                >
                  Product
                </th>
                <th
                  style={{
                    fontSize: "24px",
                    padding: "16px 16px 16px 2px",
                    textAlign: "left",
                  }}
                >
                  Quantity
                </th>
                <th
                  style={{
                    fontSize: "24px",
                    padding: "16px 16px 16px 14px",
                    textAlign: "left",
                  }}
                >
                  Price
                </th>
                <th
                  style={{
                    fontSize: "24px",
                    padding: "16px 16px 16px 2px",
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
