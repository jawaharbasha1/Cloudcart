import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { logout } from '../../store/slices/authSlice';
import {
  LayoutDashboard, Package, ShoppingBag, BarChart3, Activity,
  Rocket, Settings, LogOut, Cloud, X, Users
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/dashboard/products', icon: Package, label: 'Products' },
  { to: '/dashboard/orders', icon: ShoppingBag, label: 'Orders' },
  { to: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/dashboard/monitoring', icon: Activity, label: 'Monitoring' },
  { to: '/dashboard/deployments', icon: Rocket, label: 'Deployments' },
  { to: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const isAdmin = user?.role === 'admin';

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center shadow-lg shadow-accent-primary/20">
            <Cloud className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-bold text-text-primary block leading-tight">CloudCart</span>
            <span className="text-[10px] font-medium text-text-dim uppercase tracking-wider">Admin Panel</span>
          </div>
        </div>
        <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg hover:bg-white/5 text-text-muted">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        <p className="px-3 py-2 text-[10px] font-semibold text-text-dim uppercase tracking-wider">Main</p>
        {navItems.slice(0, isAdmin ? 4 : 1).map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-accent-primary/10 text-accent-primary'
                  : 'text-text-muted hover:text-text-primary hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={`w-[18px] h-[18px] ${isActive ? 'text-accent-primary' : 'text-text-dim group-hover:text-text-muted'}`} />
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-primary"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}

        {isAdmin && (
          <>
            <p className="px-3 pt-4 pb-2 text-[10px] font-semibold text-text-dim uppercase tracking-wider">DevOps</p>
            {navItems.slice(4, 6).map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-accent-primary/10 text-accent-primary'
                      : 'text-text-muted hover:text-text-primary hover:bg-white/5'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={`w-[18px] h-[18px] ${isActive ? 'text-accent-primary' : 'text-text-dim group-hover:text-text-muted'}`} />
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-primary"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}

            <p className="px-3 pt-4 pb-2 text-[10px] font-semibold text-text-dim uppercase tracking-wider">System</p>
            {navItems.slice(6).map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-accent-primary/10 text-accent-primary'
                      : 'text-text-muted hover:text-text-primary hover:bg-white/5'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={`w-[18px] h-[18px] ${isActive ? 'text-accent-primary' : 'text-text-dim group-hover:text-text-muted'}`} />
                    {item.label}
                  </>
                )}
              </NavLink>
            ))}
          </>
        )}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-danger hover:bg-danger/10 transition-all"
        >
          <LogOut className="w-[18px] h-[18px]" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 fixed inset-y-0 left-0 bg-bg-sidebar border-r border-border z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 w-64 bg-bg-sidebar border-r border-border z-50 lg:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
