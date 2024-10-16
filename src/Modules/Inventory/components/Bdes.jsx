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
  {
    product: "Drafting Table",
    quantity: 15,
    price: 10000,
    department: "Design",
    lastUpdated: "20-09-2024",
  },
  {
    product: "Markers",
    quantity: 200,
    price: 100,
    department: "Design",
    lastUpdated: "05-10-2024",
  },
  {
    product: "Cutting Mats",
    quantity: 50,
    price: 400,
    department: "Design",
    lastUpdated: "22-09-2024",
  },
];

export default function Inventory() {
  const [selectedCategory, setSelectedCategory] = useState("Design");
  const [sortOption, setSortOption] = useState("Last Updated");

  const categories = [{ label: "Design", value: "Design" }];

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
    <Container style={{ marginTop: "20px" }}>
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
              6
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
              43500
            </Badge>
          </div>
          <Button color="blue" size="lg" style={{ marginLeft: "auto" }}>
            Transfer Item
          </Button>
        </Group>
      </Paper>

      <Paper
        shadow="xs"
        p="lg"
        style={{ borderRadius: "20px", padding: "30px" }}
      >
        <Tabs defaultValue="Design">
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
        </Tabs>
      </Paper>
    </Container>
  );
}
