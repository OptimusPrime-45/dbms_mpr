import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';
import { 
  Users, 
  Wallet, 
  ArrowLeftRight, 
  TrendingUp,
  Landmark,
  ShieldCheck,
  CreditCard
} from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    customers: 0,
    accounts: 0,
    transactions: 0,
    totalBalance: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [cust, acc, trans] = await Promise.all([
          api.get('/customers'),
          api.get('/accounts'),
          api.get('/transactions')
        ]);
        
        const total = acc.data.reduce((sum, item) => sum + item.balance, 0);
        
        setStats({
          customers: cust.data.length,
          accounts: acc.data.length,
          transactions: trans.data.length,
          totalBalance: total
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { name: 'Total Customers', value: stats.customers, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Active Accounts', value: stats.accounts, icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { name: 'Transactions', value: stats.transactions, icon: ArrowLeftRight, color: 'text-purple-600', bg: 'bg-purple-100' },
    { name: 'Total Deposits', value: `$${stats.totalBalance.toLocaleString()}`, icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-100' },
  ];

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500">System overview and key performance indicators</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => (
          <div key={card.name} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">{card.name}</p>
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{card.value}</h3>
              </div>
              <div className={`${card.bg} ${card.color} p-3 rounded-xl`}>
                <card.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <ShieldCheck className="text-blue-500" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all text-left group">
              <div className="bg-blue-50 p-3 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Users size={20} />
              </div>
              <div>
                <span className="font-semibold block">New Customer</span>
                <span className="text-xs text-slate-400">Add a new bank client</span>
              </div>
            </button>
            <button className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all text-left group">
              <div className="bg-emerald-50 p-3 rounded-lg text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <CreditCard size={20} />
              </div>
              <div>
                <span className="font-semibold block">Open Account</span>
                <span className="text-xs text-slate-400">Create savings or current</span>
              </div>
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl shadow-blue-200">
          <div className="bg-white/10 w-fit p-3 rounded-xl mb-6">
            <Landmark size={24} />
          </div>
          <h2 className="text-xl font-bold mb-2">Nexus Premier</h2>
          <p className="text-blue-100 text-sm mb-6">Experience the future of banking with our specialized management tools.</p>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm border-b border-white/10 pb-2">
              <span>Security Hub</span>
              <span className="bg-blue-400/30 px-2 py-0.5 rounded text-xs">Active</span>
            </div>
            <div className="flex items-center justify-between text-sm border-b border-white/10 pb-2">
              <span>Audit Logs</span>
              <span className="bg-blue-400/30 px-2 py-0.5 rounded text-xs">Enabled</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
