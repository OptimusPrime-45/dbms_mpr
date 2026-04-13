import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import { Landmark, Lock, User } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      localStorage.setItem('role', data.role);
      localStorage.setItem('customerId', data.customerId);
      toast.success('Login Successful!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid Credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="max-w-md w-full animate-in fade-in zoom-in duration-500">
        <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-blue-600 p-4 rounded-2xl shadow-lg shadow-blue-500/20 mb-4">
              <Landmark className="text-white" size={40} />
            </div>
            <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
            <p className="text-slate-400 mt-2">Access your Nexus Banking dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-slate-300 ml-1">Username</label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="text"
                  required
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="password"
                  required
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-900/40 transition-all transform active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </div>
        <p className="text-center text-slate-500 mt-8 text-sm">
          Protected by industry standard encryption.
        </p>
      </div>
    </div>
  );
};

export default Login;
