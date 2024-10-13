import React, { useState } from "react";
import { Group, Text, Box, Container } from "@mantine/core";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import InventoryDashboard from "./inventoryDashboard";
import Reports from "./Reports";
import Btech from "./Btech";

// Import InventoryDashboard (ensure the path is correct)

const sections = ["Overall Inventory", "Hostel", "Reports", "Btech", "Bdes"];

// const subSections = {
//   'Leave': ['Leave Form', 'Leave Status'],
// };

// Create a map of components for each section
const sectionComponents = {
  "Overall Inventory": InventoryDashboard,
  Reports,
  Btech,
  // Add other components here for different sections if needed
  // 'My Fine': MyFineComponent,
  // 'Leave': LeaveComponent,
  // etc.
};

export default function SectionNavigation() {
  const [activeSection, setActiveSection] = useState("Overall Inventory");

  // Get the component for the active section
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
      {/* 
      {subSections[activeSection] && (
        <Group spacing="xs" mt="xs">
          {subSections[activeSection].map((subSection, index) => (
            <React.Fragment key={subSection}>
              <Text
                size="sm"
                color="#4299E1"
                style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}
              >
                {subSection}
              </Text>
              {index < subSections[activeSection].length - 1 && (
                <Text color="#CBD5E0" size="sm">|</Text>
              )}
            </React.Fragment>
          ))}
        </Group>
      )} */}

      {/* <Box
        mt="md"
        style={{
          border: '2px solid black',
          height: '400px',
          width: '100%', // Make the box take full width
          overflow: 'auto', // Add scroll for overflowing content
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px', // Add some padding to avoid content touching the edges
          boxSizing: 'border-box',
        }}
      > */}
      {ActiveComponent ? (
        <Box style={{ width: "100%", height: "100%", overflowY: "auto" }}>
          <ActiveComponent />
        </Box>
      ) : (
        <Text>Content for {activeSection}</Text>
      )}
      {/* </Box> */}
    </Container>
  );
}
