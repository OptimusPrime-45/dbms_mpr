import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  ArrowLeftRight, 
  HandCoins, 
  Building2, 
  Briefcase, 
  LogOut,
  Landmark
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const links = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Customers', path: '/customers', icon: Users },
    { name: 'Accounts', path: '/accounts', icon: Wallet },
    { name: 'Transactions', path: '/transactions', icon: ArrowLeftRight },
    { name: 'Loans', path: '/loans', icon: HandCoins },
    { name: 'Branches', path: '/branches', icon: Building2 },
    { name: 'Employees', path: '/employees', icon: Briefcase },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="h-screen w-64 bg-slate-900 text-white flex flex-col fixed left-0 top-0">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <Landmark className="text-blue-400" size={32} />
        <h1 className="text-xl font-bold tracking-tight">Nexus Bank</h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 mt-4">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <link.icon size={20} />
            <span className="font-medium">{link.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
