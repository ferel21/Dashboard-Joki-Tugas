import React, { useState, useCallback, useEffect } from 'react';
import { Order, OrderStatus } from '../types';
import { STATUSES, STATUS_MAP } from '../constants';
import Column from './Column';
import AddOrderModal from './AddOrderModal';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { useToast } from '../ToastContext';
import { listenForOrders, addOrder, updateOrder, deleteOrder } from '../services/orderService';

const Dashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState<Order | null>(null);
  const { addToast } = useToast();

  useEffect(() => {
    // Setup real-time listener for orders from Firestore
    const unsubscribe = listenForOrders(
      (newOrders) => {
        setOrders(newOrders);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching orders: ", error);
        addToast("Gagal memuat data dari database.", "error");
        setIsLoading(false);
      }
    );

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, [addToast]);

  const handleAddOrder = useCallback(async (newOrderData: Omit<Order, 'id' | 'status'>) => {
    try {
      await addOrder(newOrderData);
      addToast('Pesanan berhasil ditambahkan!', 'success');
      closeModal();
    } catch (error) {
      console.error("Error adding order: ", error);
      addToast('Gagal menambahkan pesanan.', 'error');
    }
  }, [addToast]);

  const handleUpdateOrder = useCallback(async (updatedOrder: Order) => {
    try {
      await updateOrder(updatedOrder.id, updatedOrder);
      addToast('Pesanan berhasil diperbarui!', 'success');
      closeModal();
    } catch (error) {
      console.error("Error updating order: ", error);
      addToast('Gagal memperbarui pesanan.', 'error');
    }
  }, [addToast]);

  const handleUpdateOrderStatus = useCallback(async (orderId: string, newStatus: OrderStatus) => {
    const order = orders.find(o => o.id === orderId);
    if (order && order.status !== newStatus) {
      try {
        await updateOrder(orderId, { status: newStatus });
        addToast(`Pesanan ${order.customerName} dipindahkan ke ${STATUS_MAP[newStatus].name}.`, 'info');
      } catch (error) {
        console.error("Error updating status: ", error);
        addToast('Gagal memindahkan pesanan.', 'error');
      }
    }
  }, [orders, addToast]);

  const handleDeleteOrder = useCallback(async (orderId: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pesanan ini?')) {
      try {
        await deleteOrder(orderId);
        addToast('Pesanan berhasil dihapus.', 'info');
      } catch (error) {
        console.error("Error deleting order: ", error);
        addToast('Gagal menghapus pesanan.', 'error');
      }
    }
  }, [addToast]);

  const closeModal = () => {
    setIsAddModalOpen(false);
    setOrderToEdit(null);
  };

  const openAddModal = () => {
    setOrderToEdit(null);
    setIsAddModalOpen(true);
  }

  const openEditModal = (order: Order) => {
    setOrderToEdit(order);
    setIsAddModalOpen(true); // Re-use the same modal
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-200">Proses Penjualan</h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold transition-colors duration-200 shadow-lg"
        >
          <PlusCircleIcon className="h-5 w-5" />
          Tambah Pesanan
        </button>
      </div>
      {isLoading ? (
         <div className="text-center py-10 text-gray-400">Memuat data pesanan...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATUSES.map(status => (
            <Column
              key={status}
              status={status}
              orders={orders.filter(order => order.status === status)}
              onUpdateStatus={handleUpdateOrderStatus}
              onDeleteOrder={handleDeleteOrder}
              onEditOrder={openEditModal}
            />
          ))}
        </div>
      )}

      {isAddModalOpen && (
        <AddOrderModal
          onClose={closeModal}
          onAddOrder={handleAddOrder}
          onUpdateOrder={handleUpdateOrder}
          orderToEdit={orderToEdit}
        />
      )}
    </div>
  );
};

export default Dashboard;
