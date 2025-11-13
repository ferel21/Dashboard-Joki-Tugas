
import React, { useState } from 'react';
import { Order } from '../types';

interface AddOrderModalProps {
  onClose: () => void;
  onAddOrder: (orderData: Omit<Order, 'id' | 'status'>) => void;
}

const AddOrderModal: React.FC<AddOrderModalProps> = ({ onClose, onAddOrder }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    subject: '',
    description: '',
    deadline: '',
    price: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(formData).some(val => val === '')) {
      alert('Semua field harus diisi!');
      return;
    }
    onAddOrder({
      ...formData,
      price: parseFloat(formData.price),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-20" onClick={onClose}>
      <div className="bg-gray-800 rounded-lg p-8 w-full max-w-lg shadow-xl border border-gray-700" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-6 text-white">Tambah Pesanan Baru</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="customerName" className="block text-sm font-medium text-gray-300">Nama Pelanggan</label>
            <input type="text" name="customerName" id="customerName" value={formData.customerName} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-300">Mata Pelajaran/Kuliah</label>
            <input type="text" name="subject" id="subject" value={formData.subject} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300">Deskripsi Tugas</label>
            <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={3} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required></textarea>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-gray-300">Deadline</label>
              <input type="date" name="deadline" id="deadline" value={formData.deadline} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-300">Harga (IDR)</label>
              <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-white font-semibold transition-colors duration-200">
              Batal
            </button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold transition-colors duration-200">
              Simpan Pesanan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrderModal;
