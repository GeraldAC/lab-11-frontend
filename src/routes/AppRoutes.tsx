import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "../features/dashboard/DashboardPage";
import LoginPage from "../features/login/LoginPage";
import ProductsPage from "../features/products/ProductsPage";
import ClientsPage from "../features/clients/ClientsPage";
import SalesPage from "../features/sales/SalesPage";
import MainLayout from "../components/MainLayout";
import PrivateRoute from "./PrivateRoute";
import RegisterPage from "../features/register/RegisterPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Rutas protegidas con layout */}
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/sales" element={<SalesPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
