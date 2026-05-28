import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { initializeCart } from './store/slices/cartSlice';
import { setProducts, setLoading, setError } from './store/slices/productSlice';

// Layouts
import MainLayout from './components/layout/MainLayout';
import DashboardLayout from './components/layout/DashboardLayout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

// Admin Pages
import DashboardPage from './pages/admin/DashboardPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import MonitoringPage from './pages/admin/MonitoringPage';
import DeploymentsPage from './pages/admin/DeploymentsPage';
import SettingsPage from './pages/admin/SettingsPage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeCart());

    const fetchProducts = async () => {
      try {
        dispatch(setLoading(true));
        const { data } = await axios.get('/api/products');
        if (data.success) {
          dispatch(setProducts(data.data));
        }
      } catch (err) {
        dispatch(setError('Failed to fetch products from backend'));
        console.error(err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* Public routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>

        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Admin/Dashboard routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="monitoring" element={<MonitoringPage />} />
          <Route path="deployments" element={<DeploymentsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
