import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Cpu, HardDrive, Wifi, Clock, Users, Zap, AlertTriangle, Server } from 'lucide-react';
import PageTransition from '../../components/ui/PageTransition';
import StatusBadge from '../../components/ui/StatusBadge';
import { mockSystemMetrics, mockTrafficData, mockContainers, mockLogs } from '../../utils/mockData';

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-bg-card border border-border rounded-xl p-3 shadow-xl">
      <p className="text-xs text-text-dim mb-1">{label}</p>
      {payload.map((p, i) => <p key={i} className="text-sm font-semibold" style={{ color: p.color }}>{p.name}: {p.value}</p>)}
    </div>
  );
};

function MetricCard({ icon: Icon, label, value, unit, color, pct }) {
  return (
    <div className="bg-bg-card rounded-2xl border border-border p-4">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-9 h-9 rounded-xl bg-${color}/10 flex items-center justify-center`}>
          <Icon className={`w-4 h-4 text-${color}`} />
        </div>
        <span className="text-xs text-text-dim">{label}</span>
      </div>
      <p className="text-2xl font-bold">{value}<span className="text-sm text-text-dim font-normal ml-1">{unit}</span></p>
      {pct !== undefined && (
        <div className="mt-2 w-full h-2 rounded-full bg-bg-primary">
          <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1, ease: 'easeOut' }}
            className={`h-full rounded-full ${pct > 80 ? 'bg-danger' : pct > 60 ? 'bg-warning' : `bg-${color}`}`} />
        </div>
      )}
    </div>
  );
}

export default function MonitoringPage() {
  const cpuData = mockSystemMetrics.cpu.history.map((v, i) => ({ time: `${i * 5}m`, value: v }));
  const ramData = mockSystemMetrics.ram.history.map((v, i) => ({ time: `${i * 5}m`, value: v }));
  const logColors = { INFO: 'text-accent-primary', WARN: 'text-warning', ERROR: 'text-danger', DEBUG: 'text-text-dim' };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Monitoring</h1>
          <p className="text-text-muted text-sm">System health and performance metrics</p>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard icon={Cpu} label="CPU Usage" value={mockSystemMetrics.cpu.current} unit="%" color="accent-primary" pct={mockSystemMetrics.cpu.current} />
          <MetricCard icon={HardDrive} label="RAM Usage" value={mockSystemMetrics.ram.used} unit={`/ ${mockSystemMetrics.ram.total}GB`} color="accent-secondary" pct={mockSystemMetrics.ram.current} />
          <MetricCard icon={HardDrive} label="Disk Usage" value={mockSystemMetrics.disk.used} unit={`/ ${mockSystemMetrics.disk.total}GB`} color="warning" pct={mockSystemMetrics.disk.current} />
          <MetricCard icon={Clock} label="Uptime" value={mockSystemMetrics.uptime} unit="" color="success" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard icon={Users} label="Active Users" value={mockSystemMetrics.activeUsers} unit="" color="accent-primary" />
          <MetricCard icon={Zap} label="Req/sec" value={mockSystemMetrics.requestsPerSecond.toLocaleString()} unit="" color="success" />
          <MetricCard icon={Clock} label="Avg Response" value={mockSystemMetrics.avgResponseTime} unit="ms" color="accent-secondary" />
          <MetricCard icon={AlertTriangle} label="Error Rate" value={mockSystemMetrics.errorRate} unit="%" color="danger" />
        </div>

        {/* CPU & RAM Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-bg-card rounded-2xl border border-border p-5">
            <h3 className="font-semibold mb-4">CPU Usage</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={cpuData}>
                <defs><linearGradient id="cpuG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/><stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11 }} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11 }} />
                <Tooltip content={<Tip />} />
                <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} fill="url(#cpuG)" name="CPU %" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-bg-card rounded-2xl border border-border p-5">
            <h3 className="font-semibold mb-4">RAM Usage</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={ramData}>
                <defs><linearGradient id="ramG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/><stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11 }} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11 }} />
                <Tooltip content={<Tip />} />
                <Area type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={2} fill="url(#ramG)" name="RAM %" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Traffic Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-bg-card rounded-2xl border border-border p-5">
          <h3 className="font-semibold mb-4">Request Traffic (24h)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={mockTrafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11 }} />
              <Tooltip content={<Tip />} />
              <Line type="monotone" dataKey="requests" stroke="#3B82F6" strokeWidth={2} dot={false} name="Requests" />
              <Line type="monotone" dataKey="errors" stroke="#EF4444" strokeWidth={2} dot={false} name="Errors" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Containers */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-bg-card rounded-2xl border border-border p-5">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><Server className="w-4 h-4 text-accent-primary" /> Container Health</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-text-dim text-xs border-b border-border">
                <th className="text-left py-2 font-medium">Container</th>
                <th className="text-left py-2 font-medium">Image</th>
                <th className="text-left py-2 font-medium">CPU</th>
                <th className="text-left py-2 font-medium">Memory</th>
                <th className="text-left py-2 font-medium">Uptime</th>
                <th className="text-left py-2 font-medium">Health</th>
              </tr></thead>
              <tbody>
                {mockContainers.map(c => (
                  <tr key={c.id} className="border-b border-border last:border-0">
                    <td className="py-2.5 font-medium">{c.name}</td>
                    <td className="py-2.5 text-text-dim text-xs">{c.image}</td>
                    <td className="py-2.5">{c.cpu}%</td>
                    <td className="py-2.5">{c.memory}MB</td>
                    <td className="py-2.5 text-text-muted">{c.uptime}</td>
                    <td className="py-2.5"><StatusBadge status={c.health} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Logs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-bg-card rounded-2xl border border-border p-5">
          <h3 className="font-semibold mb-4">System Logs</h3>
          <div className="bg-bg-primary rounded-xl p-4 font-mono text-xs space-y-1.5 max-h-64 overflow-y-auto">
            {mockLogs.map((l, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-text-dim shrink-0">{l.timestamp}</span>
                <span className={`font-semibold shrink-0 w-12 ${logColors[l.level]}`}>{l.level}</span>
                <span className="text-accent-secondary shrink-0">[{l.service}]</span>
                <span className="text-text-muted">{l.message}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
