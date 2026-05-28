import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, ShoppingCart, Check, Server } from 'lucide-react';
import { addToCart } from '../store/slices/cartSlice';
import PageTransition from '../components/ui/PageTransition';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(s => s.products.items.find(p => p._id === id));

  if (!product) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <p className="text-text-muted text-lg">Product not found</p>
      <Link to="/products" className="text-accent-primary hover:underline mt-2 inline-block">Back to Products</Link>
    </div>
  );

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/products" className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="aspect-video lg:aspect-square rounded-2xl overflow-hidden bg-bg-card border border-border">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-80" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <span className="px-3 py-1 rounded-lg bg-accent-primary/10 text-accent-primary text-xs font-semibold">{product.category}</span>
              <h1 className="text-3xl font-bold text-text-primary mt-3">{product.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <Star className="w-4 h-4 text-warning fill-warning" />
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-text-dim">({product.reviews} reviews)</span>
              </div>
            </div>
            <p className="text-text-muted leading-relaxed">{product.description}</p>
            <div className="p-5 rounded-2xl bg-bg-card border border-border">
              <p className="text-3xl font-bold">${product.price}<span className="text-base text-text-dim font-normal">/month</span></p>
              <p className="text-sm text-text-dim mt-1">{product.stock} available</p>
            </div>
            <button onClick={() => { dispatch(addToCart(product)); toast.success('Added to cart'); }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-semibold hover:shadow-lg hover:shadow-accent-primary/25 transition-all flex items-center justify-center gap-2">
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
            <div className="p-5 rounded-2xl bg-bg-card border border-border">
              <h3 className="font-semibold mb-3 flex items-center gap-2"><Server className="w-4 h-4 text-accent-primary" /> Included</h3>
              <div className="grid grid-cols-2 gap-2">
                {['99.99% Uptime','Auto-scaling','24/7 Support','Global CDN','DDoS Protection','Monitoring'].map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-text-muted"><Check className="w-4 h-4 text-success shrink-0" />{f}</div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
