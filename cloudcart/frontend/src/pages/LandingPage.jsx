import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Cloud, Server, GitBranch, Container, Activity, Shield,
  Zap, BarChart3, Globe, Code2, Rocket, CheckCircle2, ChevronRight
} from 'lucide-react';
import { useEffect, useState } from 'react';
import PageTransition from '../components/ui/PageTransition';

// Counter animation hook
function useCounter(end, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);
  return count;
}

function StatCounter({ value, suffix = '', label }) {
  const count = useCounter(value);
  return (
    <div className="text-center">
      <p className="text-3xl md:text-4xl font-bold gradient-text">{count.toLocaleString()}{suffix}</p>
      <p className="text-sm text-text-muted mt-1">{label}</p>
    </div>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5, ease: 'easeOut' }
};

export default function LandingPage() {
  const features = [
    { icon: Cloud, title: 'Cloud Infrastructure', desc: 'Deploy and manage cloud servers, databases, and services with one click.' },
    { icon: Container, title: 'Container Orchestration', desc: 'Kubernetes and Docker management with automated scaling and health checks.' },
    { icon: GitBranch, title: 'CI/CD Pipelines', desc: 'Automated build, test, and deployment workflows with Jenkins integration.' },
    { icon: Activity, title: 'Real-time Monitoring', desc: 'Prometheus and Grafana dashboards with alerting and log aggregation.' },
    { icon: Shield, title: 'Enterprise Security', desc: 'SSL certificates, DDoS protection, and compliance-ready infrastructure.' },
    { icon: Zap, title: 'Edge Computing', desc: 'Global CDN with 200+ edge locations for ultra-low latency delivery.' },
  ];

  const techStack = [
    { name: 'React', color: '#61DAFB' },
    { name: 'Node.js', color: '#339933' },
    { name: 'MongoDB', color: '#47A248' },
    { name: 'Docker', color: '#2496ED' },
    { name: 'Jenkins', color: '#D24939' },
    { name: 'Nginx', color: '#009639' },
    { name: 'AWS', color: '#FF9900' },
    { name: 'Prometheus', color: '#E6522C' },
  ];

  const pipeline = [
    { icon: Code2, label: 'Developer', color: '#3B82F6' },
    { icon: GitBranch, label: 'GitHub', color: '#8B5CF6' },
    { icon: Rocket, label: 'Jenkins CI/CD', color: '#D24939' },
    { icon: Container, label: 'Docker Build', color: '#2496ED' },
    { icon: Server, label: 'AWS EC2', color: '#FF9900' },
    { icon: Activity, label: 'Grafana', color: '#22C55E' },
  ];

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-secondary/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-32 md:pb-32">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-sm font-medium mb-6"
            >
              <Zap className="w-4 h-4" />
              The DevOps Marketplace
              <ChevronRight className="w-4 h-4" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
            >
              Cloud Infrastructure
              <br />
              <span className="gradient-text">Made Simple</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-8 leading-relaxed"
            >
              Deploy, manage, and monitor your entire cloud infrastructure from a single
              dashboard. Built for DevOps engineers who demand excellence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-semibold hover:shadow-lg hover:shadow-accent-primary/25 transition-all duration-300"
              >
                Browse Products
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-bg-card border border-border text-text-primary font-semibold hover:bg-bg-card-hover hover:border-border-light transition-all duration-300"
              >
                View Dashboard
              </Link>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
          >
            <StatCounter value={99} suffix=".99%" label="Uptime SLA" />
            <StatCounter value={15000} label="Active Users" />
            <StatCounter value={200} suffix="+" label="Edge Locations" />
            <StatCounter value={50} suffix="ms" label="Avg Response" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Ship</h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              From compute to monitoring, we provide the complete toolkit for modern cloud operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="group p-6 rounded-2xl bg-bg-card border border-border hover:border-border-light transition-all duration-300 card-glow"
              >
                <div className="w-11 h-11 rounded-xl bg-accent-primary/10 flex items-center justify-center mb-4 group-hover:bg-accent-primary/20 transition-colors">
                  <f.icon className="w-5 h-5 text-accent-primary" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">{f.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DevOps Pipeline Section */}
      <section className="py-20 md:py-28 bg-bg-sidebar/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">DevOps Pipeline</h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Automated workflow from code commit to production deployment with full observability.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 max-w-5xl mx-auto">
            {pipeline.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.4 }}
                className="flex items-center gap-3 md:gap-4"
              >
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center border border-border bg-bg-card hover:scale-110 transition-transform duration-300"
                    style={{ boxShadow: `0 0 20px ${step.color}15` }}
                  >
                    <step.icon className="w-6 h-6 md:w-7 md:h-7" style={{ color: step.color }} />
                  </div>
                  <span className="text-xs font-medium text-text-muted">{step.label}</span>
                </div>
                {i < pipeline.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-text-dim hidden sm:block" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Pipeline description cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14 max-w-4xl mx-auto">
            {[
              { title: 'Continuous Integration', items: ['Automated testing', 'Code quality checks', 'Build artifacts'], color: 'accent-primary' },
              { title: 'Continuous Delivery', items: ['Docker containerization', 'Staging deployment', 'Integration tests'], color: 'accent-secondary' },
              { title: 'Continuous Monitoring', items: ['Prometheus metrics', 'Grafana dashboards', 'Automated alerts'], color: 'success' },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="p-5 rounded-2xl bg-bg-card border border-border"
              >
                <h4 className={`text-sm font-semibold text-${card.color} mb-3`}>{card.title}</h4>
                <ul className="space-y-2">
                  {card.items.map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-text-muted">
                      <CheckCircle2 className={`w-4 h-4 text-${card.color} shrink-0`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powered By</h2>
            <p className="text-text-muted text-lg">Industry-leading technologies for maximum reliability.</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
                className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-bg-card border border-border hover:border-border-light transition-all group cursor-default"
              >
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tech.color }} />
                <span className="text-sm font-medium text-text-muted group-hover:text-text-primary transition-colors">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeUp}
            className="relative rounded-3xl overflow-hidden p-8 md:p-14 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20" />
            <div className="absolute inset-0 bg-bg-card/80" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-text-muted text-lg max-w-xl mx-auto mb-8">
                Join thousands of DevOps teams building on CloudCart.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-semibold hover:shadow-lg hover:shadow-accent-primary/25 transition-all"
                >
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-border text-text-primary font-semibold hover:bg-white/10 transition-all"
                >
                  Explore Products
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
