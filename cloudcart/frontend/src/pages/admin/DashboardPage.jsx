import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  DollarSign, ShoppingBag, Users, Rocket, TrendingUp, 
  ArrowUpRight, User, Cpu, ShieldCheck, ExternalLink, HardDrive 
} from 'lucide-react';
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
  const { user } = useSelector(state => state.auth);
  const { items } = useSelector(state => state.cart);
  const isAdmin = user?.role === 'admin';

  // --- CUSTOMER DASHBOARD VIEW ---
  if (!isAdmin) {
    return (
      <PageTransition>
        <div className="space-y-6">
          {/* Welcome Header */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-accent-primary/10 via-accent-secondary/5 to-transparent border border-accent-primary/20 p-6 md:p-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/10 rounded-full blur-3xl -z-10" />
            <div className="max-w-xl">
              <span className="px-2.5 py-1 rounded-lg bg-accent-primary/10 text-accent-primary text-xs font-semibold uppercase tracking-wider">
                Customer Account Panel
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-text-primary mt-3">
                Welcome back, {user?.name || 'Valued Customer'}!
              </h1>
              <p className="text-sm text-text-muted mt-2 leading-relaxed">
                Manage your active cloud services, check deployment subscriptions, and review your cloud transactions seamlessly.
              </p>
            </div>
          </div>

          {/* Customer stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatsCard title="Account Profile" value={user?.role || 'Customer'} change="Verified Member" icon={User} color="purple" delay={0} />
            <StatsCard title="My Active Cart" value={`${items.reduce((sum, item) => sum + item.quantity, 0)} Items`} change="Ready for Checkout" icon={ShoppingBag} color="blue" delay={0.05} />
            <StatsCard title="Cloud Host SLA" value="99.99% Online" change="All Services Safe" icon={ShieldCheck} color="green" delay={0.1} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Provisioned Services */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.15 }}
              className="lg:col-span-2 bg-bg-card rounded-2xl border border-border p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-text-primary">Provisioned Infrastructure Services</h3>
                  <p className="text-xs text-text-dim mt-0.5">Your active DevOps and Hosting environments</p>
                </div>
                <Link to="/products" className="text-xs text-accent-primary hover:underline flex items-center gap-1 font-medium">
                  Shop Products <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-bg-primary border border-border/60 hover:border-accent-primary/30 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-lg bg-accent-primary/10 text-accent-primary shrink-0 mt-0.5">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-text-primary flex items-center gap-2">
                        Cloud Server Pro <span className="px-1.5 py-0.5 rounded bg-success/10 text-success text-[10px] font-semibold">Running</span>
                      </h4>
                      <p className="text-xs text-text-dim mt-1">IP: 192.168.1.150 · 16 vCPUs / 64GB RAM</p>
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-0 flex items-center gap-2">
                    <button className="px-3 py-1.5 rounded-lg bg-bg-card border border-border text-xs font-semibold hover:bg-white/5 transition-all flex items-center gap-1">
                      SSH Keys <HardDrive className="w-3.5 h-3.5" />
                    </button>
                    <button className="px-3 py-1.5 rounded-lg bg-accent-primary text-white text-xs font-semibold hover:bg-accent-primary/95 transition-all flex items-center gap-1">
                      Console <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-bg-primary border border-border/60 hover:border-accent-primary/30 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-lg bg-accent-secondary/10 text-accent-secondary shrink-0 mt-0.5">
                      <Rocket className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-text-primary flex items-center gap-2">
                        CI/CD Pipeline <span className="px-1.5 py-0.5 rounded bg-success/10 text-success text-[10px] font-semibold">Healthy</span>
                      </h4>
                      <p className="text-xs text-text-dim mt-1">Jenkins Connected · 12 Successful Runs today</p>
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-0 flex items-center gap-2">
                    <button className="px-3 py-1.5 rounded-lg bg-bg-card border border-border text-xs font-semibold hover:bg-white/5 transition-all flex items-center gap-1">
                      Logs <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Account Activity log */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 }}
              className="bg-bg-card rounded-2xl border border-border p-5"
            >
              <h3 className="font-semibold text-text-primary mb-3">Security & Activity Log</h3>
              <div className="space-y-3.5">
                <div className="flex items-start gap-3 py-1.5">
                  <div className="w-2 h-2 rounded-full bg-success mt-1.5 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-text-primary">Logged in successfully</p>
                    <p className="text-[10px] text-text-dim mt-0.5">Just now from local browser</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 py-1.5">
                  <div className="w-2 h-2 rounded-full bg-accent-primary mt-1.5 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-text-primary">Cart synchronized</p>
                    <p className="text-[10px] text-text-dim mt-0.5">2 minutes ago via local storage</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 py-1.5">
                  <div className="w-2 h-2 rounded-full bg-warning mt-1.5 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-text-primary">Server SSH key generated</p>
                    <p className="text-[10px] text-text-dim mt-0.5">Today at 11:42 AM</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </PageTransition>
    );
  }

  // --- ADMINISTRATOR DASHBOARD VIEW ---
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
