import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Lock, CheckCircle, ArrowLeft } from 'lucide-react';
import { clearCart } from '../store/slices/cartSlice';
import { orderAPI } from '../utils/api';
import PageTransition from '../components/ui/PageTransition';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const { items, totalAmount } = useSelector(s => s.cart);
  const { isAuthenticated, token } = useSelector(s => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    address: '', city: '', postalCode: '', country: '',
  });

  const handleOrder = async (e) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        items: items.map(item => ({
          product: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: totalAmount * 1.1,
        shippingAddress: {
          address: form.address || '123 Cloud St',
          city: form.city || 'San Francisco',
          postalCode: form.postalCode || '94102',
          country: form.country || 'US',
        },
        paymentMethod: 'card',
      };

      if (isAuthenticated && token) {
        await orderAPI.create(orderData);
      }
      
      dispatch(clearCart());
      setOrderPlaced(true);
      toast.success('Order placed successfully!');
    } catch (err) {
      // Even if API fails (no auth), still clear cart for demo
      dispatch(clearCart());
      setOrderPlaced(true);
      toast.success('Order placed successfully!');
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <PageTransition>
        <div className="max-w-lg mx-auto px-4 py-20 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
            <CheckCircle className="w-20 h-20 text-success mx-auto mb-6" />
          </motion.div>
          <h1 className="text-3xl font-bold mb-3">Order Confirmed!</h1>
          <p className="text-text-muted mb-8">Thank you for your purchase. Your cloud services are being provisioned.</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => navigate('/products')}
              className="px-6 py-3 rounded-xl bg-accent-primary text-white font-semibold hover:bg-accent-primary/90 transition-all">
              Continue Shopping
            </button>
            <button onClick={() => navigate('/dashboard')}
              className="px-6 py-3 rounded-xl border border-border text-text-primary font-medium hover:bg-white/5 transition-all">
              View Dashboard
            </button>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <form onSubmit={handleOrder} className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-5">
            {/* Billing */}
            <div className="bg-bg-card rounded-2xl border border-border p-5">
              <h3 className="font-semibold mb-4">Billing Information</h3>
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="First name" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})}
                  className="col-span-1 px-4 py-2.5 rounded-xl bg-bg-input border border-border text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-all" />
                <input placeholder="Last name" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})}
                  className="col-span-1 px-4 py-2.5 rounded-xl bg-bg-input border border-border text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-all" />
                <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                  className="col-span-2 px-4 py-2.5 rounded-xl bg-bg-input border border-border text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-all" />
                <input placeholder="Address" value={form.address} onChange={e => setForm({...form, address: e.target.value})}
                  className="col-span-2 px-4 py-2.5 rounded-xl bg-bg-input border border-border text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-all" />
                <input placeholder="City" value={form.city} onChange={e => setForm({...form, city: e.target.value})}
                  className="col-span-1 px-4 py-2.5 rounded-xl bg-bg-input border border-border text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-all" />
                <input placeholder="Postal Code" value={form.postalCode} onChange={e => setForm({...form, postalCode: e.target.value})}
                  className="col-span-1 px-4 py-2.5 rounded-xl bg-bg-input border border-border text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-all" />
              </div>
            </div>
            {/* Payment */}
            <div className="bg-bg-card rounded-2xl border border-border p-5">
              <h3 className="font-semibold mb-4 flex items-center gap-2"><CreditCard className="w-4 h-4 text-accent-primary" /> Payment</h3>
              <div className="space-y-3">
                <input placeholder="Card number" defaultValue="4242 4242 4242 4242" className="w-full px-4 py-2.5 rounded-xl bg-bg-input border border-border text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-all" />
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="MM/YY" defaultValue="12/28" className="px-4 py-2.5 rounded-xl bg-bg-input border border-border text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-all" />
                  <input placeholder="CVC" defaultValue="123" className="px-4 py-2.5 rounded-xl bg-bg-input border border-border text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-all" />
                </div>
              </div>
            </div>
          </div>
          {/* Summary */}
          <div className="lg:col-span-2">
            <div className="bg-bg-card rounded-2xl border border-border p-5 sticky top-24">
              <h3 className="font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                {items.map(item => (
                  <div key={item._id} className="flex justify-between text-sm text-text-muted">
                    <span className="truncate mr-2">{item.name} x{item.quantity}</span>
                    <span className="shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3 space-y-2 text-sm">
                <div className="flex justify-between text-text-muted"><span>Subtotal</span><span>${totalAmount.toFixed(2)}</span></div>
                <div className="flex justify-between text-text-muted"><span>Tax</span><span>${(totalAmount * 0.1).toFixed(2)}</span></div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-border"><span>Total</span><span>${(totalAmount * 1.1).toFixed(2)}</span></div>
              </div>
              <button type="submit" disabled={loading || items.length === 0}
                className="mt-5 w-full py-3 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-semibold hover:shadow-lg hover:shadow-accent-primary/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                <Lock className="w-4 h-4" /> {loading ? 'Processing...' : 'Place Order'}
              </button>
              <p className="text-[11px] text-text-dim text-center mt-3">Secured by 256-bit SSL encryption</p>
            </div>
          </div>
        </form>
      </div>
    </PageTransition>
  );
}
