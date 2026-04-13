import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';
import toast from 'react-hot-toast';
import { 
  ArrowLeftRight, 
  Search, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ArrowRight,
  Filter
} from 'lucide-react';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState('TRANSFER'); // TRANSFER, DEPOSIT, WITHDRAW
  const [formData, setFormData] = useState({ 
    fromAccountId: '', toAccountId: '', amount: '', description: '' 
  });

  const fetchData = async () => {
    try {
      const [trans, accs] = await Promise.all([
        api.get('/transactions'),
        api.get('/accounts')
      ]);
      setTransactions(trans.data);
      setAccounts(accs.data);
    } catch (err) {
      toast.error('Failed to fetch data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTransaction = async (e) => {
    e.preventDefault();
    try {
      const endpoint = type === 'TRANSFER' ? '/transactions/transfer' :
                       type === 'DEPOSIT' ? '/transactions/deposit' : 
                       '/transactions/withdraw';
      
      const payload = type === 'TRANSFER' ? {
        fromAccountId: parseInt(formData.fromAccountId),
        toAccountId: parseInt(formData.toAccountId),
        amount: parseFloat(formData.amount)
      } : {
        accountId: type === 'DEPOSIT' ? parseInt(formData.toAccountId) : parseInt(formData.fromAccountId),
        amount: parseFloat(formData.amount)
      };

      await api.post(endpoint, payload);
      toast.success(`${type} successful!`);
      setShowModal(false);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Transaction failed');
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Transactions</h1>
          <p className="text-slate-500">History and money movement</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg shadow-blue-200"
        >
          <ArrowLeftRight size={20} />
          New Transaction
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden text-sm">
        <div className="p-4 border-b border-slate-50 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="Search transactions..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
            <Filter size={18} />
            Filters
          </button>
        </div>

        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
            <tr>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">From/To</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {transactions.map((t) => (
              <tr key={t.transactionId} className="hover:bg-slate-50/50 transition-all">
                <td className="px-6 py-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block mr-2 animate-pulse"></span>
                  <span className="font-medium text-slate-900">Success</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                    t.transactionType === 'DEPOSIT' ? 'bg-emerald-50 text-emerald-600' : 
                    t.transactionType === 'TRANSFER' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'
                  }`}>
                    {t.transactionType}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    {t.fromAccountId ? <span className="font-mono text-xs">#{t.fromAccountId}</span> : <span className="text-slate-300">N/A</span>}
                    <ArrowRight size={12} className="text-slate-300" />
                    {t.toAccountId ? <span className="font-mono text-xs">#{t.toAccountId}</span> : <span className="text-slate-300">N/A</span>}
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-500 italic max-w-xs truncate">{t.description || 'No description'}</td>
                <td className="px-6 py-4 text-slate-500">{new Date(t.timestamp).toLocaleDateString()}</td>
                <td className={`px-6 py-4 text-right font-bold ${
                  t.transactionType === 'DEPOSIT' ? 'text-emerald-600' : 'text-slate-900'
                }`}>
                  {t.transactionType === 'DEPOSIT' ? '+' : '-'}${t.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in duration-200">
            <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
              <h2 className="text-xl font-bold">New Transaction</h2>
              <div className="flex gap-1 bg-slate-800 p-1 rounded-lg text-[10px]">
                {['TRANSFER', 'DEPOSIT', 'WITHDRAW'].map(m => (
                  <button 
                    key={m} 
                    onClick={() => setType(m)}
                    className={`px-2 py-1 rounded-md transition-all ${type === m ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
            
            <form onSubmit={handleTransaction} className="p-8 space-y-4">
              {type !== 'DEPOSIT' && (
                <div>
                  <label className="text-sm font-medium text-slate-700">From Account</label>
                  <select 
                    required className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-lg text-sm"
                    onChange={(e) => setFormData({...formData, fromAccountId: e.target.value})}
                  >
                    <option value="">Select source account</option>
                    {accounts.map(a => <option key={a.accountId} value={a.accountId}>Acc #{a.accountId} (${a.balance})</option>)}
                  </select>
                </div>
              )}

              {type !== 'WITHDRAW' && (
                <div>
                  <label className="text-sm font-medium text-slate-700">To Account</label>
                  <select 
                    required className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-lg text-sm"
                    onChange={(e) => setFormData({...formData, toAccountId: e.target.value})}
                  >
                    <option value="">Select destination account</option>
                    {accounts.map(a => <option key={a.accountId} value={a.accountId}>Acc #{a.accountId}</option>)}
                  </select>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-slate-700">Amount ($)</label>
                <input 
                  required type="number" 
                  className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-lg"
                  placeholder="0.00"
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                />
              </div>

              <div className="flex gap-3 mt-8">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg font-semibold hover:bg-slate-50">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Execute</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Transactions;
