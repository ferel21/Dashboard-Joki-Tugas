import React, { useState } from 'react';
import { Order, OrderStatus } from '../types';
import { STATUS_MAP } from '../constants';
import OrderCard from './OrderCard';

interface ColumnProps {
  status: OrderStatus;
  orders: Order[];
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void;
  onDeleteOrder: (orderId: string) => void;
  onEditOrder: (order: Order) => void;
}

const Column: React.FC<ColumnProps> = ({ status, orders, onUpdateStatus, onDeleteOrder, onEditOrder }) => {
  const { name, color } = STATUS_MAP[status];
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggedOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggedOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggedOver(false);
    const orderId = e.dataTransfer.getData('text/plain');
    onUpdateStatus(orderId, status);
  };

  return (
    <div 
      className={`bg-gray-800 rounded-lg p-4 flex flex-col h-full transition-colors duration-300 ${isDraggedOver ? 'bg-gray-700/80' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
            <span className={`h-3 w-3 rounded-full ${color}`}></span>
            <h2 className="font-bold text-lg text-gray-200">{name}</h2>
        </div>
        <span className="bg-gray-700 text-gray-300 text-sm font-semibold px-2.5 py-0.5 rounded-full">
          {orders.length}
        </span>
      </div>
      <div className={`space-y-4 overflow-y-auto flex-grow pr-1 -mr-1 rounded-md min-h-[100px] ${isDraggedOver ? 'outline-2 outline-dashed outline-indigo-500' : ''}`}>
        {orders.length > 0 ? (
          orders.map(order => (
            <OrderCard
              key={order.id}
              order={order}
              onUpdateStatus={onUpdateStatus}
              onDeleteOrder={onDeleteOrder}
              onEdit={onEditOrder}
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-center py-10 border-2 border-dashed border-gray-700 rounded-lg">
            <p className="text-gray-500">Letakkan pesanan di sini.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;