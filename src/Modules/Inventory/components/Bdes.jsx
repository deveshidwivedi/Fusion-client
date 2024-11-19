import React, { useState, useEffect } from "react";
import { Table, Container, Group, Paper, Button, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import AddProduct from "./AddProduct";
import TransferProduct from "./TransferProduct";
import "../styles/popupModal.css";

export default function Inventory() {
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showTransferProductModal, setShowTransferProductModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("CSE");
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const departments = [
    { label: "CSE", value: "CSE" },
    { label: "ECE", value: "ECE" },
    { label: "ME", value: "ME" },
    { label: "SM", value: "SM" },
    { label: "Design", value: "Design" },
  ];

  const fetchDepartmentData = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("Please log in to add a product");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/inventory/api/departments/?department=${selectedDepartment}`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch department data");
      }

      const data = await response.json();
      console.log("Department data:", data);
      setInventoryData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching department data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchDepartmentData(selectedDepartment);
  }, [selectedDepartment]);

  // const handleTransferClick = () => {
  //   navigate("/inventory/transfer");
  // };

  const openAddProductModal = () => {
    setShowAddProductModal(true);
  };

  const closeAddProductModal = () => {
    setShowAddProductModal(false);
  };
  const openTransferProductModal = () => {
    setShowTransferProductModal(true);  // Show the modal when "Add Product" is clicked
  };

  const closeTransferProductModal = () => {
    setShowTransferProductModal(false);  // Close the modal when needed
  };

  const relevantColumns = ["Department", "Item", "Quantity"];

  return (
    <Container
      style={{
        marginTop: "20px",
        maxWidth: "1000px",
        maxHeight: "1000px",
        // backgroundColor: "white",
        padding: "20px",
        // marginLeft:"-100px"
        // borderRadius: "12px",
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
            variant="filled"
            color="blue"
            onClick={openTransferProductModal}
            size="md"
          >
            Transfer Product
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
        style={{ borderRadius: "12px", marginLeft: "81px", width: "800px" }}
      >
        <div style={{ overflowX: "auto" }}>
          <Table striped highlightOnHover verticalSpacing="md">
            <thead>
              <tr>
                {relevantColumns.map((col) => (
                  <th key={col} style={{ fontSize: "20px" }}>
                    {col.charAt(0).toUpperCase() + col.slice(1)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={relevantColumns.length}
                    style={{ textAlign: "center" }}
                  >
                    Loading data...
                  </td>
                </tr>
              ) : (
                inventoryData.map((item, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>
                      {item.department_name}
                    </td>
                    <td style={{ textAlign: "center" }}>{item.item_name}</td>
                    <td style={{ textAlign: "center" }}>{item.quantity}</td>
                  </tr>
                ))
              )}
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
            
{showTransferProductModal && (
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
            onClick={closeTransferProductModal}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                closeTransferProductModal();
              }
            }}
            aria-label="Close Transfer Product Modal Background"
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
              onClick={closeTransferProductModal}
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
              <TransferProduct />
            </div>
          </div>
        </>
      )}
    </Container>
  );
}
