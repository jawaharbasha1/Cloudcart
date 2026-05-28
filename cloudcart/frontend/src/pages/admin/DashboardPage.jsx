import { motion } from 'framer-motion';
import { DollarSign, ShoppingBag, Users, Rocket, TrendingUp, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatsCard from '../../components/ui/StatsCard';
import StatusBadge from '../../components/ui/StatusBadge';
import PageTransition from '../../components/ui/PageTransition';
import { mockAnalytics, mockSalesData, mockDeployments, mockActivities, mockOrders } from '../../utils/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-bg-card border border-border rounded-xl p-3 shadow-xl">
      <p className="text-xs text-text-dim mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-sm font-semibold" style={{ color: p.color }}>{p.name}: ${p.value.toLocaleString()}</p>
      ))}
    </div>
  );
};

export default function DashboardPage() {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-text-muted text-sm mt-1">Overview of your cloud platform</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Revenue" value={`$${mockAnalytics.revenue.value.toLocaleString()}`} change={mockAnalytics.revenue.change} icon={DollarSign} color="green" delay={0} />
          <StatsCard title="Orders" value={mockAnalytics.orders.value.toLocaleString()} change={mockAnalytics.orders.change} icon={ShoppingBag} color="blue" delay={0.05} />
          <StatsCard title="Users" value={mockAnalytics.users.value.toLocaleString()} change={mockAnalytics.users.change} icon={Users} color="purple" delay={0.1} />
          <StatsCard title="Deployments" value={mockAnalytics.deployments.value} change={mockAnalytics.deployments.change} icon={Rocket} color="yellow" delay={0.15} />
        </div>

        {/* Charts + Deployments */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Sales Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">Sales Analytics</h3>
                <p className="text-xs text-text-dim mt-0.5">Weekly revenue overview</p>
              </div>
              <span className="flex items-center gap-1 text-xs text-success font-medium"><TrendingUp className="w-3.5 h-3.5" />+12.5%</span>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={mockSalesData}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} fill="url(#salesGrad)" name="Revenue" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Recent Deployments */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="bg-bg-card rounded-2xl border border-border p-5">
            <h3 className="font-semibold mb-4">Recent Deployments</h3>
            <div className="space-y-3">
              {mockDeployments.slice(0, 5).map(d => (
                <div key={d.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{d.service}</p>
                    <p className="text-[11px] text-text-dim">{d.version} · {d.duration}</p>
                  </div>
                  <StatusBadge status={d.status} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Orders + Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-bg-card rounded-2xl border border-border p-5">
            <h3 className="font-semibold mb-4">Recent Orders</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="text-text-dim text-xs border-b border-border">
                  <th className="text-left py-2 font-medium">Order</th>
                  <th className="text-left py-2 font-medium">Customer</th>
                  <th className="text-left py-2 font-medium">Total</th>
                  <th className="text-left py-2 font-medium">Status</th>
                </tr></thead>
                <tbody>
                  {mockOrders.map(o => (
                    <tr key={o._id} className="border-b border-border last:border-0">
                      <td className="py-2.5 font-medium text-accent-primary">{o._id}</td>
                      <td className="py-2.5 text-text-muted">{o.user}</td>
                      <td className="py-2.5">${o.total.toFixed(2)}</td>
                      <td className="py-2.5"><StatusBadge status={o.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="bg-bg-card rounded-2xl border border-border p-5">
            <h3 className="font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {mockActivities.slice(0, 6).map(a => (
                <div key={a.id} className="flex items-start gap-3 py-2 border-b border-border last:border-0">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    a.type === 'deployment' ? 'bg-accent-primary/10 text-accent-primary' :
                    a.type === 'order' ? 'bg-success/10 text-success' :
                    a.type === 'alert' ? 'bg-warning/10 text-warning' :
                    'bg-accent-secondary/10 text-accent-secondary'
                  }`}>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-text-muted truncate">{a.message}</p>
                    <p className="text-[11px] text-text-dim">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
