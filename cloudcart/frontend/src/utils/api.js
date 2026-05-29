import axios from 'axios';

// Use Vite proxy in development - requests to /api/* are proxied to backend
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Handle responses
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Only redirect if not already on login/signup page
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/signup')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error.response?.data || error);
  }
);

export const authAPI = {
  register: (name, email, password) => 
    api.post('/auth/register', { name, email, password }),
  login: (email, password) => 
    api.post('/auth/login', { email, password }),
  getMe: () => 
    api.get('/auth/me'),
  logout: () => 
    api.get('/auth/logout'),
};

export const productAPI = {
  getAll: () => 
    api.get('/products'),
  getById: (id) => 
    api.get(`/products/${id}`),
  create: (product) => 
    api.post('/products', product),
  update: (id, product) => 
    api.put(`/products/${id}`, product),
  delete: (id) => 
    api.delete(`/products/${id}`),
};

export const orderAPI = {
  getAll: () => 
    api.get('/orders'),
  getMyOrders: () => 
    api.get('/orders/myorders'),
  getById: (id) => 
    api.get(`/orders/${id}`),
  create: (order) => 
    api.post('/orders', order),
  updateStatus: (id, status) => 
    api.put(`/orders/${id}/status`, { status }),
};

export default api;
