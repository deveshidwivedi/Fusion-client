import React, { useState, useRef } from "react";
import { Text, Button, Flex, Select, Tabs } from "@mantine/core";
import {
  CaretCircleLeft,
  CaretCircleRight,
  SortAscending,
} from "@phosphor-icons/react";

// Import your section components
import InventoryDashboard from "./inventoryDashboard";
import HostelInventory from "./HostelInventory";
import Reports from "./Reports";
import Department from "./Bdes";
import InventoryRequests from "./InventoryRequests";

const sections = [
  "Overall Inventory",
  "Section",
  "Department",
  "Requests",
];

const sectionComponents = {
  "Overall Inventory": InventoryDashboard,
  Section: HostelInventory,
  Reports,
  Department,
  Requests: InventoryRequests,
};

export default function SectionNavigation() {
  const [activeSection, setActiveSection] = useState("Overall Inventory");
  const [activeTab, setActiveTab] = useState("0");
  const tabsListRef = useRef(null); // Reference for scrollable tabs

  const tabItems = sections.map((section) => ({ title: section }));

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
    setActiveSection(sections[+tabIndex]); // Ensure the active section is correctly updated
  };

  const handleArrowClick = (direction) => {
    const newIndex =
      direction === "next"
        ? Math.min(+activeTab + 1, tabItems.length - 1)
        : Math.max(+activeTab - 1, 0);
    setActiveTab(String(newIndex));
    setActiveSection(sections[newIndex]); // Update active section for arrow navigation

    if (tabsListRef.current) {
      tabsListRef.current.scrollBy({
        left: direction === "next" ? 50 : -50,
        behavior: "smooth",
      });
    }
  };

  const navi = (sec, id) => {
    setActiveTab(String(id));
    setActiveSection(sec);
  };

  // Placeholder categories for Select component
  const categories = ["Name", "Date", "Department"];
  const [sortedBy, setSortedBy] = useState("");

  // Dynamically render the active section component
  const ActiveComponent = sectionComponents[activeSection];

  return (
    <>
      <Flex justify="space-between" align="center" mt="lg">
        <Flex justify="flex-start" align="center" gap="1rem" mt="1rem" ml="lg">
          <Button
            onClick={() => handleArrowClick("prev")}
            variant="default"
            style={{ border: "none", padding: 0 }}
          >
            <CaretCircleLeft size={20} />
          </Button>

          <div
            ref={tabsListRef}
            style={{
              overflowX: "auto",
              whiteSpace: "nowrap",
              flex: 1,
            }}
          >
            <Tabs value={activeTab} onTabChange={handleTabChange}>
              <Tabs.List>
                {tabItems.map((item, index) => (
                  <Tabs.Tab
                    key={index}
                    value={`${index}`}
                    onClick={() => navi(item.title, index)}
                    style={{
                      color: activeTab === `${index}` ? "#4299E1" : "",
                      backgroundColor:
                        activeTab === `${index}` ? "#15abff13" : "",
                    }}
                  >
                    <Text>{item.title}</Text>
                  </Tabs.Tab>
                ))}
              </Tabs.List>
            </Tabs>
          </div>

          <Button
            onClick={() => handleArrowClick("next")}
            variant="default"
            style={{ border: "none", padding: 0 }}
          >
            <CaretCircleRight size={20} />
          </Button>
        </Flex>

        {/* <Flex align="center" mt="md" gap="1rem">
          <Select
            placeholder="Sort By"
            data={categories}
            value={sortedBy}
            onChange={setSortedBy}
            icon={<SortAscending />}
          />
        </Flex> */}
      </Flex>

      <div style={{ marginTop: "2rem" }}>
        {ActiveComponent && <ActiveComponent />}
      </div>
    </>
  );
}
