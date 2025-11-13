
import { OrderStatus } from './types';

export const STATUSES: OrderStatus[] = [
  OrderStatus.BARU_MASUK,
  OrderStatus.DIKERJAKAN,
  OrderStatus.SELESAI,
  OrderStatus.DIBATALKAN,
];

export const STATUS_MAP: Record<OrderStatus, { name: string; color: string; }> = {
  [OrderStatus.BARU_MASUK]: { name: 'Baru Masuk', color: 'bg-blue-500' },
  [OrderStatus.DIKERJAKAN]: { name: 'Dikerjakan', color: 'bg-yellow-500' },
  [OrderStatus.SELESAI]: { name: 'Selesai', color: 'bg-green-500' },
  [OrderStatus.DIBATALKAN]: { name: 'Dibatalkan', color: 'bg-red-500' },
};
