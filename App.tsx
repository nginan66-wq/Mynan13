import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategoryFilter } from './components/CategoryFilter';
import { FoodCard } from './components/FoodCard';
import { FoodDetailModal } from './components/FoodDetailModal';
import { CartView } from './components/CartView';
import { CheckoutView } from './components/CheckoutView';
import { DemoPaymentView } from './components/DemoPaymentView';
import { OrderSuccessView } from './components/OrderSuccessView';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { StorySection } from './components/StorySection';
import { Footer } from './components/Footer';

import { MENU_ITEMS, RESTAURANT_INFO } from './data/menu';
import { CategoryId, MenuItem, CartItem, CustomerInfo, Order, PaymentMethod } from './types/food';
import { generateOrderId, formatPrice } from './utils/formatters';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const CART_STORAGE_KEY = 'itadaki_cart_v1';
const ORDERS_STORAGE_KEY = 'itadaki_orders_v1';
const CUSTOMER_STORAGE_KEY = 'itadaki_customer_v1';

export default function App() {
  // Navigation View State
  const [currentView, setCurrentView] = useState<'menu' | 'cart' | 'checkout' | 'payment' | 'order-success'>('menu');

  // Filter & Search State
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modal States
  const [selectedDetailItem, setSelectedDetailItem] = useState<MenuItem | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

  // Cart State (Persisted in localStorage)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Customer Form State
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>(() => {
    try {
      const saved = localStorage.getItem(CUSTOMER_STORAGE_KEY);
      return saved
        ? JSON.parse(saved)
        : {
            name: '',
            phone: '',
            address: '',
            notes: '',
          };
    } catch {
      return { name: '', phone: '', address: '', notes: '' };
    }
  });

  // Orders History State
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Current Active Order (for Success View)
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  // Sync customerInfo to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customerInfo));
    } catch (e) {
      console.error('Failed to save customerInfo to localStorage', e);
    }
  }, [customerInfo]);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  // Auto scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  // Cart Calculations
  const cartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.itemTotalPrice, 0);
  }, [cartItems]);

  // Filtered Menu Items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.japaneseName.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryId, number> = {
      all: MENU_ITEMS.length,
      ramen: 0,
      rice: 0,
      sushi: 0,
      appetizer: 0,
      drink: 0,
    };
    MENU_ITEMS.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Quick Cart Quantity Lookup per menuItemId
  const cartQuantityByMenuItemId = useMemo(() => {
    const map: Record<string, number> = {};
    cartItems.forEach((item) => {
      map[item.menuItem.id] = (map[item.menuItem.id] || 0) + item.quantity;
    });
    return map;
  }, [cartItems]);

  // Handler: Add to cart (Standard Quick Add)
  const handleQuickAddToCart = (item: MenuItem) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (ci) => ci.menuItem.id === item.id && !ci.selectedSpiciness && (!ci.selectedToppings || ci.selectedToppings.length === 0)
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        const existing = updated[existingIndex];
        const newQty = existing.quantity + 1;
        const unitPrice = item.price;
        updated[existingIndex] = {
          ...existing,
          quantity: newQty,
          itemTotalPrice: unitPrice * newQty,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          cartItemId: `${item.id}-${Date.now()}`,
          menuItem: item,
          quantity: 1,
          itemTotalPrice: item.price,
        };
        return [...prevItems, newItem];
      }
    });
  };

  // Handler: Add to cart with detailed options
  const handleAddToCartWithOptions = (
    item: MenuItem,
    quantity: number,
    selectedSpiciness?: string,
    selectedToppings?: { name: string; price: number }[],
    specialInstructions?: string
  ) => {
    const toppingsTotal = selectedToppings?.reduce((sum, t) => sum + t.price, 0) || 0;
    const unitPrice = item.price + toppingsTotal;

    const newItem: CartItem = {
      cartItemId: `${item.id}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      menuItem: item,
      quantity,
      selectedSpiciness,
      selectedToppings,
      specialInstructions,
      itemTotalPrice: unitPrice * quantity,
    };

    setCartItems((prev) => [...prev, newItem]);
  };

  // Handler: Update quantity
  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.cartItemId === cartItemId) {
          const toppingsTotal = item.selectedToppings?.reduce((sum, t) => sum + t.price, 0) || 0;
          const unitPrice = item.menuItem.price + toppingsTotal;
          return {
            ...item,
            quantity: newQty,
            itemTotalPrice: unitPrice * newQty,
          };
        }
        return item;
      })
    );
  };

  // Handler: Remove item
  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  // Handler: Clear entire cart
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Handler: Confirm Order & Demo Payment
  const handleConfirmOrder = (paymentMethod: PaymentMethod, paymentRef?: string) => {
    const newOrderId = generateOrderId();
    const deliveryFee = RESTAURANT_INFO.deliveryFee;
    const total = cartSubtotal + deliveryFee;

    const newOrder: Order = {
      orderId: newOrderId,
      customer: { ...customerInfo },
      items: [...cartItems],
      subtotal: cartSubtotal,
      deliveryFee,
      total,
      paymentMethod,
      paymentReference: paymentRef,
      paymentStatus: paymentMethod === 'cod' ? 'รอชำระเงินปลายทาง' : 'ชำระเงินสำเร็จ (Demo)',
      orderStatus: 'กำลังเตรียมอาหาร',
      createdAt: new Date().toISOString(),
      estimatedDeliveryTime: RESTAURANT_INFO.estimatedDeliveryMinutes,
    };

    // Save order
    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrder(newOrder);

    // Empty cart after successful checkout
    setCartItems([]);

    // Navigate to Order Success View
    setCurrentView('order-success');
  };

  const handleSelectPastOrder = (order: Order) => {
    setActiveOrder(order);
    setCurrentView('order-success');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1C1917]">
      {/* Top Header */}
      <Header
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        cartCount={cartCount}
        cartTotal={cartSubtotal}
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={orders.length}
      />

      {/* Main Content Area Based on Current View */}
      <main className="flex-1">
        {currentView === 'menu' && (
          <div className="space-y-10">
            {/* Hero Section */}
            <HeroBanner
              onScrollToMenu={() => {
                const el = document.getElementById('categories');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Menu Catalogue Container */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
              <CategoryFilter
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                itemCounts={categoryCounts}
              />

              {/* Food Cards Grid */}
              {filteredItems.length === 0 ? (
                <div className="py-16 text-center text-[#78716C] bg-white rounded-xl border border-[#E7E2DA] p-8">
                  <span className="font-serif text-3xl text-[#991B1B] font-bold block mb-2">見つかりません</span>
                  <p className="text-base font-bold text-[#1C1917]">ไม่พบเมนูอาหารที่คุณค้นหา</p>
                  <p className="text-xs text-[#A8A29E] mt-1">ลองพิมพ์คำค้นหาอื่น หรือเลือกดูหมวดหมู่อื่นดูนะครับ</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                    }}
                    className="mt-4 px-4 py-2 text-xs font-semibold text-[#991B1B] border border-[#991B1B]/30 hover:bg-[#991B1B]/5 rounded-md transition-colors"
                  >
                    ดูรายการอาหารทั้งหมด
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item) => (
                    <FoodCard
                      key={item.id}
                      item={item}
                      onAddToCart={handleQuickAddToCart}
                      onSelectDetail={setSelectedDetailItem}
                      currentQuantityInCart={cartQuantityByMenuItemId[item.id] || 0}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Story & Philosophy Section */}
            <StorySection />
          </div>
        )}

        {currentView === 'cart' && (
          <CartView
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveCartItem}
            onClearCart={handleClearCart}
            onProceedToCheckout={() => setCurrentView('checkout')}
            onBackToMenu={() => setCurrentView('menu')}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutView
            cartItems={cartItems}
            customerInfo={customerInfo}
            onUpdateCustomerInfo={setCustomerInfo}
            onBackToCart={() => setCurrentView('cart')}
            onProceedToPayment={() => setCurrentView('payment')}
          />
        )}

        {currentView === 'payment' && (
          <DemoPaymentView
            cartItems={cartItems}
            customerInfo={customerInfo}
            onBackToCheckout={() => setCurrentView('checkout')}
            onConfirmOrder={handleConfirmOrder}
          />
        )}

        {currentView === 'order-success' && activeOrder && (
          <OrderSuccessView
            order={activeOrder}
            onBackToMenu={() => setCurrentView('menu')}
          />
        )}
      </main>

      {/* Mobile Floating Cart Bar (Visible on Menu View if items in cart) */}
      {currentView === 'menu' && cartCount > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-30 sm:hidden">
          <button
            onClick={() => setCurrentView('cart')}
            className="w-full bg-[#991B1B] text-white p-3.5 rounded-lg shadow-lg flex items-center justify-between font-medium text-sm transition-transform active:scale-98"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-mono font-bold">
                {cartCount}
              </div>
              <span>ดูตะกร้าอาหาร</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold">{formatPrice(cartSubtotal)}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      )}

      {/* Food Customization Modal */}
      <FoodDetailModal
        item={selectedDetailItem}
        onClose={() => setSelectedDetailItem(null)}
        onAddToCartWithOptions={handleAddToCartWithOptions}
      />

      {/* Past Orders History Modal */}
      <OrderHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        orders={orders}
        onSelectOrder={handleSelectPastOrder}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
