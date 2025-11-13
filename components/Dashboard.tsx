import React, { useState, useCallback, useEffect } from 'react';
import { Order, OrderStatus } from '../types';
import { STATUSES, STATUS_MAP } from '../constants';
import Column from './Column';
import AddOrderModal from './AddOrderModal';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { useToast } from '../ToastContext';

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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState<Order | null>(null);
  const { addToast } = useToast();


  useEffect(() => {
    // Load orders from local storage or use initial data
    try {
      const savedOrders = localStorage.getItem('joki-orders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      } else {
        setOrders(initialOrders);
      }
    } catch (error) {
      console.error("Failed to parse orders from localStorage", error);
      setOrders(initialOrders);
    }
  }, []);

  useEffect(() => {
    // Sync state with other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'joki-orders' && e.newValue) {
        try {
          setOrders(JSON.parse(e.newValue));
        } catch (error) {
           console.error("Failed to parse orders from storage event", error);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    // Save orders to local storage whenever they change
    if (orders.length > 0 || localStorage.getItem('joki-orders')) {
        try {
            localStorage.setItem('joki-orders', JSON.stringify(orders));
        } catch (error) {
            console.error("Failed to save orders to localStorage", error);
            addToast("Gagal menyimpan data pesanan.", "error");
        }
    }
  }, [orders, addToast]);


  const handleAddOrder = useCallback((newOrderData: Omit<Order, 'id' | 'status'>) => {
    const newOrder: Order = {
      ...newOrderData,
      id: `order-${Date.now()}-${Math.random()}`,
      status: OrderStatus.BARU_MASUK,
    };
    setOrders(prevOrders => [...prevOrders, newOrder]);
    addToast('Pesanan berhasil ditambahkan!', 'success');
    closeModal();
  }, [addToast]);

  const handleUpdateOrder = useCallback((updatedOrder: Order) => {
    setOrders(prevOrders => prevOrders.map(order => order.id === updatedOrder.id ? updatedOrder : order));
    addToast('Pesanan berhasil diperbarui!', 'success');
    closeModal();
  }, [addToast]);

  const handleUpdateOrderStatus = useCallback((orderId: string, newStatus: OrderStatus) => {
    let orderName = '';
    setOrders(prevOrders =>
      prevOrders.map(order => {
        if (order.id === orderId) {
          if(order.status === newStatus) return order; // No change
          orderName = order.customerName;
          return { ...order, status: newStatus };
        }
        return order;
      })
    );
     if (orderName) {
      addToast(`Pesanan ${orderName} dipindahkan ke ${STATUS_MAP[newStatus].name}.`, 'info');
    }
  }, [addToast]);

  const handleDeleteOrder = useCallback((orderId: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pesanan ini?')) {
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
      addToast('Pesanan berhasil dihapus.', 'info');
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
    setIsAddModalOpen(false);
    setOrderToEdit(order);
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

      {(isAddModalOpen || orderToEdit) && (
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
