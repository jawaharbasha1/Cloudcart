import { motion } from 'framer-motion';
import { Rocket, GitPullRequest, CheckCircle2, XCircle, Clock, Play } from 'lucide-react';
import PageTransition from '../../components/ui/PageTransition';
import StatusBadge from '../../components/ui/StatusBadge';
import { mockDeployments, mockJenkinsBuilds } from '../../utils/mockData';

export default function DeploymentsPage() {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Deployments & CI/CD</h1>
          <p className="text-text-muted text-sm">Manage pipelines and view deployment history</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Jenkins Builds */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2"><Rocket className="w-4 h-4 text-accent-primary" /> Jenkins Pipeline Builds</h3>
              <button className="px-3 py-1.5 bg-accent-primary/10 text-accent-primary hover:bg-accent-primary hover:text-white rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5">
                <Play className="w-3 h-3 fill-current" /> Run Pipeline
              </button>
            </div>
            
            <div className="space-y-4">
              {mockJenkinsBuilds.map(b => (
                <div key={b.id} className="p-4 rounded-xl border border-border bg-bg-primary">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex gap-3">
                      <div className={`mt-0.5 ${b.status === 'Success' ? 'text-success' : b.status === 'Failed' ? 'text-danger' : 'text-accent-primary animate-pulse'}`}>
                        {b.status === 'Success' ? <CheckCircle2 className="w-5 h-5" /> : b.status === 'Failed' ? <XCircle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{b.job}</h4>
                          <span className="text-xs font-medium text-text-muted">{b.id}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-text-dim mt-1">
                          <span className="flex items-center gap-1"><GitPullRequest className="w-3 h-3" /> {b.branch}</span>
                          <span>Duration: {b.duration}</span>
                          <span>{b.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <StatusBadge status={b.status} />
                  </div>
                  
                  {/* Pipeline Stages */}
                  <div className="mt-4">
                    <div className="flex items-center gap-1">
                      {b.stages.map((stage, idx) => {
                        let stageColor = 'bg-text-dim'; // Default/pending
                        if (b.status === 'Success') stageColor = 'bg-success';
                        else if (b.status === 'Failed') {
                          stageColor = idx === b.stages.length - 1 ? 'bg-danger' : 'bg-success';
                        } else if (b.status === 'Running') {
                          stageColor = idx === b.stages.length - 1 ? 'bg-accent-primary animate-pulse' : 'bg-success';
                        }
                        return (
                          <div key={stage} className="flex-1">
                            <div className={`h-1.5 rounded-full ${stageColor} mb-1.5 opacity-80`} />
                            <p className="text-[10px] text-text-dim truncate px-1 text-center">{stage}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Deployment History */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-bg-card rounded-2xl border border-border p-5">
            <h3 className="font-semibold mb-4">Deployment History</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="text-text-dim text-xs border-b border-border">
                  <th className="text-left py-2 font-medium">Service</th>
                  <th className="text-left py-2 font-medium">Environment</th>
                  <th className="text-left py-2 font-medium">Version</th>
                  <th className="text-left py-2 font-medium">Author</th>
                  <th className="text-left py-2 font-medium">Status</th>
                </tr></thead>
                <tbody>
                  {mockDeployments.map((d, i) => (
                    <tr key={d.id} className="border-b border-border last:border-0 hover:bg-white/[0.02] transition-colors">
                      <td className="py-3">
                        <p className="font-medium">{d.service}</p>
                        <p className="text-[10px] text-text-dim font-mono">{d.commit}</p>
                      </td>
                      <td className="py-3"><span className="px-2 py-1 rounded bg-bg-primary text-xs">{d.environment}</span></td>
                      <td className="py-3 text-text-muted font-mono text-xs">{d.version}</td>
                      <td className="py-3 text-text-muted">{d.author}</td>
                      <td className="py-3"><StatusBadge status={d.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
