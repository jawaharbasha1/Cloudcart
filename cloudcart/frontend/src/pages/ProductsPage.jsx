import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Search, Filter, Star, ShoppingCart, ArrowRight } from 'lucide-react';
import { setSearchQuery, setCategory, fetchProducts } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import { categories } from '../utils/mockData';
import PageTransition from '../components/ui/PageTransition';
import toast from 'react-hot-toast';

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { filteredItems, searchQuery, selectedCategory, loading } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart`);
  };

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Cloud Products</h1>
          <p className="text-text-muted">Explore our infrastructure and DevOps services</p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-bg-card border border-border text-text-primary text-sm focus:outline-none focus:border-accent-primary transition-all"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => dispatch(setCategory(cat))}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-accent-primary text-white'
                  : 'bg-bg-card border border-border text-text-muted hover:text-text-primary hover:border-border-light'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredItems.map((product, i) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="group bg-bg-card rounded-2xl border border-border overflow-hidden hover:border-border-light transition-all duration-300 card-glow"
            >
              <div className="aspect-video bg-bg-primary relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-lg bg-bg-card/80 backdrop-blur text-xs font-medium text-text-muted border border-border">
                    {product.category}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <Link to={`/products/${product._id}`}>
                  <h3 className="font-semibold text-text-primary group-hover:text-accent-primary transition-colors mb-1">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-xs text-text-muted line-clamp-2 mb-3">{product.description}</p>

                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-3.5 h-3.5 text-warning fill-warning" />
                  <span className="text-xs font-medium text-text-primary">{product.rating}</span>
                  <span className="text-xs text-text-dim">({product.reviews})</span>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-text-primary">${product.price}<span className="text-xs text-text-dim font-normal">/mo</span></p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="p-2 rounded-xl bg-accent-primary/10 text-accent-primary hover:bg-accent-primary hover:text-white transition-all"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-text-muted text-lg">No products found</p>
            <p className="text-text-dim text-sm mt-1">Try adjusting your search or filter</p>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
