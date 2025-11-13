
import React from 'react';
import { Order, OrderStatus } from '../types';
import { STATUS_MAP } from '../constants';
import OrderCard from './OrderCard';

interface ColumnProps {
  status: OrderStatus;
  orders: Order[];
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void;
  onDeleteOrder: (orderId: string) => void;
}

const Column: React.FC<ColumnProps> = ({ status, orders, onUpdateStatus, onDeleteOrder }) => {
  const { name, color } = STATUS_MAP[status];

  return (
    <div className="bg-gray-800 rounded-lg p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
            <span className={`h-3 w-3 rounded-full ${color}`}></span>
            <h2 className="font-bold text-lg text-gray-200">{name}</h2>
        </div>
        <span className="bg-gray-700 text-gray-300 text-sm font-semibold px-2.5 py-0.5 rounded-full">
          {orders.length}
        </span>
      </div>
      <div className="space-y-4 overflow-y-auto flex-grow pr-1 -mr-1">
        {orders.length > 0 ? (
          orders.map(order => (
            <OrderCard
              key={order.id}
              order={order}
              onUpdateStatus={onUpdateStatus}
              onDeleteOrder={onDeleteOrder}
            />
          ))
        ) : (
          <div className="text-center py-10 border-2 border-dashed border-gray-700 rounded-lg">
            <p className="text-gray-500">Belum ada pesanan.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;
