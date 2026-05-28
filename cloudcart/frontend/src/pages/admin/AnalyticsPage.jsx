import { motion } from 'framer-motion';
import { BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, DollarSign, Users, ShoppingBag } from 'lucide-react';
import PageTransition from '../../components/ui/PageTransition';
import { mockAnalytics, mockSalesData } from '../../utils/mockData';

const COLORS = ['#3B82F6', '#8B5CF6', '#22C55E', '#F59E0B', '#EF4444', '#06B6D4'];
const pieData = [
  { name: 'Servers', value: 35 }, { name: 'Containers', value: 25 },
  { name: 'DevOps', value: 15 }, { name: 'Monitoring', value: 12 },
  { name: 'Security', value: 8 }, { name: 'Other', value: 5 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-bg-card border border-border rounded-xl p-3 shadow-xl">
      <p className="text-xs text-text-dim mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-sm font-semibold" style={{ color: p.color }}>{p.name}: {typeof p.value === 'number' ? p.value.toLocaleString() : p.value}</p>
      ))}
    </div>
  );
};

export default function AnalyticsPage() {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-text-muted text-sm">Business insights and performance metrics</p>
        </div>

        {/* Revenue Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-bg-card rounded-2xl border border-border p-5">
          <h3 className="font-semibold mb-1">Revenue Overview</h3>
          <p className="text-xs text-text-dim mb-4">Monthly revenue for 2026</p>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={mockAnalytics.revenue.data}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} fill="url(#revGrad)" name="Revenue" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Bar Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-bg-card rounded-2xl border border-border p-5">
            <h3 className="font-semibold mb-1">Weekly Performance</h3>
            <p className="text-xs text-text-dim mb-4">Sales vs Orders</p>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={mockSalesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="sales" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Sales" />
                <Bar dataKey="orders" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="bg-bg-card rounded-2xl border border-border p-5">
            <h3 className="font-semibold mb-1">Sales by Category</h3>
            <p className="text-xs text-text-dim mb-4">Product distribution</p>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend formatter={v => <span className="text-xs text-text-muted">{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
