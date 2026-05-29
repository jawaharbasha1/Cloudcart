import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  // If not authenticated at all, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If a normal user (not admin) tries to access any sub-route, bounce them back to /dashboard
  const isAdminRoute = location.pathname !== '/dashboard' && location.pathname !== '/dashboard/';
  if (isAdminRoute && user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-bg-primary flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col lg:ml-64">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
