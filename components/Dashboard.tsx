
import React, { useState, useCallback, useEffect } from 'react';
import { Order, OrderStatus } from '../types';
import { STATUSES } from '../constants';
import Column from './Column';
import AddOrderModal from './AddOrderModal';
import { PlusCircleIcon } from '@heroicons/react/24/solid';

const initialOrders: Order[] = [
    { id: '1', customerName: 'Andi Wijaya', subject: 'Matematika Diskrit', description: 'Mengerjakan soal-soal bab 5 tentang graf.', deadline: '2024-08-15', price: 150000, status: OrderStatus.BARU_MASUK },
    { id: '2', customerName: 'Bunga Citra', subject: 'Fisika Kuantum', description: 'Membuat paper review tentang teori string.', deadline: '2024-08-20', price: 300000, status: OrderStatus.DIKERJAKAN },
    { id: '3', customerName: 'Charlie Dharma', subject: 'Pemrograman Web', description: 'Buat aplikasi CRUD dengan React & Node.js', deadline: '2024-08-12', price: 500000, status: OrderStatus.DIKERJAKAN },
    { id: '4', customerName: 'Dewi Lestari', subject: 'Sejarah Indonesia', description: 'Essay tentang G30S/PKI.', deadline: '2024-08-10', price: 100000, status: OrderStatus.SELESAI },
    { id: '5', customerName: 'Eka Kurniawan', subject: 'Statistika', description: 'Analisis regresi data penjualan.', deadline: '2024-08-18', price: 250000, status: OrderStatus.BARU_MASUK },
    { id: '6', customerName: 'Fajar Nugraha', subject: 'Desain Grafis', description: 'Membuat logo untuk startup.', deadline: '2024-08-11', price: 400000, status: OrderStatus.DIBATALKAN },
];


const Dashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Load orders from local storage or use initial data
    const savedOrders = localStorage.getItem('joki-orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      setOrders(initialOrders);
    }
  }, []);

  useEffect(() => {
    // Save orders to local storage whenever they change
    localStorage.setItem('joki-orders', JSON.stringify(orders));
  }, [orders]);


  const handleAddOrder = useCallback((newOrderData: Omit<Order, 'id' | 'status'>) => {
    const newOrder: Order = {
      ...newOrderData,
      id: `order-${Date.now()}-${Math.random()}`,
      status: OrderStatus.BARU_MASUK,
    };
    setOrders(prevOrders => [...prevOrders, newOrder]);
    setIsModalOpen(false);
  }, []);

  const handleUpdateOrderStatus = useCallback((orderId: string, newStatus: OrderStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  }, []);

  const handleDeleteOrder = useCallback((orderId: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pesanan ini?')) {
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    }
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-200">Proses Penjualan</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold transition-colors duration-200 shadow-lg"
        >
          <PlusCircleIcon className="h-5 w-5" />
          Tambah Pesanan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATUSES.map(status => (
          <Column
            key={status}
            status={status}
            orders={orders.filter(order => order.status === status)}
            onUpdateStatus={handleUpdateOrderStatus}
            onDeleteOrder={handleDeleteOrder}
          />
        ))}
      </div>

      {isModalOpen && (
        <AddOrderModal
          onClose={() => setIsModalOpen(false)}
          onAddOrder={handleAddOrder}
        />
      )}
    </div>
  );
};

export default Dashboard;
