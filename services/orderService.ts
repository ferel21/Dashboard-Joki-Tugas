import { db } from '../firebaseConfig';
import { Order, OrderStatus } from '../types';

// Pastikan 'db' berhasil diinisialisasi sebelum digunakan. 
// Jika tidak, error akan muncul, sesuai dengan pesan di firebaseConfig.ts.
const ordersCollection = db.collection('orders');

/**
 * Sets up a real-time listener for the orders collection.
 * @param callback - Function to call with the new list of orders.
 * @param onError - Function to call when an error occurs.
 * @returns An unsubscribe function to detach the listener.
 */
export const listenForOrders = (
  callback: (orders: Order[]) => void,
  onError: (error: Error) => void
) => {
  // Menggunakan sintaks v8 compat: collection.onSnapshot()
  return ordersCollection.onSnapshot(
    (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Order[];
      callback(ordersData);
    },
    (error) => {
      console.error("Error listening for orders: ", error);
      onError(error);
    }
  );
};

/**
 * Adds a new order to the Firestore collection.
 * @param orderData - The order data to add (without id and status).
 */
export const addOrder = (orderData: Omit<Order, 'id' | 'status'>) => {
  const newOrder = {
    ...orderData,
    status: OrderStatus.BARU_MASUK,
  };
  // Menggunakan sintaks v8 compat: collection.add()
  return ordersCollection.add(newOrder);
};

/**
 * Updates an existing order in Firestore.
 * @param orderId - The ID of the order to update.
 * @param updates - An object containing the fields to update.
 */
export const updateOrder = (orderId: string, updates: Partial<Order>) => {
  // Menggunakan sintaks v8 compat: collection.doc(id).update()
  const orderRef = ordersCollection.doc(orderId);
  return orderRef.update(updates);
};

/**
 * Deletes an order from Firestore.
 * @param orderId - The ID of the order to delete.
 */
export const deleteOrder = (orderId: string) => {
  // Menggunakan sintaks v8 compat: collection.doc(id).delete()
  const orderRef = ordersCollection.doc(orderId);
  return orderRef.delete();
};
