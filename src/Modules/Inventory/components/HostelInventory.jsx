import React, { useState } from "react";
import {
  Table,
  Tabs,
  Text,
  Container,
  Group,
  Badge,
  Paper,
  Divider,
  Select,
  Modal,
  TextInput,
  Button,
} from "@mantine/core";

const initialData = [
  {
    product: "Chairs",
    quantity: 100,
    missing: 5,
    department: "H1",
    lastUpdated: "29-03-2024",
  },
  {
    product: "Tables",
    quantity: 50,
    missing: 3,
    department: "H1",
    lastUpdated: "29-03-2024",
  },
  {
    product: "Lights",
    quantity: 75,
    missing: 2,
    department: "H1",
    lastUpdated: "15-03-2024",
  },
  {
    product: "Bulbs",
    quantity: 100,
    missing: 10,
    department: "H1",
    lastUpdated: "12-03-2024",
  },
  {
    product: "Chairs",
    quantity: 80,
    missing: 0,
    department: "H3",
    lastUpdated: "26-03-2024",
  },
  {
    product: "Tables",
    quantity: 60,
    missing: 4,
    department: "H3",
    lastUpdated: "26-03-2024",
  },
  {
    product: "Lights",
    quantity: 90,
    missing: 1,
    department: "H3",
    lastUpdated: "22-03-2024",
  },
  {
    product: "Bulbs",
    quantity: 80,
    missing: 5,
    department: "H3",
    lastUpdated: "18-03-2024",
  },
  {
    product: "Chairs",
    quantity: 120,
    missing: 10,
    department: "H4",
    lastUpdated: "29-03-2024",
  },
  {
    product: "Tables",
    quantity: 75,
    missing: 5,
    department: "H4",
    lastUpdated: "27-03-2024",
  },
  {
    product: "Lights",
    quantity: 110,
    missing: 0,
    department: "H4",
    lastUpdated: "20-03-2024",
  },
  {
    product: "Bulbs",
    quantity: 130,
    missing: 12,
    department: "H4",
    lastUpdated: "16-03-2024",
  },
  {
    product: "Chairs",
    quantity: 140,
    missing: 2,
    department: "Panini",
    lastUpdated: "04-03-2024",
  },
  {
    product: "Tables",
    quantity: 60,
    missing: 0,
    department: "Panini",
    lastUpdated: "02-03-2024",
  },
  {
    product: "Lights",
    quantity: 100,
    missing: 8,
    department: "Panini",
    lastUpdated: "03-03-2024",
  },
  {
    product: "Bulbs",
    quantity: 120,
    missing: 7,
    department: "Panini",
    lastUpdated: "01-03-2024",
  },
  {
    product: "Chairs",
    quantity: 60,
    missing: 5,
    department: "Maa Saraswati",
    lastUpdated: "18-03-2024",
  },
  {
    product: "Tables",
    quantity: 40,
    missing: 2,
    department: "Maa Saraswati",
    lastUpdated: "16-03-2024",
  },
  {
    product: "Lights",
    quantity: 50,
    missing: 3,
    department: "Maa Saraswati",
    lastUpdated: "14-03-2024",
  },
  {
    product: "Bulbs",
    quantity: 55,
    missing: 0,
    department: "Maa Saraswati",
    lastUpdated: "12-03-2024",
  },
];

