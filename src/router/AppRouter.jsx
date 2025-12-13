import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layout/MainLayout";

import Home from "../pages/Home";
import About from "../pages/About";

import Login from "../auth/Login";
import Register from "../auth/Register";
import Verify from "../auth/Verify";

import ClientDashboard from "../client/ClientDashboard";
import TechnicianDashboard from "../technician/TechnicianDashboard";

import { ProtectedRoute, RoleRoute } from "./ProtectedRoute";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Общий Layout: navbar + footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* AUTH */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/verify" element={<Verify />} />

          {/* ЗАЩИЩЁННЫЕ */}
          <Route element={<ProtectedRoute />}>
            <Route element={<RoleRoute allowed="CLIENT" />}>
              <Route path="/client" element={<ClientDashboard />} />
              {/* заглушки под будущее */}
              <Route path="/client/orders" element={<ClientDashboard />} />
              <Route path="/client/orders/new" element={<ClientDashboard />} />
            </Route>

            <Route element={<RoleRoute allowed="TECHNICIAN" />}>
              <Route path="/technician" element={<TechnicianDashboard />} />
              {/* заглушки под будущее */}
              <Route path="/technician/orders" element={<TechnicianDashboard />} />
              <Route path="/technician/orders/taken" element={<TechnicianDashboard />} />
            </Route>
          </Route>

          <Route path="*" element={<div className="max-w-7xl mx-auto px-4 py-16">404</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
