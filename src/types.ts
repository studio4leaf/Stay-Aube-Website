export interface User {
  uid: string;
  email: string;
  displayName?: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  capacity: number;
  price: number;
  images: string[];
}

export interface Reservation {
  id: string;
  userId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  options: string[];
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  totalPrice: number;
}
