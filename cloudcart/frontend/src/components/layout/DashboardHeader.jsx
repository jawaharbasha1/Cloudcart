import { Bell, Search, Menu, User, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';

export default function DashboardHeader({ onMenuClick }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const { user } = useSelector(state => state.auth);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate('/');
  };

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-bg-primary/80 backdrop-blur-xl border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-text-muted">
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden sm:flex items-center gap-2 bg-bg-card rounded-xl px-3 py-2 border border-border w-64">
            <Search className="w-4 h-4 text-text-dim" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-sm text-text-primary placeholder-text-dim w-full"
            />
            <kbd className="hidden md:inline text-[10px] text-text-dim bg-bg-primary px-1.5 py-0.5 rounded border border-border">⌘K</kbd>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="relative p-2 rounded-lg hover:bg-white/5 text-text-muted transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent-primary"></span>
          </button>

          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1.5 pr-3 rounded-xl hover:bg-white/5 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-text-primary leading-tight">{user?.name || 'Admin User'}</p>
                <p className="text-[11px] text-text-dim">Administrator</p>
              </div>
              <ChevronDown className="w-4 h-4 text-text-dim hidden sm:block" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-bg-card border border-border shadow-xl py-1 z-50">
                <a href="#" className="block px-4 py-2 text-sm text-text-muted hover:text-text-primary hover:bg-white/5">Profile</a>
                <a href="#" className="block px-4 py-2 text-sm text-text-muted hover:text-text-primary hover:bg-white/5">Settings</a>
                <div className="border-t border-border my-1"></div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-danger hover:bg-danger/10 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
