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
  Button,
} from "@mantine/core";

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
  const [selectedCategory, setSelectedCategory] = useState("H1");
  const [sortOption, setSortOption] = useState("Last Updated");

  const categories = [
    { label: "H1", value: "H1" },
    { label: "H3", value: "H3" },
    { label: "H4", value: "H4" },
    { label: "Panini", value: "Panini" },
    { label: "Maa Saraswati", value: "Maa Saraswati" },
  ];

  const sortedData = [...data]
    .filter((item) => item.department === selectedCategory)
    .sort((a, b) => {
      if (sortOption === "Last Updated") {
        return new Date(b.lastUpdated) - new Date(a.lastUpdated);
      }
      if (sortOption === "price") {
        return a.price - b.price;
      }
      return 0;
    });

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
          {item.price}
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
          <td colSpan="6">
            <Divider />
          </td>
        </tr>
      )}
    </React.Fragment>
  ));

  return (
    <Container>
      {/* Header Section with Badge Counts */}
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
              14
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
              30252
            </Badge>
          </div>
          <Button
            color="blue"
            size="lg"
            style={{ marginLeft: "auto" }}
            // No action, same as "Add Product"
          >
            Transfer Product
          </Button>
        </Group>
      </Paper>

      {/* Tabs and Table */}
      <Paper
        shadow="xs"
        p="lg"
        style={{ borderRadius: "20px", padding: "30px" }}
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
                  width: "120px",
                  borderRadius: "5px",
                  marginRight: "1px",
                  backgroundColor:
                    selectedCategory === category.value
                      ? "#1366D9"
                      : "lightblue",
                }}
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.label}
              </Tabs.Tab>
            ))}
            <Button style={{ marginLeft: "auto" }}>Add Product</Button>
            <Button style={{ marginLeft: "10px" }}>Filters</Button>
          </Tabs.List>

          <Group position="apart" style={{ marginBottom: "10px" }}>
            <Select
              value={sortOption}
              onChange={setSortOption}
              data={[
                { value: "Last Updated", label: "Last Updated" },
                { value: "price", label: "Price" },
              ]}
              placeholder="Sort By"
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
                  <th
                    style={{
                      fontSize: "18px",
                      textAlign: "center",
                      paddingBottom: "10px",
                    }}
                  >
                    Products
                  </th>
                  <th
                    style={{
                      fontSize: "18px",
                      textAlign: "center",
                      paddingBottom: "10px",
                    }}
                  >
                    Quantity
                  </th>
                  <th
                    style={{
                      fontSize: "18px",
                      textAlign: "center",
                      paddingBottom: "10px",
                    }}
                  >
                    Price
                  </th>
                  <th
                    style={{
                      fontSize: "18px",
                      textAlign: "center",
                      paddingBottom: "10px",
                    }}
                  >
                    Department
                  </th>
                  <th
                    style={{
                      fontSize: "18px",
                      textAlign: "center",
                      paddingBottom: "10px",
                    }}
                  >
                    Last Updated
                  </th>
                </tr>
              </thead>

              <tbody>{filteredRows}</tbody>
            </Table>
          </div>

          <Group style={{ marginTop: "20px", justifyContent: "space-between" }}>
            <Button>Export</Button>
            <Button>Print</Button>
          </Group>
        </Tabs>
      </Paper>
    </Container>
  );
}
