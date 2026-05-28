import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Lock } from 'lucide-react';
import { clearCart } from '../store/slices/cartSlice';
import PageTransition from '../components/ui/PageTransition';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const { items, totalAmount } = useSelector(s => s.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOrder = (e) => {
    e.preventDefault();
    dispatch(clearCart());
    toast.success('Order placed successfully!');
    navigate('/products');
  };

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <form onSubmit={handleOrder} className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-5">
            {/* Billing */}
            <div className="bg-bg-card rounded-2xl border border-border p-5">
              <h3 className="font-semibold mb-4">Billing Information</h3>
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="First name" className="col-span-1 px-4 py-2.5 rounded-xl bg-bg-input border border-border text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-all" />
                <input placeholder="Last name" className="col-span-1 px-4 py-2.5 rounded-xl bg-bg-input border border-border text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-all" />
                <input placeholder="Email" className="col-span-2 px-4 py-2.5 rounded-xl bg-bg-input border border-border text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-all" />
                <input placeholder="Company (optional)" className="col-span-2 px-4 py-2.5 rounded-xl bg-bg-input border border-border text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-all" />
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
              <button type="submit" className="mt-5 w-full py-3 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-semibold hover:shadow-lg hover:shadow-accent-primary/25 transition-all flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" /> Place Order
              </button>
              <p className="text-[11px] text-text-dim text-center mt-3">Secured by 256-bit SSL encryption</p>
            </div>
          </div>
        </form>
      </div>
    </PageTransition>
  );
}
