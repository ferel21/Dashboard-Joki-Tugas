import React, { useState, useEffect } from 'react';
import { Order } from '../types';

interface OrderModalProps {
  onClose: () => void;
  onAddOrder: (orderData: Omit<Order, 'id' | 'status'>) => void;
  onUpdateOrder: (order: Order) => void;
  orderToEdit: Order | null;
}

const AddOrderModal: React.FC<OrderModalProps> = ({ onClose, onAddOrder, onUpdateOrder, orderToEdit }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    subject: '',
    description: '',
    deadline: '',
    price: '',
  });

  const isEditMode = !!orderToEdit;

  useEffect(() => {
    if (isEditMode && orderToEdit) {
      setFormData({
        customerName: orderToEdit.customerName,
        subject: orderToEdit.subject,
        description: orderToEdit.description,
        deadline: orderToEdit.deadline,
        price: orderToEdit.price.toString(),
      });
    } else {
        setFormData({
            customerName: '',
            subject: '',
            description: '',
            deadline: '',
            price: '',
        });
    }
  }, [orderToEdit, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderData = {
      customerName: formData.customerName,
      subject: formData.subject,
      description: formData.description,
      deadline: formData.deadline,
      price: parseFloat(formData.price) || 0,
    };

    if (isEditMode && orderToEdit) {
      onUpdateOrder({
        ...orderToEdit,
        ...orderData,
      });
    } else {
      onAddOrder(orderData);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-20 flex justify-center items-center p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold mb-4">{isEditMode ? 'Edit Pesanan' : 'Tambah Pesanan Baru'}</h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="customerName" className="block text-sm font-medium text-gray-300">Nama Pelanggan</label>
              <input type="text" name="customerName" id="customerName" value={formData.customerName} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-white p-2" />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300">Subjek/Mata Kuliah</label>
              <input type="text" name="subject" id="subject" value={formData.subject} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-white p-2" />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300">Deskripsi</label>
              <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={3} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-white p-2"></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-300">Deadline</label>
                <input type="date" name="deadline" id="deadline" value={formData.deadline} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-white p-2" />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-300">Harga (Rp)</label>
                <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-white p-2" />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-md text-white font-semibold transition-colors duration-200">
              Batal
            </button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-semibold transition-colors duration-200">
              {isEditMode ? 'Simpan Perubahan' : 'Tambah Pesanan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrderModal;
