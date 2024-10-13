import React, { useState } from "react";
import {
  Table,
  Checkbox,
  Tabs,
  Text,
  Container,
  Group,
  Badge,
  Paper,
  Divider,
  Select,
} from "@mantine/core";

const data = [
  {
    product: "Computer",
    quantity: 50,
    missing: 0,
    department: "CSE",
    lastUpdated: "29-03-2024",
  },
  {
    product: "Peripherals",
    quantity: 50,
    missing: 0,
    department: "CSE",
    lastUpdated: "29-03-2024",
  },
  {
    product: "Projectors",
    quantity: 50,
    missing: 5,
    department: "CSE",
    lastUpdated: "14-03-2024",
  },
  {
    product: "Wires",
    quantity: 30,
    missing: 0,
    department: "ECE",
    lastUpdated: "26-03-2024",
  },
  {
    product: "Voltmeter",
    quantity: 30,
    missing: 0,
    department: "ECE",
    lastUpdated: "26-03-2024",
  },
  {
    product: "Chairs",
    quantity: 80,
    missing: 0,
    department: "Mech",
    lastUpdated: "29-03-2024",
  },
  {
    product: "Lasers",
    quantity: 140,
    missing: 0,
    department: "SM",
    lastUpdated: "04-03-2024",
  },
  {
    product: "Boards",
    quantity: 140,
    missing: 0,
    department: "SM",
    lastUpdated: "04-03-2024",
  },
  {
    product: "Drafts",
    quantity: 5,
    missing: 3,
    department: "Design",
    lastUpdated: "18-03-2024",
  },
  {
    product: "Screens",
    quantity: 5,
    missing: 3,
    department: "Design",
    lastUpdated: "18-03-2024",
  },
  {
    product: "Cables",
    quantity: 80,
    missing: 0,
    department: "Mech",
    lastUpdated: "29-03-2024",
  },
];

export default function Reports() {
  const [selectedCategory, setSelectedCategory] = useState("CSE");
  const [sortOption, setSortOption] = useState("Last Updated");
  const [checkedItems, setCheckedItems] = useState({});

  const categories = [
    { label: "CSE", value: "CSE" },
    { label: "ECE", value: "ECE" },
    { label: "Mech", value: "Mech" },
    { label: "SM", value: "SM" },
    { label: "Design", value: "Design" },
  ];

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

  const handleCheckboxChange = (product) => {
    setCheckedItems((prev) => ({
      ...prev,
      [product]: !prev[product],
    }));
  };

  const filteredRows = sortedData.map((item, index) => (
    <React.Fragment key={index}>
      <tr>
        <td style={{ textAlign: "center" }}>
          <Checkbox
            size="sm"
            style={{ marginLeft: "30px" }}
            checked={!!checkedItems[item.product]}
            onChange={() => handleCheckboxChange(item.product)}
          />
        </td>
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
              26
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
              1000
            </Badge>
          </div>
        </Group>
      </Paper>

      <Paper
        shadow="xs"
        p="lg"
        style={{
          borderRadius: "20px",
          marginBottom: "20px",
          padding: "30px",
        }}
      >
        <Tabs defaultValue="CSE">
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

            <Group
              position="apart"
              style={{ marginBottom: "10px", marginLeft: "230px" }}
            >
              <Select
                value={sortOption}
                onChange={setSortOption}
                data={[
                  { value: "Last Updated", label: "Last Updated" },
                  { value: "Missing", label: "Missing" },
                ]}
                placeholder="Sort By"
                style={{ width: "140px" }}
              />
            </Group>
          </Tabs.List>

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
                    Select
                  </th>
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
                    Missing
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
