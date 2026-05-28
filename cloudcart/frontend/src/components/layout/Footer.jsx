import { Link } from 'react-router-dom';
import { Cloud, GitPullRequest, Globe, Mail } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    Product: ['Features', 'Pricing', 'Documentation', 'Changelog'],
    Company: ['About', 'Blog', 'Careers', 'Contact'],
    Resources: ['Community', 'Partners', 'Status', 'Support'],
    Legal: ['Privacy', 'Terms', 'Security', 'Compliance'],
  };

  return (
    <footer className="border-t border-border bg-bg-sidebar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center">
                <Cloud className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-text-primary">CloudCart</span>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed mb-4">
              The modern DevOps marketplace for cloud infrastructure and services.
            </p>
            <div className="flex gap-3">
              {[GitPullRequest, Globe, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg bg-bg-card flex items-center justify-center text-text-muted hover:text-accent-primary hover:bg-bg-card-hover transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-text-primary mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-sm text-text-muted hover:text-text-primary transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-dim">© 2026 CloudCart. All rights reserved.</p>
          <p className="text-xs text-text-dim">Built with ❤️ for DevOps Engineers</p>
        </div>
      </div>
    </footer>
  );
}
