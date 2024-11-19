import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import { Layout } from "./components/layout";
import Dashboard from "./Modules/Dashboard/dashboardNotifications";
import Profile from "./Modules/Profile/profile";
import LoginPage from "./pages/login";
import ForgotPassword from "./pages/forgotPassword";
import AcademicPage from "./Modules/Academic/index";
import ValidateAuth from "./helper/validateauth";
import Reports from "./Modules/Inventory/components/Reports";
import InventoryIndex from "./Modules/Inventory/components/InventoryIndex";
import Btech from "./Modules/Inventory/components/Btech";
import InventoryTable from "./Modules/Inventory/components/InventoryTable";

export default function App() {
  const location = useLocation();
  return (
    <MantineProvider>
      <Notifications
        position="top-right"
        zIndex={1000}
        autoClose={2000}
        limit={1}
      />
      {location.pathname !== "/accounts/login" &&
        location.pathname !== "/reset-password" && <ValidateAuth />}
      <Routes>
        <Route path="/" element={<Navigate to="/accounts/login" replace />} />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/academics"
          element={
            <Layout>
              <AcademicPage />
            </Layout>
          }
        />

        <Route
          path="/inventory"
          element={
            <Layout>
              <InventoryIndex />
            </Layout>
          }
        />

        <Route
          path="/inventory/btech"
          element={
            <Layout>
              <Btech />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />

        <Route
          path="/inventory/report"
          element={
            <Layout>
              <Reports />
            </Layout>
          }
        />
        
        <Route
          path="/inventory/InventoryTable"
          element={
            <Layout>
              <InventoryTable />
            </Layout>
          }
        />

        <Route path="/accounts/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
      </Routes>
    </MantineProvider>
  );
}
