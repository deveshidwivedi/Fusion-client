import React, { useEffect, useState } from "react";
import { Text, Box, Grid, Card, Group, ThemeIcon } from "@mantine/core";
import { House, Package } from "@phosphor-icons/react";
import { Section } from "lucide-react";
import CustomBreadcrumbs from "../../../components/Breadcrumbs";

function InventoryDashboard() {
  const [inventoryItems, setInventoryItems] = useState([
    { name: "Department", totalQuantity: 0, icon: <House size={20} /> },
    { name: "Section", totalQuantity: 0, icon: <Section size={20} /> },
  ]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken");

  const fetchTotalQuantities = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/inventory/api/item-count/",
        {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch total quantities");
      }

      const data = await response.json();
      console.log("Total quantities:", data);

      // Update the inventory items with the fetched data
      setInventoryItems([
        { name: "Department", totalQuantity: data.department_total_quantity, icon: <House size={20} /> },
        { name: "Section", totalQuantity: data.section_total_quantity, icon: <Section size={20} /> },
      ]);
    } catch (error) {
      console.error("Error fetching total quantities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTotalQuantities();
  }, []);

  return (
    <>
      {/* <CustomBreadcrumbs /> */}
      <Box p="md">
        <Card
          shadow="sm"
          p="lg"
          radius="md"
          withBorder
          mb="md"
          style={{ marginTop: "8px" }}
        >
          <Text size="xl" weight={700} mb="md">
            Inventory summary
          </Text>
          <Group mt="md">
            <ThemeIcon size="lg" variant="light" color="blue">
              <Package size={20} />
            </ThemeIcon>
            <div>
              <Text size="sm" color="dimmed">
                Total items
              </Text>
              <Text weight={700}>
                {inventoryItems.reduce(
                  (total, item) => total + item.totalQuantity,
                  0
                )}
              </Text>
            </div>
          </Group>
        </Card>

        <Text size="xl" weight={700} mb="md">
          Inventory overview
        </Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <Grid>
            {inventoryItems.map((item, index) => (
              <Grid.Col key={index} span={4}>
                <Card shadow="sm" p="lg" radius="md" withBorder>
                  <Group>
                    <ThemeIcon size="lg" variant="light" color="teal">
                      {item.icon}
                    </ThemeIcon>
                    <div>
                      <Text weight={800}>{item.name}</Text>
                      <Text size="xl" weight={700}>
                        {item.totalQuantity} items
                      </Text>
                    </div>
                  </Group>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
}

export default InventoryDashboard;
