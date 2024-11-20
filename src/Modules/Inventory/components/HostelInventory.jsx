import React, { useState, useEffect } from "react";
import { Table, Container, Group, Paper, Button, Text } from "@mantine/core";

import AddProduct from "./AddProduct";
import TransferProduct from "./TransferProduct";

export default function HostelInventory() {
  const [selectedDepartment, setSelectedDepartment] = useState("H1");
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showTransferProductModal, setShowTransferProductModal] =
    useState(false);

  const departments = [
    { label: "H1", value: "H1" },
    { label: "H3", value: "H3" },
    { label: "H4", value: "H4" },
    { label: "Panini", value: "Panini" },
    { label: "Maa Saraswati", value: "Maa Saraswati" },
  ];

  const fetchDepartmentData = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("Please log in to view inventory");
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
      setInventoryData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching department data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchDepartmentData();
  }, [selectedDepartment]);

  const openAddProductModal = () => {
    setShowAddProductModal(true);
  };

  const closeAddProductModal = () => {
    setShowAddProductModal(false);
    fetchDepartmentData(); 
  };

  const openTransferProductModal = () => {
    setShowTransferProductModal(true);
  };

  const closeTransferProductModal = () => {
    setShowTransferProductModal(false);
    fetchDepartmentData(); // Refresh data after transfer
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
                <th style={{ fontSize: "24px", padding: "16px" }}>Item</th>
                <th style={{ fontSize: "24px", padding: "16px" }}>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    Loading data...
                  </td>
                </tr>
              ) : (
                inventoryData.map((item, index) => (
                  <tr key={index}>
                    <td
                      style={{
                        padding: "16px",
                        fontSize: "14px",
                        textAlign: "center",
                      }}
                    >
                      {item.item_name} {/* Change 'product' to 'item' */}
                    </td>
                    <td
                      style={{
                        padding: "16px",
                        fontSize: "14px",
                        textAlign: "center",
                      }}
                    >
                      {item.quantity}
                    </td>
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
            aria-label="Close Add Item Modal Background"
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
              overflow: "hidden",
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
                overflow: "hidden",
              }}
            >
              <AddProduct
                onSuccess={closeAddProductModal}
                selectedDepartment={selectedDepartment}
              />
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
            aria-label="Close Transfer Item Modal Background"
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
              overflow: "hidden",
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
                overflow: "hidden",
              }}
            >
              <TransferProduct
                onSuccess={closeTransferProductModal}
                selectedDepartment={selectedDepartment}
              />
            </div>
          </div>
        </>
      )}
    </Container>
  );
}
