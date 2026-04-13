import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';
import toast from 'react-hot-toast';
import { Plus, Search, MoreVertical, Edit2, Trash2 } from 'lucide-react';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', phone: '', address: '' });

  const fetchCustomers = async () => {
    try {
      const { data } = await api.get('/customers');
      setCustomers(data);
    } catch (err) {
      toast.error('Failed to fetch customers');
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/customers', newCustomer);
      toast.success('Customer added successfully');
      setShowModal(false);
      setNewCustomer({ name: '', phone: '', address: '' });
      fetchCustomers();
    } catch (err) {
      toast.error('Error adding customer');
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Customers</h1>
          <p className="text-slate-500">Manage bank clients and their personal info</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg shadow-blue-200"
        >
          <Plus size={20} />
          Add Customer
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-50 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search customers..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>
        
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-bold">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Address</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {customers.map((c) => (
              <tr key={c.customerId} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4 font-medium text-slate-400">#CUST-{c.customerId}</td>
                <td className="px-6 py-4 font-semibold text-slate-900">{c.name}</td>
                <td className="px-6 py-4 text-slate-600">{c.phone}</td>
                <td className="px-6 py-4 text-slate-600 truncate max-w-xs">{c.address}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-white rounded-lg text-slate-600 hover:text-blue-600 border border-transparent hover:border-slate-100"><Edit2 size={16} /></button>
                    <button className="p-2 hover:bg-white rounded-lg text-slate-600 hover:text-red-600 border border-transparent hover:border-slate-100"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in zoom-in duration-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">New Customer</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Full Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Phone Number</label>
                <input 
                  required
                  type="text" 
                  className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Address</label>
                <textarea 
                  required
                  className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20"
                  rows="3"
                  value={newCustomer.address}
                  onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})}
                ></textarea>
              </div>
              <div className="flex gap-3 mt-8">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg font-semibold hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
                >
                  Create Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Customers;
