import { createSlice } from '@reduxjs/toolkit';
import { mockOrders } from '../../utils/mockData';

const initialState = {
  items: mockOrders,
  selectedOrder: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action) => { state.items = action.payload; },
    addOrder: (state, action) => { state.items.unshift(action.payload); },
    setSelectedOrder: (state, action) => { state.selectedOrder = action.payload; },
    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload;
      const order = state.items.find(o => o._id === id);
      if (order) order.status = status;
    },
    setLoading: (state, action) => { state.loading = action.payload; },
    setError: (state, action) => { state.error = action.payload; },
  },
});

export const { setOrders, addOrder, setSelectedOrder, updateOrderStatus, setLoading, setError } = orderSlice.actions;
export default orderSlice.reducer;
