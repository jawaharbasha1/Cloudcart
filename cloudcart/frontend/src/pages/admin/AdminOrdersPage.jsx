import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { mockOrders } from '../../utils/mockData';
import StatusBadge from '../../components/ui/StatusBadge';
import PageTransition from '../../components/ui/PageTransition';
import toast from 'react-hot-toast';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(mockOrders);
  const [search, setSearch] = useState('');

  const filtered = orders.filter(o =>
    o._id.toLowerCase().includes(search.toLowerCase()) ||
    o.user.toLowerCase().includes(search.toLowerCase())
  );

  const updateStatus = (id, status) => {
    setOrders(prev => prev.map(o => o._id === id ? { ...o, status } : o));
    toast.success(`Order ${id} marked as ${status}`);
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-text-muted text-sm">{orders.length} total orders</p>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search orders..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-bg-card border border-border text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-all" />
        </div>

        <div className="bg-bg-card rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-text-dim text-xs border-b border-border bg-bg-primary/50">
                <th className="text-left p-4 font-medium">Order ID</th>
                <th className="text-left p-4 font-medium">Customer</th>
                <th className="text-left p-4 font-medium">Items</th>
                <th className="text-left p-4 font-medium">Total</th>
                <th className="text-left p-4 font-medium">Date</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-right p-4 font-medium">Action</th>
              </tr></thead>
              <tbody>
                {filtered.map((o, i) => (
                  <motion.tr key={o._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                    className="border-b border-border last:border-0 hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-medium text-accent-primary">{o._id}</td>
                    <td className="p-4">
                      <div><p className="font-medium">{o.user}</p><p className="text-[11px] text-text-dim">{o.email}</p></div>
                    </td>
                    <td className="p-4 text-text-muted">{o.items.length} items</td>
                    <td className="p-4 font-medium">${o.total.toFixed(2)}</td>
                    <td className="p-4 text-text-muted">{o.date}</td>
                    <td className="p-4"><StatusBadge status={o.status} /></td>
                    <td className="p-4 text-right">
                      <select value={o.status} onChange={e => updateStatus(o._id, e.target.value)}
                        className="px-2 py-1.5 rounded-lg bg-bg-input border border-border text-xs text-text-primary focus:outline-none cursor-pointer">
                        {['Pending', 'Processing', 'Shipped', 'Delivered'].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
