import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productAPI } from '../../utils/api';
import { mockProducts } from '../../utils/mockData';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await productAPI.getAll();
      return response.data || response;
    } catch (error) {
      // Fallback to mock data if API fails
      console.warn('Failed to fetch products, using mock data:', error);
      return mockProducts;
    }
  }
);

export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (id, { rejectWithValue }) => {
    try {
      const response = await productAPI.getById(id);
      return response.data || response;
    } catch (error) {
      return rejectWithValue(error.error || 'Failed to fetch product');
    }
  }
);

const initialState = {
  items: mockProducts,
  filteredItems: mockProducts,
  selectedProduct: null,
  loading: false,
  error: null,
  searchQuery: '',
  selectedCategory: 'All',
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => { state.items = action.payload; state.filteredItems = action.payload; },
    setSelectedProduct: (state, action) => { state.selectedProduct = action.payload; },
    setLoading: (state, action) => { state.loading = action.payload; },
    setError: (state, action) => { state.error = action.payload; },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredItems = state.items.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(action.payload.toLowerCase()) ||
          p.description.toLowerCase().includes(action.payload.toLowerCase());
        const matchCategory = state.selectedCategory === 'All' || p.category === state.selectedCategory;
        return matchSearch && matchCategory;
      });
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.filteredItems = state.items.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(state.searchQuery.toLowerCase());
        const matchCategory = action.payload === 'All' || p.category === action.payload;
        return matchSearch && matchCategory;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setProducts, setSelectedProduct, setLoading, setError, setSearchQuery, setCategory } = productSlice.actions;
export default productSlice.reducer;
