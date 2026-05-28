import { motion } from 'framer-motion';

export default function StatsCard({ title, value, change, icon: Icon, color = 'blue', delay = 0 }) {
  const colors = {
    blue: { bg: 'bg-accent-primary/10', text: 'text-accent-primary', glow: 'shadow-accent-primary/10' },
    purple: { bg: 'bg-accent-secondary/10', text: 'text-accent-secondary', glow: 'shadow-accent-secondary/10' },
    green: { bg: 'bg-success/10', text: 'text-success', glow: 'shadow-success/10' },
    red: { bg: 'bg-danger/10', text: 'text-danger', glow: 'shadow-danger/10' },
    yellow: { bg: 'bg-warning/10', text: 'text-warning', glow: 'shadow-warning/10' },
  };

  const c = colors[color] || colors.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: 'easeOut' }}
      className="bg-bg-card rounded-2xl border border-border p-5 hover:border-border-light transition-all duration-300 card-glow group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center shadow-lg ${c.glow}`}>
          <Icon className={`w-5 h-5 ${c.text}`} />
        </div>
        {change !== undefined && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${
            change >= 0 ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
          }`}>
            {change >= 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-text-primary tracking-tight">{value}</p>
      <p className="text-sm text-text-muted mt-0.5">{title}</p>
    </motion.div>
  );
}
