import React, { useState } from "react";
import { Group, Text, Box, Container } from "@mantine/core";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import InventoryDashboard from "./inventoryDashboard";
import HostelInventory from "./HostelInventory";
import Reports from "./Reports";
// import Btech from "./Btech";
import Department from "./Bdes";
import InventoryTable from "./InventoryTable";

const sections = [
  "Overall Inventory",
  "Hostel",
  "Reports",
  // "Btech",
  "Department",
  "ViewList",
];

const sectionComponents = {
  "Overall Inventory": InventoryDashboard,
  Hostel: HostelInventory,
  Reports,
  // Btech,
  Department,
  ViewList: InventoryTable,
};

export default function SectionNavigation() {
  const [activeSection, setActiveSection] = useState("Overall Inventory");

  // Dummy data for InventoryTable items
  const dummyItems = [
    {
      itemId: 1,
      department: "IT",
      itemName: "Laptop",
      itemType: "Non-Consumable",
      serialNumber: "12345ABC",
      quantity: 5,
      dateIssued: "2023-09-10",
      issuedTo: "John Doe",
      unitPrice: 500.0,
      totalCost: 2500.0,
      datePurchased: "2023-09-05",
    },
    {
      itemId: 2,
      department: "Mechanical Lab",
      itemName: "Funnel Set",
      itemType: "Non-Consumable",
      serialNumber: "PRJ56789",
      quantity: 2,
      dateIssued: "2023-08-12",
      issuedTo: "Mechanical Lab",
      unitPrice: 300.0,
      totalCost: 600.0,
      datePurchased: "2023-08-10",
    },
    {
      itemId: 3,
      department: "Physics Lab",
      itemName: "Oscilloscope",
      itemType: "Non-Consumable",
      serialNumber: "OSC12345",
      quantity: 1,
      dateIssued: "2023-07-15",
      issuedTo: "Physics Lab",
      unitPrice: 1000.0,
      totalCost: 1000.0,
      datePurchased: "2023-07-10",
    },
    {
      itemId: 4,
      department: "Chemistry Lab",
      itemName: "Beaker Set",
      itemType: "Consumable",
      serialNumber: "CHEM67890",
      quantity: 50,
      dateIssued: "2023-09-20",
      issuedTo: "Chemistry Lab",
      unitPrice: 2.0,
      totalCost: 100.0,
      datePurchased: "2023-09-15",
    },
    {
      itemId: 5,
      department: "Engineering Workshop",
      itemName: "3D Printer",
      itemType: "Non-Consumable",
      serialNumber: "3DPRT4567",
      quantity: 1,
      dateIssued: "2023-06-18",
      issuedTo: "Workshop",
      unitPrice: 1200.0,
      totalCost: 1200.0,
      datePurchased: "2023-06-10",
    },
    {
      itemId: 6,
      department: "Computer Science Lab",
      itemName: "Desktop Computer",
      itemType: "Non-Consumable",
      serialNumber: "PC09876",
      quantity: 10,
      dateIssued: "2023-10-01",
      issuedTo: "Lab C",
      unitPrice: 400.0,
      totalCost: 4000.0,
      datePurchased: "2023-09-25",
    },
    {
      itemId: 7,
      department: "Design Lab",
      itemName: "Soft Board",
      itemType: "Non-Consumable",
      serialNumber: "LIBBKS234",
      quantity: 20,
      dateIssued: "2023-07-25",
      issuedTo: "Design Lab",
      unitPrice: 15.0,
      totalCost: 300.0,
      datePurchased: "2023-07-20",
    },
    {
      itemId: 8,
      department: "Mechanical Lab",
      itemName: "Hydraulic Press",
      itemType: "Non-Consumable",
      serialNumber: "MECH45231",
      quantity: 1,
      dateIssued: "2023-05-15",
      issuedTo: "Mechanical Lab",
      unitPrice: 850.0,
      totalCost: 850.0,
      datePurchased: "2023-05-10",
    },
    {
      itemId: 9,
      department: "Physics Lab",
      itemName: "Spectrometer",
      itemType: "Non-Consumable",
      serialNumber: "SPEC67893",
      quantity: 1,
      dateIssued: "2023-04-15",
      issuedTo: "Physics Lab",
      unitPrice: 950.0,
      totalCost: 950.0,
      datePurchased: "2023-04-10",
    },
    {
      itemId: 10,
      department: "Art Department",
      itemName: "Canvas and Paints Set",
      itemType: "Consumable",
      serialNumber: "ARTMTRL789",
      quantity: 30,
      dateIssued: "2023-09-10",
      issuedTo: "Art Room",
      unitPrice: 20.0,
      totalCost: 600.0,
      datePurchased: "2023-09-01",
    },
  ];

  // Dynamically render the active section component
  const ActiveComponent = sectionComponents[activeSection];

  return (
    <Container size="xl" p="xs">
      <Group
        spacing="xs"
        noWrap
        style={{ overflowX: "auto", padding: "8px 0" }}
      >
        <CaretLeft size={20} weight="bold" color="#718096" />
        {sections.map((section, index) => (
          <React.Fragment key={section}>
            <Text
              size="sm"
              color={activeSection === section ? "#4299E1" : "#718096"}
              style={{ cursor: "pointer", whiteSpace: "nowrap" }}
              onClick={() => setActiveSection(section)}
            >
              {section}
            </Text>
            {index < sections.length - 1 && (
              <Text color="#CBD5E0" size="sm">
                |
              </Text>
            )}
          </React.Fragment>
        ))}
        <CaretRight size={20} weight="bold" color="#718096" />
      </Group>

      <Box style={{ width: "100%", height: "100%", overflowY: "auto" }}>
        {activeSection === "ViewList" ? (
          <ActiveComponent items={dummyItems} />
        ) : (
          ActiveComponent && <ActiveComponent />
        )}
      </Box>
    </Container>
  );
}
