import React, { useState } from "react";
import { Button, Group, Table, Badge } from "@mantine/core";

function InventoryRequests() {
  const [filter, setFilter] = useState("all");

  const requests = [
    {
      date: "2024-11-01",
      item: "Printer Ink",
      department: "CSE",
      approval: "Approved",
    },
    {
      date: "2024-11-02",
      item: "Office Chairs",
      department: "Admin",
      approval: "Not Approved",
    },
    {
      date: "2024-11-03",
      item: "Monitors",
      department: "CSE",
      approval: "Approved",
    },
    {
      date: "2024-11-04",
      item: "Design Sheets",
      department: "Design",
      approval: "Not Approved",
    },
  ];

  const filteredRequests = requests.filter((request) => {
    if (filter === "approved") return request.approval === "Approved";
    if (filter === "unapproved") return request.approval === "Not Approved";
    return true;
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <h2
        style={{ color: "#007BFF", textAlign: "center", marginBottom: "20px" }}
      >
        Inventory Requests
      </h2>

      {/* Buttons for filters */}
      <Group position="center" style={{ marginBottom: "20px" }}>
        <Button
          onClick={() => setFilter("all")}
          variant={filter === "all" ? "filled" : "outline"}
          style={{ margin: "0 10px" }}
        >
          All Requests
        </Button>
        <Button
          onClick={() => setFilter("approved")}
          variant={filter === "approved" ? "filled" : "outline"}
          style={{ margin: "0 10px" }}
        >
          Approved
        </Button>
        <Button
          onClick={() => setFilter("unapproved")}
          variant={filter === "unapproved" ? "filled" : "outline"}
          style={{ margin: "0 10px" }}
        >
          Unapproved
        </Button>
      </Group>

      {/* Table */}
      <Table
        style={{
          width: "80%",
          textAlign: "center",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{ borderBottom: "2px solid #e0e0e0" }}>
            <th style={{ padding: "15px", borderRight: "1px solid #e0e0e0" }}>
              Date
            </th>
            <th style={{ padding: "15px", borderRight: "1px solid #e0e0e0" }}>
              Item
            </th>
            <th style={{ padding: "15px", borderRight: "1px solid #e0e0e0" }}>
              Department
            </th>
            <th style={{ padding: "15px" }}>Approval</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((request, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              <td style={{ padding: "20px", borderRight: "1px solid #e0e0e0" }}>
                {request.date}
              </td>
              <td style={{ padding: "10px", borderRight: "1px solid #e0e0e0" }}>
                {request.item}
              </td>
              <td style={{ padding: "10px", borderRight: "1px solid #e0e0e0" }}>
                {request.department}
              </td>
              <td style={{ padding: "10px" }}>
                {request.approval === "Approved" ? (
                  <Badge
                    color="green"
                    style={{
                      padding: "20px 10px",
                      color: "white",
                      border: "1px green",
                      borderRadius: "5px",
                    }}
                  >
                    Approved
                  </Badge>
                ) : (
                  <Badge
                    color="red"
                    variant="light"
                    style={{
                      padding: "20px 10px",
                      border: "1px solid red",
                      borderRadius: "5px",
                    }}
                  >
                    Not Approved
                  </Badge>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default InventoryRequests;
