import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';
import PageTransition from '../components/ui/PageTransition';
import toast from 'react-hot-toast';

export default function CartPage() {
  const dispatch = useDispatch();
  const { items, totalAmount, totalQuantity } = useSelector(s => s.cart);

  if (items.length === 0) return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <ShoppingBag className="w-16 h-16 text-text-dim mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-text-muted mb-6">Browse our cloud products and add them to your cart.</p>
        <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-primary text-white font-semibold hover:bg-accent-primary/90 transition-all">
          Browse Products <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </PageTransition>
  );

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart <span className="text-text-dim text-lg font-normal">({totalQuantity} items)</span></h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {items.map((item, i) => (
              <motion.div key={item._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="flex gap-4 p-4 bg-bg-card rounded-2xl border border-border">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover opacity-80" />
                <div className="flex-1 min-w-0">
                  <Link to={`/products/${item._id}`} className="font-semibold text-text-primary hover:text-accent-primary transition-colors">{item.name}</Link>
                  <p className="text-xs text-text-muted mt-0.5">{item.category}</p>
                  <p className="text-sm font-bold text-text-primary mt-2">${item.price}/mo</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => { dispatch(removeFromCart(item._id)); toast.success('Removed'); }} className="p-1.5 rounded-lg text-text-dim hover:text-danger hover:bg-danger/10 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-2 bg-bg-primary rounded-lg border border-border">
                    <button onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity - 1 }))} className="p-1.5 text-text-dim hover:text-text-primary"><Minus className="w-3.5 h-3.5" /></button>
                    <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                    <button onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity + 1 }))} className="p-1.5 text-text-dim hover:text-text-primary"><Plus className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="bg-bg-card rounded-2xl border border-border p-5 sticky top-24">
              <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-text-muted"><span>Subtotal</span><span>${totalAmount.toFixed(2)}</span></div>
                <div className="flex justify-between text-text-muted"><span>Tax (10%)</span><span>${(totalAmount * 0.1).toFixed(2)}</span></div>
                <div className="border-t border-border pt-3 flex justify-between font-bold text-lg"><span>Total</span><span>${(totalAmount * 1.1).toFixed(2)}</span></div>
              </div>
              <Link to="/checkout" className="mt-5 w-full py-3 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-semibold hover:shadow-lg hover:shadow-accent-primary/25 transition-all flex items-center justify-center gap-2">
                Checkout <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
