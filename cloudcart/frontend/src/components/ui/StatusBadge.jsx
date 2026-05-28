export default function StatusBadge({ status }) {
  const styles = {
    Success: 'bg-success/10 text-success border-success/20',
    Delivered: 'bg-success/10 text-success border-success/20',
    Running: 'bg-accent-primary/10 text-accent-primary border-accent-primary/20',
    Processing: 'bg-accent-primary/10 text-accent-primary border-accent-primary/20',
    Healthy: 'bg-success/10 text-success border-success/20',
    Active: 'bg-success/10 text-success border-success/20',
    Failed: 'bg-danger/10 text-danger border-danger/20',
    Unhealthy: 'bg-danger/10 text-danger border-danger/20',
    Stopped: 'bg-danger/10 text-danger border-danger/20',
    Inactive: 'bg-text-dim/10 text-text-dim border-text-dim/20',
    Pending: 'bg-warning/10 text-warning border-warning/20',
    Shipped: 'bg-accent-secondary/10 text-accent-secondary border-accent-secondary/20',
    Staging: 'bg-warning/10 text-warning border-warning/20',
    Production: 'bg-success/10 text-success border-success/20',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${styles[status] || 'bg-bg-card text-text-muted border-border'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        ['Success', 'Delivered', 'Running', 'Processing', 'Healthy', 'Active'].includes(status) ? 'bg-current' :
        ['Failed', 'Unhealthy', 'Stopped'].includes(status) ? 'bg-current' :
        'bg-current'
      }`} />
      {status}
    </span>
  );
}
