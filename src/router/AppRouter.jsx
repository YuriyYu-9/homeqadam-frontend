import { Routes, Route } from "react-router-dom";

import MainLayout from "../layout/MainLayout";

import Home from "../pages/Home";
import About from "../pages/About";

import Login from "../auth/Login";
import Register from "../auth/Register";
import Verify from "../auth/Verify";

import ClientDashboard from "../client/ClientDashboard";
import MyOrders from "../client/MyOrders";
import NewOrder from "../client/NewOrder";

import TechnicianDashboard from "../technician/TechnicianDashboard";
import AvailableOrders from "../technician/AvailableOrders";
import TakenOrders from "../technician/TakenOrders";

import TechnicianPublicProfile from "../technician/TechnicianPublicProfile";
import TechniciansList from "../technician/TechniciansList";

import ProfileSetup from "../profile/ProfileSetup";
import AppEntry from "./AppEntry";

import ReviewsPage from "../reviews/ReviewsPage";

import { ProtectedRoute, RoleRoute } from "./ProtectedRoute";

// 🆕 ADMIN
import AdminOrders from "../admin/AdminOrders";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/reviews" element={<ReviewsPage />} />

        {/* PUBLIC: technicians */}
        <Route path="/technicians" element={<TechniciansList />} />
        <Route path="/technicians/:id" element={<TechnicianPublicProfile />} />

        {/* AUTH */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/verify" element={<Verify />} />

        {/* ENTRY */}
        <Route path="/app" element={<AppEntry />} />

        {/* PROTECTED */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile/setup" element={<ProfileSetup />} />

          {/* ADMIN */}
          <Route path="/admin" element={<AdminOrders />} />

          <Route element={<RoleRoute allowed="CLIENT" />}>
            <Route path="/client" element={<ClientDashboard />} />
            <Route path="/client/orders" element={<MyOrders />} />
            <Route path="/client/orders/new" element={<NewOrder />} />
          </Route>

          <Route element={<RoleRoute allowed="TECHNICIAN" />}>
            <Route path="/technician" element={<TechnicianDashboard />} />
            <Route path="/technician/orders" element={<AvailableOrders />} />
            <Route path="/technician/orders/taken" element={<TakenOrders />} />
          </Route>
        </Route>

        <Route path="*" element={<div style={{ padding: 40 }}>404</div>} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
