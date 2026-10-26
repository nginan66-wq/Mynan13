export type CategoryId = 'all' | 'ramen' | 'rice' | 'sushi' | 'appetizer' | 'drink';

export interface Category {
  id: CategoryId;
  name: string;
  japanese: string;
  iconName?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  japaneseName: string;
  category: CategoryId;
  price: number;
  description: string;
  image: string;
  badge?: string;
  spicyLevel?: number; // 0-3
  calories?: number;
  preparationTime?: string;
  availableOptions?: {
    spiciness?: string[];
    toppings?: { name: string; price: number }[];
  };
}

export interface CartItem {
  cartItemId: string; // unique for item + selected options
  menuItem: MenuItem;
  quantity: number;
  selectedSpiciness?: string;
  selectedToppings?: { name: string; price: number }[];
  specialInstructions?: string;
  itemTotalPrice: number;
}

export type PaymentMethod = 'transfer' | 'qr' | 'cod';

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  notes: string;
}

export interface Order {
  orderId: string;
  customer: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentReference?: string;
  paymentStatus: 'ชำระเงินสำเร็จ (Demo)' | 'รอชำระเงินปลายทาง';
  orderStatus: 'กำลังเตรียมอาหาร' | 'กำลังจัดส่ง' | 'จัดส่งสำเร็จ';
  createdAt: string;
  estimatedDeliveryTime: string;
}
