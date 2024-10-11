import React from "react";
import { Text, Box, Grid, Card, Group, ThemeIcon } from "@mantine/core";
import {
  IconHome,
  IconPackage,
  IconBook,
  IconDevices,
} from "@tabler/icons-react";
import CustomBreadcrumbs from "../../../components/Breadcrumbs";

function InventoryDashboard() {
  const inventoryItems = [
    { name: "Btech", count: 1234, added: 48 },
    { name: "BDes", count: 567, added: 12 },
    { name: "Hostel", count: 321, added: 15 },
    { name: "Books", count: 1234, added: 48, icon: IconBook },
    { name: "Electronics", count: 567, added: 12, icon: IconDevices },
  ];

  return (
    <Box p="md">
      <CustomBreadcrumbs />

      <Card
        shadow="sm"
        p="lg"
        radius="md"
        withBorder
        mb="md"
        style={{ marginTop: "10px" }}
      >
        <Text size="xl" weight={700} mb="md">
          Inventory summary
        </Text>
        <Group>
          <ThemeIcon size="lg" variant="light" color="teal">
            <IconHome size={20} />
          </ThemeIcon>
          <div>
            <Text size="sm" color="dimmed">
              Total value
            </Text>
            <Text weight={700}>₹ 20,00000</Text>
          </div>
        </Group>
        <Group mt="md">
          <ThemeIcon size="lg" variant="light" color="blue">
            <IconPackage size={20} />
          </ThemeIcon>
          <div>
            <Text size="sm" color="dimmed">
              Total items
            </Text>
            <Text weight={700}>30,252</Text>
          </div>
        </Group>
      </Card>

      <Text size="xl" weight={700} mb="md">
        Inventory overview
      </Text>
      <Grid>
        {inventoryItems.map((item, index) => (
          <Grid.Col key={index} span={4}>
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <div>
                {item.icon ? (
                  <>
                    <div
                      style={{
                        marginLeft: "auto",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <item.icon />
                    </div>

                    <div style={{ marginTop: "-30px" }}>
                      <Text weight={500}>{item.name}</Text>
                      <Text size="xl" weight={700}>
                        {item.count}
                      </Text>
                      <Text size="sm" color="dimmed">
                        {item.added} added this month
                      </Text>
                    </div>
                  </>
                ) : (
                  <div>
                    <Text weight={800}>{item.name}</Text>
                    <Text size="xl" weight={700}>
                      {item.count}
                    </Text>
                    <Text size="sm" color="dimmed">
                      {item.added} added this month
                    </Text>
                  </div>
                )}
              </div>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
}

export default InventoryDashboard;
