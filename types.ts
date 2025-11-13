
export enum OrderStatus {
  BARU_MASUK = 'BARU_MASUK',
  DIKERJAKAN = 'DIKERJAKAN',
  SELESAI = 'SELESAI',
  DIBATALKAN = 'DIBATALKAN',
}

export interface Order {
  id: string;
  customerName: string;
  subject: string;
  description: string;
  deadline: string;
  price: number;
  status: OrderStatus;
}
