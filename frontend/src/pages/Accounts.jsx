import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';
import toast from 'react-hot-toast';
import { Plus, Wallet, Landmark, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newAccount, setNewAccount] = useState({ 
    customerId: '', branchId: '', accountType: 'SAVINGS', 
    balance: 0, interestRate: 4.5, minBalance: 1000 
  });

  const fetchData = async () => {
    try {
      const [acc, cust, br] = await Promise.all([
        api.get('/accounts'),
        api.get('/customers'),
        api.get('/branches')
      ]);
      setAccounts(acc.data);
      setCustomers(cust.data);
      setBranches(br.data);
    } catch (err) {
      toast.error('Failed to fetch data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/accounts', newAccount);
      toast.success('Account opened successfully');
      setShowModal(false);
      fetchData();
    } catch (err) {
      toast.error('Error opening account');
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Accounts</h1>
          <p className="text-slate-500">Manage savings and current accounts</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg shadow-blue-200"
        >
          <Plus size={20} />
          Open Account
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((acc) => (
          <div key={acc.accountId} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-12 -mt-12 transition-all group-hover:bg-blue-100"></div>
            
            <div className="flex items-center gap-4 mb-6 relative">
              <div className="bg-blue-600 p-3 rounded-xl text-white">
                <Wallet size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900">#{acc.accountId}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold uppercase ${
                  acc.accountType === 'SAVINGS' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                }`}>
                  {acc.accountType}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Balance</span>
                <span className="font-bold text-slate-900">${acc.balance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">{acc.accountType === 'SAVINGS' ? 'Interest Rate' : 'Min Balance'}</span>
                <span className="font-medium text-slate-700">
                  {acc.accountType === 'SAVINGS' ? `${acc.interestRate}%` : `$${acc.minBalance}`}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1">
                <ArrowDownLeft size={14} className="text-emerald-500" /> Deposit
              </button>
              <button className="flex-1 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1">
                <ArrowUpRight size={14} className="text-red-500" /> Withdraw
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in zoom-in duration-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Open New Account</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Select Customer</label>
                <select 
                  className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20"
                  onChange={(e) => setNewAccount({...newAccount, customerId: e.target.value})}
                >
                  <option value="">Select a customer</option>
                  {customers.map(c => <option key={c.customerId} value={c.customerId}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Select Branch</label>
                <select 
                  className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20"
                  onChange={(e) => setNewAccount({...newAccount, branchId: e.target.value})}
                >
                  <option value="">Select a branch</option>
                  {branches.map(b => <option key={b.branchId} value={b.branchId}>{b.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">Account Type</label>
                  <select 
                    className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20"
                    onChange={(e) => setNewAccount({...newAccount, accountType: e.target.value})}
                  >
                    <option value="SAVINGS">SAVINGS</option>
                    <option value="CURRENT">CURRENT</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Initial Balance</label>
                  <input 
                    type="number" 
                    className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20"
                    onChange={(e) => setNewAccount({...newAccount, balance: e.target.value})}
                  />
                </div>
              </div>
              {newAccount.accountType === 'SAVINGS' ? (
                <div>
                  <label className="text-sm font-medium text-slate-700">Interest Rate (%)</label>
                  <input 
                    type="number" step="0.1"
                    className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20"
                    value={newAccount.interestRate}
                    onChange={(e) => setNewAccount({...newAccount, interestRate: e.target.value})}
                  />
                </div>
              ) : (
                <div>
                  <label className="text-sm font-medium text-slate-700">Min Balance</label>
                  <input 
                    type="number"
                    className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20"
                    value={newAccount.minBalance}
                    onChange={(e) => setNewAccount({...newAccount, minBalance: e.target.value})}
                  />
                </div>
              )}
              <div className="flex gap-3 mt-8">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg font-semibold hover:bg-slate-50">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Open Account</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Accounts;
