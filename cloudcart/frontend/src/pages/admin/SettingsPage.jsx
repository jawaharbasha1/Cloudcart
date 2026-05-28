import { motion } from 'framer-motion';
import { Save } from 'lucide-react';
import PageTransition from '../../components/ui/PageTransition';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Settings saved successfully');
  };

  return (
    <PageTransition>
      <div className="max-w-4xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-text-muted text-sm">Manage your platform configuration</p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* General */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-bg-card rounded-2xl border border-border p-6">
            <h3 className="font-semibold mb-4 text-lg border-b border-border pb-2">General Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1.5">Platform Name</label>
                <input defaultValue="CloudCart Platform" className="w-full px-4 py-2.5 rounded-xl bg-bg-input border border-border text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1.5">Support Email</label>
                <input defaultValue="support@cloudcart.io" className="w-full px-4 py-2.5 rounded-xl bg-bg-input border border-border text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-all" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-text-muted mb-1.5">Platform Description</label>
                <textarea rows="3" defaultValue="The modern DevOps marketplace for cloud infrastructure." className="w-full px-4 py-2.5 rounded-xl bg-bg-input border border-border text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-all resize-none" />
              </div>
            </div>
          </motion.div>

          {/* DevOps Configuration */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-bg-card rounded-2xl border border-border p-6">
            <h3 className="font-semibold mb-4 text-lg border-b border-border pb-2">DevOps Integrations</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1.5">Jenkins Server URL</label>
                <input defaultValue="https://jenkins.cloudcart.io" className="w-full px-4 py-2.5 rounded-xl bg-bg-input border border-border text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1.5">Jenkins API Token</label>
                <input type="password" defaultValue="••••••••••••••••" className="w-full px-4 py-2.5 rounded-xl bg-bg-input border border-border text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1.5">Grafana URL</label>
                <input defaultValue="https://grafana.cloudcart.io" className="w-full px-4 py-2.5 rounded-xl bg-bg-input border border-border text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1.5">Prometheus Server</label>
                <input defaultValue="http://prometheus:9090" className="w-full px-4 py-2.5 rounded-xl bg-bg-input border border-border text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-all" />
              </div>
            </div>
          </motion.div>

          <div className="flex justify-end">
            <button type="submit" className="px-6 py-2.5 rounded-xl bg-accent-primary text-white font-semibold hover:bg-accent-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-accent-primary/20">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </PageTransition>
  );
}
