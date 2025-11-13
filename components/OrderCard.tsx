
import React, { useState } from 'react';
import { Order, OrderStatus } from '../types';
import { STATUSES, STATUS_MAP } from '../constants';
import { CalendarIcon, CurrencyDollarIcon, EllipsisVerticalIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

interface OrderCardProps {
  order: Order;
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void;
  onDeleteOrder: (orderId: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onUpdateStatus, onDeleteOrder }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleStatusChange = (newStatus: OrderStatus) => {
    onUpdateStatus(order.id, newStatus);
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-gray-700/50 p-4 rounded-lg shadow-md border border-gray-600/50 hover:border-indigo-500 transition-all duration-200">
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-lg text-gray-100 mb-1">{order.customerName}</h3>
        <div className="relative">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-400 hover:text-white">
            <EllipsisVerticalIcon className="h-6 w-6" />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
              <div className="py-1">
                <p className="px-4 py-2 text-xs text-gray-400">Ubah Status</p>
                {STATUSES.map(status => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    disabled={order.status === status}
                    className={`w-full text-left px-4 py-2 text-sm ${
                      order.status === status 
                        ? 'bg-indigo-600 text-white' 
                        : 'text-gray-300 hover:bg-gray-700'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {STATUS_MAP[status].name}
                  </button>
                ))}
                <div className="border-t border-gray-700 my-1"></div>
                <button
                  onClick={() => onDeleteOrder(order.id)}
                  className="w-full flex items-center gap-2 text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500 hover:text-white"
                >
                    <TrashIcon className="h-4 w-4" />
                    Hapus
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <p className="text-md font-semibold text-indigo-400 mb-2">{order.subject}</p>
      <p className="text-sm text-gray-400 mb-4 h-12 overflow-hidden">{order.description}</p>
      <div className="flex justify-between items-center text-sm text-gray-400">
        <div className="flex items-center gap-1.5">
          <CalendarIcon className="h-4 w-4" />
          <span>{order.deadline}</span>
        </div>
        <div className="flex items-center gap-1.5 font-semibold text-green-400">
          <CurrencyDollarIcon className="h-4 w-4" />
          <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(order.price)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