export default function HostelInventory() {
  const [selectedCategory, setSelectedCategory] = useState("H1");
  const [sortOption, setSortOption] = useState("Last Updated");
  const [data, setData] = useState(initialData);

  // Modal states
  const [addProductModalOpen, setAddProductModalOpen] = useState(false);
  const [transferInventoryModalOpen, setTransferInventoryModalOpen] =
    useState(false);

  // Input states for adding product
  const [newProduct, setNewProduct] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [newDepartment, setNewDepartment] = useState("");
  // Categories List
  const categories = [
    { label: "H1", value: "H1" },
    { label: "H3", value: "H3" },
    { label: "H4", value: "H4" },
    { label: "Panini", value: "Panini" },
    { label: "Maa Saraswati", value: "Maa Saraswati" },
  ];

  // Sorting and Filtering Logic
  const sortedData = [...data]
    .filter((item) => item.department === selectedCategory)
    .sort((a, b) => {
      if (sortOption === "Last Updated") {
        return new Date(b.lastUpdated) - new Date(a.lastUpdated);
      }
      if (sortOption === "Missing") {
        return a.missing - b.missing;
      }
      return 0;
    });

  // Add Product Handler
  const handleAddProduct = () => {
    const quantity = parseInt(newQuantity, 10);

    if (Number.isNaN(quantity) || quantity < 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    const newProductEntry = {
      product: newProduct,
      quantity,
      missing: 0,
      department: newDepartment,
      lastUpdated: new Date().toLocaleDateString(),
    };

    setData((prevData) => [...prevData, newProductEntry]);
    setAddProductModalOpen(false);
    setNewProduct("");
    setNewQuantity("");
    setNewDepartment("");
  };

  const filteredRows = sortedData.map((item, index) => (
    <React.Fragment key={index}>
      <tr>
        <td style={{ fontSize: "16px", textAlign: "center", padding: "10px" }}>
          {item.product}
        </td>
        <td style={{ fontSize: "16px", textAlign: "center", padding: "10px" }}>
          {item.quantity}
        </td>
        <td style={{ fontSize: "16px", textAlign: "center", padding: "10px" }}>
          {item.missing}
        </td>
        <td style={{ fontSize: "16px", textAlign: "center", padding: "10px" }}>
          {item.department}
        </td>
        <td style={{ fontSize: "16px", textAlign: "center", padding: "10px" }}>
          {item.lastUpdated}
        </td>
      </tr>
      {index < sortedData.length - 1 && (
        <tr>
          <td colSpan="5">
            <Divider />
          </td>
        </tr>
      )}
    </React.Fragment>
  ));

  return (
    <Container>
      {/* Categories and Total Products Box with Transfer Inventory Button */}
      <Paper
        shadow="xs"
        p="lg"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderRadius: "20px",
          marginBottom: "20px",
          padding: "30px",
        }}
      >
        <Group position="apart" spacing="xl">
          <div>
            <Text
              style={{
                fontFamily: "Manrope",
                fontSize: "20px",
                color: "#000000",
              }}
            >
              Categories
            </Text>
            <Badge size="xl" color="blue">
              5
            </Badge>
          </div>
          <Divider
            orientation="vertical"
            style={{
              height: "65px",
              margin: "0 20px",
              backgroundColor: "black",
            }}
          />
          <div>
            <Text
              style={{
                fontFamily: "Manrope",
                fontSize: "20px",
                color: "#000000",
              }}
            >
              Total Products
            </Text>
            <Badge size="xl" color="blue">
              {data.length}
            </Badge>
          </div>
          <Button
            onClick={() => setTransferInventoryModalOpen(true)}
            style={{ marginLeft: "430px" }}
          >
            Request Product
          </Button>
        </Group>
      </Paper>

      {/* Tabs with Add Product Button */}
      <Paper
        shadow="xs"
        p="lg"
        style={{
          borderRadius: "20px",
          marginBottom: "20px",
          padding: "30px",
        }}
      >
        <Tabs defaultValue="H1">
          <Tabs.List style={{ marginBottom: "15px" }}>
            {categories.map((category, index) => (
              <Tabs.Tab
                key={index}
                value={category.value}
                style={{
                  fontSize: "15px",
                  padding: "12px",
                  border: "1px solid black",
                  width: "100px",
                  borderRadius: "5px",
                  marginBottom: "10px",
                  backgroundColor:
                    selectedCategory === category.value
                      ? "#1366D9"
                      : "lightblue",
                  marginRight: "1px",
                }}
                onClick={() => setSelectedCategory(category.label)}
              >
                {category.label}
              </Tabs.Tab>
            ))}
            <Button
              onClick={() => setAddProductModalOpen(true)}
              style={{ marginLeft: "230px" }}
            >
              Add Product
            </Button>
          </Tabs.List>

          {/* Sorting and Table Display */}
          <Group position="apart" style={{ marginBottom: "10px" }}>
            <Select
              value={sortOption}
              onChange={setSortOption}
              data={[
                { value: "Missing", label: "Missing" },
                { value: "Last updated", label: "Last updated" },
                { value: "Hostel", label: "Missing" },
              ]}
              placeholder="Filter"
              opaci
              style={{ width: "140px" }}
            />
          </Group>

          <div
            style={{
              height: "420px",
              overflowY: "scroll",
              scrollbarWidth: "thin",
            }}
          >
            <Table
              striped
              highlightOnHover
              verticalSpacing="lg"
              horizontalSpacing="xl"
              fontSize="lg"
            >
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>Product</th>
                  <th style={{ textAlign: "center" }}>Quantity</th>
                  <th style={{ textAlign: "center" }}>Missing</th>
                  <th style={{ textAlign: "center" }}>Department</th>
                  <th style={{ textAlign: "center" }}>Last Updated</th>
                </tr>
              </thead>
              <tbody>{filteredRows}</tbody>
            </Table>
          </div>
        </Tabs>
      </Paper>

      {/* Add Product Modal */}
      <Modal
        opened={addProductModalOpen}
        onClose={() => setAddProductModalOpen(false)}
        title="Add Product"
      >
        <TextInput
          label="Product Name"
          placeholder="Enter Product Name"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
          required
        />

        <TextInput
          label="Category"
          placeholder="Enter Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          required
        />

        <TextInput
          label="Quantity"
          placeholder="Enter Quantity"
          value={newQuantity}
          onChange={(e) => setNewQuantity(e.target.value)}
          required
          type="number"
        />
        <TextInput
          label="Price"
          placeholder="Enter Price"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          required
          type="number"
        />

        <Select
          label="Hostel"
          placeholder="Select Hostel"
          value={newDepartment}
          onChange={setNewDepartment}
          data={categories.map((cat) => ({
            value: cat.value,
            label: cat.label,
          }))}
          required
        />

        <TextInput
          label="Description"
          placeholder="Enter Description of product "
          value={newQuantity}
          onChange={(e) => setNewQuantity(e.target.value)}
        />
        <Group position="right" mt="md">
          <Button onClick={handleAddProduct}>Add Product</Button>
        </Group>
      </Modal>

      {/* Transfer Inventory Modal */}
      <Modal
        opened={transferInventoryModalOpen}
        onClose={() => setTransferInventoryModalOpen(false)}
        title="Request New Product"
      >
        <TextInput
          label="Product Name"
          placeholder="Enter Product Name"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
          required
        />
        <TextInput
          label="Quantity"
          placeholder="Enter Quantity"
          value={newQuantity}
          onChange={(e) => setNewQuantity(e.target.value)}
          required
          type="number"
        />

        <TextInput
          label="Category"
          placeholder="Enter Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          required
          type="number"
        />

        <Select
          label="Hostel"
          placeholder="Select Hostel"
          value={newDepartment}
          onChange={setNewDepartment}
          data={categories.map((cat) => ({
            value: cat.value,
            label: cat.label,
          }))}
          required
        />

        <TextInput
          label="Description"
          placeholder="Enter Description of Product"
          value={newQuantity}
          onChange={(e) => setNewQuantity(e.target.value)}
          type="text"
        />
        <Group position="right" mt="md">
          <Button onClick={handleAddProduct}>Request Product</Button>
        </Group>
      </Modal>
    </Container>
  );
}
